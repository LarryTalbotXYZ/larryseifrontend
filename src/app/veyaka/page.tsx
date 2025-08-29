'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther, formatUnits, createPublicClient, http } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MobileConnectButton from '@/components/MobileConnectButton';
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
      {/* Simple Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Header */}
      <nav className="relative z-10 border-b border-purple-500/30 bg-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center p-3 sm:p-6 lg:px-12">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🌊</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white">VeYAKA</span>
                <span className="text-xs text-purple-400">Liquid Staking</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">HOME</Link>
              <Link href="/docs" className="text-gray-400 hover:text-green-400 transition-colors text-sm">DOCS</Link>
              <Link href="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">TRADING</Link>
              <span className="text-purple-400 font-medium text-sm">VEYAKA</span>
            </div>
          </div>

          <MobileConnectButton />
        </div>
      </nav>

      <main className="relative z-10">
        {/* Cyberpunk Protocol Header */}
        <section className="px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg px-6 py-2 border border-purple-500/30 mb-6">
                <span className="text-purple-400 text-sm mr-2">🌊</span>
                <span className="text-white">VeYAKA Liquid Staking</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-white">Turn Your Locked </span>
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  veYAKA Into Cash
                </span>
              </h1>
              <p className="text-sm sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Get liquid tokens you can trade immediately while keeping your voting power and earning rewards automatically
              </p>
            </div>

            {/* Status Notice */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-12">
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-yellow-400 text-lg">⚠️</span>
                  <div className="text-center">
                    <p className="text-yellow-300 text-sm font-bold">
                      Beta Testing - Use Small Amounts
                    </p>
                    <p className="text-gray-300 text-xs mt-1">
                      Report issues on 
                      <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline ml-1">
                        Telegram
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {!isConnected ? (
          <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-black/80 border border-purple-500/30 rounded-xl p-12">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">🔗</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-4">Connect Your Wallet</h2>
                <p className="text-gray-300 text-sm mb-8">
                  Connect your wallet to start turning your locked veYAKA into tradeable liquid tokens.
                </p>
                <MobileConnectButton />
              </div>
            </div>
          </section>
        ) : (
          <section className="px-4 sm:px-6 lg:px-12 pb-12 sm:pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">

                {/* Protocol Analytics - Mobile First */}
                <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
                  {/* Mobile Balance Summary */}
                  <div className="lg:hidden bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-md border border-green-500/30 rounded-xl p-3 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <div>
                          <span className="text-gray-400">YAKA: </span>
                          <span className="text-white font-bold">{yakaBalance ? parseFloat(formatEther(yakaBalance)).toFixed(1) : '0'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">LYT: </span>
                          <span className="text-blue-400 font-bold">{liquidTokenBalance ? parseFloat(formatEther(liquidTokenBalance)).toFixed(1) : '0'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">NFTs: </span>
                          <span className="text-yellow-400 font-bold">{nftBalance ? Number(nftBalance) : 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vault Statistics */}
                  <div className="hidden lg:block bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center mb-6 border-b border-purple-500/30 pb-2">
                      <span className="text-purple-400 text-lg mr-2">📊</span>
                      <h3 className="text-purple-400 font-bold text-sm">Platform Stats</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-purple-500/20">
                        <span className="text-purple-300 text-xs">Total LYT Supply</span>
                        <span className="text-green-400 font-bold text-sm">
                          {vaultInfo ? parseFloat(formatEther(vaultInfo[0])).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-purple-500/20">
                        <span className="text-purple-300 text-xs">YAKA Locked</span>
                        <span className="text-blue-400 font-bold text-sm">
                          {vaultInfo ? parseFloat(formatEther(vaultInfo[1])).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-purple-500/20">
                        <span className="text-purple-300 text-xs">Voting Power</span>
                        <span className="text-pink-400 font-bold text-sm">
                          {vaultInfo ? parseFloat(formatEther(vaultInfo[2])).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-purple-300 text-xs">LYT Price</span>
                        <span className="text-yellow-400 font-bold text-sm">
                          {vaultInfo ? parseFloat(formatUnits(vaultInfo[3], 18)).toFixed(2) : '1.00'} YAKA
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Your Assets */}
                  <div className="hidden lg:block bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center mb-6 border-b border-green-500/30 pb-2">
                      <span className="text-green-400 text-lg mr-2">💰</span>
                      <h3 className="text-green-400 font-bold text-sm">Your Assets</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-green-500/20">
                        <span className="text-green-300 text-xs">YAKA Balance</span>
                        <span className="text-white font-bold text-sm">
                          {yakaBalance ? parseFloat(formatEther(yakaBalance)).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-green-500/20">
                        <span className="text-green-300 text-xs">Liquid YAKA (LYT)</span>
                        <span className="text-blue-400 font-bold text-sm">
                          {liquidTokenBalance ? parseFloat(formatEther(liquidTokenBalance)).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-green-500/20">
                        <span className="text-green-300 text-xs">YAKA Value</span>
                        <span className="text-purple-400 font-bold text-sm">
                          {liquidTokenBalance && vaultInfo ?
                            parseFloat(formatEther((liquidTokenBalance * vaultInfo[3]) / parseEther('1'))).toFixed(2) : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-green-300 text-xs">veYAKA NFTs</span>
                        <span className="text-yellow-400 font-bold text-sm">
                          {nftBalance ? Number(nftBalance) : 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Main NFT Info */}
                  {mainNFTInfo && mainNFTInfo[0] > BigInt(0) && (
                    <div className="hidden lg:block bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                      <div className="flex items-center mb-6 border-b border-blue-500/30 pb-2">
                        <span className="text-blue-400 text-lg mr-2">🔒</span>
                        <h3 className="text-blue-400 font-bold text-sm">Main NFT Lock Info</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-blue-500/20">
                          <span className="text-blue-300 text-xs">NFT ID</span>
                          <span className="text-cyan-400 font-bold text-sm">#{mainNFTInfo[0].toString()}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-blue-500/20">
                          <span className="text-blue-300 text-xs">Locked Amount</span>
                          <span className="text-purple-400 font-bold text-sm">
                            {parseFloat(formatEther(mainNFTInfo[1])).toFixed(2)} YAKA
                          </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-blue-500/20">
                          <span className="text-blue-300 text-xs">Time Left</span>
                          <span className="text-red-400 font-bold text-sm">
                            {formatTimeLeft(mainNFTInfo[3])}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-blue-300 text-xs">Voting Power</span>
                          <span className="text-yellow-400 font-bold text-sm">
                            {parseFloat(formatEther(mainNFTInfo[4])).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Actions */}
                <div className="order-1 lg:order-2 lg:col-span-2">
                  <div className="bg-black/80 border border-purple-500/30 rounded-xl">
                    {/* Tabs */}
                    <div className="flex border-b border-purple-500/30">
                      {[
                        { id: 'deposit', label: 'DEPOSIT', longLabel: 'Deposit Assets', icon: '💰', color: 'purple' },
                        { id: 'withdraw', label: 'WITHDRAW', longLabel: 'Withdraw Assets', icon: '💸', color: 'blue' },
                        { id: 'info', label: 'INFO', longLabel: 'How It Works', icon: 'ℹ️', color: 'green' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as 'deposit' | 'withdraw' | 'info')}
                          className={`flex-1 py-3 sm:py-4 px-2 sm:px-6 font-bold text-xs sm:text-sm transition-all duration-300 ${
                            activeTab === tab.id
                              ? `text-${tab.color}-400 border-b-2 border-${tab.color}-400 bg-${tab.color}-500/10`
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row items-center justify-center">
                            <span className="text-sm sm:text-base mb-1 sm:mb-0 sm:mr-2">{tab.icon}</span>
                            <span className="hidden sm:inline">{tab.longLabel}</span>
                            <span className="sm:hidden">{tab.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="p-4 sm:p-8">
                      {/* Deposit */}
                      {activeTab === 'deposit' && (
                        <div className="space-y-8">
                          {/* Deposit YAKA */}
                          <div>
                            <div className="flex items-center mb-6 border-b border-purple-500/30 pb-2">
                              <span className="text-purple-400 text-lg mr-2">💰</span>
                              <h3 className="text-purple-400 font-bold text-sm">Deposit YAKA Tokens</h3>
                            </div>
                            <div className="space-y-6">
                              <div>
                                <label className="block text-purple-300 text-xs mb-3">
                                  Amount of YAKA to deposit
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
                                    onClick={() => yakaBalance && setDepositAmount(parseFloat(formatEther(yakaBalance)).toFixed(2))}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-lg transition-all duration-300 border border-purple-400/30"
                                  >
                                    MAX
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
                                    {isApproving || isWritePending || isConfirming ? 'Processing...' : `Approve ${parseFloat(depositAmount).toFixed(2)} YAKA`}
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
                                    {isWritePending || isConfirming ? 'Processing...' : 'Deposit YAKA'}
                                  </span>
                                </button>
                              )}
                              
                              <div className="bg-black/50 border border-purple-500/30 rounded-lg p-4 text-xs">
                                <div className="flex justify-between mb-3 border-b border-purple-500/20 pb-2">
                                  <span className="text-purple-300">Your YAKA Balance:</span>
                                  <span className="text-green-400 font-bold">{yakaBalance ? parseFloat(formatEther(yakaBalance)).toFixed(2) : '0'} YAKA</span>
                                </div>
                                <div className="flex justify-between mb-3 border-b border-purple-500/20 pb-2">
                                  <span className="text-purple-300">Current Allowance:</span>
                                  <span className="text-blue-400 font-bold">{yakaAllowance ? parseFloat(formatEther(yakaAllowance)).toFixed(2) : '0'} YAKA</span>
                                </div>
                                {depositAmount && vaultInfo && vaultInfo[0] > BigInt(0) && (
                                  <div className="flex justify-between pt-2 border-t border-purple-500/20">
                                    <span className="text-purple-300">You&apos;ll receive:</span>
                                    <span className="text-yellow-400 font-bold">~{parseFloat(formatEther((parseEther(depositAmount) * vaultInfo[0]) / vaultInfo[1])).toFixed(2)} LYT</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* NFT Deposit */}
                          <div className="border-t border-red-500/30 pt-8">
                            <div className="flex items-center mb-6 border-b border-red-500/30 pb-2">
                              <span className="text-red-400 text-lg mr-2">🎫</span>
                              <h3 className="text-red-400 font-bold text-sm">Deposit veYAKA NFT</h3>
                            </div>
                            <div className="space-y-6">
                              {loadingNFTs ? (
                                <div className="flex items-center justify-center py-8 bg-black/50 border border-red-500/30 rounded-lg">
                                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-400 border-t-transparent"></div>
                                  <span className="ml-3 text-red-300">Loading your NFTs...</span>
                                </div>
                              ) : userNFTs.length > 0 ? (
                                <>
                                  <div>
                                    <label className="block text-red-300 text-xs mb-3">
                                      Choose your veYAKA NFT to deposit:
                                    </label>
                                    <select
                                      value={nftId}
                                      onChange={(e) => setNftId(e.target.value)}
                                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-red-400 transition-all duration-300"
                                    >
                                      <option value="">Select an NFT...</option>
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
                                        {isApproving || isWritePending || isConfirming ? 'Processing...' : `Approve NFT #${nftId}`}
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
                                        {isWritePending || isConfirming ? 'Processing...' : 'Deposit NFT'}
                                      </span>
                                    </button>
                                  ) : null}
                                </>
                              ) : (
                                <div className="text-center py-8 bg-black/50 border border-red-500/30 rounded-lg">
                                  <p className="text-red-400">No veYAKA NFTs Found</p>
                                  <p className="text-gray-500 text-xs mt-1">You need veYAKA NFTs to use this feature</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {!depositsEnabled && (
                            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-md border border-yellow-500/30 rounded-lg p-4 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                              <div className="relative z-10 flex items-center justify-center space-x-3">
                                <span className="text-yellow-400 font-mono font-bold text-lg">⚠</span>
                                <p className="text-yellow-300 font-mono text-sm">Deposits are currently disabled</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Withdraw */}
                      {activeTab === 'withdraw' && (
                        <div className="space-y-8">
                          <div className="flex items-center mb-6 border-b border-blue-500/30 pb-2">
                            <span className="text-blue-400 text-lg mr-2">💸</span>
                            <h3 className="text-blue-400 font-bold text-sm">Withdraw to NFT</h3>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <label className="block text-blue-300 text-xs mb-3">
                                Amount of LYT to withdraw
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
                                  onClick={() => liquidTokenBalance && setWithdrawAmount(parseFloat(formatEther(liquidTokenBalance)).toFixed(2))}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-xs font-bold rounded-lg transition-all duration-300 border border-red-400/30"
                                >
                                  MAX
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
                                  {isApproving || isWritePending || isConfirming ? 'Processing...' : `Approve ${parseFloat(withdrawAmount).toFixed(2)} LYT`}
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
                                  {isWritePending || isConfirming ? 'Processing...' : 'Withdraw to NFT'}
                                </span>
                              </button>
                            )}
                            
                            <div className="bg-black/50 border border-blue-500/30 rounded-lg p-4 text-xs">
                              <div className="flex justify-between mb-3 border-b border-blue-500/20 pb-2">
                                <span className="text-blue-300">Your LYT Balance:</span>
                                <span className="text-green-400 font-bold">{liquidTokenBalance ? parseFloat(formatEther(liquidTokenBalance)).toFixed(2) : '0'} LYT</span>
                              </div>
                              <div className="flex justify-between mb-3 border-b border-blue-500/20 pb-2">
                                <span className="text-blue-300">Minimum Withdrawal:</span>
                                <span className="text-purple-400 font-bold">{minimumWithdrawal ? parseFloat(formatEther(minimumWithdrawal)).toFixed(2) : '1'} YAKA</span>
                              </div>
                              {withdrawAmount && vaultInfo && (
                                <div className="flex justify-between pt-2 border-t border-blue-500/20">
                                  <span className="text-blue-300">You&apos;ll receive NFT worth:</span>
                                  <span className="text-red-400 font-bold">~{parseFloat(formatEther((parseEther(withdrawAmount) * vaultInfo[3]) / parseEther('1'))).toFixed(2)} YAKA</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {!withdrawalsEnabled && (
                            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-md border border-yellow-500/30 rounded-lg p-4 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                              <div className="relative z-10 flex items-center justify-center space-x-3">
                                <span className="text-yellow-400 font-mono font-bold text-lg">⚠</span>
                                <p className="text-yellow-300 font-mono text-sm">Withdrawals are currently disabled</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* How It Works */}
                      {activeTab === 'info' && (
                        <div className="space-y-8">
                          <div>
                            <div className="flex items-center mb-6 border-b border-green-500/30 pb-2">
                              <span className="text-green-400 text-lg mr-2">ℹ️</span>
                              <h3 className="text-green-400 font-bold text-sm">How VeYAKA Liquid Staking Works</h3>
                            </div>
                            
                            {/* How It Works */}
                            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 mb-8">
                              <div className="flex items-center mb-6 border-b border-purple-500/30 pb-2">
                                <span className="text-purple-400 text-lg mr-2">🔄</span>
                                <h4 className="text-purple-400 font-bold text-sm">Simple 3-Step Process</h4>
                              </div>
                              <div className="space-y-6">
                                {[
                                  {
                                    step: '1',
                                    title: 'Deposit Your Assets',
                                    desc: 'Put in your YAKA tokens or veYAKA NFTs to get started'
                                  },
                                  {
                                    step: '2',
                                    title: 'Get Liquid Tokens (LYT)',
                                    desc: 'Receive tradeable LYT tokens you can sell anytime on DEX'
                                  },
                                  {
                                    step: '3',
                                    title: 'Earn Rewards Automatically',
                                    desc: 'Keep earning voting rewards and fees without doing anything'
                                  }
                                ].map((item) => (
                                  <div key={item.step} className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0 border border-purple-400/30">
                                      {item.step}
                                    </div>
                                    <div>
                                      <p className="font-bold text-purple-300 mb-1 text-sm">{item.title}</p>
                                      <p className="text-sm text-gray-300">{item.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Why Use This? */}
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-8">
                              <h4 className="text-green-400 font-bold mb-4 text-center">🚀 Why Use VeYAKA Liquid Staking?</h4>
                              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-black/50 border border-green-500/20 rounded-lg p-4">
                                  <div className="text-green-400 font-bold mb-2 flex items-center">
                                    <span className="mr-2">💰</span>
                                    Instant Liquidity
                                  </div>
                                  <p className="text-sm text-gray-300">Get tradeable LYT tokens instead of locked NFTs</p>
                                </div>

                                <div className="bg-black/50 border border-blue-500/20 rounded-lg p-4">
                                  <div className="text-blue-400 font-bold mb-2 flex items-center">
                                    <span className="mr-2">🔄</span>
                                    Auto Rewards
                                  </div>
                                  <p className="text-sm text-gray-300">Earn rewards without manual voting or claiming</p>
                                </div>

                                <div className="bg-black/50 border border-purple-500/20 rounded-lg p-4">
                                  <div className="text-purple-400 font-bold mb-2 flex items-center">
                                    <span className="mr-2">📈</span>
                                    No Lock Time
                                  </div>
                                  <p className="text-sm text-gray-300">Trade your position anytime on DEX</p>
                                </div>

                                <div className="bg-black/50 border border-red-500/20 rounded-lg p-4">
                                  <div className="text-red-400 font-bold mb-2 flex items-center">
                                    <span className="mr-2">🏦</span>
                                    Keep Voting Power
                                  </div>
                                  <p className="text-sm text-gray-300">Still get veYAKA benefits and governance</p>
                                </div>

                                <div className="bg-black/50 border border-yellow-500/20 rounded-lg p-4">
                                  <div className="text-yellow-400 font-bold mb-2 flex items-center">
                                    <span className="mr-2">🚀</span>
                                    Emergency Exit
                                  </div>
                                  <p className="text-sm text-gray-300">Get cash fast when you need it</p>
                                </div>

                                <div className="bg-black/50 border border-cyan-500/20 rounded-lg p-4">
                                  <div className="text-cyan-400 font-bold mb-2 flex items-center">
                                    <span className="mr-2">⚡</span>
                                    Simple & Safe
                                  </div>
                                  <p className="text-sm text-gray-300">One-click deposits, automatic everything</p>
                                </div>
                              </div>
                            </div>

                            {/* Important Notes */}
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                              <div className="flex items-center mb-4">
                                <span className="text-yellow-400 text-lg mr-2">⚠️</span>
                                <h4 className="text-yellow-400 font-bold text-sm">Important Things to Know</h4>
                              </div>
                              <div className="space-y-3 text-sm text-gray-300">
                                <div className="flex items-start space-x-2">
                                  <span className="text-yellow-400 mt-1">•</span>
                                  <span><strong>LYT token price</strong> may be different from YAKA price on DEX</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-yellow-400 mt-1">•</span>
                                  <span><strong>Withdrawals</strong> give you locked veYAKA NFTs, not liquid YAKA</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-yellow-400 mt-1">•</span>
                                  <span><strong>Smart contract risk</strong> - only deposit what you can afford to lose</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="text-yellow-400 mt-1">•</span>
                                  <span><strong>Beta version</strong> - report issues on Telegram for fast support</span>
                                </div>
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
                                <span>Transaction failed: {writeError.message}</span>
                              </div>
                            )}
                          </div>
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
      <footer className="relative z-10 border-t border-purple-500/30 bg-black/80 backdrop-blur-md">
        <div className="px-6 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🌊</span>
                </div>
                <span className="text-gray-400 text-sm">© 2025 VeYAKA Liquid Staking</span>
              </div>

              <div className="flex items-center space-x-6">
                <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                <a href="https://x.com/btb_finance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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