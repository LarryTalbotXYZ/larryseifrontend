'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance, useChainId, useChains } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Activity, ArrowDownUp, RefreshCw, Layers } from 'lucide-react';
import { useLarryContract, useUserLarryData, useTradeCalculations } from '@/hooks/useLarryContract';
import { formatEther } from 'viem';

interface TradingInterfaceProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TradingInterface({ activeTab, setActiveTab }: TradingInterfaceProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const chains = useChains();
  const currentChain = chains.find(c => c.id === chainId);
  const nativeSymbol = currentChain?.nativeCurrency?.symbol ?? 'ETH';
  const chainName = currentChain?.name ?? 'Base Network';
  const { buyLarry, sellLarry, openLeverage, createLoan, borrowMore, isPending, isConfirmed, buyFeePercent, sellFeePercent, leverageFeePercent } = useLarryContract();
  const { balance, loan, hasActiveLoan } = useUserLarryData(address);
  const { useBuyAmount, useSellAmount, useBorrowCollateral, useLeverageFee } = useTradeCalculations();
  
  const { data: ethBalance, isLoading: ethBalanceLoading } = useBalance({
    address: address,
    query: {
      enabled: !!address && isConnected,
      refetchInterval: 5000,
    }
  });

  const [inputAmount, setInputAmount] = useState('');
  const [days, setDays] = useState('365');
  const [outputAmount, setOutputAmount] = useState('0');
  const [requiredCollateral, setRequiredCollateral] = useState('0');
  const [maxBorrowAmount, setMaxBorrowAmount] = useState('0');
  const [isMaxCalibrating, setIsMaxCalibrating] = useState(false);
  const [maxTargetPayment, setMaxTargetPayment] = useState(0);
  const [maxIter, setMaxIter] = useState(0);

  const { data: buyData } = useBuyAmount(inputAmount);
  const { data: sellData } = useSellAmount(inputAmount);
  const { data: larryValueInETH } = useSellAmount(balance);
  const { data: exactCollateralData } = useBorrowCollateral(inputAmount);
  const { data: leverageFeeData } = useLeverageFee(inputAmount, parseInt(days));
  
  const [leverageQuote, setLeverageQuote] = useState<{
    ethPosition: string;
    requiredEth: string;
    leverageRatio: string;
    borrowAmount: string;
    totalFee: string;
    apr: string;
  } | null>(null);
  
  useEffect(() => {
    if (larryValueInETH && parseFloat(balance) > 0) {
      const larryValueETH = parseFloat(formatEther(larryValueInETH as bigint));
      const maxBorrowFloored = Math.floor(larryValueETH * 0.99 * 1e6) / 1e6;
      setMaxBorrowAmount(maxBorrowFloored.toString());
    } else {
      setMaxBorrowAmount('0');
    }
  }, [balance, larryValueInETH]);

  useEffect(() => {
    if (leverageFeeData && inputAmount && activeTab === 'leverage') {
      const ethPosition = parseFloat(inputAmount);
      const leverageFee = parseFloat(formatEther(leverageFeeData as bigint));
      const userETH = ethPosition - leverageFee;
      const overCollateralization = userETH / 100;
      const totalFees = leverageFee + overCollateralization;
      const requiredEthExact = Math.ceil(totalFees * 1e6) / 1e6;
      const borrowAmount = userETH * 0.99;
      const leverageRatio = ethPosition / totalFees;
      
      setLeverageQuote({
        ethPosition: ethPosition.toFixed(2),
        requiredEth: requiredEthExact.toString(),
        leverageRatio: leverageRatio.toFixed(1),
        borrowAmount: borrowAmount.toFixed(2),
        totalFee: totalFees.toFixed(2),
        apr: '3.9'
      });
    } else if (activeTab === 'leverage') {
      setLeverageQuote(null);
    }
  }, [inputAmount, leverageFeeData, activeTab, days]);

  useEffect(() => {
    if (!inputAmount || inputAmount === '0') {
      setOutputAmount('0');
      setRequiredCollateral('0');
      return;
    }

    if (activeTab === 'buy' && buyData) setOutputAmount(formatEther(buyData as bigint));
    else if (activeTab === 'sell' && sellData) setOutputAmount(formatEther(sellData as bigint));
    else if (activeTab === 'borrow') {
      if (exactCollateralData) setRequiredCollateral(formatEther(exactCollateralData as bigint));
      else setRequiredCollateral('0');
    }
  }, [inputAmount, activeTab, buyData, sellData, exactCollateralData]);

  const handleTrade = async () => {
    if (!address || !inputAmount) return;
    try {
      switch (activeTab) {
        case 'buy': buyLarry(inputAmount, address); break;
        case 'sell': sellLarry(inputAmount); break;
        case 'leverage': if (leverageQuote) openLeverage(inputAmount, parseInt(days), leverageQuote.requiredEth); break;
        case 'borrow': hasActiveLoan ? borrowMore(inputAmount) : createLoan(inputAmount, parseInt(days)); break;
      }
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  const handleMaxClick = () => {
    if (activeTab === 'buy' && ethBalance?.value) {
      const rawBalance = parseFloat(formatEther(ethBalance.value));
      const maxAmount = Math.max(0, rawBalance - 0.0005); // L2 gas is very cheap
      if (maxAmount > 0) setInputAmount(maxAmount.toFixed(6).replace(/\.?0+$/, '') || '0');
    } else if (activeTab === 'sell' && parseFloat(balance) > 0) {
      setInputAmount(balance);
    } else if (activeTab === 'leverage' && ethBalance?.value) {
      const availableBalance = Math.max(0, parseFloat(formatEther(ethBalance.value)) - 0.0005);
      const daysNum = parseInt(days) || 0;
      const aprPercent = 3.9;
      const interestPercent = aprPercent * (daysNum / 365);
      const baseLeverageFeePercent = parseFloat(leverageFeePercent || '1');
      const effectivePaymentFactor = 0.01 + 0.99 * ((baseLeverageFeePercent + interestPercent) / 100);
      const estimatedMaxPosition = effectivePaymentFactor > 0 ? availableBalance / effectivePaymentFactor : 0;
      setMaxTargetPayment(availableBalance);
      setMaxIter(0);
      setIsMaxCalibrating(true);
      setInputAmount(estimatedMaxPosition.toFixed(6));
    } else if (activeTab === 'borrow' && parseFloat(maxBorrowAmount) > 0) {
      setInputAmount(maxBorrowAmount);
    }
  };

  useEffect(() => {
    if (!isMaxCalibrating || !inputAmount || !leverageFeeData) return;
    const available = maxTargetPayment;
    const position = parseFloat(inputAmount);
    const fee = parseFloat(formatEther(leverageFeeData as bigint));
    const userETH = Math.max(0, position - fee);
    const payment = fee + userETH / 100;
    const diff = available - payment;

    if (Math.abs(diff) / (available || 1) <= 0.01 || maxIter >= 5) {
      if (payment > available && payment > 0) {
        setInputAmount((position * ((available / payment) * 0.99)).toFixed(6).replace(/\.?0+$/, '') || '0');
      } else {
        setInputAmount(position.toFixed(6).replace(/\.?0+$/, '') || '0');
      }
      setIsMaxCalibrating(false);
      return;
    }
    if (payment === 0) { setIsMaxCalibrating(false); return; }

    const scale = available / payment;
    const conservativeScale = diff > 0 ? Math.min(scale, 1.02) : Math.max(scale, 0.98);
    setInputAmount((position * conservativeScale).toFixed(6).replace(/\.?0+$/, '') || '0');
    setMaxIter((i) => i + 1);
  }, [isMaxCalibrating, leverageFeeData, inputAmount, maxTargetPayment, maxIter]);

  if (!isConnected) {
    return (
      <div className="glass-panel p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6">
          <Activity className="w-8 h-8 text-violet-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Connect Wallet</h3>
        <p className="text-slate-400 mb-8 max-w-sm">Connect your Web3 wallet to access the LARRY trading protocol and advanced leverage options.</p>
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button
              onClick={openConnectModal}
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10"
            >
              Connect Wallet
            </button>
          )}
        </ConnectButton.Custom>
      </div>
    );
  }

  const tabs = [
    { id: 'buy', label: 'Buy' },
    { id: 'sell', label: 'Sell' },
    { id: 'leverage', label: 'Leverage' },
    { id: 'borrow', label: 'Borrow' }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 w-full max-w-xl mx-auto">
      {/* Balances header */}
      <div className="flex justify-between items-center mb-6 text-sm font-medium">
        <div className="flex bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
          <span className="text-slate-400 mr-2">{nativeSymbol}:</span>
          <span className="text-white">
            {ethBalanceLoading ? '...' : ethBalance ? parseFloat(formatEther(ethBalance.value)).toFixed(8).replace(/\.?0+$/, '') || '0' : '0.00'}
          </span>
        </div>
        <div className="flex bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
          <span className="text-slate-400 mr-2">LARRY:</span>
          <span className="text-white">{parseFloat(balance).toFixed(8).replace(/\.?0+$/, '') || '0'}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Main Input */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-slate-400">
            <label>{activeTab === 'buy' || activeTab === 'leverage' ? `Amount (${nativeSymbol})` : 'Amount (LARRY)'}</label>
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="0.0"
              min="0"
              value={inputAmount}
              onChange={(e) => {
                const val = e.target.value;
                if (!val || parseFloat(val) >= 0) setInputAmount(val);
              }}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-4 pr-20 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all outline-none text-2xl font-medium"
            />
            <button
              onClick={handleMaxClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-800 hover:bg-slate-700 text-violet-400 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Action Specific Fields */}
        {(activeTab === 'leverage' || (!hasActiveLoan && activeTab === 'borrow')) && (
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm font-medium text-slate-400">
              <label>Duration (Days)</label>
              <span className="text-violet-400">{days} Days</span>
            </div>
            <input
              type="range"
              min="1"
              max="365"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full accent-violet-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {/* Output/Summary Panels */}
        {(activeTab === 'buy' || activeTab === 'sell') && (
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">You will receive</span>
              <span className="font-semibold text-white">
                ~{parseFloat(outputAmount).toFixed(8).replace(/\.?0+$/, '') || '0'} {activeTab === 'buy' ? 'LARRY' : nativeSymbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Protocol Fee</span>
              <span className="text-violet-400">{activeTab === 'buy' ? buyFeePercent : sellFeePercent}%</span>
            </div>
          </div>
        )}

        {activeTab === 'leverage' && leverageQuote && (
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Target Exposure</span>
              <span className="font-semibold text-white">{parseFloat(leverageQuote.ethPosition).toFixed(8).replace(/\.?0+$/, '') || '0'} {nativeSymbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Payment</span>
              <span className="font-semibold text-white">{parseFloat(leverageQuote.requiredEth).toFixed(8).replace(/\.?0+$/, '') || '0'} {nativeSymbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Leverage Multiplier</span>
              <span className="text-violet-400 font-bold">{leverageQuote.leverageRatio}x</span>
            </div>
          </div>
        )}

        {activeTab === 'borrow' && (
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Receive Amount</span>
              <span className="font-semibold text-white">{inputAmount ? (parseFloat(inputAmount) * 0.99).toFixed(8).replace(/\.?0+$/, '') || '0' : '0.00'} ETH</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Required Collateral</span>
              <span className="font-semibold text-white">{parseFloat(requiredCollateral).toFixed(8).replace(/\.?0+$/, '') || '0'} LARRY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">APR</span>
              <span className="text-violet-400">3.9%</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleTrade}
          disabled={
            isPending || 
            !inputAmount || 
            (activeTab === 'borrow' && parseFloat(inputAmount) > parseFloat(maxBorrowAmount)) || 
            (activeTab === 'borrow' && parseFloat(requiredCollateral) > parseFloat(balance)) ||
            (activeTab === 'leverage' && (!leverageQuote || parseFloat(leverageQuote.requiredEth) > parseFloat(formatEther(ethBalance?.value || BigInt(0)))))
          }
          className="w-full bg-violet-600 text-white py-4 rounded-xl font-bold hover:bg-violet-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          {isPending ? 'Processing...' : 
           (activeTab === 'borrow' && parseFloat(inputAmount) > parseFloat(maxBorrowAmount)) ? 'Insufficient Collateral' :
           (activeTab === 'leverage' && leverageQuote && parseFloat(leverageQuote.requiredEth) > parseFloat(formatEther(ethBalance?.value || BigInt(0)))) ? 'Insufficient Balance' :
           `Execute ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
        </button>

        {isConfirmed && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-xl text-sm font-medium text-center">
            Transaction successfully confirmed!
          </div>
        )}
      </div>
    </div>
  );
}