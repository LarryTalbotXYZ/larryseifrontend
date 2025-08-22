'use client';

import { useState, useEffect, useCallback } from 'react';
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

// Mathematical symbols for visual elements
const MATH_SYMBOLS = ['∑', '∫', '∂', '∇', '∞', '∮', '∯', '∱', '∲', '∴', '∵', '⊥', '∥', '∦', '≅', '≈', '≠', '≤', '≥', '⊂', '⊃', '⊆', '⊇', '∈', '∉', '∋', '∌', '⊕', '⊗', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '∧', '∨', '¬', '∀', '∃', '∄', '∅', '∆', '∇', '∈', '∉', '∋', '∌', '⊂', '⊃', '⊄', '⊅', '⊆', '⊇', '⊈', '⊉', '⊊', '⊋', '∩', '∪', '∧', '∨', '∩', '∪', '∧', '∨', '∩', '∪'];

export default function VeYakaPage() {
  const { address, isConnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [nftId, setNftId] = useState('');
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'info'>('deposit');
  const [isApproving, setIsApproving] = useState(false);
  const [userNFTs, setUserNFTs] = useState<{id: string, balance: string, endTime: string}[]>([]);
  const [loadingNFTs, setLoadingNFTs] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Contract write hooks
  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract();
  
  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read contract data with error handling
  const { data: vaultInfo } = useReadContract({
    address: VEYAKA_CONTRACT_ADDRESS,
    abi: VeYakaABI,
    functionName: 'getVaultInfo',
  }) as { data: [bigint, bigint, bigint, bigint, bigint] | undefined };

  const { data: mainNFTInfo } = useReadContract({
    address: VEYAKA_CONTRACT_ADDRESS,
    abi: VeYakaABI,
    functionName: 'getMainNFTLockInfo',
  }) as { data: [bigint, bigint, bigint, bigint, bigint] | undefined };

  const { data: depositsEnabled } = useReadContract({
    address: VEYAKA_CONTRACT_ADDRESS,
    abi: VeYakaABI,
    functionName: 'depositsEnabled',
  }) as { data: boolean | undefined };

  const { data: withdrawalsEnabled } = useReadContract({
    address: VEYAKA_CONTRACT_ADDRESS,
    abi: VeYakaABI,
    functionName: 'withdrawalsEnabled',
  }) as { data: boolean | undefined };

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
  const fetchUserNFTs = useCallback(async () => {
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
  }, [address, nftBalance]);

  // Fetch NFTs when address or nftBalance changes
  useEffect(() => {
    fetchUserNFTs();
  }, [address, nftBalance, fetchUserNFTs]);

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
    <div className={`min-h-screen bg-black text-white overflow-hidden ${glitchActive ? 'animate-pulse' : ''}`}>
      {/* Cyberpunk Matrix Background */}
      <div className="fixed inset-0 z-0">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Scan lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{animationDuration: '3s', animationIterationCount: 'infinite'}}></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" style={{animationDelay: '1s', animationDuration: '4s', animationIterationCount: 'infinite'}}></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" style={{animationDelay: '2s', animationDuration: '3.5s', animationIterationCount: 'infinite'}}></div>
        </div>

        {/* Mathematical symbols floating */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-lg animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            >
              {MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)]}
            </div>
          ))}
        </div>

        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>

        {/* Radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_#1a0033_0%,_transparent_50%),radial-gradient(circle_at_70%_80%,_#330033_0%,_transparent_50%),radial-gradient(circle_at_50%_50%,_#000033_0%,_transparent_50%)]"></div>
      </div>

      {/* Cyberpunk Header */}
      <nav className="relative z-10 border-b border-purple-500/30 bg-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center p-6 lg:px-12">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="text-white font-mono text-xl font-bold relative z-10">∑</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight font-mono text-white">VeYAKA</span>
                <span className="text-xs font-mono text-purple-400">LIQUID_STAKING_PROTOCOL</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">HOME.exe</Link>
              <Link href="/docs" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">DOCS.exe</Link>
              <Link href="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors font-mono text-sm">TRADING.λ</Link>
              <span className="text-purple-400 font-mono font-medium text-sm">[ACTIVE_PROTOCOL]</span>
            </div>
          </div>

          <ConnectButton />
        </div>
      </nav>

      <main className="relative z-10">
        {/* Cyberpunk Protocol Header */}
        <section className="px-6 lg:px-12 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg px-6 py-2 border border-purple-500/30 mb-6">
                <span className="text-purple-400 font-mono text-sm mr-2">PROTOCOL::</span>
                <span className="text-white font-mono">LIQUID_STAKING_ENGINE</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold font-mono mb-6">
                <span className="text-white">LIQUID_</span>
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  STAKING_MATRIX
                </span>
              </h1>
              <p className="text-xl text-gray-300 font-mono max-w-3xl mx-auto">
                <span className="text-green-400">∇</span> Transform locked veYAKA positions into liquid tokens while preserving voting power through mathematical algorithms
              </p>
            </div>

            {/* Protocol Status Terminal */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-md border border-red-500/30 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  <span className="text-red-400 font-mono font-bold text-lg">⚠</span>
                  <div className="text-center">
                    <p className="text-red-300 font-mono text-sm font-bold">
                      ALPHA_PROTOCOL::MATHEMATICAL_ENGINE
                    </p>
                    <p className="text-gray-300 font-mono text-xs mt-1">
                      Report anomalies to
                      <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 underline ml-1">
                        TELEGRAM_CHANNEL
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {!isConnected ? (
          <section className="px-6 lg:px-12 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg px-4 py-2 border border-red-500/30 mb-6">
                    <span className="text-red-400 font-mono text-sm mr-2">ACCESS::</span>
                    <span className="text-white font-mono">DENIED</span>
                  </div>

                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-mono text-2xl font-bold">🔐</span>
                  </div>

                  <h2 className="text-2xl font-mono font-bold text-red-400 mb-4">WALLET_CONNECTION_REQUIRED</h2>
                  <p className="text-gray-300 font-mono text-sm mb-8">
                    Initialize blockchain connection to execute liquid staking mathematical algorithms and access the vault protocol.
                  </p>
                  <ConnectButton />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="px-6 lg:px-12 pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Sidebar - Protocol Analytics */}
                <div className="space-y-6">
                  {/* Vault Statistics Terminal */}
                  <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6 border-b border-purple-500/30 pb-2">
                        <span className="text-purple-400 font-mono font-bold text-lg mr-2">λ</span>
                        <h3 className="text-purple-400 font-mono font-bold text-sm">VAULT_ANALYTICS_ENGINE</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-purple-500/20">
                          <span className="text-purple-300 font-mono text-xs">TOTAL_LYT_SUPPLY</span>
                          <span className="text-green-400 font-mono font-bold text-sm">
                            {vaultInfo ? parseFloat(formatEther(vaultInfo[0])).toFixed(2) : '0'}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-purple-500/20">
                          <span className="text-purple-300 font-mono text-xs">TOTAL_YAKA_LOCKED</span>
                          <span className="text-blue-400 font-mono font-bold text-sm">
                            {vaultInfo ? parseFloat(formatEther(vaultInfo[1])).toFixed(2) : '0'}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-purple-500/20">
                          <span className="text-purple-300 font-mono text-xs">VOTING_POWER</span>
                          <span className="text-pink-400 font-mono font-bold text-sm">
                            {vaultInfo ? parseFloat(formatEther(vaultInfo[2])).toFixed(2) : '0'}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-purple-300 font-mono text-xs">PRICE_PER_LYT</span>
                          <span className="text-yellow-400 font-mono font-bold text-sm">
                            {vaultInfo ? parseFloat(formatUnits(vaultInfo[3], 18)).toFixed(4) : '1.0000'} YAKA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>

                  {/* Digital Asset Portfolio */}
                  <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-md border border-green-500/30 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6 border-b border-green-500/30 pb-2">
                        <span className="text-green-400 font-mono font-bold text-lg mr-2">∂</span>
                        <h3 className="text-green-400 font-mono font-bold text-sm">DIGITAL_ASSET_PORTFOLIO</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-green-500/20">
                          <span className="text-green-300 font-mono text-xs">YAKA_BALANCE</span>
                          <span className="text-white font-mono font-bold text-sm">
                            {yakaBalance ? parseFloat(formatEther(yakaBalance)).toFixed(2) : '0'}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-green-500/20">
                          <span className="text-green-300 font-mono text-xs">LIQUID_YAKA_LYT</span>
                          <span className="text-blue-400 font-mono font-bold text-sm">
                            {liquidTokenBalance ? parseFloat(formatEther(liquidTokenBalance)).toFixed(2) : '0'}
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-green-500/20">
                          <span className="text-green-300 font-mono text-xs">YAKA_VALUE</span>
                          <span className="text-purple-400 font-mono font-bold text-sm">
                            {liquidTokenBalance && vaultInfo ?
                              parseFloat(formatEther((liquidTokenBalance * vaultInfo[3]) / parseEther('1'))).toFixed(2) : '0'}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-green-300 font-mono text-xs">VEYAKA_NFTS</span>
                          <span className="text-yellow-400 font-mono font-bold text-sm">
                            {nftBalance ? Number(nftBalance) : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary NFT Lock Terminal */}
                  {mainNFTInfo && mainNFTInfo[0] > BigInt(0) && (
                    <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/30 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                      <div className="relative z-10">
                        <div className="flex items-center mb-6 border-b border-blue-500/30 pb-2">
                          <span className="text-blue-400 font-mono font-bold text-lg mr-2">∞</span>
                          <h3 className="text-blue-400 font-mono font-bold text-sm">PRIMARY_NFT_LOCK_TERMINAL</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between py-3 border-b border-blue-500/20">
                            <span className="text-blue-300 font-mono text-xs">NFT_ID</span>
                            <span className="text-cyan-400 font-mono font-bold text-sm">#{mainNFTInfo[0].toString()}</span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-blue-500/20">
                            <span className="text-blue-300 font-mono text-xs">LOCKED_AMOUNT</span>
                            <span className="text-purple-400 font-mono font-bold text-sm">
                              {parseFloat(formatEther(mainNFTInfo[1])).toFixed(2)} YAKA
                            </span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-blue-500/20">
                            <span className="text-blue-300 font-mono text-xs">TIME_REMAINING</span>
                            <span className="text-red-400 font-mono font-bold text-sm">
                              {formatTimeLeft(mainNFTInfo[3])}
                            </span>
                          </div>
                          <div className="flex justify-between py-3">
                            <span className="text-blue-300 font-mono text-xs">VOTING_POWER</span>
                            <span className="text-yellow-400 font-mono font-bold text-sm">
                              {parseFloat(formatEther(mainNFTInfo[4])).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Liquid Staking Control Matrix */}
                <div className="lg:col-span-2">
                  <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>

                    {/* Protocol Tabs */}
                    <div className="flex border-b border-red-500/30 relative z-10">
                      {[
                        { id: 'deposit', label: 'DEPOSIT_PROTOCOL', icon: '↓', color: 'purple' },
                        { id: 'withdraw', label: 'WITHDRAW_ENGINE', icon: '↑', color: 'blue' },
                        { id: 'info', label: 'MATHEMATICAL_ANALYSIS', icon: 'λ', color: 'green' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as 'deposit' | 'withdraw' | 'info')}
                          className={`flex-1 py-4 px-6 font-mono font-bold text-sm transition-all duration-300 relative ${
                            activeTab === tab.id
                              ? `text-${tab.color}-400 border-b-2 border-${tab.color}-400 bg-${tab.color}-500/10`
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <span className="mr-2">{tab.icon}</span>
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="p-8 relative z-10">
                      {/* Deposit Protocol */}
                      {activeTab === 'deposit' && (
                        <div className="space-y-8">
                          {/* YAKA Deposit Terminal */}
                          <div>
                            <div className="flex items-center mb-6 border-b border-purple-500/30 pb-2">
                              <span className="text-purple-400 font-mono font-bold text-lg mr-2">∑</span>
                              <h3 className="text-purple-400 font-mono font-bold text-sm">YAKA_DEPOSIT_PROTOCOL</h3>
                            </div>
                            <div className="space-y-6">
                              <div>
                                <label className="block text-purple-300 font-mono text-xs mb-3">
                                  AMOUNT::YAKA_TOKENS
                                </label>
                                <div className="relative">
                                  <input
                                    type="number"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    placeholder="0.0"
                                    className="w-full px-4 py-3 pr-20 bg-black/50 border border-purple-500/30 rounded-lg text-white font-mono placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all duration-300"
                                  />
                                  <button
                                    onClick={() => yakaBalance && setDepositAmount(formatEther(yakaBalance))}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-mono font-bold rounded-lg transition-all duration-300 border border-purple-400/30"
                                  >
                                    MAX_EXECUTE
                                  </button>
                                </div>
                              </div>

                              {depositAmount && yakaAllowance !== undefined && parseEther(depositAmount) > yakaAllowance ? (
                                <button
                                  onClick={handleApproveYaka}
                                  disabled={!depositAmount || !depositsEnabled || isApproving || isWritePending || isConfirming}
                                  className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-mono font-bold rounded-lg border border-yellow-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                                  <span className="relative z-10">
                                    {isApproving || isWritePending || isConfirming ? 'PROCESSING...' : `APPROVE::${depositAmount}_YAKA`}
                                  </span>
                                </button>
                              ) : (
                                <button
                                  onClick={handleDeposit}
                                  disabled={!depositAmount || !depositsEnabled || isWritePending || isConfirming || Boolean(yakaBalance && parseEther(depositAmount) > yakaBalance)}
                                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono font-bold rounded-lg border border-purple-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                                  <span className="relative z-10">
                                    {isWritePending || isConfirming ? 'PROCESSING...' : 'EXECUTE_DEPOSIT'}
                                  </span>
                                </button>
                              )}
                              
                              <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 font-mono text-xs">
                                <div className="flex justify-between mb-3 border-b border-purple-500/20 pb-2">
                                  <span className="text-purple-300">YAKA_BALANCE::</span>
                                  <span className="text-green-400 font-bold">{yakaBalance ? parseFloat(formatEther(yakaBalance)).toFixed(2) : '0'} YAKA</span>
                                </div>
                                <div className="flex justify-between mb-3 border-b border-purple-500/20 pb-2">
                                  <span className="text-purple-300">CURRENT_ALLOWANCE::</span>
                                  <span className="text-blue-400 font-bold">{yakaAllowance ? parseFloat(formatEther(yakaAllowance)).toFixed(2) : '0'} YAKA</span>
                                </div>
                                {depositAmount && vaultInfo && vaultInfo[0] > BigInt(0) && (
                                  <div className="flex justify-between pt-2 border-t border-purple-500/20">
                                    <span className="text-purple-300">CALCULATED_OUTPUT::</span>
                                    <span className="text-yellow-400 font-bold">~{parseFloat(formatEther((parseEther(depositAmount) * vaultInfo[0]) / vaultInfo[1])).toFixed(4)} LYT</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* NFT Deposit Terminal */}
                          <div className="border-t border-red-500/30 pt-8">
                            <div className="flex items-center mb-6 border-b border-red-500/30 pb-2">
                              <span className="text-red-400 font-mono font-bold text-lg mr-2">∞</span>
                              <h3 className="text-red-400 font-mono font-bold text-sm">VEYAKA_NFT_DEPOSIT_TERMINAL</h3>
                            </div>
                            <div className="space-y-6">
                              {loadingNFTs ? (
                                <div className="flex items-center justify-center py-8 bg-black/50 border border-red-500/30 rounded-lg">
                                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-400 border-t-transparent"></div>
                                  <span className="ml-3 text-red-300 font-mono">SCANNING_NFT_BLOCKCHAIN...</span>
                                </div>
                              ) : userNFTs.length > 0 ? (
                                <>
                                  <div>
                                    <label className="block text-red-300 font-mono text-xs mb-3">
                                      SELECT_VEYAKA_NFT::
                                    </label>
                                    <select
                                      value={nftId}
                                      onChange={(e) => setNftId(e.target.value)}
                                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-red-400 transition-all duration-300"
                                    >
                                      <option value="">CHOOSE_NFT_TARGET...</option>
                                      {userNFTs.map((nft) => (
                                        <option key={nft.id} value={nft.id}>
                                          NFT #{nft.id} - {Number(nft.balance).toFixed(2)} YAKA (LOCK_EXPIRY::{nft.endTime})
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  
                                  {nftId && nftApproved?.toLowerCase() !== VEYAKA_CONTRACT_ADDRESS.toLowerCase() ? (
                                    <button
                                      onClick={handleApproveNFT}
                                      disabled={!nftId || !depositsEnabled || isApproving || isWritePending || isConfirming}
                                      className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-mono font-bold rounded-lg border border-yellow-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                                      <span className="relative z-10">
                                        {isApproving || isWritePending || isConfirming ? 'PROCESSING...' : `APPROVE_NFT::#${nftId}`}
                                      </span>
                                    </button>
                                  ) : nftId ? (
                                    <button
                                      onClick={handleDepositNFT}
                                      disabled={!nftId || !depositsEnabled || isWritePending || isConfirming}
                                      className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-mono font-bold rounded-lg border border-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                                      <span className="relative z-10">
                                        {isWritePending || isConfirming ? 'PROCESSING...' : 'EXECUTE_NFT_DEPOSIT'}
                                      </span>
                                    </button>
                                  ) : null}
                                </>
                              ) : (
                                <div className="text-center py-8 bg-black/50 border border-red-500/30 rounded-lg">
                                  <p className="text-red-400 font-mono">NO_VEYAKA_NFTS_DETECTED</p>
                                  <p className="text-gray-500 font-mono text-xs mt-1">VEYAKA_NFTS_REQUIRED_FOR_PROTOCOL</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {!depositsEnabled && (
                            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-md border border-yellow-500/30 rounded-lg p-4 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                              <div className="relative z-10 flex items-center justify-center space-x-3">
                                <span className="text-yellow-400 font-mono font-bold text-lg">⚠</span>
                                <p className="text-yellow-300 font-mono text-sm">DEPOSIT_PROTOCOL_DISABLED_BY_CONTRACT_ADMIN</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Withdraw Engine */}
                      {activeTab === 'withdraw' && (
                        <div className="space-y-8">
                          <div className="flex items-center mb-6 border-b border-blue-500/30 pb-2">
                            <span className="text-blue-400 font-mono font-bold text-lg mr-2">∇</span>
                            <h3 className="text-blue-400 font-mono font-bold text-sm">WITHDRAW_ENGINE::NFT_CONVERSION</h3>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <label className="block text-blue-300 font-mono text-xs mb-3">
                                AMOUNT::LIQUID_YAKA_TOKENS
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={withdrawAmount}
                                  onChange={(e) => setWithdrawAmount(e.target.value)}
                                  placeholder="0.0"
                                  className="w-full px-4 py-3 pr-20 bg-black/50 border border-blue-500/30 rounded-lg text-white font-mono placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all duration-300"
                                />
                                <button
                                  onClick={() => liquidTokenBalance && setWithdrawAmount(formatEther(liquidTokenBalance))}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-xs font-mono font-bold rounded-lg transition-all duration-300 border border-red-400/30"
                                >
                                  MAX_EXTRACT
                                </button>
                              </div>
                            </div>
                            
                            {withdrawAmount && lytAllowance !== undefined && parseEther(withdrawAmount) > lytAllowance ? (
                              <button
                                onClick={handleApproveLyt}
                                disabled={!withdrawAmount || !withdrawalsEnabled || isApproving || isWritePending || isConfirming}
                                className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-mono font-bold rounded-lg border border-yellow-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                                <span className="relative z-10">
                                  {isApproving || isWritePending || isConfirming ? 'PROCESSING...' : `APPROVE::${withdrawAmount}_LYT`}
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={handleWithdraw}
                                disabled={!withdrawAmount || !withdrawalsEnabled || isWritePending || isConfirming || Boolean(liquidTokenBalance && parseEther(withdrawAmount) > liquidTokenBalance)}
                                className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-mono font-bold rounded-lg border border-red-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                                <span className="relative z-10">
                                  {isWritePending || isConfirming ? 'PROCESSING...' : 'EXECUTE_NFT_WITHDRAWAL'}
                                </span>
                              </button>
                            )}
                            
                            <div className="bg-black/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 font-mono text-xs">
                              <div className="flex justify-between mb-3 border-b border-blue-500/20 pb-2">
                                <span className="text-blue-300">LYT_BALANCE::</span>
                                <span className="text-green-400 font-bold">{liquidTokenBalance ? parseFloat(formatEther(liquidTokenBalance)).toFixed(2) : '0'} LYT</span>
                              </div>
                              <div className="flex justify-between mb-3 border-b border-blue-500/20 pb-2">
                                <span className="text-blue-300">MINIMUM_WITHDRAWAL::</span>
                                <span className="text-purple-400 font-bold">{minimumWithdrawal ? parseFloat(formatEther(minimumWithdrawal)).toFixed(2) : '1'} YAKA</span>
                              </div>
                              {withdrawAmount && vaultInfo && (
                                <div className="flex justify-between pt-2 border-t border-blue-500/20">
                                  <span className="text-blue-300">CALCULATED_OUTPUT::</span>
                                  <span className="text-red-400 font-bold">~{parseFloat(formatEther((parseEther(withdrawAmount) * vaultInfo[3]) / parseEther('1'))).toFixed(4)} YAKA_NFT</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {!withdrawalsEnabled && (
                            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-md border border-yellow-500/30 rounded-lg p-4 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                              <div className="relative z-10 flex items-center justify-center space-x-3">
                                <span className="text-yellow-400 font-mono font-bold text-lg">⚠</span>
                                <p className="text-yellow-300 font-mono text-sm">WITHDRAWAL_ENGINE_DISABLED_BY_CONTRACT_ADMIN</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Mathematical Analysis */}
                      {activeTab === 'info' && (
                        <div className="space-y-8">
                          <div>
                            <div className="flex items-center mb-6 border-b border-green-500/30 pb-2">
                              <span className="text-green-400 font-mono font-bold text-lg mr-2">λ</span>
                              <h3 className="text-green-400 font-mono font-bold text-sm">MATHEMATICAL_ANALYSIS::LIQUID_STAKING_PROTOCOL</h3>
                            </div>
                            
                            {/* Protocol Algorithm Flow */}
                            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-lg p-6 mb-8 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                              <div className="relative z-10">
                                <div className="flex items-center mb-6 border-b border-purple-500/30 pb-2">
                                  <span className="text-purple-400 font-mono font-bold text-lg mr-2">∮</span>
                                  <h4 className="text-purple-400 font-mono font-bold text-sm">PROTOCOL_EXECUTION_SEQUENCE</h4>
                                </div>
                                <div className="space-y-6">
                                  {[
                                    {
                                      step: '01',
                                      title: 'DEPOSIT::YAKA_VEYAKA_NFT',
                                      desc: 'Tokens locked in mathematical vault with 2-year maximum voting power optimization'
                                    },
                                    {
                                      step: '02',
                                      title: 'MINT::LIQUID_YAKA_TOKENS',
                                      desc: 'Generate liquid tokens representing locked position - enabling mathematical liquidity'
                                    },
                                    {
                                      step: '03',
                                      title: 'AUTOMATED_VAULT_ENGINE',
                                      desc: 'Algorithmic voting, fee claiming, and reward compounding executed automatically'
                                    }
                                  ].map((item) => (
                                    <div key={item.step} className="flex items-start space-x-4">
                                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-mono text-sm font-bold flex-shrink-0 border border-purple-400/30">
                                        {item.step}
                                      </div>
                                      <div>
                                        <p className="font-mono font-bold text-purple-300 mb-1 text-sm">{item.title}</p>
                                        <p className="text-sm text-gray-300 font-mono">{item.desc}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Protocol Benefits Matrix */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-md border border-red-500/30 rounded-lg p-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                                <div className="relative z-10">
                                  <div className="flex items-center mb-4 border-b border-red-500/30 pb-2">
                                    <span className="text-red-400 font-mono font-bold text-lg mr-2">⊗</span>
                                    <h4 className="text-red-400 font-mono font-bold text-sm">TRADITIONAL_VEYAKA_LIMITATIONS</h4>
                                  </div>
                                  <ul className="space-y-3 text-sm text-gray-300 font-mono">
                                    <li className="flex items-start space-x-2">
                                      <span className="text-red-400 mt-1">•</span>
                                      <span>VEYAKA_NFT_LOCKED::MONTHS/YEARS</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                      <span className="text-red-400 mt-1">•</span>
                                      <span>NO_LIQUIDITY::CANNOT_SELL_POSITION</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                      <span className="text-red-400 mt-1">•</span>
                                      <span>MANUAL_VOTING::EVERY_EPOCH</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                      <span className="text-red-400 mt-1">•</span>
                                      <span>MANUAL_FEE_CLAIMING::REQUIRED</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                      <span className="text-red-400 mt-1">•</span>
                                      <span>NO_EMERGENCY_LIQUIDITY::AVAILABLE</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-md border border-green-500/30 rounded-lg p-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                                <div className="relative z-10">
                                  <div className="flex items-center mb-4 border-b border-green-500/30 pb-2">
                                    <span className="text-green-400 font-mono font-bold text-lg mr-2">⊕</span>
                                    <h4 className="text-green-400 font-mono font-bold text-sm">MATHEMATICAL_LIQUID_STAKING_ADVANTAGES</h4>
                                  </div>
                                  <ul className="space-y-3 text-sm text-gray-300 font-mono">
                                    <li className="flex items-start space-x-2">
                                      <span className="text-green-400 mt-1">•</span>
                                      <span>LYT_TOKENS::FULLY_LIQUID_TRADEABLE</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                      <span className="text-green-400 mt-1">•</span>
                                      <span>DEX_TRADING::SELL_ANYTIME</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                      <span className="text-green-400 mt-1">•</span>
                                      <span>AUTOMATED_VOTING::MAXIMUM_REWARDS</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                      <span className="text-green-400 mt-1">•</span>
                                      <span>AUTO_COMPOUNDING::FEE_CLAIMING</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                      <span className="text-green-400 mt-1">•</span>
                                      <span>INSTANT_LIQUIDITY::EMERGENCY_ACCESS</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Protocol Contract Matrix */}
                            <div className="bg-gradient-to-r from-gray-900/20 to-black/20 backdrop-blur-md border border-gray-500/30 rounded-lg p-6 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                              <div className="relative z-10">
                                <div className="flex items-center mb-4 border-b border-gray-500/30 pb-2">
                                  <span className="text-gray-400 font-mono font-bold text-lg mr-2">⚙</span>
                                  <h4 className="text-gray-400 font-mono font-bold text-sm">CONTRACT_ADDRESS_MATRIX</h4>
                                </div>
                                <div className="space-y-3 text-xs font-mono">
                                  <div className="flex justify-between py-2 border-b border-gray-500/20">
                                    <span className="text-gray-300">VEYAKA_VAULT::</span>
                                    <span className="text-purple-400 font-bold">{VEYAKA_CONTRACT_ADDRESS}</span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b border-gray-500/20">
                                    <span className="text-gray-300">YAKA_TOKEN::</span>
                                    <span className="text-purple-400 font-bold">{YAKA_TOKEN_ADDRESS}</span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b border-gray-500/20">
                                    <span className="text-gray-300">VOTING_ESCROW::</span>
                                    <span className="text-purple-400 font-bold">0x86a247Ef0Fc244565BCab93936E867407ac81580</span>
                                  </div>
                                  <div className="flex justify-between py-2">
                                    <span className="text-gray-300">LIQUID_TOKEN::</span>
                                    <span className="text-purple-400 font-bold">0xFEEc14a2E30999A84fF4D5750ffb6D3AEc681E79</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Protocol Risk Assessment */}
                            <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 backdrop-blur-md border border-yellow-500/30 rounded-lg p-6 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                              <div className="relative z-10">
                                <div className="flex items-center mb-4 border-b border-yellow-500/30 pb-2">
                                  <span className="text-yellow-400 font-mono font-bold text-lg mr-2">⚠</span>
                                  <h4 className="text-yellow-400 font-mono font-bold text-sm">PROTOCOL_RISK_ASSESSMENT</h4>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-300 font-mono">
                                  <li className="flex items-start space-x-2">
                                    <span className="text-yellow-400 mt-1">•</span>
                                    <span>LYT_PRICE_VARIANCE::MAY_DIFFER_FROM_UNDERLYING_YAKA</span>
                                  </li>
                                  <li className="flex items-start space-x-2">
                                    <span className="text-yellow-400 mt-1">•</span>
                                    <span>WITHDRAWAL_OUTPUT::VEYAKA_NFT_LOCKED_UNTIL_EXPIRY</span>
                                  </li>
                                  <li className="flex items-start space-x-2">
                                    <span className="text-yellow-400 mt-1">•</span>
                                    <span>SMART_CONTRACT_RISKS::DEPOSIT_ONLY_AFFORDABLE_AMOUNT</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Transaction Processing Status */}
                      {(isWritePending || isConfirming || isConfirmed || writeError) && (
                        <div className="mt-6 p-4 bg-black/50 backdrop-blur-sm border border-gray-500/30 rounded-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                          <div className="relative z-10">
                            {isWritePending && (
                              <div className="flex items-center space-x-3 text-yellow-400 font-mono">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-yellow-400 border-t-transparent"></div>
                                <span>WALLET_CONFIRMATION_PENDING...</span>
                              </div>
                            )}
                            {isConfirming && (
                              <div className="flex items-center space-x-3 text-blue-400 font-mono">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
                                <span>TRANSACTION_CONFIRMING...</span>
                              </div>
                            )}
                            {isConfirmed && (
                              <div className="text-green-400 flex items-center space-x-2 font-mono">
                                <span className="text-green-400 font-bold text-lg mr-2">✓</span>
                                <span>TRANSACTION_SUCCESSFUL::CONFIRMED</span>
                              </div>
                            )}
                            {writeError && (
                              <div className="text-red-400 flex items-center space-x-2 font-mono">
                                <span className="text-red-400 font-bold text-lg mr-2">✗</span>
                                <span>EXECUTION_FAILED::{writeError.message}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </section>
        )}
      </main>

      {/* Protocol Footer Terminal */}
      <footer className="relative z-10 border-t border-purple-500/30 bg-black/80 backdrop-blur-md">
        <div className="px-6 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-pulse"></div>
                  <span className="text-white font-mono text-sm font-bold relative z-10">∑</span>
                </div>
                <span className="text-gray-400 font-mono text-sm">© 2025 VEYAKA_PROTOCOL::MATHEMATICAL_ENGINE</span>
              </div>

              <div className="flex items-center space-x-6">
                <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-all duration-300 font-mono text-sm">
                  <span className="mr-2">COMMUNICATION_CHANNEL::</span>
                  <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                <a href="https://x.com/btb_finance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-300 font-mono text-sm">
                  <span className="mr-2">SOCIAL_VECTOR::</span>
                  <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}