'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther, formatUnits, createPublicClient, http } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import VeYakaABI from './abi.json';

const VEYAKA_CONTRACT_ADDRESS = '0x2fB0DA76902E13810460A80045C3FC5170776543' as const;
const YAKA_TOKEN_ADDRESS = '0x51121BCAE92E302f19D06C193C95E1f7b81a444b' as const;
const VOTING_ESCROW_ADDRESS = '0x86a247Ef0Fc244565BCab93936E867407ac81580' as const;

const publicClient = createPublicClient({
  chain: {
    id: 1329,
    name: 'Sei Network',
    network: 'sei',
    nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://evm-rpc.sei-apis.com'] },
      public: { http: ['https://evm-rpc.sei-apis.com'] },
    },
  },
  transport: http(),
});

// ERC20 ABI for token operations
const ERC20_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "address", "name": "spender", "type": "address"}],
    "name": "allowance",
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
  }
] as const;

// VotingEscrow ABI for NFT operations
const VOTING_ESCROW_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "balanceOfNFT",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "locked",
    "outputs": [{"internalType": "int128", "name": "amount", "type": "int128"}, {"internalType": "uint256", "name": "end", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getApproved",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export default function VeYakaPage() {
  const { address, isConnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [nftId, setNftId] = useState('');
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'info'>('deposit');
  const [isApproving, setIsApproving] = useState(false);
  const [userNFTs, setUserNFTs] = useState<{id: string, balance: string, endTime: string}[]>([]);
  const [loadingNFTs, setLoadingNFTs] = useState(false);

  // Contract write hooks
  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract();
  
  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read contract data with error handling
  const { data: vaultInfo, error: vaultInfoError } = useReadContract({
    address: VEYAKA_CONTRACT_ADDRESS,
    abi: VeYakaABI,
    functionName: 'getVaultInfo',
  }) as { data: [bigint, bigint, bigint, bigint, bigint] | undefined, error: Error | null };

  const { data: mainNFTInfo } = useReadContract({
    address: VEYAKA_CONTRACT_ADDRESS,
    abi: VeYakaABI,
    functionName: 'getMainNFTLockInfo',
  }) as { data: [bigint, bigint, bigint, bigint, bigint] | undefined };

  const { data: depositsEnabled, error: depositsError } = useReadContract({
    address: VEYAKA_CONTRACT_ADDRESS,
    abi: VeYakaABI,
    functionName: 'depositsEnabled',
  }) as { data: boolean | undefined, error: Error | null };

  const { data: withdrawalsEnabled, error: withdrawalsError } = useReadContract({
    address: VEYAKA_CONTRACT_ADDRESS,
    abi: VeYakaABI,
    functionName: 'withdrawalsEnabled',
  }) as { data: boolean | undefined, error: Error | null };

  const { data: minimumWithdrawal } = useReadContract({
    address: VEYAKA_CONTRACT_ADDRESS,
    abi: VeYakaABI,
    functionName: 'minimumWithdrawal',
  }) as { data: bigint | undefined };

  const { data: liquidTokenBalance } = useReadContract({
    address: '0xFEEc14a2E30999A84fF4D5750ffb6D3AEc681E79', // liquidToken address
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  }) as { data: bigint | undefined };

  // Read YAKA token balance
  const { data: yakaBalance } = useReadContract({
    address: YAKA_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  }) as { data: bigint | undefined };

  // Read YAKA token allowance
  const { data: yakaAllowance, refetch: refetchYakaAllowance } = useReadContract({
    address: YAKA_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, VEYAKA_CONTRACT_ADDRESS] : undefined,
  }) as { data: bigint | undefined, refetch: () => void };

  // Read lyYAKA token allowance
  const { data: lyYakaAllowance, refetch: refetchLyYakaAllowance } = useReadContract({
    address: '0xFEEc14a2E30999A84fF4D5750ffb6D3AEc681E79',
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, VEYAKA_CONTRACT_ADDRESS] : undefined,
  }) as { data: bigint | undefined, refetch: () => void };

  // Read user's NFT balance from VotingEscrow
  const { data: nftBalance } = useReadContract({
    address: VOTING_ESCROW_ADDRESS,
    abi: VOTING_ESCROW_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  }) as { data: bigint | undefined };

  // Read NFT approval status
  const { data: nftApproved, refetch: refetchNftApproval } = useReadContract({
    address: VOTING_ESCROW_ADDRESS,
    abi: VOTING_ESCROW_ABI,
    functionName: 'getApproved',
    args: nftId ? [BigInt(nftId)] : undefined,
  }) as { data: string | undefined, refetch: () => void };

  // Refetch allowances when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      refetchYakaAllowance();
      refetchLyYakaAllowance();
      refetchNftApproval();
      // Small delay to ensure blockchain state is updated
      setTimeout(() => {
        refetchYakaAllowance();
        refetchLyYakaAllowance();
        refetchNftApproval();
      }, 2000);
    }
  }, [isConfirmed, refetchYakaAllowance, refetchLyYakaAllowance, refetchNftApproval]);

  // Fetch user's NFTs
  const fetchUserNFTs = async () => {
    if (!address || !nftBalance || nftBalance === BigInt(0)) {
      setUserNFTs([]);
      return;
    }

    setLoadingNFTs(true);
    try {
      const nfts: {id: string, balance: string, endTime: string}[] = [];
      const count = Number(nftBalance);
      
      // Fetch up to 10 NFTs (reasonable limit)
      for (let i = 0; i < Math.min(count, 10); i++) {
        try {
          // Get NFT ID by index
          const tokenId = await publicClient.readContract({
            address: VOTING_ESCROW_ADDRESS,
            abi: VOTING_ESCROW_ABI,
            functionName: 'tokenOfOwnerByIndex',
            args: [address, BigInt(i)],
          }) as bigint;

          // Get NFT balance
          const nftBal = await publicClient.readContract({
            address: VOTING_ESCROW_ADDRESS,
            abi: VOTING_ESCROW_ABI,
            functionName: 'balanceOfNFT',
            args: [tokenId],
          }) as bigint;

          // Get lock info
          const lockInfo = await publicClient.readContract({
            address: VOTING_ESCROW_ADDRESS,
            abi: VOTING_ESCROW_ABI,
            functionName: 'locked',
            args: [tokenId],
          }) as [bigint, bigint];

          if (nftBal > BigInt(0)) {
            const endTime = new Date(Number(lockInfo[1]) * 1000);
            nfts.push({
              id: tokenId.toString(),
              balance: formatEther(nftBal),
              endTime: endTime.toLocaleDateString()
            });
          }
        } catch (error) {
          console.error(`Error fetching NFT ${i}:`, error);
        }
      }

      setUserNFTs(nfts);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setUserNFTs([]);
    } finally {
      setLoadingNFTs(false);
    }
  };

  // Fetch NFTs when address or nftBalance changes
  useEffect(() => {
    fetchUserNFTs();
  }, [address, nftBalance]);

  // Handle YAKA token approval for deposits
  const handleApproveYaka = async () => {
    if (!depositAmount || !address) return;
    
    setIsApproving(true);
    try {
      writeContract({
        address: YAKA_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [VEYAKA_CONTRACT_ADDRESS, parseEther(depositAmount)],
      });
    } catch (error) {
      console.error('YAKA approval error:', error);
    } finally {
      setIsApproving(false);
    }
  };

  // Handle lyYAKA token approval for withdrawals
  const handleApproveLyYaka = async () => {
    if (!withdrawAmount || !address) return;
    
    setIsApproving(true);
    try {
      writeContract({
        address: '0xFEEc14a2E30999A84fF4D5750ffb6D3AEc681E79',
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [VEYAKA_CONTRACT_ADDRESS, parseEther(withdrawAmount)],
      });
    } catch (error) {
      console.error('lyYAKA approval error:', error);
    } finally {
      setIsApproving(false);
    }
  };

  // Handle NFT approval for deposits
  const handleApproveNFT = async () => {
    if (!nftId || !address) return;
    
    setIsApproving(true);
    try {
      writeContract({
        address: VOTING_ESCROW_ADDRESS,
        abi: VOTING_ESCROW_ABI,
        functionName: 'approve',
        args: [VEYAKA_CONTRACT_ADDRESS, BigInt(nftId)],
      });
    } catch (error) {
      console.error('NFT approval error:', error);
    } finally {
      setIsApproving(false);
    }
  };

  // Handle deposit
  const handleDeposit = async () => {
    if (!depositAmount || !address) return;
    
    try {
      writeContract({
        address: VEYAKA_CONTRACT_ADDRESS,
        abi: VeYakaABI,
        functionName: 'deposit',
        args: [parseEther(depositAmount)],
      });
    } catch (error) {
      console.error('Deposit error:', error);
    }
  };

  // Handle NFT deposit
  const handleDepositNFT = async () => {
    if (!nftId || !address) return;
    
    try {
      writeContract({
        address: VEYAKA_CONTRACT_ADDRESS,
        abi: VeYakaABI,
        functionName: 'depositNFT',
        args: [BigInt(nftId)],
      });
    } catch (error) {
      console.error('NFT deposit error:', error);
    }
  };

  // Handle withdraw
  const handleWithdraw = async () => {
    if (!withdrawAmount || !address) return;
    
    try {
      writeContract({
        address: VEYAKA_CONTRACT_ADDRESS,
        abi: VeYakaABI,
        functionName: 'withdraw',
        args: [parseEther(withdrawAmount)],
      });
    } catch (error) {
      console.error('Withdraw error:', error);
    }
  };

  // Format time left
  const formatTimeLeft = (timeLeft: bigint) => {
    const seconds = Number(timeLeft);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}d ${hours}h`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">VeYAKA Vault</h1>
              <p className="text-gray-300">Liquid staking for YAKA tokens with voting power</p>
            </div>
          </div>
          <ConnectButton />
        </div>

        {!isConnected ? (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">Connect your wallet to interact with VeYAKA Vault</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vault Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Vault Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Liquid Supply</span>
                    <span className="text-white font-medium">
                      {vaultInfo ? formatEther(vaultInfo[0]) : '0'} lyYAKA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Locked YAKA</span>
                    <span className="text-white font-medium">
                      {vaultInfo ? formatEther(vaultInfo[1]) : '0'} YAKA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Voting Power</span>
                    <span className="text-white font-medium">
                      {vaultInfo ? formatEther(vaultInfo[2]) : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price per Token</span>
                    <span className="text-white font-medium">
                      {vaultInfo ? formatUnits(vaultInfo[3], 18) : '1.00'} YAKA
                    </span>
                  </div>
                </div>
              </div>

              {mainNFTInfo && mainNFTInfo[0] > BigInt(0) && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Main NFT Info</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">NFT ID</span>
                      <span className="text-white font-medium">#{mainNFTInfo[0].toString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Locked Amount</span>
                      <span className="text-white font-medium">
                        {formatEther(mainNFTInfo[1])} YAKA
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time Left</span>
                      <span className="text-white font-medium">
                        {formatTimeLeft(mainNFTInfo[3])}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Voting Power</span>
                      <span className="text-white font-medium">
                        {formatEther(mainNFTInfo[4])}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Your Balance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">YAKA Balance</span>
                    <span className="text-white font-medium">
                      {yakaBalance ? formatEther(yakaBalance as bigint) : '0'} YAKA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">lyYAKA Tokens</span>
                    <span className="text-white font-medium">
                      {liquidTokenBalance ? formatEther(liquidTokenBalance as bigint) : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">YAKA Value</span>
                    <span className="text-white font-medium">
                      {liquidTokenBalance && vaultInfo ? 
                        formatEther((liquidTokenBalance as bigint * vaultInfo[3]) / parseEther('1')) : '0'} YAKA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">veYAKA NFTs</span>
                    <span className="text-white font-medium">
                      {nftBalance ? Number(nftBalance) : 0} NFTs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Interface */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                {/* Tabs */}
                <div className="flex mb-6 bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('deposit')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'deposit'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Deposit
                  </button>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'withdraw'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Withdraw
                  </button>
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'info'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Info
                  </button>
                </div>

                {/* Deposit Tab */}
                {activeTab === 'deposit' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Deposit YAKA Tokens</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Amount (YAKA)
                          </label>
                          <input
                            type="number"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        {/* Approval and deposit buttons */}
                        {depositAmount && yakaAllowance !== undefined && parseEther(depositAmount) > yakaAllowance ? (
                          <button
                            onClick={handleApproveYaka}
                            disabled={!depositAmount || !depositsEnabled || isApproving || isWritePending || isConfirming}
                            className="w-full py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {isApproving || isWritePending || isConfirming ? 'Processing...' : `Approve ${depositAmount} YAKA`}
                          </button>
                        ) : (
                          <button
                            onClick={handleDeposit}
                            disabled={!depositAmount || !depositsEnabled || isWritePending || isConfirming || Boolean(yakaBalance && parseEther(depositAmount) > yakaBalance)}
                            className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {isWritePending || isConfirming ? 'Processing...' : 'Deposit YAKA'}
                          </button>
                        )}
                        
                        {/* Balance and allowance info */}
                        <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                          <div className="flex justify-between">
                            <span>Your YAKA Balance:</span>
                            <span>{yakaBalance ? formatEther(yakaBalance) : '0'} YAKA</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Current Allowance:</span>
                            <div className="flex items-center space-x-2">
                              <span>{yakaAllowance ? formatEther(yakaAllowance) : '0'} YAKA</span>
                              <button
                                onClick={() => refetchYakaAllowance()}
                                className="text-purple-400 hover:text-purple-300 text-xs"
                                title="Refresh allowance"
                              >
                                ↻
                              </button>
                            </div>
                          </div>
                          {depositAmount && vaultInfo && vaultInfo[0] > BigInt(0) && (
                            <div className="flex justify-between pt-2 border-t border-gray-600 mt-2">
                              <span>You will receive:</span>
                              <span>~{formatEther((parseEther(depositAmount) * vaultInfo[0]) / vaultInfo[1])} lyYAKA</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Deposit veYAKA NFT</h3>
                      <div className="space-y-4">
                        {loadingNFTs ? (
                          <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-400 border-t-transparent"></div>
                            <span className="ml-2 text-gray-300">Loading your NFTs...</span>
                          </div>
                        ) : userNFTs.length > 0 ? (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Select Your veYAKA NFT
                            </label>
                            <select
                              value={nftId}
                              onChange={(e) => setNftId(e.target.value)}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            >
                              <option value="">Select an NFT...</option>
                              {userNFTs.map((nft) => (
                                <option key={nft.id} value={nft.id}>
                                  NFT #{nft.id} - {Number(nft.balance).toFixed(2)} YAKA (expires {nft.endTime})
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-400">No veYAKA NFTs found in your wallet</p>
                            <p className="text-gray-500 text-sm mt-1">You need veYAKA NFTs to use this option</p>
                          </div>
                        )}
                        
                        {userNFTs.length > 0 && (
                          <>
                            {/* NFT Approval and deposit buttons */}
                            {nftId && nftApproved?.toLowerCase() !== VEYAKA_CONTRACT_ADDRESS.toLowerCase() ? (
                              <button
                                onClick={handleApproveNFT}
                                disabled={!nftId || !depositsEnabled || isApproving || isWritePending || isConfirming}
                                className="w-full py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                {isApproving || isWritePending || isConfirming ? 'Processing...' : `Approve NFT #${nftId}`}
                              </button>
                            ) : (
                              <button
                                onClick={handleDepositNFT}
                                disabled={!nftId || !depositsEnabled || isWritePending || isConfirming}
                                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                {isWritePending || isConfirming ? 'Processing...' : 'Deposit NFT'}
                              </button>
                            )}

                            {/* NFT approval info */}
                            {nftId && (
                              <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                                <div className="flex justify-between items-center">
                                  <span>NFT #{nftId} Approved:</span>
                                  <div className="flex items-center space-x-2">
                                    <span>{nftApproved?.toLowerCase() === VEYAKA_CONTRACT_ADDRESS.toLowerCase() ? 'Yes' : 'No'}</span>
                                    <button
                                      onClick={() => refetchNftApproval()}
                                      className="text-purple-400 hover:text-purple-300 text-xs"
                                      title="Refresh approval"
                                    >
                                      ↻
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <button
                              onClick={fetchUserNFTs}
                              disabled={loadingNFTs}
                              className="w-full py-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
                            >
                              {loadingNFTs ? 'Refreshing...' : '↻ Refresh NFT List'}
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {!depositsEnabled && (
                      <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                        <p className="text-yellow-400">⚠️ Deposits are currently disabled by contract owner</p>
                        <p className="text-yellow-300/70 text-sm mt-2">
                          Contract status: depositsEnabled = {depositsEnabled ? 'true' : 'false'}
                        </p>
                      </div>
                    )}
                    
                    {/* Debug info */}
                    <div className="bg-gray-700 rounded-lg p-3 text-xs text-gray-300">
                      <div className="font-mono mb-2">Debug Info:</div>
                      <div>Deposits Enabled: {String(depositsEnabled)}</div>
                      <div>Withdrawals Enabled: {String(withdrawalsEnabled)}</div>
                      <div>Contract Address: {VEYAKA_CONTRACT_ADDRESS}</div>
                      <div>Is Connected: {String(isConnected)}</div>
                      <div>User Address: {address || 'Not connected'}</div>
                      {depositsError && <div className="text-red-400">Deposits Error: {depositsError.message}</div>}
                      {withdrawalsError && <div className="text-red-400">Withdrawals Error: {withdrawalsError.message}</div>}
                      {vaultInfoError && <div className="text-red-400">Vault Info Error: {vaultInfoError.message}</div>}
                    </div>
                  </div>
                )}

                {/* Withdraw Tab */}
                {activeTab === 'withdraw' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Withdraw as NFT</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Amount (lyYAKA)
                          </label>
                          <input
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div className="bg-gray-700 rounded-lg p-3">
                          <p className="text-sm text-gray-300">
                            Minimum withdrawal: {minimumWithdrawal ? formatEther(minimumWithdrawal) : '1'} YAKA
                          </p>
                          <p className="text-sm text-gray-300">
                            You will receive: ~{withdrawAmount && vaultInfo ? 
                              formatEther((parseEther(withdrawAmount) * vaultInfo[3]) / parseEther('1')) : '0'} YAKA as NFT
                          </p>
                        </div>
                        {/* Approval and withdraw buttons */}
                        {withdrawAmount && lyYakaAllowance !== undefined && parseEther(withdrawAmount) > lyYakaAllowance ? (
                          <button
                            onClick={handleApproveLyYaka}
                            disabled={!withdrawAmount || !withdrawalsEnabled || isApproving || isWritePending || isConfirming}
                            className="w-full py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {isApproving || isWritePending || isConfirming ? 'Processing...' : `Approve ${withdrawAmount} lyYAKA`}
                          </button>
                        ) : (
                          <button
                            onClick={handleWithdraw}
                            disabled={!withdrawAmount || !withdrawalsEnabled || isWritePending || isConfirming || Boolean(liquidTokenBalance && parseEther(withdrawAmount) > liquidTokenBalance)}
                            className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {isWritePending || isConfirming ? 'Processing...' : 'Withdraw as NFT'}
                          </button>
                        )}
                        
                        {/* lyYAKA Balance and allowance info */}
                        <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                          <div className="flex justify-between">
                            <span>Your lyYAKA Balance:</span>
                            <span>{liquidTokenBalance ? formatEther(liquidTokenBalance) : '0'} lyYAKA</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Current Allowance:</span>
                            <div className="flex items-center space-x-2">
                              <span>{lyYakaAllowance ? formatEther(lyYakaAllowance) : '0'} lyYAKA</span>
                              <button
                                onClick={() => refetchLyYakaAllowance()}
                                className="text-purple-400 hover:text-purple-300 text-xs"
                                title="Refresh allowance"
                              >
                                ↻
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!withdrawalsEnabled && (
                      <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                        <p className="text-yellow-400">⚠️ Withdrawals are currently disabled by contract owner</p>
                        <p className="text-yellow-300/70 text-sm mt-2">
                          Contact the protocol team to enable withdrawals
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Info Tab */}
                {activeTab === 'info' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">About VeYAKA Vault</h3>
                      <div className="space-y-4 text-gray-300">
                        <p>
                          The VeYAKA Vault allows you to deposit YAKA tokens or veYAKA NFTs in exchange for 
                          liquid lyYAKA tokens. This provides:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Liquidity for your locked YAKA positions</li>
                          <li>Continued exposure to YAKA governance rewards</li>
                          <li>Ability to trade your position without unlocking</li>
                          <li>Automatic lock extension and optimization</li>
                        </ul>
                        
                        <div className="bg-gray-700 rounded-lg p-4 mt-6">
                          <h4 className="font-semibold text-white mb-2">Contract Addresses</h4>
                          <div className="space-y-1 text-sm font-mono break-all">
                            <p><span className="text-gray-400">VeYAKA Vault:</span> {VEYAKA_CONTRACT_ADDRESS}</p>
                            <p><span className="text-gray-400">YAKA Token:</span> {YAKA_TOKEN_ADDRESS}</p>
                            <p><span className="text-gray-400">Voting Escrow:</span> 0x86a247Ef0Fc244565BCab93936E867407ac81580</p>
                            <p><span className="text-gray-400">Voter:</span> 0x36068f15f257896E03fb7EdbA3D18898d0ade809</p>
                            <p><span className="text-gray-400">Liquid Token:</span> 0xFEEc14a2E30999A84fF4D5750ffb6D3AEc681E79</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Transaction Status */}
                {(isWritePending || isConfirming || isConfirmed || writeError) && (
                  <div className="mt-6 p-4 rounded-lg border">
                    {isWritePending && (
                      <div className="flex items-center space-x-2 text-yellow-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-400 border-t-transparent"></div>
                        <span>Waiting for wallet confirmation...</span>
                      </div>
                    )}
                    {isConfirming && (
                      <div className="flex items-center space-x-2 text-blue-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                        <span>Transaction confirming...</span>
                      </div>
                    )}
                    {isConfirmed && (
                      <div className="text-green-400">
                        ✅ Transaction confirmed!
                      </div>
                    )}
                    {writeError && (
                      <div className="text-red-400">
                        ❌ Error: {writeError.message}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}