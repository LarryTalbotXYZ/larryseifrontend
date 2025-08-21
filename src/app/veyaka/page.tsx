'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther, formatUnits, createPublicClient, http } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import VeYakaABI from './abi.json';

const VEYAKA_CONTRACT_ADDRESS = '0xa206090C1A07518E977B0942023ca190314b8934' as const;
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

  // Read Liquid YAKA (LYT) token allowance
  const { data: lytAllowance, refetch: refetchLytAllowance } = useReadContract({
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
      refetchLytAllowance();
      refetchNftApproval();
      // Small delay to ensure blockchain state is updated
      setTimeout(() => {
        refetchYakaAllowance();
        refetchLytAllowance();
        refetchNftApproval();
      }, 2000);
    }
  }, [isConfirmed, refetchYakaAllowance, refetchLytAllowance, refetchNftApproval]);

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

  // Handle Liquid YAKA (LYT) token approval for withdrawals
  const handleApproveLyt = async () => {
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
      console.error('LYT approval error:', error);
    } finally {
      setIsApproving(false);
    }
  };

  // Handle NFT approval
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

  // Handle YAKA deposit
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

  // Handle withdrawal
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
      console.error('Withdrawal error:', error);
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#1a1a2e_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_#16213e_0%,_transparent_50%),radial-gradient(circle_at_40%_40%,_#0f3460_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-12 border-b border-gray-800">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🏛️</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">VeYAKA</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Trading</Link>
            <span className="text-purple-400 font-medium">Liquid Staking</span>
          </div>
        </div>
        
        <ConnectButton />
      </nav>

      <main className="relative z-10">
        {/* Header Section */}
        <section className="px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Liquid </span>
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Staking</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Convert locked veYAKA positions into liquid tokens while maintaining full voting power and rewards
              </p>
            </div>

            {/* Alpha Notice */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-yellow-300 text-sm">
                    Alpha version - Report issues to 
                    <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-yellow-200 hover:text-yellow-100 underline ml-1">
                      t.me/btbfinance
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {!isConnected ? (
          <section className="px-6 lg:px-12 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-12">
                <svg className="w-16 h-16 text-purple-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-2xl font-bold text-white mb-4">Connect Wallet</h2>
                <p className="text-gray-400 mb-8">Connect your wallet to access the VeYAKA liquid staking vault</p>
                <ConnectButton />
              </div>
            </div>
          </section>
        ) : (
          <section className="px-6 lg:px-12 pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Left Sidebar - Stats */}
                <div className="space-y-6">
                  {/* Vault Statistics */}
                  <div className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      Vault Stats
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-gray-800/50">
                        <span className="text-gray-400 text-sm">Total LYT Supply</span>
                        <span className="text-white font-medium text-sm">
                          {vaultInfo ? parseFloat(formatEther(vaultInfo[0])).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-800/50">
                        <span className="text-gray-400 text-sm">Total YAKA Locked</span>
                        <span className="text-white font-medium text-sm">
                          {vaultInfo ? parseFloat(formatEther(vaultInfo[1])).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-800/50">
                        <span className="text-gray-400 text-sm">Voting Power</span>
                        <span className="text-white font-medium text-sm">
                          {vaultInfo ? parseFloat(formatEther(vaultInfo[2])).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-400 text-sm">Price per LYT</span>
                        <span className="text-white font-medium text-sm">
                          {vaultInfo ? parseFloat(formatUnits(vaultInfo[3], 18)).toFixed(4) : '1.0000'} YAKA
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Your Holdings */}
                  <div className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      Your Holdings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-gray-800/50">
                        <span className="text-gray-400 text-sm">YAKA Balance</span>
                        <span className="text-white font-medium text-sm">
                          {yakaBalance ? parseFloat(formatEther(yakaBalance)).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-800/50">
                        <span className="text-gray-400 text-sm">Liquid YAKA (LYT)</span>
                        <span className="text-white font-medium text-sm">
                          {liquidTokenBalance ? parseFloat(formatEther(liquidTokenBalance)).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-800/50">
                        <span className="text-gray-400 text-sm">YAKA Value</span>
                        <span className="text-white font-medium text-sm">
                          {liquidTokenBalance && vaultInfo ? 
                            parseFloat(formatEther((liquidTokenBalance * vaultInfo[3]) / parseEther('1'))).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-400 text-sm">veYAKA NFTs</span>
                        <span className="text-white font-medium text-sm">
                          {nftBalance ? Number(nftBalance) : 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Main NFT Info */}
                  {mainNFTInfo && mainNFTInfo[0] > BigInt(0) && (
                    <div className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        Main NFT
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between py-2 border-b border-gray-800/50">
                          <span className="text-gray-400 text-sm">NFT ID</span>
                          <span className="text-white font-medium text-sm">#{mainNFTInfo[0].toString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800/50">
                          <span className="text-gray-400 text-sm">Locked Amount</span>
                          <span className="text-white font-medium text-sm">
                            {parseFloat(formatEther(mainNFTInfo[1])).toFixed(2)} YAKA
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800/50">
                          <span className="text-gray-400 text-sm">Time Left</span>
                          <span className="text-white font-medium text-sm">
                            {formatTimeLeft(mainNFTInfo[3])}
                          </span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-400 text-sm">Voting Power</span>
                          <span className="text-white font-medium text-sm">
                            {parseFloat(formatEther(mainNFTInfo[4])).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Interface */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-800">
                      {[
                        { id: 'deposit', label: 'Deposit', icon: '⬇️' },
                        { id: 'withdraw', label: 'Withdraw', icon: '⬆️' },
                        { id: 'info', label: 'Info', icon: 'ℹ️' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                            activeTab === tab.id
                              ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-500/10'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <span className="mr-2">{tab.icon}</span>
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="p-8">
                      {/* Deposit Tab */}
                      {activeTab === 'deposit' && (
                        <div className="space-y-8">
                          {/* YAKA Deposit */}
                          <div>
                            <h3 className="text-xl font-bold text-white mb-6">Deposit YAKA Tokens</h3>
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
                                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                              </div>
                              
                              {depositAmount && yakaAllowance !== undefined && parseEther(depositAmount) > yakaAllowance ? (
                                <button
                                  onClick={handleApproveYaka}
                                  disabled={!depositAmount || !depositsEnabled || isApproving || isWritePending || isConfirming}
                                  className="w-full py-3 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  {isApproving || isWritePending || isConfirming ? 'Processing...' : `Approve ${depositAmount} YAKA`}
                                </button>
                              ) : (
                                <button
                                  onClick={handleDeposit}
                                  disabled={!depositAmount || !depositsEnabled || isWritePending || isConfirming || Boolean(yakaBalance && parseEther(depositAmount) > yakaBalance)}
                                  className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  {isWritePending || isConfirming ? 'Processing...' : 'Deposit YAKA'}
                                </button>
                              )}
                              
                              <div className="bg-gray-800/50 rounded-xl p-4 text-sm">
                                <div className="flex justify-between mb-2">
                                  <span className="text-gray-400">Your YAKA Balance:</span>
                                  <span className="text-white">{yakaBalance ? parseFloat(formatEther(yakaBalance)).toFixed(2) : '0'} YAKA</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="text-gray-400">Current Allowance:</span>
                                  <span className="text-white">{yakaAllowance ? parseFloat(formatEther(yakaAllowance)).toFixed(2) : '0'} YAKA</span>
                                </div>
                                {depositAmount && vaultInfo && vaultInfo[0] > BigInt(0) && (
                                  <div className="flex justify-between pt-2 border-t border-gray-700">
                                    <span className="text-gray-400">You will receive:</span>
                                    <span className="text-purple-400">~{parseFloat(formatEther((parseEther(depositAmount) * vaultInfo[0]) / vaultInfo[1])).toFixed(4)} LYT</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* NFT Deposit */}
                          <div className="border-t border-gray-800 pt-8">
                            <h3 className="text-xl font-bold text-white mb-6">Deposit veYAKA NFT</h3>
                            <div className="space-y-4">
                              {loadingNFTs ? (
                                <div className="flex items-center justify-center py-8">
                                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-400 border-t-transparent"></div>
                                  <span className="ml-3 text-gray-300">Loading your NFTs...</span>
                                </div>
                              ) : userNFTs.length > 0 ? (
                                <>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Select Your veYAKA NFT
                                    </label>
                                    <select
                                      value={nftId}
                                      onChange={(e) => setNftId(e.target.value)}
                                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    >
                                      <option value="">Select an NFT...</option>
                                      {userNFTs.map((nft) => (
                                        <option key={nft.id} value={nft.id}>
                                          NFT #{nft.id} - {Number(nft.balance).toFixed(2)} YAKA (expires {nft.endTime})
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  
                                  {nftId && nftApproved?.toLowerCase() !== VEYAKA_CONTRACT_ADDRESS.toLowerCase() ? (
                                    <button
                                      onClick={handleApproveNFT}
                                      disabled={!nftId || !depositsEnabled || isApproving || isWritePending || isConfirming}
                                      className="w-full py-3 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      {isApproving || isWritePending || isConfirming ? 'Processing...' : `Approve NFT #${nftId}`}
                                    </button>
                                  ) : nftId ? (
                                    <button
                                      onClick={handleDepositNFT}
                                      disabled={!nftId || !depositsEnabled || isWritePending || isConfirming}
                                      className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      {isWritePending || isConfirming ? 'Processing...' : 'Deposit NFT'}
                                    </button>
                                  ) : null}
                                </>
                              ) : (
                                <div className="text-center py-8">
                                  <p className="text-gray-400">No veYAKA NFTs found in your wallet</p>
                                  <p className="text-gray-500 text-sm mt-1">You need veYAKA NFTs to use this option</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {!depositsEnabled && (
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                              <p className="text-yellow-400">⚠️ Deposits are currently disabled by contract owner</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Withdraw Tab */}
                      {activeTab === 'withdraw' && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-bold text-white">Withdraw as NFT</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Amount (Liquid YAKA)
                              </label>
                              <input
                                type="number"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                placeholder="0.0"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                              />
                            </div>
                            
                            {withdrawAmount && lytAllowance !== undefined && parseEther(withdrawAmount) > lytAllowance ? (
                              <button
                                onClick={handleApproveLyt}
                                disabled={!withdrawAmount || !withdrawalsEnabled || isApproving || isWritePending || isConfirming}
                                className="w-full py-3 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                {isApproving || isWritePending || isConfirming ? 'Processing...' : `Approve ${withdrawAmount} LYT`}
                              </button>
                            ) : (
                              <button
                                onClick={handleWithdraw}
                                disabled={!withdrawAmount || !withdrawalsEnabled || isWritePending || isConfirming || Boolean(liquidTokenBalance && parseEther(withdrawAmount) > liquidTokenBalance)}
                                className="w-full py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                {isWritePending || isConfirming ? 'Processing...' : 'Withdraw as NFT'}
                              </button>
                            )}
                            
                            <div className="bg-gray-800/50 rounded-xl p-4 text-sm">
                              <div className="flex justify-between mb-2">
                                <span className="text-gray-400">Your LYT Balance:</span>
                                <span className="text-white">{liquidTokenBalance ? parseFloat(formatEther(liquidTokenBalance)).toFixed(2) : '0'} LYT</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-gray-400">Minimum withdrawal:</span>
                                <span className="text-white">{minimumWithdrawal ? parseFloat(formatEther(minimumWithdrawal)).toFixed(2) : '1'} YAKA</span>
                              </div>
                              {withdrawAmount && vaultInfo && (
                                <div className="flex justify-between pt-2 border-t border-gray-700">
                                  <span className="text-gray-400">You will receive:</span>
                                  <span className="text-red-400">~{parseFloat(formatEther((parseEther(withdrawAmount) * vaultInfo[3]) / parseEther('1'))).toFixed(4)} YAKA as NFT</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {!withdrawalsEnabled && (
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                              <p className="text-yellow-400">⚠️ Withdrawals are currently disabled</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Info Tab */}
                      {activeTab === 'info' && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-6">How VeYAKA Liquid Staking Works</h3>
                            
                            {/* Process Flow */}
                            <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
                              <h4 className="text-lg font-semibold text-purple-400 mb-6">🔄 The Process</h4>
                              <div className="space-y-6">
                                {[
                                  {
                                    step: '1',
                                    title: 'Deposit YAKA or veYAKA NFTs',
                                    desc: 'Your tokens get locked in the vault for 2 years (max voting power)'
                                  },
                                  {
                                    step: '2', 
                                    title: 'Receive Liquid YAKA (LYT) Tokens',
                                    desc: 'Get liquid tokens representing your locked position - tradeable anytime!'
                                  },
                                  {
                                    step: '3',
                                    title: 'Vault Auto-Manages Everything', 
                                    desc: 'Contract automatically votes, claims fees, and compounds rewards'
                                  }
                                ].map((item) => (
                                  <div key={item.step} className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                      {item.step}
                                    </div>
                                    <div>
                                      <p className="font-medium text-white mb-1">{item.title}</p>
                                      <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Benefits */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                                <h4 className="font-semibold text-red-400 mb-4">❌ Before Liquid Staking</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                  <li>• veYAKA NFTs locked for months/years</li>
                                  <li>• No way to sell locked positions</li>
                                  <li>• Manual voting every epoch</li>
                                  <li>• Manual fee claiming required</li>
                                  <li>• No liquidity for emergencies</li>
                                </ul>
                              </div>
                              
                              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                                <h4 className="font-semibold text-green-400 mb-4">✅ With Liquid Staking</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                  <li>• LYT tokens are fully liquid & tradeable</li>
                                  <li>• Sell your position anytime on DEXs</li>
                                  <li>• Automated voting for maximum rewards</li>
                                  <li>• Automatic fee claiming & compounding</li>
                                  <li>• Instant liquidity when needed</li>
                                </ul>
                              </div>
                            </div>

                            {/* Contract Addresses */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                              <h4 className="font-semibold text-white mb-4">📋 Contract Addresses</h4>
                              <div className="space-y-2 text-xs font-mono text-gray-300">
                                <div className="flex justify-between">
                                  <span>VeYAKA Vault:</span>
                                  <span className="text-purple-400">{VEYAKA_CONTRACT_ADDRESS}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>YAKA Token:</span>
                                  <span className="text-purple-400">{YAKA_TOKEN_ADDRESS}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Voting Escrow:</span>
                                  <span className="text-purple-400">0x86a247Ef0Fc244565BCab93936E867407ac81580</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Liquid Token:</span>
                                  <span className="text-purple-400">0xFEEc14a2E30999A84fF4D5750ffb6D3AEc681E79</span>
                                </div>
                              </div>
                            </div>

                            {/* Warning */}
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                              <h4 className="font-semibold text-yellow-400 mb-3">⚠️ Important Notes</h4>
                              <ul className="space-y-1 text-sm text-gray-300">
                                <li>• Liquid YAKA (LYT) price may differ from underlying YAKA value</li>
                                <li>• Withdrawals return veYAKA NFTs (still locked until expiry)</li>
                                <li>• Smart contract risks apply - only deposit what you can afford</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Transaction Status */}
                      {(isWritePending || isConfirming || isConfirmed || writeError) && (
                        <div className="mt-6 p-4 rounded-xl border">
                          {isWritePending && (
                            <div className="flex items-center space-x-3 text-yellow-400">
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-yellow-400 border-t-transparent"></div>
                              <span>Waiting for wallet confirmation...</span>
                            </div>
                          )}
                          {isConfirming && (
                            <div className="flex items-center space-x-3 text-blue-400">
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
                              <span>Transaction confirming...</span>
                            </div>
                          )}
                          {isConfirmed && (
                            <div className="text-green-400 flex items-center space-x-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Transaction confirmed!</span>
                            </div>
                          )}
                          {writeError && (
                            <div className="text-red-400 flex items-center space-x-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span>Error: {writeError.message}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">🏛️</span>
              </div>
              <span className="text-gray-400">© 2024 VeYAKA Protocol</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://x.com/btb_finance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}