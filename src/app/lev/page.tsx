'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePublicClient } from 'wagmi';
import { formatEther, parseEther, Address } from 'viem';
import MobileConnectButton from '@/components/MobileConnectButton';
import { VideoLogo } from '@/components/VideoLogo';
import { useLeverageToken, useBackingToken } from '@/hooks/useLeverageTokens';

// Factory contract address
const FACTORY_ADDRESS = "0x29B93562B71E0BF15Bc4DD5a9B27C717a7e53213" as Address;

// Mathematical symbols for visual elements
const MATH_SYMBOLS = ['∑', '∫', '∂', '∇', '∞', '∮', '∯', '∱', '∲', '∴', '∵', '⊥', '∥', '∦', '≅', '≈', '≠', '≤', '≥', '⊂', '⊃', '⊆', '⊇', '∈', '∉', '∋', '∌', '⊕', '⊗', '⊙'];

// Factory ABI (minimal required functions)
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

// ERC20 ABI for token info
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
  }
] as const;

// Leverage Token ABI (minimal required functions)
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
  }
] as const;

interface TokenPair {
  backingToken: Address;
  leverageContract: Address;
  backingName?: string;
  backingSymbol?: string;
  leverageName?: string;
  leverageSymbol?: string;
  price?: string;
  backing?: string;
  totalSupply?: string;
  buyFee?: number;
  active?: boolean;
}

