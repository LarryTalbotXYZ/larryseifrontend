'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Zap } from 'lucide-react';
import { useLarryContract, useUserLarryData, useTradeCalculations } from '@/hooks/useLarryContract';
import { formatEther } from 'viem';

interface TradingInterfaceProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TradingInterface({ activeTab, setActiveTab }: TradingInterfaceProps) {
  const { address, isConnected } = useAccount();
  const { buyLarry, sellLarry, openLeverage, createLoan, isPending, isConfirmed } = useLarryContract();
  const { balance } = useUserLarryData(address);
  const { useBuyAmount, useSellAmount } = useTradeCalculations();
  
  // Get SEI balance for buy max button
  const { data: seiBalance } = useBalance({
    address: address,
  });
  
  const [inputAmount, setInputAmount] = useState('');
  const [days, setDays] = useState('30');
  const [outputAmount, setOutputAmount] = useState('0');

  const { data: buyData } = useBuyAmount(inputAmount);
  const { data: sellData } = useSellAmount(inputAmount);

  // Calculate output amounts when input changes
  useEffect(() => {
    if (!inputAmount || inputAmount === '0') {
      setOutputAmount('0');
      return;
    }

    if (activeTab === 'buy' && buyData) {
      setOutputAmount(formatEther(buyData as bigint));
    } else if (activeTab === 'sell' && sellData) {
      setOutputAmount(formatEther(sellData as bigint));
    }
  }, [inputAmount, activeTab, buyData, sellData]);

  const handleTrade = async () => {
    if (!address || !inputAmount) return;

    try {
      switch (activeTab) {
        case 'buy':
          buyLarry(inputAmount, address);
          break;
        case 'sell':
          sellLarry(inputAmount);
          break;
        case 'leverage':
          openLeverage(inputAmount, parseInt(days));
          break;
        case 'borrow':
          createLoan(inputAmount, parseInt(days));
          break;
      }
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  const handleMaxClick = () => {
    if (activeTab === 'buy') {
      // For buying, use SEI balance (leave some for gas)
      if (seiBalance) {
        const maxAmount = Math.max(0, parseFloat(formatEther(seiBalance.value)) - 0.01); // Keep 0.01 SEI for gas
        setInputAmount(maxAmount.toString());
      }
    } else if (activeTab === 'sell') {
      // For selling, use LARRY balance
      setInputAmount(balance);
    }
  };

  if (!isConnected) {
    return (
      <div className="werewolf-card p-8 rounded-2xl text-center">
        <h3 className="text-2xl font-bold text-[#ffd700] mb-6">Connect Your Wallet</h3>
        <p className="text-[#e6e6f0]/70 mb-8">
          Connect your wallet to start trading LARRY tokens and accessing DeFi features.
        </p>
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button
              onClick={openConnectModal}
              className="bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#b8860b] hover:to-[#ffd700] transition-all transform hover:scale-105"
            >
              Connect Wallet
            </button>
          )}
        </ConnectButton.Custom>
      </div>
    );
  }

