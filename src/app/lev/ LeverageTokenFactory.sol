//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "./LeverageTokenContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract LeverageTokenFactory is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    struct TokenInfo {
        address backingToken;      // Original token address (SHIB, PEPE, etc)
        address leverageContract;  // Deployed leverage contract
        string name;               // levSHIB, levPEPE, etc
        string symbol;             // LEVSHIB, LEVPEPE, etc
        uint256 deployedAt;        // Deployment timestamp
        bool active;               // Whether token is active
    }
    
    // Mapping from backing token address to token info
    mapping(address => TokenInfo) public listedTokens;
    
    // Array of all listed token addresses for enumeration
    address[] public tokenList;
    
    // Mapping from leverage contract address back to backing token (reverse lookup)
    mapping(address => address) public leverageToBackingToken;
    
    // Mapping from backing token to burn status (true = burn fees, false = send to fee address)
    mapping(address => bool) public tokenBurnStatus;
    
    // Platform settings
    address public feeCollector;                 // Where trading fees go
    
    // Authorized listers who can whitelist tokens
    mapping(address => bool) public authorizedListers;
    address[] public listerList;
    
    // Events
    event TokenWhitelisted(
        address indexed backingToken,
        address indexed leverageContract,
        string name,
        string symbol
    );
    
    event TokenDeactivated(address indexed backingToken);
    event TokenReactivated(address indexed backingToken);
    event FeeCollectorUpdated(address newCollector);
    event LeverageContractFeeAddressUpdated(address indexed backingToken, address newFeeAddress);
    event AllLeverageContractsFeeAddressUpdated(address newFeeAddress);
    event BatchLeverageContractsFeeAddressUpdated(uint256 startIndex, uint256 endIndex, uint256 updatedCount, address newFeeAddress);
    event ListerAdded(address indexed lister);
    event ListerRemoved(address indexed lister);
    event TokenBurnStatusUpdated(address indexed backingToken, bool burnEnabled);
    event BatchTokenBurnStatusUpdated(uint256 startIndex, uint256 endIndex, uint256 updatedCount, bool burnEnabled);
    
    modifier onlyListerOrOwner() {
        require(
            msg.sender == owner() || authorizedListers[msg.sender], 
            "Only owner or authorized lister"
        );
        _;
    }
    
    constructor(address _feeCollector) Ownable(msg.sender) {
        require(_feeCollector != address(0), "Fee collector cannot be zero address");
        feeCollector = _feeCollector;
        // Owner is automatically a lister
        authorizedListers[msg.sender] = true;
        listerList.push(msg.sender);
    }
    
    /**
     * @notice Whitelist a new token and deploy its leverage contract (admin only)
     * Automatically reads token name and symbol to create "Leverage TokenName" and "levTOKEN"
     * @param backingToken Address of the token to whitelist (SHIB, PEPE, etc)
     */
    function whitelistToken(address backingToken) external onlyListerOrOwner nonReentrant {
        // CHECKS: All validation first
        require(backingToken != address(0), "Backing token cannot be zero address");
        require(listedTokens[backingToken].backingToken == address(0), "Token already whitelisted");
        
        // Verify backing token is valid ERC20 and get metadata
        string memory originalName;
        string memory originalSymbol;
        try IERC20Metadata(backingToken).name() returns (string memory _name) {
            originalName = _name;
        } catch {
            revert("Invalid ERC20 token - no name");
        }
        
        try IERC20Metadata(backingToken).symbol() returns (string memory _symbol) {
            originalSymbol = _symbol;
        } catch {
            revert("Invalid ERC20 token - no symbol");
        }
        
        require(bytes(originalName).length > 0, "Token must have a name");
        require(bytes(originalSymbol).length > 0, "Token must have a symbol");
        
        // Auto-generate leverage token name and symbol
        string memory name = string(abi.encodePacked("Leverage ", originalName));
        string memory symbol = string(abi.encodePacked("lev", originalSymbol));
        
        // EFFECTS: Update state BEFORE external calls
        // Store token info immediately to prevent reentrancy
        listedTokens[backingToken] = TokenInfo({
            backingToken: backingToken,
            leverageContract: address(0), // Will be updated after deployment
            name: name,
            symbol: symbol,
            deployedAt: block.timestamp,
            active: true
        });
        
        // Set default burn status to true (burn fees like before)
        tokenBurnStatus[backingToken] = true;
        
        // Add to token list for enumeration
        tokenList.push(backingToken);
        
        // INTERACTIONS: External calls last
        // Deploy new leverage contract
        LeverageToken leverageContract = new LeverageToken(backingToken, name, symbol);
        
        // Update the contract address in storage
        listedTokens[backingToken].leverageContract = address(leverageContract);
        
        // Add reverse mapping for easy lookup
        leverageToBackingToken[address(leverageContract)] = backingToken;
        
        // Set this factory as the fee address for revenue sharing
        leverageContract.setFeeAddress(feeCollector);
        
        // Transfer 1 backing token from caller to initialize the contract
        IERC20(backingToken).safeTransferFrom(msg.sender, address(this), 1);
        
        // Approve the leverage contract to take the token
        IERC20(backingToken).approve(address(leverageContract), 1);
        
        // Initialize the leverage contract with 1 token amount and send 1 to factory owner
        leverageContract.setStart(1, 1);
        
        // Keep factory as owner so we can manage fee addresses
        // leverageContract ownership stays with factory
        
        emit TokenWhitelisted(
            backingToken,
            address(leverageContract),
            name,
            symbol
        );
    }
    
    /**
     * @notice Get leverage contract for a backing token
     */
    function getLeverageContract(address backingToken) external view returns (address) {
        require(listedTokens[backingToken].active, "Token not active");
        return listedTokens[backingToken].leverageContract;
    }
    
    /**
     * @notice Check if a token is whitelisted and active
     */
    function isTokenActive(address backingToken) external view returns (bool) {
        return listedTokens[backingToken].active;
    }

    /**
     * @notice Check if a token has burn enabled
     */
    function isTokenBurnEnabled(address backingToken) external view returns (bool) {
        return tokenBurnStatus[backingToken];
    }
    
    /**
     * @notice Get full token info
     */
    function getTokenInfo(address backingToken) external view returns (TokenInfo memory) {
        return listedTokens[backingToken];
    }
    
    /**
     * @notice Get all whitelisted tokens
     */
    function getAllTokens() external view returns (address[] memory) {
        return tokenList;
    }

    /**
     * @notice Get all token pairs (backing token and leverage contract addresses)
     */
    function getAllTokenPairs() external view returns (
        address[] memory backingTokens,
        address[] memory leverageContracts
    ) {
        uint256 length = tokenList.length;
        backingTokens = new address[](length);
        leverageContracts = new address[](length);
        
        for (uint256 i = 0; i < length; i++) {
            address backingToken = tokenList[i];
            backingTokens[i] = backingToken;
            leverageContracts[i] = listedTokens[backingToken].leverageContract;
        }
        
        return (backingTokens, leverageContracts);
    }

    /**
     * @notice Get backing token address from leverage contract address
     */
    function getBackingTokenFromLeverage(address leverageContract) external view returns (address) {
        return leverageToBackingToken[leverageContract];
    }
    
    /**
     * @notice Get all active tokens
     */
    function getActiveTokens() external view returns (address[] memory) {
        uint256 activeCount = 0;
        
        // Count active tokens
        for (uint256 i = 0; i < tokenList.length; i++) {
            if (listedTokens[tokenList[i]].active) {
                activeCount++;
            }
        }
        
        // Create array of active tokens
        address[] memory activeTokens = new address[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < tokenList.length; i++) {
            if (listedTokens[tokenList[i]].active) {
                activeTokens[index] = tokenList[i];
                index++;
            }
        }
        
        return activeTokens;
    }

    /**
     * @notice Get all active token pairs (backing token and leverage contract addresses)
     */
    function getActiveTokenPairs() external view returns (
        address[] memory backingTokens,
        address[] memory leverageContracts
    ) {
        uint256 activeCount = 0;
        
        // Count active tokens
        for (uint256 i = 0; i < tokenList.length; i++) {
            if (listedTokens[tokenList[i]].active) {
                activeCount++;
            }
        }
        
        // Create arrays for active token pairs
        backingTokens = new address[](activeCount);
        leverageContracts = new address[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < tokenList.length; i++) {
            address backingToken = tokenList[i];
            if (listedTokens[backingToken].active) {
                backingTokens[index] = backingToken;
                leverageContracts[index] = listedTokens[backingToken].leverageContract;
                index++;
            }
        }
        
        return (backingTokens, leverageContracts);
    }
    
    /**
     * @notice Get total number of listed tokens
     */
    function getTokenCount() external view returns (uint256) {
        return tokenList.length;
    }
    
    // Admin functions
    
    /**
     * @notice Deactivate a token (admin only)
     */
    function deactivateToken(address backingToken) external onlyOwner {
        require(listedTokens[backingToken].backingToken != address(0), "Token not listed");
        listedTokens[backingToken].active = false;
        emit TokenDeactivated(backingToken);
    }
    
    /**
     * @notice Reactivate a token (admin only)
     */
    function reactivateToken(address backingToken) external onlyOwner {
        require(listedTokens[backingToken].backingToken != address(0), "Token not listed");
        listedTokens[backingToken].active = true;
        emit TokenReactivated(backingToken);
    }
    
    
    /**
     * @notice Update fee collector address (admin only)
     */
    function setFeeCollector(address newCollector) external onlyOwner {
        require(newCollector != address(0), "Fee collector cannot be zero address");
        feeCollector = newCollector;
        emit FeeCollectorUpdated(newCollector);
    }
    
    
    /**
     * @notice Update fee address for a specific leverage contract (admin only)
     */
    function setLeverageContractFeeAddress(address backingToken, address newFeeAddress) external onlyOwner {
        require(listedTokens[backingToken].active, "Token not active");
        require(newFeeAddress != address(0), "Fee address cannot be zero");
        
        LeverageToken leverageContract = LeverageToken(listedTokens[backingToken].leverageContract);
        leverageContract.setFeeAddress(newFeeAddress);
        
        emit LeverageContractFeeAddressUpdated(backingToken, newFeeAddress);
    }
    
    /**
     * @notice Update fee addresses for all leverage contracts (admin only)
     */
    function setAllLeverageContractsFeeAddress(address newFeeAddress) external onlyOwner {
        require(newFeeAddress != address(0), "Fee address cannot be zero");
        
        for (uint256 i = 0; i < tokenList.length; i++) {
            if (listedTokens[tokenList[i]].active) {
                LeverageToken leverageContract = LeverageToken(listedTokens[tokenList[i]].leverageContract);
                leverageContract.setFeeAddress(newFeeAddress);
            }
        }
        
        emit AllLeverageContractsFeeAddressUpdated(newFeeAddress);
    }

    /**
     * @notice Update fee addresses for leverage contracts in batches (gas efficient)
     */
    function setBatchLeverageContractsFeeAddress(
        uint256 startIndex, 
        uint256 endIndex, 
        address newFeeAddress
    ) external onlyOwner {
        require(newFeeAddress != address(0), "Fee address cannot be zero");
        require(startIndex < tokenList.length, "Start index out of bounds");
        require(endIndex <= tokenList.length, "End index out of bounds");
        require(startIndex < endIndex, "Invalid range");
        
        uint256 updatedCount = 0;
        for (uint256 i = startIndex; i < endIndex; i++) {
            if (listedTokens[tokenList[i]].active) {
                LeverageToken leverageContract = LeverageToken(listedTokens[tokenList[i]].leverageContract);
                leverageContract.setFeeAddress(newFeeAddress);
                updatedCount++;
            }
        }
        
        emit BatchLeverageContractsFeeAddressUpdated(startIndex, endIndex, updatedCount, newFeeAddress);
    }

    /**
     * @notice Set burn status for a specific token (admin only)
     * @param backingToken The backing token address
     * @param burnEnabled True to burn fees, false to send to fee address
     */
    function setTokenBurnStatus(address backingToken, bool burnEnabled) external onlyOwner {
        require(listedTokens[backingToken].backingToken != address(0), "Token not listed");
        tokenBurnStatus[backingToken] = burnEnabled;
        emit TokenBurnStatusUpdated(backingToken, burnEnabled);
    }

    /**
     * @notice Set burn status for all tokens (admin only)
     * @param burnEnabled True to burn fees, false to send to fee address
     */
    function setAllTokensBurnStatus(bool burnEnabled) external onlyOwner {
        for (uint256 i = 0; i < tokenList.length; i++) {
            if (listedTokens[tokenList[i]].active) {
                tokenBurnStatus[tokenList[i]] = burnEnabled;
            }
        }
        emit BatchTokenBurnStatusUpdated(0, tokenList.length, tokenList.length, burnEnabled);
    }

    /**
     * @notice Set burn status for tokens in batches (gas efficient)
     * @param startIndex Start index in tokenList
     * @param endIndex End index in tokenList (exclusive)
     * @param burnEnabled True to burn fees, false to send to fee address
     */
    function setBatchTokensBurnStatus(
        uint256 startIndex,
        uint256 endIndex,
        bool burnEnabled
    ) external onlyOwner {
        require(startIndex < tokenList.length, "Start index out of bounds");
        require(endIndex <= tokenList.length, "End index out of bounds");
        require(startIndex < endIndex, "Invalid range");
        
        uint256 updatedCount = 0;
        for (uint256 i = startIndex; i < endIndex; i++) {
            if (listedTokens[tokenList[i]].active) {
                tokenBurnStatus[tokenList[i]] = burnEnabled;
                updatedCount++;
            }
        }
        
        emit BatchTokenBurnStatusUpdated(startIndex, endIndex, updatedCount, burnEnabled);
    }

    /**
     * @notice Get token addresses in a range (for batching verification)
     */
    function getTokenRange(uint256 startIndex, uint256 endIndex) 
        external 
        view 
        returns (address[] memory tokens, bool[] memory activeStatus) 
    {
        require(startIndex < tokenList.length, "Start index out of bounds");
        require(endIndex <= tokenList.length, "End index out of bounds");
        require(startIndex < endIndex, "Invalid range");
        
        uint256 length = endIndex - startIndex;
        tokens = new address[](length);
        activeStatus = new bool[](length);
        
        for (uint256 i = 0; i < length; i++) {
            address token = tokenList[startIndex + i];
            tokens[i] = token;
            activeStatus[i] = listedTokens[token].active;
        }
    }

    /**
     * @notice Add an authorized lister (admin only)
     */
    function addLister(address lister) external onlyOwner {
        require(lister != address(0), "Lister cannot be zero address");
        require(!authorizedListers[lister], "Already authorized lister");
        
        authorizedListers[lister] = true;
        listerList.push(lister);
        
        emit ListerAdded(lister);
    }
    
    /**
     * @notice Remove an authorized lister (admin only)
     */
    function removeLister(address lister) external onlyOwner {
        require(authorizedListers[lister], "Not an authorized lister");
        require(lister != owner(), "Cannot remove owner from listers");
        
        authorizedListers[lister] = false;
        
        // Remove from listerList array
        for (uint256 i = 0; i < listerList.length; i++) {
            if (listerList[i] == lister) {
                listerList[i] = listerList[listerList.length - 1];
                listerList.pop();
                break;
            }
        }
        
        emit ListerRemoved(lister);
    }
    
    /**
     * @notice Check if address is authorized lister
     */
    function isAuthorizedLister(address lister) external view returns (bool) {
        return authorizedListers[lister];
    }
    
    /**
     * @notice Get all authorized listers
     */
    function getAllListers() external view returns (address[] memory) {
        address[] memory activeListers = new address[](listerList.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < listerList.length; i++) {
            if (authorizedListers[listerList[i]]) {
                activeListers[count] = listerList[i];
                count++;
            }
        }
        
        // Resize array to actual count
        address[] memory result = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = activeListers[i];
        }
        
        return result;
    }
    
    /**
     * @notice Get number of authorized listers
     */
    function getListerCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < listerList.length; i++) {
            if (authorizedListers[listerList[i]]) {
                count++;
            }
        }
        return count;
    }
    
}