// Trading Interface Component
function TradingInterface({ 
  selectedToken, 
  onClose 
}: { 
  selectedToken: TokenPair;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'leverage' | 'borrow' | 'manage'>('buy');
  
  // Trading form states
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [leverageAmount, setLeverageAmount] = useState('');
  const [leverageDays, setLeverageDays] = useState('30');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [borrowDays, setBorrowDays] = useState('30');
  const [repayAmount, setRepayAmount] = useState('');

  // Hooks for contract interactions
  const leverageHook = useLeverageToken(selectedToken.leverageContract);
  const backingHook = useBackingToken(selectedToken.backingToken);
  
  // Check allowances
  const buyAllowance = backingHook.useGetAllowance(selectedToken.leverageContract);
  const leverageAllowance = backingHook.useGetAllowance(selectedToken.leverageContract);
  
  // Check if we need approval for buy/leverage operations
  const needsBuyApproval = buyAmount && buyAllowance.data ? parseEther(buyAmount) > buyAllowance.data : !!buyAmount;
  const needsLeverageApproval = leverageAmount && leverageAllowance.data ? parseEther(leverageAmount) > leverageAllowance.data : !!leverageAmount;

  const handleBuyApprove = () => {
    if (buyAmount && backingHook.approveToken) {
      // Approve a bit more to account for potential slippage
      const approveAmount = (parseFloat(buyAmount) * 1.1).toString();
      backingHook.approveToken(selectedToken.leverageContract, approveAmount);
    }
  };

  const handleBuy = () => {
    if (buyAmount && leverageHook.buyTokens) {
      leverageHook.buyTokens(buyAmount);
    }
  };

  const handleSell = () => {
    if (sellAmount && leverageHook.sellTokens) {
      leverageHook.sellTokens(sellAmount);
    }
  };

  const handleLeverageApprove = () => {
    if (leverageAmount && backingHook.approveToken) {
      // Approve a bit more to account for potential fees
      const approveAmount = (parseFloat(leverageAmount) * 1.1).toString();
      backingHook.approveToken(selectedToken.leverageContract, approveAmount);
    }
  };

  const handleLeverage = () => {
    if (leverageAmount && leverageDays && leverageHook.leverageTrade) {
      leverageHook.leverageTrade(leverageAmount, parseInt(leverageDays));
    }
  };

  const handleBorrow = () => {
    if (borrowAmount && borrowDays && leverageHook.borrowAgainstTokens) {
      leverageHook.borrowAgainstTokens(borrowAmount, parseInt(borrowDays));
    }
  };

  const handleRepay = () => {
    if (repayAmount && leverageHook.repayLoan) {
      leverageHook.repayLoan(repayAmount);
    }
  };

  const tabs = [
    { key: 'buy', label: 'BUY', color: 'text-green-400 border-green-500' },
    { key: 'sell', label: 'SELL', color: 'text-red-400 border-red-500' },
    { key: 'leverage', label: 'LEVERAGE', color: 'text-blue-400 border-blue-500' },
    { key: 'borrow', label: 'BORROW', color: 'text-purple-400 border-purple-500' },
    { key: 'manage', label: 'MANAGE', color: 'text-yellow-400 border-yellow-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-black/90 border border-red-500/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
        
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b border-red-500/30 pb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-red-500/30">
                <span className="text-red-400 font-mono font-bold text-xl">🚀</span>
              </div>
              <div>
                <h2 className="text-2xl font-mono font-bold text-red-400">{selectedToken.leverageSymbol}</h2>
                <p className="text-gray-400 font-mono text-sm">{selectedToken.leverageName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-green-400 font-mono text-xl font-bold">{selectedToken.price}</p>
                <p className="text-gray-400 font-mono text-xs">CURRENT_PRICE</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700/30 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'buy' | 'sell' | 'leverage' | 'borrow' | 'manage')}
                className={`px-4 py-2 rounded-lg font-mono font-semibold text-sm border transition-all duration-300 ${
                  activeTab === tab.key 
                    ? `${tab.color} bg-current/10 border-current/30` 
                    : 'text-gray-400 border-gray-600/30 hover:text-white hover:border-gray-500/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Trading Forms */}
            <div className="space-y-6">
              {/* Buy Tab */}
              {activeTab === 'buy' && (
                <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6">
                  <h3 className="text-green-400 font-mono font-bold text-lg mb-4">💰 BUY TOKENS</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 font-mono text-sm mb-2">
                        BACKING_AMOUNT ({selectedToken.backingSymbol}):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                          placeholder="0.0"
                          className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 pr-20 text-white font-mono focus:outline-none focus:border-green-400/50"
                        />
                        <button
                          onClick={() => setBuyAmount(backingHook.userBalance)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600/80 hover:bg-green-500/80 text-white px-3 py-1 rounded text-xs font-mono font-bold transition-colors"
                        >
                          MAX
                        </button>
                      </div>
                      <p className="text-green-400/60 font-mono text-xs mt-1">
                        Balance: {backingHook.userBalance} {selectedToken.backingSymbol}
                      </p>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <p className="text-green-400 font-mono text-sm">ESTIMATED_TOKENS:</p>
                      <p className="text-white font-mono text-xl">
                        {buyAmount ? (parseFloat(buyAmount) / (parseFloat(selectedToken.price || '1'))).toFixed(4) : '0.0000'}
                      </p>
                    </div>

                    {needsBuyApproval ? (
                      <button
                        onClick={handleBuyApprove}
                        disabled={!buyAmount || backingHook.isPending}
                        className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-4 rounded-lg font-mono font-bold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {backingHook.isPending ? 'APPROVING...' : `APPROVE_${selectedToken.backingSymbol}`}
                      </button>
                    ) : (
                      <button
                        onClick={handleBuy}
                        disabled={!buyAmount || leverageHook.isPending || !buyAllowance.data}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg font-mono font-bold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {leverageHook.isPending ? 'PROCESSING...' : 'BUY_TOKENS'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Sell Tab */}
              {activeTab === 'sell' && (
                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-red-400 font-mono font-bold text-lg mb-4">💸 SELL TOKENS</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 font-mono text-sm mb-2">
                        TOKEN_AMOUNT ({selectedToken.leverageSymbol}):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={sellAmount}
                          onChange={(e) => setSellAmount(e.target.value)}
                          placeholder="0.0"
                          className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 pr-20 text-white font-mono focus:outline-none focus:border-red-400/50"
                        />
                        <button
                          onClick={() => setSellAmount(leverageHook.userBalance)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600/80 hover:bg-red-500/80 text-white px-3 py-1 rounded text-xs font-mono font-bold transition-colors"
                        >
                          MAX
                        </button>
                      </div>
                      <p className="text-red-400/60 font-mono text-xs mt-1">
                        Balance: {leverageHook.userBalance} {selectedToken.leverageSymbol}
                      </p>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
                      <p className="text-red-400 font-mono text-sm">ESTIMATED_BACKING:</p>
                      <p className="text-white font-mono text-xl">
                        {sellAmount ? (parseFloat(sellAmount) * parseFloat(selectedToken.price || '0') * 0.975).toFixed(4) : '0.0000'}
                      </p>
                    </div>

                    <div className="flex justify-end text-xs font-mono text-gray-400">
                      <span>Fee: {selectedToken.buyFee?.toFixed(1)}%</span>
                    </div>

                    <button
                      onClick={handleSell}
                      disabled={!sellAmount || leverageHook.isPending}
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-4 rounded-lg font-mono font-bold hover:from-red-500 hover:to-orange-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {leverageHook.isPending ? 'PROCESSING...' : 'SELL_TOKENS'}
                    </button>
                  </div>
                </div>
              )}

              {/* Leverage Tab */}
              {activeTab === 'leverage' && (
                <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-blue-400 font-mono font-bold text-lg mb-4">🚀 LEVERAGE TRADE</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 font-mono text-sm mb-2">
                        BACKING_AMOUNT ({selectedToken.backingSymbol}):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={leverageAmount}
                          onChange={(e) => setLeverageAmount(e.target.value)}
                          placeholder="0.0"
                          className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 pr-20 text-white font-mono focus:outline-none focus:border-blue-400/50"
                        />
                        <button
                          onClick={() => setLeverageAmount(backingHook.userBalance)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600/80 hover:bg-blue-500/80 text-white px-3 py-1 rounded text-xs font-mono font-bold transition-colors"
                        >
                          MAX
                        </button>
                      </div>
                      <p className="text-blue-400/60 font-mono text-xs mt-1">
                        Balance: {backingHook.userBalance} {selectedToken.backingSymbol}
                      </p>
                    </div>

                    <div>
                      <label className="block text-gray-400 font-mono text-sm mb-2">
                        LOAN_DURATION (days):
                      </label>
                      <select
                        value={leverageDays}
                        onChange={(e) => setLeverageDays(e.target.value)}
                        className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-blue-400/50"
                      >
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="180">180 days</option>
                        <option value="365">365 days</option>
                      </select>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                        <div>
                          <p className="text-blue-400">MAX_EXPOSURE:</p>
                          <p className="text-white text-lg">
                            {leverageAmount ? (parseFloat(leverageAmount) * 20).toFixed(2) : '0.00'}
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-400">INTEREST_RATE:</p>
                          <p className="text-white text-lg">3.9%</p>
                        </div>
                      </div>
                    </div>

                    {needsLeverageApproval ? (
                      <button
                        onClick={handleLeverageApprove}
                        disabled={!leverageAmount || backingHook.isPending}
                        className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-4 rounded-lg font-mono font-bold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {backingHook.isPending ? 'APPROVING...' : `APPROVE_${selectedToken.backingSymbol}`}
                      </button>
                    ) : (
                      <button
                        onClick={handleLeverage}
                        disabled={!leverageAmount || leverageHook.isPending || !leverageAllowance.data}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-lg font-mono font-bold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {leverageHook.isPending ? 'PROCESSING...' : 'OPEN_LEVERAGE'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Borrow Tab */}
              {activeTab === 'borrow' && (
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-purple-400 font-mono font-bold text-lg mb-4">🏦 BORROW AGAINST TOKENS</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 font-mono text-sm mb-2">
                        BORROW_AMOUNT ({selectedToken.backingSymbol}):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={borrowAmount}
                          onChange={(e) => setBorrowAmount(e.target.value)}
                          placeholder="0.0"
                          className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 pr-20 text-white font-mono focus:outline-none focus:border-purple-400/50"
                        />
                        <button
                          onClick={() => {
                            // Max borrow is 99% of token balance value
                            const maxBorrow = (parseFloat(leverageHook.userBalance) * parseFloat(selectedToken.price || '0') * 0.99).toString();
                            setBorrowAmount(maxBorrow);
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600/80 hover:bg-purple-500/80 text-white px-3 py-1 rounded text-xs font-mono font-bold transition-colors"
                        >
                          MAX
                        </button>
                      </div>
                      <p className="text-purple-400/60 font-mono text-xs mt-1">
                        Available: {(parseFloat(leverageHook.userBalance) * parseFloat(selectedToken.price || '0') * 0.99).toFixed(4)} {selectedToken.backingSymbol}
                      </p>
                    </div>

                    <div>
                      <label className="block text-gray-400 font-mono text-sm mb-2">
                        LOAN_DURATION (days):
                      </label>
                      <select
                        value={borrowDays}
                        onChange={(e) => setBorrowDays(e.target.value)}
                        className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-purple-400/50"
                      >
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="180">180 days</option>
                        <option value="365">365 days</option>
                      </select>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-purple-500/20">
                      <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                        <div>
                          <p className="text-purple-400">COLLATERAL_NEEDED:</p>
                          <p className="text-white text-lg">
                            {borrowAmount ? (parseFloat(borrowAmount) / parseFloat(selectedToken.price || '1') * 1.01).toFixed(4) : '0.0000'}
                          </p>
                        </div>
                        <div>
                          <p className="text-purple-400">BORROW_RATIO:</p>
                          <p className="text-white text-lg">99%</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleBorrow}
                      disabled={!borrowAmount || leverageHook.isPending}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-lg font-mono font-bold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {leverageHook.isPending ? 'PROCESSING...' : 'CREATE_LOAN'}
                    </button>
                  </div>
                </div>
              )}

              {/* Manage Tab */}
              {activeTab === 'manage' && (
                <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-mono font-bold text-lg mb-4">⚙️ MANAGE POSITION</h3>
                  
                  {leverageHook.hasActiveLoan && leverageHook.loan ? (
                    <div className="space-y-6">
                      {/* Loan Info */}
                      <div className="bg-black/50 rounded-lg p-4 border border-yellow-500/20">
                        <h4 className="text-yellow-400 font-mono font-semibold mb-3">ACTIVE_LOAN::</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                          <div>
                            <p className="text-gray-400">COLLATERAL:</p>
                            <p className="text-white">{leverageHook.loan.collateral}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">BORROWED:</p>
                            <p className="text-white">{leverageHook.loan.borrowed}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-400">END_DATE:</p>
                            <p className="text-white">{leverageHook.loan.endDate.toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Repay Section */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-400 font-mono text-sm mb-2">
                            REPAY_AMOUNT ({selectedToken.backingSymbol}):
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={repayAmount}
                              onChange={(e) => setRepayAmount(e.target.value)}
                              placeholder="0.0"
                              className="w-full bg-black/50 border border-yellow-500/30 rounded-lg px-4 py-3 pr-20 text-white font-mono focus:outline-none focus:border-yellow-400/50"
                            />
                            <button
                              onClick={() => {
                                if (leverageHook.loan) {
                                  setRepayAmount(leverageHook.loan.borrowed);
                                }
                              }}
                              disabled={!leverageHook.loan}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-600/80 hover:bg-yellow-500/80 text-white px-3 py-1 rounded text-xs font-mono font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              MAX
                            </button>
                          </div>
                          <p className="text-yellow-400/60 font-mono text-xs mt-1">
                            Borrowed: {leverageHook.loan ? leverageHook.loan.borrowed : '0.00'} {selectedToken.backingSymbol}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={handleRepay}
                            disabled={!repayAmount || leverageHook.isPending}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg font-mono font-bold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 disabled:opacity-50"
                          >
                            REPAY
                          </button>
                          <button
                            onClick={() => leverageHook.closePosition && leverageHook.closePosition()}
                            disabled={leverageHook.isPending}
                            className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-3 rounded-lg font-mono font-bold hover:from-red-500 hover:to-orange-500 transition-all duration-300 disabled:opacity-50"
                          >
                            CLOSE
                          </button>
                        </div>

                        <button
                          onClick={() => leverageHook.flashClose && leverageHook.flashClose()}
                          disabled={leverageHook.isPending}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-mono font-bold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50"
                        >
                          FLASH_CLOSE
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 font-mono text-lg mb-4">NO_ACTIVE_LOAN</p>
                      <p className="text-gray-500 font-mono text-sm">Create a leverage position or borrow to manage loans</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Token Info & User Stats */}
            <div className="space-y-6">
              {/* Token Stats */}
              <div className="bg-black/50 border border-gray-700/30 rounded-xl p-6">
                <h3 className="text-white font-mono font-bold text-lg mb-4">TOKEN_METRICS::</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/30 rounded-lg p-3">
                    <p className="text-green-400 font-mono text-xl font-bold">{selectedToken.price}</p>
                    <p className="text-xs font-mono text-gray-400">CURRENT_PRICE</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-3">
                    <p className="text-blue-400 font-mono text-xl font-bold">
                      {selectedToken.backing ? parseFloat(selectedToken.backing).toFixed(2) : '0.00'}
                    </p>
                    <p className="text-xs font-mono text-gray-400">BACKING_VALUE</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-3">
                    <p className="text-purple-400 font-mono text-xl font-bold">
                      {selectedToken.totalSupply ? parseFloat(selectedToken.totalSupply).toFixed(0) : '0'}
                    </p>
                    <p className="text-xs font-mono text-gray-400">TOTAL_SUPPLY</p>
                  </div>
                  <div className="bg-gray-900/30 rounded-lg p-3">
                    <p className="text-red-400 font-mono text-xl font-bold">
                      {selectedToken.buyFee?.toFixed(1) || '2.5'}%
                    </p>
                    <p className="text-xs font-mono text-gray-400">TRADING_FEE</p>
                  </div>
                </div>
              </div>

              {/* User Holdings */}
              <div className="bg-black/50 border border-gray-700/30 rounded-xl p-6">
                <h3 className="text-white font-mono font-bold text-lg mb-4">YOUR_POSITION::</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                    <span className="text-gray-400 font-mono text-sm">TOKEN_BALANCE:</span>
                    <span className="text-white font-mono">{leverageHook.userBalance}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                    <span className="text-gray-400 font-mono text-sm">BACKING_BALANCE:</span>
                    <span className="text-white font-mono">{backingHook.userBalance}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                    <span className="text-gray-400 font-mono text-sm">POSITION_VALUE:</span>
                    <span className="text-white font-mono">
                      ${(parseFloat(leverageHook.userBalance) * parseFloat(selectedToken.price || '0')).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                    <span className="text-gray-400 font-mono text-sm">ACTIVE_LOAN:</span>
                    <span className={`font-mono ${leverageHook.hasActiveLoan ? 'text-yellow-400' : 'text-green-400'}`}>
                      {leverageHook.hasActiveLoan ? 'YES' : 'NO'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400 font-mono text-sm">ALLOWANCE:</span>
                    <span className="text-white font-mono text-xs">
                      {buyAllowance.data ? parseFloat(formatEther(buyAllowance.data)).toFixed(2) : '0.00'} {selectedToken.backingSymbol}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transaction Status */}
              {((leverageHook.isPending || leverageHook.isConfirming) || (backingHook.isPending || backingHook.isConfirming)) && (
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-mono font-bold text-lg mb-4">TRANSACTION_STATUS::</h3>
                  
                  <div className="space-y-3">
                    {/* Approval Transaction Status */}
                    {backingHook.isPending && (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                        <span className="text-orange-400 font-mono text-sm">PENDING_APPROVAL</span>
                      </div>
                    )}
                    
                    {backingHook.isConfirming && (
                      <div className="flex items-center space-x-3">
                        <div className="animate-pulse w-4 h-4 bg-orange-400 rounded-full"></div>
                        <span className="text-orange-400 font-mono text-sm">CONFIRMING_APPROVAL</span>
                      </div>
                    )}

                    {/* Trading Transaction Status */}
                    {leverageHook.isPending && (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                        <span className="text-yellow-400 font-mono text-sm">PENDING_SIGNATURE</span>
                      </div>
                    )}
                    
                    {leverageHook.isConfirming && (
                      <div className="flex items-center space-x-3">
                        <div className="animate-pulse w-4 h-4 bg-blue-400 rounded-full"></div>
                        <span className="text-blue-400 font-mono text-sm">CONFIRMING_TRANSACTION</span>
                      </div>
                    )}
                    
                    {/* Transaction Hashes */}
                    {backingHook.hash && (
                      <div className="mt-3 p-3 bg-black/50 rounded-lg border border-gray-700/30">
                        <p className="text-gray-400 font-mono text-xs mb-1">APPROVAL_HASH:</p>
                        <p className="text-white font-mono text-xs break-all">{backingHook.hash}</p>
                      </div>
                    )}
                    
                    {leverageHook.hash && (
                      <div className="mt-3 p-3 bg-black/50 rounded-lg border border-gray-700/30">
                        <p className="text-gray-400 font-mono text-xs mb-1">TRANSACTION_HASH:</p>
                        <p className="text-white font-mono text-xs break-all">{leverageHook.hash}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(leverageHook.isConfirmed || backingHook.isConfirmed) && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                  <div className="space-y-3">
                    {backingHook.isConfirmed && (
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 font-mono font-bold">APPROVAL_CONFIRMED</span>
                      </div>
                    )}
                    {leverageHook.isConfirmed && (
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 font-mono font-bold">TRANSACTION_CONFIRMED</span>
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
  );
}

export default function LeverageTokensPage() {
  const publicClient = usePublicClient();
  const [mounted, setMounted] = useState(false);
  const [tokenPairs, setTokenPairs] = useState<TokenPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenPair | null>(null);
  const [showTradingModal, setShowTradingModal] = useState(false);

  const loadTokenPairs = useCallback(async () => {
    if (!publicClient) return;

    try {
      setLoading(true);

      // Get all token pairs from factory
      const result = await publicClient.readContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'getAllTokenPairs',
      });

      const [backingTokens, leverageContracts] = result;
      
      // Get detailed info for each token pair
      const pairs: TokenPair[] = [];
      
      for (let i = 0; i < backingTokens.length; i++) {
        try {
          const backingToken = backingTokens[i];
          const leverageContract = leverageContracts[i];

          // Get token info from factory
          const tokenInfo = await publicClient.readContract({
            address: FACTORY_ADDRESS,
            abi: FACTORY_ABI,
            functionName: 'getTokenInfo',
            args: [backingToken],
          });

          // Get backing token details
          const [backingName, backingSymbol] = await Promise.all([
            publicClient.readContract({
              address: backingToken,
              abi: ERC20_ABI,
              functionName: 'name',
            }).catch(() => 'Unknown'),
            publicClient.readContract({
              address: backingToken,
              abi: ERC20_ABI,
              functionName: 'symbol',
            }).catch(() => 'UNK'),
          ]);

          // Get leverage token details
          const [backing, totalSupply, buyFee] = await Promise.all([
            publicClient.readContract({
              address: leverageContract,
              abi: LEVERAGE_TOKEN_ABI,
              functionName: 'getBacking',
            }).catch(() => BigInt(0)),
            publicClient.readContract({
              address: leverageContract,
              abi: LEVERAGE_TOKEN_ABI,
              functionName: 'totalSupply',
            }).catch(() => BigInt(1)),
            publicClient.readContract({
              address: leverageContract,
              abi: LEVERAGE_TOKEN_ABI,
              functionName: 'getBuyFee',
            }).catch(() => BigInt(975)),
          ]);

          // Calculate price
          const price = totalSupply > BigInt(0) ? (Number(backing) / Number(totalSupply)) : 0;
          const feePercent = ((1000 - Number(buyFee)) / 10);

          pairs.push({
            backingToken,
            leverageContract,
            backingName: backingName as string,
            backingSymbol: backingSymbol as string,
            leverageName: tokenInfo.name,
            leverageSymbol: tokenInfo.symbol,
            price: price.toFixed(8),
            backing: formatEther(backing),
            totalSupply: formatEther(totalSupply),
            buyFee: feePercent,
            active: tokenInfo.active,
          });
        } catch (error) {
          console.error(`Error loading token pair ${i}:`, error);
        }
      }

      setTokenPairs(pairs);
    } catch (error) {
      console.error('Error loading token pairs:', error);
    } finally {
      setLoading(false);
    }
  }, [publicClient]);

  useEffect(() => {
    setMounted(true);
    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (publicClient) {
      loadTokenPairs();
    }
  }, [publicClient, loadTokenPairs]);

  const openTradingModal = (token: TokenPair) => {
    setSelectedToken(token);
    setShowTradingModal(true);
  };

  const closeTradingModal = () => {
    setSelectedToken(null);
    setShowTradingModal(false);
  };

  if (!mounted) return null;

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
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" style={{animationDuration: '3s', animationIterationCount: 'infinite'}}></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" style={{animationDelay: '1s', animationDuration: '4s', animationIterationCount: 'infinite'}}></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{animationDelay: '2s', animationDuration: '3.5s', animationIterationCount: 'infinite'}}></div>
        </div>

        {/* Mathematical symbols floating */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
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
      </div>

      {/* Cyberpunk Header */}
      <nav className="relative z-10 border-b border-red-500/30 bg-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center p-6 lg:px-12">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
            <VideoLogo size="medium" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight font-mono text-white">LEVERAGE</span>
              <span className="text-xs font-mono text-red-400">TOKENS</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">HOME</Link>
            <Link href="/docs" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">DOCS</Link>
            <span className="text-green-400 font-mono font-medium text-sm">[LEVERAGE]</span>
            <Link href="/dashboard" className="text-gray-400 hover:text-red-400 transition-colors font-mono text-sm">TRADING</Link>
          </div>

          <div className="flex items-center space-x-4">
            <MobileConnectButton />
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Header Section */}
        <section className="px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg px-6 py-2 border border-red-500/30 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-red-400 font-mono text-sm mr-2">FACTORY::</span>
                <span className="text-white font-mono text-xs">{FACTORY_ADDRESS}</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-mono mb-6">
                <span className="text-white">LEVERAGE </span>
                <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  TOKENS
                </span>
              </h1>
              <p className="text-xl text-gray-300 font-mono max-w-3xl mx-auto">
                Trade leverage tokens backed by real assets. Buy, Sell, Leverage, and Borrow against any listed token.
              </p>
            </div>
          </div>
        </section>

        {/* Token Listing Section */}
        <section className="px-6 lg:px-12 pb-20">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl p-12 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-red-400 font-mono">LOADING_TOKENS::</p>
              </div>
            ) : tokenPairs.length === 0 ? (
              <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl p-12 text-center">
                <p className="text-red-400 font-mono mb-4">NO_TOKENS_FOUND</p>
                <p className="text-gray-400 font-mono text-sm">Factory has not deployed any leverage tokens yet.</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {tokenPairs.map((token, index) => (
                  <div
                    key={`${token.backingToken}-${index}`}
                    className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl p-6 hover:border-red-400/50 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Scan line effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                    <div className="relative z-10">
                      {/* Token Header */}
                      <div className="flex items-center justify-between mb-6 border-b border-red-500/30 pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-red-500/30">
                            <span className="text-red-400 font-mono font-bold text-xl">🚀</span>
                          </div>
                          <div>
                            <h3 className="text-white font-mono font-bold text-lg">{token.leverageSymbol}</h3>
                            <p className="text-gray-400 font-mono text-xs">{token.leverageName}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-mono ${
                          token.active 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {token.active ? 'ACTIVE' : 'INACTIVE'}
                        </div>
                      </div>

                      {/* Backing Token Info */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg border border-blue-500/30">
                        <p className="text-blue-400 font-mono text-sm mb-1">BACKING_TOKEN::</p>
                        <p className="text-white font-mono font-semibold">{token.backingSymbol}</p>
                        <p className="text-gray-400 font-mono text-xs">{token.backingName}</p>
                      </div>

                      {/* Token Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
                          <p className="text-green-400 font-mono text-lg font-bold">
                            {token.price || '0.00000000'}
                          </p>
                          <p className="text-xs font-mono text-gray-400">PRICE/TOKEN</p>
                        </div>
                        <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
                          <p className="text-blue-400 font-mono text-lg font-bold">
                            {token.backing ? parseFloat(token.backing).toFixed(2) : '0.00'}
                          </p>
                          <p className="text-xs font-mono text-gray-400">BACKING_VALUE</p>
                        </div>
                        <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
                          <p className="text-purple-400 font-mono text-lg font-bold">
                            {token.totalSupply ? parseFloat(token.totalSupply).toFixed(0) : '0'}
                          </p>
                          <p className="text-xs font-mono text-gray-400">TOTAL_SUPPLY</p>
                        </div>
                        <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
                          <p className="text-red-400 font-mono text-lg font-bold">
                            {token.buyFee?.toFixed(1) || '2.5'}%
                          </p>
                          <p className="text-xs font-mono text-gray-400">BUY_FEE</p>
                        </div>
                      </div>

                      {/* Trading Button */}
                      {token.active ? (
                        <button
                          onClick={() => openTradingModal(token)}
                          className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white px-6 py-3 rounded-lg font-mono font-bold hover:from-red-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 border border-red-500/30 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <span className="relative z-10">🚀 TRADE_NOW</span>
                        </button>
                      ) : (
                        <div className="w-full bg-gray-600/20 text-gray-400 px-6 py-3 rounded-lg font-mono font-bold border border-gray-600/30 text-center cursor-not-allowed">
                          TOKEN_INACTIVE
                        </div>
                      )}

                      {/* Contract Addresses */}
                      <div className="mt-4 pt-4 border-t border-gray-700/30">
                        <div className="text-xs font-mono space-y-2">
                          <div>
                            <span className="text-gray-400">BACKING:: </span>
                            <span className="text-green-400 break-all">{token.backingToken}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">LEVERAGE:: </span>
                            <span className="text-blue-400 break-all">{token.leverageContract}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Comprehensive Trading Modal */}
        {showTradingModal && selectedToken && (
          <TradingInterface 
            selectedToken={selectedToken} 
            onClose={closeTradingModal}
          />
        )}
      </main>

      {/* Cyberpunk Footer */}
      <footer className="relative z-10 border-t border-red-500/30 bg-black/80 backdrop-blur-md px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <VideoLogo size="small" />
              <div className="flex flex-col">
                <span className="text-gray-400 font-mono">© 2025 LEVERAGE_PROTOCOL</span>
                <span className="text-xs text-red-400 font-mono">FACTORY: {FACTORY_ADDRESS.slice(0, 10)}...</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <p className="text-gray-400 font-mono text-sm">
                TOKENS_LOADED: {tokenPairs.filter(t => t.active).length}/{tokenPairs.length}
              </p>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}