  return (
    <div className="werewolf-card p-8 rounded-2xl">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        {['buy', 'sell', 'leverage', 'borrow'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-[#ffd700] text-[#0a0a0f]'
                : 'bg-[#2c2c34] text-[#e6e6f0] hover:bg-[#3c3c44]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* User Balances */}
      <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/10 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#e6e6f0]/70">Your LARRY Balance:</span>
          <span className="text-[#ffd700] font-semibold">{balance} LARRY</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#e6e6f0]/70">Your SEI Balance:</span>
          <span className="text-[#c0c0c0] font-semibold">
            {seiBalance ? parseFloat(formatEther(seiBalance.value)).toFixed(4) : '0.0000'} SEI
          </span>
        </div>
      </div>

      {/* Buy/Sell Interface */}
      {(activeTab === 'buy' || activeTab === 'sell') && (
        <div className="space-y-6">
          <div>
            <label className="block text-[#e6e6f0] mb-2 font-medium">
              {activeTab === 'buy' ? 'SEI Amount' : 'LARRY Amount'}
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.0"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-4 py-3 pr-16 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none"
              />
              <button
                onClick={handleMaxClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#ffd700] text-[#0a0a0f] px-3 py-1 rounded text-sm font-semibold hover:bg-[#b8860b] transition-colors"
              >
                Max
              </button>
            </div>
          </div>
          <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/10">
            <div className="flex justify-between text-sm">
              <span className="text-[#e6e6f0]/70">You will receive:</span>
              <span className="text-[#ffd700] font-semibold">
                {outputAmount} {activeTab === 'buy' ? 'LARRY' : 'SEI'}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-[#e6e6f0]/70">Fee:</span>
              <span className="text-[#e6e6f0]">0.1%</span>
            </div>
          </div>
          <button
            onClick={handleTrade}
            disabled={isPending || !inputAmount}
            className="w-full bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] py-4 rounded-lg font-bold text-lg hover:from-[#b8860b] hover:to-[#ffd700] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Processing...' : `${activeTab === 'buy' ? 'Buy' : 'Sell'} LARRY`}
          </button>
        </div>
      )}

      {/* Leverage Interface */}
      {activeTab === 'leverage' && (
        <div className="space-y-6">
          <div>
            <label className="block text-[#e6e6f0] mb-2 font-medium">SEI Amount</label>
            <input
              type="number"
              placeholder="0.0"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-4 py-3 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#e6e6f0] mb-2 font-medium">Loan Duration (Days)</label>
            <input
              type="number"
              placeholder="30"
              max="365"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-4 py-3 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none"
            />
          </div>
          <div className="bg-[#8b0000]/20 p-4 rounded-lg border border-[#8b0000]/40">
            <div className="flex justify-between text-sm">
              <span className="text-[#e6e6f0]/70">Interest Rate:</span>
              <span className="text-[#8b0000] font-semibold">3.9% APR</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-[#e6e6f0]/70">Leverage Fee:</span>
              <span className="text-[#e6e6f0]">1%</span>
            </div>
          </div>
          <button
            onClick={handleTrade}
            disabled={isPending || !inputAmount}
            className="w-full bg-gradient-to-r from-[#8b0000] to-[#b8860b] text-white py-4 rounded-lg font-bold text-lg hover:from-[#a00000] hover:to-[#d4af00] transition-all transform hover:scale-105 disabled:opacity-50"
          >
            <Zap className="w-5 h-5 inline mr-2" />
            {isPending ? 'Processing...' : 'Open Leveraged Position'}
          </button>
        </div>
      )}

      {/* Borrow Interface */}
      {activeTab === 'borrow' && (
        <div className="space-y-6">
          <div>
            <label className="block text-[#e6e6f0] mb-2 font-medium">SEI to Borrow</label>
            <input
              type="number"
              placeholder="0.0"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-4 py-3 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[#e6e6f0] mb-2 font-medium">Loan Duration (Days)</label>
            <input
              type="number"
              placeholder="30"
              max="365"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-4 py-3 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none"
            />
          </div>
          <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/10">
            <div className="flex justify-between text-sm">
              <span className="text-[#e6e6f0]/70">Required LARRY Collateral:</span>
              <span className="text-[#ffd700] font-semibold">{outputAmount} LARRY</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-[#e6e6f0]/70">Interest Fee:</span>
              <span className="text-[#e6e6f0]">3.9% APR</span>
            </div>
          </div>
          <button
            onClick={handleTrade}
            disabled={isPending || !inputAmount}
            className="w-full bg-gradient-to-r from-[#c0c0c0] to-[#ffd700] text-[#0a0a0f] py-4 rounded-lg font-bold text-lg hover:from-[#d0d0d0] hover:to-[#b8860b] transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {isPending ? 'Processing...' : 'Create Loan'}
          </button>
        </div>
      )}

      {/* Transaction Status */}
      {isConfirmed && (
        <div className="mt-6 p-4 bg-green-500/20 border border-green-500/40 rounded-lg">
          <p className="text-green-400 font-semibold">Transaction confirmed!</p>
        </div>
      )}
    </div>
  );
}