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
  const { buyLarry, sellLarry, openLeverage, createLoan, borrowMore, isPending, isConfirmed, buyFeePercent, sellFeePercent } = useLarryContract();
  const { balance, loan, hasActiveLoan } = useUserLarryData(address);
  const { useBuyAmount, useSellAmount, useBorrowCollateral, useLeverageFee } = useTradeCalculations();
  
  // Get SEI balance for buy max button
  const { data: seiBalance } = useBalance({
    address: address,
  });
  
  const [inputAmount, setInputAmount] = useState('');
  const [days, setDays] = useState('365');
  const [outputAmount, setOutputAmount] = useState('0');
  const [requiredCollateral, setRequiredCollateral] = useState('0');
  const [maxBorrowAmount, setMaxBorrowAmount] = useState('0');

  const { data: buyData } = useBuyAmount(inputAmount);
  const { data: sellData } = useSellAmount(inputAmount);
  
  // Get LARRY value in ETH for max borrow calculation
  const { data: larryValueInETH } = useSellAmount(balance);
  
  // Get exact required LARRY collateral from contract
  const { data: exactCollateralData } = useBorrowCollateral(inputAmount);
  
  // Get leverage fee for current input
  const { data: leverageFeeData } = useLeverageFee(inputAmount, parseInt(days));
  
  // Calculate leverage quote
  const [leverageQuote, setLeverageQuote] = useState<{
    ethPosition: string;
    requiredEth: string;
    leverageRatio: string;
    borrowAmount: string;
    totalFee: string;
    apr: string;
  } | null>(null);
  
  // Calculate maximum borrowable amount based on LARRY balance
  useEffect(() => {
    if (larryValueInETH && parseFloat(balance) > 0) {
      // User can borrow up to 99% of their LARRY collateral value in ETH
      const larryValueETH = parseFloat(formatEther(larryValueInETH as bigint));
      const maxBorrow = (larryValueETH * 0.99).toFixed(4);
      setMaxBorrowAmount(maxBorrow);
    } else {
      setMaxBorrowAmount('0');
    }
  }, [balance, larryValueInETH]);

  // Calculate leverage quote when input changes
  useEffect(() => {
    if (leverageFeeData && inputAmount && activeTab === 'leverage') {
      const ethPosition = parseFloat(inputAmount);
      const leverageFee = parseFloat(formatEther(leverageFeeData as bigint));
      const userETH = ethPosition - leverageFee;
      const overCollateralization = userETH / 100;
      const totalFees = leverageFee + overCollateralization;
      const borrowAmount = userETH * 0.99;
      const leverageRatio = ethPosition / totalFees;
      
      setLeverageQuote({
        ethPosition: ethPosition.toFixed(4),
        requiredEth: totalFees.toFixed(4),
        leverageRatio: leverageRatio.toFixed(1),
        borrowAmount: borrowAmount.toFixed(4),
        totalFee: totalFees.toFixed(4),
        apr: '3.9'
      });
    } else if (activeTab === 'leverage') {
      setLeverageQuote(null);
    }
  }, [inputAmount, leverageFeeData, activeTab, days]);

  // Calculate output amounts and collateral requirements when input changes
  useEffect(() => {
    if (!inputAmount || inputAmount === '0') {
      setOutputAmount('0');
      setRequiredCollateral('0');
      return;
    }

    if (activeTab === 'buy' && buyData) {
      setOutputAmount(formatEther(buyData as bigint));
    } else if (activeTab === 'sell' && sellData) {
      setOutputAmount(formatEther(sellData as bigint));
    } else if (activeTab === 'borrow') {
      // Use exact contract calculation for required LARRY collateral
      if (exactCollateralData) {
        const requiredLarryCollateral = formatEther(exactCollateralData as bigint);
        setRequiredCollateral(requiredLarryCollateral);
      } else {
        setRequiredCollateral('0');
      }
    }
  }, [inputAmount, activeTab, buyData, sellData, exactCollateralData]);

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
          if (leverageQuote) {
            openLeverage(inputAmount, parseInt(days), leverageQuote.requiredEth);
          }
          break;
        case 'borrow':
          if (hasActiveLoan) {
            borrowMore(inputAmount);
          } else {
            createLoan(inputAmount, parseInt(days));
          }
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
    } else if (activeTab === 'leverage') {
      // For leverage, calculate max position size based on available fees
      if (seiBalance) {
        const availableBalance = Math.max(0, parseFloat(formatEther(seiBalance.value)) - 0.01);
        // Estimate max position where fees = available balance
        // Since fees are roughly 20-25% of position, max position = available * 4
        const estimatedMaxPosition = availableBalance * 4;
        setInputAmount(estimatedMaxPosition.toFixed(4));
      }
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
    <div className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-2xl">
      {/* Tab Navigation */}
      <div className="grid grid-cols-2 sm:flex sm:space-x-4 gap-2 sm:gap-0 mb-6 sm:mb-8">
        {['buy', 'sell', 'leverage', 'borrow'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold capitalize transition-all text-sm sm:text-base ${
              activeTab === tab
                ? 'bg-[#ffd700] text-[#0a0a0f]'
                : 'bg-[#2c2c34] text-[#e6e6f0] hover:bg-[#3c3c44]'
            }`}
          >
            {tab === 'borrow' && hasActiveLoan ? 'borrow more' : tab}
          </button>
        ))}
      </div>

      {/* User Balances */}
      <div className="bg-[#1a1a2e] p-3 sm:p-4 rounded-lg border border-[#ffd700]/10 mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#e6e6f0]/70 text-sm sm:text-base">Your LARRY Balance:</span>
          <span className="text-[#ffd700] font-semibold text-sm sm:text-base">{balance} LARRY</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#e6e6f0]/70 text-sm sm:text-base">Your SEI Balance:</span>
          <span className="text-[#c0c0c0] font-semibold text-sm sm:text-base">
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
                className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-12 sm:pr-16 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none text-sm sm:text-base"
              />
              <button
                onClick={handleMaxClick}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-[#ffd700] text-[#0a0a0f] px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold hover:bg-[#b8860b] transition-colors"
              >
                Max
              </button>
            </div>
          </div>
          <div className="bg-[#1a1a2e] p-3 sm:p-4 rounded-lg border border-[#ffd700]/10">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-[#e6e6f0]/70">You will receive:</span>
              <span className="text-[#ffd700] font-semibold">
                {outputAmount} {activeTab === 'buy' ? 'LARRY' : 'SEI'}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm mt-2">
              <span className="text-[#e6e6f0]/70">Fee:</span>
              <span className="text-[#e6e6f0]">{activeTab === 'buy' ? buyFeePercent : sellFeePercent}%</span>
            </div>
          </div>
          <button
            onClick={handleTrade}
            disabled={isPending || !inputAmount}
            className="w-full bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:from-[#b8860b] hover:to-[#ffd700] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Processing...' : `${activeTab === 'buy' ? 'Buy' : 'Sell'} LARRY`}
          </button>
        </div>
      )}

      {/* Leverage Interface */}
      {activeTab === 'leverage' && (
        <div className="space-y-6">
          {/* Balance Info */}
          <div className="bg-[#1a1a2e] p-3 sm:p-4 rounded-lg border border-[#ffd700]/10">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-[#e6e6f0]/70">Your SEI Balance:</span>
              <span className="text-[#c0c0c0] font-semibold">
                {seiBalance ? parseFloat(formatEther(seiBalance.value)).toFixed(4) : '0.0000'} SEI
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[#e6e6f0] mb-2 font-medium">SEI Position Size</label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter SEI amount for leveraged position"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-12 sm:pr-16 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none text-sm sm:text-base"
              />
              <button
                onClick={handleMaxClick}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-[#ffd700] text-[#0a0a0f] px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold hover:bg-[#b8860b] transition-colors"
              >
                Max
              </button>
            </div>
            <p className="text-xs text-[#e6e6f0]/60 mt-1">
              This is the total SEI position size you want to leverage. You&apos;ll only pay fees + 1% collateral.
            </p>
          </div>

          <div>
            <label className="block text-[#e6e6f0] mb-2 font-medium">Loan Duration (Days)</label>
            <input
              type="number"
              placeholder="365"
              max="365"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none text-sm sm:text-base"
            />
          </div>

          {leverageQuote && (
            <div className="bg-[#8b0000]/20 p-3 sm:p-4 rounded-lg border border-[#8b0000]/40 space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-[#e6e6f0]/70">Position Size:</span>
                <span className="font-medium text-[#ffd700]">{leverageQuote.ethPosition} SEI</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-[#e6e6f0]/70">Your Payment:</span>
                <span className="font-medium text-[#8b0000]">{leverageQuote.requiredEth} SEI</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-base text-[#e6e6f0]">Leverage:</span>
                <span className="font-bold text-base text-[#ffd700]">
                  {leverageQuote.leverageRatio}x
                </span>
              </div>
              <hr className="border-[#8b0000]/40" />
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-[#e6e6f0]/70">SEI You&apos;ll Borrow:</span>
                <span className="font-medium text-[#c0c0c0]">{leverageQuote.borrowAmount} SEI</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-[#e6e6f0]/70">Total Fee:</span>
                <span className="font-medium text-[#c0c0c0]">{leverageQuote.totalFee} SEI</span>
              </div>
              <div className="text-xs text-[#e6e6f0]/60 mt-2">
                <p>Interest APR: {leverageQuote.apr}%</p>
                <p>Loan Duration: {days} days</p>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="bg-yellow-500/20 p-3 sm:p-4 rounded-lg border border-yellow-500/40">
            <div className="flex items-start space-x-3">
              <div className="text-sm text-yellow-200">
                <p className="font-semibold mb-1">How LARRY Leverage Works</p>
                <p>You specify a SEI position size. The protocol mints LARRY as collateral and borrows most of the SEI for your position. You only pay fees + 1% collateral. If the loan expires, your LARRY collateral is liquidated.</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleTrade}
            disabled={isPending || !inputAmount || !leverageQuote || (leverageQuote && parseFloat(leverageQuote.requiredEth) > parseFloat(formatEther(seiBalance?.value || BigInt(0))))}
            className="w-full bg-gradient-to-r from-[#8b0000] to-[#b8860b] text-white py-4 rounded-lg font-bold text-lg hover:from-[#a00000] hover:to-[#d4af00] transition-all transform hover:scale-105 disabled:opacity-50"
          >
            <Zap className="w-5 h-5 inline mr-2" />
            {isPending ? 'Processing...' : 
             !leverageQuote ? 'Enter Position Size' :
             (leverageQuote && parseFloat(leverageQuote.requiredEth) > parseFloat(formatEther(seiBalance?.value || BigInt(0)))) ? 'Insufficient Balance' :
             'Open Leveraged Position'}
          </button>
        </div>
      )}

      {/* Borrow Interface */}
      {activeTab === 'borrow' && (
        <div className="space-y-6">
          {/* Current Loan Info (if exists) */}
          {hasActiveLoan && loan && (
            <div className="bg-blue-900/20 p-3 sm:p-4 rounded-lg border border-blue-500/40">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-blue-300 font-semibold">Current Loan</h4>
                <span className="text-xs text-blue-200">
                  Expires: {loan.endDate.toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-[#e6e6f0]/70">Borrowed:</span>
                  <div className="text-blue-300 font-semibold">{parseFloat(loan.borrowed).toFixed(4)} SEI</div>
                </div>
                <div>
                  <span className="text-[#e6e6f0]/70">Collateral:</span>
                  <div className="text-blue-300 font-semibold">{parseFloat(loan.collateral).toFixed(4)} LARRY</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Borrow Limits Info */}
          <div className="bg-[#1a1a2e] p-3 sm:p-4 rounded-lg border border-[#ffd700]/10">
            <div className="flex justify-between text-xs sm:text-sm mb-2">
              <span className="text-[#e6e6f0]/70">Your LARRY Balance:</span>
              <span className="text-[#ffd700] font-semibold">{balance} LARRY</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-[#e6e6f0]/70">{hasActiveLoan ? 'Additional Borrowable:' : 'Max Borrowable:'}</span>
              <span className="text-[#c0c0c0] font-semibold">{maxBorrowAmount} SEI</span>
            </div>
            <div className="text-xs text-[#e6e6f0]/60 mt-2">
              {hasActiveLoan 
                ? 'You can borrow more using your existing loan position'
                : '99% collateralization required - you can borrow up to 99% of your LARRY value'
              }
            </div>
          </div>
          
          <div>
            <label className="block text-[#e6e6f0] mb-2 font-medium">
              {hasActiveLoan ? 'Additional SEI to Borrow' : 'SEI to Borrow'}
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.0"
                value={inputAmount}
                max={maxBorrowAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-12 sm:pr-16 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none text-sm sm:text-base"
              />
              <button
                onClick={() => setInputAmount(maxBorrowAmount)}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-[#ffd700] text-[#0a0a0f] px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold hover:bg-[#b8860b] transition-colors"
              >
                Max
              </button>
            </div>
            {inputAmount && parseFloat(inputAmount) > parseFloat(maxBorrowAmount) && (
              <div className="text-red-400 text-xs mt-1">
                Cannot borrow more than {maxBorrowAmount} SEI with current LARRY balance
              </div>
            )}
          </div>
          
          {!hasActiveLoan && (
            <div>
              <label className="block text-[#e6e6f0] mb-2 font-medium">Loan Duration (Days)</label>
              <input
                type="number"
                placeholder="365"
                max="365"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none text-sm sm:text-base"
              />
            </div>
          )}
          
          <div className="bg-[#1a1a2e] p-3 sm:p-4 rounded-lg border border-[#ffd700]/10">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-[#e6e6f0]/70">
                {hasActiveLoan ? 'Additional LARRY Collateral:' : 'Required LARRY Collateral:'}
              </span>
              <span className="text-[#ffd700] font-semibold">{requiredCollateral} LARRY</span>
            </div>
            {!hasActiveLoan && (
              <div className="flex justify-between text-xs sm:text-sm mt-2">
                <span className="text-[#e6e6f0]/70">Interest Rate:</span>
                <span className="text-[#e6e6f0]">3.9% APR</span>
              </div>
            )}
            <div className="flex justify-between text-xs sm:text-sm mt-2">
              <span className="text-[#e6e6f0]/70">You will receive:</span>
              <span className="text-[#c0c0c0]">{inputAmount ? (parseFloat(inputAmount) * 0.99).toFixed(4) : '0'} SEI</span>
            </div>
          </div>
          
          <button
            onClick={handleTrade}
            disabled={isPending || !inputAmount || parseFloat(inputAmount) > parseFloat(maxBorrowAmount) || parseFloat(requiredCollateral) > parseFloat(balance)}
            className="w-full bg-gradient-to-r from-[#c0c0c0] to-[#ffd700] text-[#0a0a0f] py-4 rounded-lg font-bold text-lg hover:from-[#d0d0d0] hover:to-[#b8860b] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Processing...' : 
             parseFloat(inputAmount) > parseFloat(maxBorrowAmount) ? 'Insufficient Collateral' :
             parseFloat(requiredCollateral) > parseFloat(balance) ? 'Insufficient LARRY Balance' :
             hasActiveLoan ? 'Borrow More' : 'Create Loan'}
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