import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther, formatEther, Address } from 'viem';

// Factory contract address
const FACTORY_ADDRESS = "0x29B93562B71E0BF15Bc4DD5a9B27C717a7e53213" as Address;

// Factory ABI
const FACTORY_ABI = [
  {
    "inputs": [],
    "name": "getAllTokenPairs",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "backingTokens",
        "type": "address[]"
      },
      {
        "internalType": "address[]",
        "name": "leverageContracts",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "backingToken",
        "type": "address"
      }
    ],
    "name": "getTokenInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "backingToken",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "leverageContract",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "deployedAt",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          }
        ],
        "internalType": "struct LeverageTokenFactory.TokenInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// ERC20 ABI
const ERC20_ABI = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol", 
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Leverage Token ABI
const LEVERAGE_TOKEN_ABI = [
  {
    "inputs": [],
    "name": "getBacking",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "getBuyAmount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBuyFee",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "backingToken",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "receiver", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "buy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokens", "type": "uint256"}],
    "name": "sell",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "backingAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "numberOfDays", "type": "uint256"}
    ],
    "name": "leverage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "backingAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "numberOfDays", "type": "uint256"}
    ],
    "name": "leverageFee",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "backingAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "numberOfDays", "type": "uint256"}
    ],
    "name": "borrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_address", "type": "address"}],
    "name": "getLoanByAddress",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"},
      {"internalType": "uint256", "name": "", "type": "uint256"},
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "closePosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "flashClosePosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "repay",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;


// Hook for factory interactions
export function useLeverageTokenFactory() {
  const { data: tokenPairs } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getAllTokenPairs',
  });

  // Token info can be fetched using the factory address and ABI
  const tokenInfo = {
    factoryAddress: FACTORY_ADDRESS,
    factoryABI: FACTORY_ABI,
  };

  return {
    factoryAddress: FACTORY_ADDRESS,
    tokenPairs,
    tokenInfo,
  };
}

// Hook for leverage token interactions
export function useLeverageToken(tokenAddress: Address | undefined) {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const { address: userAddress } = useAccount();

  // Read token data
  const { data: backing } = useReadContract({
    address: tokenAddress,
    abi: LEVERAGE_TOKEN_ABI,
    functionName: 'getBacking',
  });

  const { data: totalSupply } = useReadContract({
    address: tokenAddress,
    abi: LEVERAGE_TOKEN_ABI,
    functionName: 'totalSupply',
  });

  const { data: buyFeeRaw } = useReadContract({
    address: tokenAddress,
    abi: LEVERAGE_TOKEN_ABI,
    functionName: 'getBuyFee',
  });

  const { data: backingTokenAddress } = useReadContract({
    address: tokenAddress,
    abi: LEVERAGE_TOKEN_ABI,
    functionName: 'backingToken',
  });

  // User balance
  const { data: userBalance } = useReadContract({
    address: tokenAddress,
    abi: LEVERAGE_TOKEN_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
  });

  // User loan data
  const { data: loanData } = useReadContract({
    address: tokenAddress,
    abi: LEVERAGE_TOKEN_ABI,
    functionName: 'getLoanByAddress',
    args: userAddress ? [userAddress] : undefined,
  });

  // Calculate current price
  const currentPrice = totalSupply && backing && totalSupply > BigInt(0)
    ? parseFloat(formatEther(backing)) / parseFloat(formatEther(totalSupply))
    : 0;

  // Calculate fee percentage
  const buyFeePercent = buyFeeRaw ? ((1000 - Number(buyFeeRaw)) / 10) : 2.5;

  // Check if user has active loan
  const hasActiveLoan = loanData && Array.isArray(loanData) && loanData.length >= 3 && Number(loanData[0]) > 0;

  // Contract write functions
  const buyTokens = (backingAmount: string) => {
    if (!tokenAddress || !userAddress || !backingTokenAddress) return;
    
    writeContract({
      address: tokenAddress,
      abi: LEVERAGE_TOKEN_ABI,
      functionName: 'buy',
      args: [userAddress, parseEther(backingAmount)],
    });
  };

  const sellTokens = (tokenAmount: string) => {
    if (!tokenAddress) return;
    
    writeContract({
      address: tokenAddress,
      abi: LEVERAGE_TOKEN_ABI,
      functionName: 'sell',
      args: [parseEther(tokenAmount)],
    });
  };

  const leverageTrade = (backingAmount: string, days: number) => {
    if (!tokenAddress) return;
    
    writeContract({
      address: tokenAddress,
      abi: LEVERAGE_TOKEN_ABI,
      functionName: 'leverage',
      args: [parseEther(backingAmount), BigInt(days)],
    });
  };

  const borrowAgainstTokens = (backingAmount: string, days: number) => {
    if (!tokenAddress) return;
    
    writeContract({
      address: tokenAddress,
      abi: LEVERAGE_TOKEN_ABI,
      functionName: 'borrow',
      args: [parseEther(backingAmount), BigInt(days)],
    });
  };

  const repayLoan = (amount: string) => {
    if (!tokenAddress) return;
    
    writeContract({
      address: tokenAddress,
      abi: LEVERAGE_TOKEN_ABI,
      functionName: 'repay',
      args: [parseEther(amount)],
    });
  };

  const closePosition = () => {
    if (!tokenAddress) return;
    
    writeContract({
      address: tokenAddress,
      abi: LEVERAGE_TOKEN_ABI,
      functionName: 'closePosition',
    });
  };

  const flashClose = () => {
    if (!tokenAddress) return;
    
    writeContract({
      address: tokenAddress,
      abi: LEVERAGE_TOKEN_ABI,
      functionName: 'flashClosePosition',
    });
  };

  return {
    // Token data
    backing: backing ? formatEther(backing) : '0',
    totalSupply: totalSupply ? formatEther(totalSupply) : '0',
    currentPrice,
    buyFeePercent,
    backingTokenAddress,
    
    // User data
    userBalance: userBalance ? formatEther(userBalance) : '0',
    loan: hasActiveLoan ? {
      collateral: formatEther(loanData[0] as bigint),
      borrowed: formatEther(loanData[1] as bigint),
      endDate: new Date(Number(loanData[2]) * 1000),
    } : null,
    hasActiveLoan: !!hasActiveLoan,
    
    // Actions
    buyTokens,
    sellTokens,
    leverageTrade,
    borrowAgainstTokens,
    repayLoan,
    closePosition,
    flashClose,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
  };
}

// Hook for backing token interactions (ERC20)
export function useBackingToken(tokenAddress: Address | undefined) {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const { address: userAddress } = useAccount();

  const { data: name } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
  });

  const { data: totalSupply } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'totalSupply',
  });

  const { data: userBalance } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
  });

  // Hook to get allowance for a specific spender
  const useGetAllowance = (spender: Address | undefined) => {
    return useReadContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: userAddress && spender ? [userAddress, spender] : undefined,
    });
  };

  // Function to check if allowance is sufficient (for use in components)
  const checkAllowance = (allowance: bigint | undefined, amount: string) => {
    if (!allowance) return false;
    return parseEther(amount) <= allowance;
  };

  const approveToken = (spender: Address, amount: string) => {
    if (!tokenAddress) return;
    
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [spender, parseEther(amount)],
    });
  };

  return {
    name: name as string,
    symbol: symbol as string,
    totalSupply: totalSupply ? formatEther(totalSupply) : '0',
    userBalance: userBalance ? formatEther(userBalance) : '0',
    
    // Allowance functions
    useGetAllowance,
    checkAllowance,
    
    // Actions
    approveToken,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
  };
}

// Hook for trade calculations
export function useLeverageCalculations(tokenAddress: Address | undefined) {
  const useBuyAmount = (backingAmount: string) => {
    return useReadContract({
      address: tokenAddress,
      abi: LEVERAGE_TOKEN_ABI,
      functionName: 'getBuyAmount',
      args: backingAmount ? [parseEther(backingAmount)] : undefined,
    });
  };

  const useLeverageFee = (backingAmount: string, days: number) => {
    return useReadContract({
      address: tokenAddress,
      abi: LEVERAGE_TOKEN_ABI,
      functionName: 'leverageFee',
      args: backingAmount && days ? [parseEther(backingAmount), BigInt(days)] : undefined,
    });
  };

  return {
    useBuyAmount,
    useLeverageFee,
  };
}