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
  const { buyLarry, sellLarry, openLeverage, createLoan, borrowMore, isPending, isConfirmed, buyFeePercent, sellFeePercent, leverageFeePercent } = useLarryContract();
  const { balance, loan, hasActiveLoan } = useUserLarryData(address);
  const { useBuyAmount, useSellAmount, useBorrowCollateral, useLeverageFee } = useTradeCalculations();
  
  // Get SEI balance for buy max button
  const { data: seiBalance, isLoading: seiBalanceLoading, error: seiBalanceError } = useBalance({
    address: address,
    query: {
      enabled: !!address && isConnected,
      refetchInterval: 5000, // Refetch every 5 seconds
    }
  });

  // Debug logging for Max button troubleshooting
  useEffect(() => {
    console.log('Max Button Debug:', {
      address,
      isConnected,
      seiBalance,
      seiBalanceLoading,
      seiBalanceError,
      balance: seiBalance ? formatEther(seiBalance.value) : 'No balance'
    });
  }, [address, isConnected, seiBalance, seiBalanceLoading, seiBalanceError]);
  
  const [inputAmount, setInputAmount] = useState('');
  const [days, setDays] = useState('365');
  const [outputAmount, setOutputAmount] = useState('0');
  const [requiredCollateral, setRequiredCollateral] = useState('0');
  const [maxBorrowAmount, setMaxBorrowAmount] = useState('0');
  const [isMaxCalibrating, setIsMaxCalibrating] = useState(false);
  const [maxTargetPayment, setMaxTargetPayment] = useState(0);
  const [maxIter, setMaxIter] = useState(0);
  const [maxButtonClicked, setMaxButtonClicked] = useState(false);

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
    setMaxButtonClicked(true);
    setTimeout(() => setMaxButtonClicked(false), 2000); // Reset after 2 seconds

    console.log('=== MAX BUTTON CLICKED ===');
    console.log('Active Tab:', activeTab);
    console.log('SEI Balance:', seiBalance);
    console.log('SEI Balance Value:', seiBalance?.value);
    console.log('LARRY Balance:', balance);

    if (activeTab === 'buy') {
      console.log('=== BUY TAB MAX CALCULATION ===');
      if (seiBalance?.value) {
        const rawBalance = parseFloat(formatEther(seiBalance.value));
        console.log('Raw SEI Balance:', rawBalance);
        const maxAmount = Math.max(0, rawBalance - 0.01);
        console.log('Calculated Max Amount:', maxAmount);

        if (maxAmount > 0) {
          const formattedAmount = maxAmount.toFixed(6);
          console.log('Setting input amount to:', formattedAmount);
          setInputAmount(formattedAmount);
        } else {
          console.log('Max amount is 0 or negative');
        }
      } else {
        console.log('No SEI balance value available');
      }
    } else if (activeTab === 'sell') {
      console.log('=== SELL TAB MAX CALCULATION ===');
      if (balance && parseFloat(balance) > 0) {
        console.log('Setting LARRY balance to input:', balance);
        setInputAmount(balance);
      } else {
        console.log('No LARRY balance available or balance is 0');
      }
    } else if (activeTab === 'leverage') {
      console.log('=== LEVERAGE TAB MAX CALCULATION ===');
      if (seiBalance?.value) {
        const availableBalance = Math.max(0, parseFloat(formatEther(seiBalance.value)) - 0.01);
        console.log('Available SEI Balance:', availableBalance);
        const daysNum = parseInt(days) || 0;
        const aprPercent = 3.9;
        const interestPercent = aprPercent * (daysNum / 365);
        const baseLeverageFeePercent = parseFloat(leverageFeePercent || '1');
        const effectivePaymentFactor = 0.01 + 0.99 * ((baseLeverageFeePercent + interestPercent) / 100);
        const estimatedMaxPosition = effectivePaymentFactor > 0 ? availableBalance / effectivePaymentFactor : 0;
        console.log('Estimated Max Position:', estimatedMaxPosition);
        setMaxTargetPayment(availableBalance);
        setMaxIter(0);
        setIsMaxCalibrating(true);
        setInputAmount(estimatedMaxPosition.toFixed(4));
      } else {
        console.log('No SEI balance available for leverage');
      }
    }
  };

  // Calibrate leverage Max to contract-accurate payment using leverageFeeData
  useEffect(() => {
    if (!isMaxCalibrating) return;
    if (!inputAmount) return;
    if (!leverageFeeData) return;

    const available = maxTargetPayment;
    const position = parseFloat(inputAmount);
    const fee = parseFloat(formatEther(leverageFeeData as bigint));
    const userETH = Math.max(0, position - fee);
    const payment = fee + userETH / 100; // 1% collateral on userETH

    const tolerance = 0.01; // 1% tolerance for better convergence
    const diff = available - payment;

    if (Math.abs(diff) / (available || 1) <= tolerance || maxIter >= 5) {
      // Final clamp to ensure we don't exceed available balance
      if (payment > available && payment > 0) {
        const clampScale = (available / payment) * 0.99; // 1% safety margin
        const clampedPos = position * clampScale;
        setInputAmount(clampedPos.toFixed(4));
      }
      setIsMaxCalibrating(false);
      return;
    }

    if (payment === 0) {
      setIsMaxCalibrating(false);
      return;
    }

    const scale = available / payment;
    // Apply conservative scaling to avoid overshooting
    const conservativeScale = diff > 0 ? Math.min(scale, 1.02) : Math.max(scale, 0.98);
    const newPos = position * conservativeScale;
    setInputAmount(newPos.toFixed(4));
    setMaxIter((i) => i + 1);
  }, [isMaxCalibrating, leverageFeeData, inputAmount, maxTargetPayment, maxIter]);

  if (!isConnected) {
    return (
      <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg px-4 py-2 border border-red-500/30 mb-6">
            <span className="text-red-400 font-mono text-sm mr-2">ACCESS::</span>
            <span className="text-white font-mono">DENIED</span>
          </div>
          <h3 className="text-2xl font-mono font-bold text-red-400 mb-6">WALLET_CONNECTION_REQUIRED</h3>
          <p className="text-gray-300 font-mono text-sm mb-8">
            Initialize blockchain connection to execute mathematical trading algorithms and leverage functions.
          </p>
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button
                onClick={openConnectModal}
                className="inline-flex items-center bg-gradient-to-r from-red-600 to-purple-600 text-white px-8 py-4 rounded-lg font-mono font-bold hover:from-red-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 border border-red-500/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">INITIALIZE_CONNECTION</span>
              </button>
            )}
          </ConnectButton.Custom>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 backdrop-blur-md border border-red-500/20 rounded-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
      <div className="relative z-10">
        {/* Algorithm Selection Matrix */}
        <div className="grid grid-cols-2 sm:flex sm:space-x-4 gap-2 sm:gap-0 mb-8 sm:mb-10">
          {[
            { tab: 'buy', symbol: '∇', label: 'BUY_ALGORITHM' },
            { tab: 'sell', symbol: '∫', label: 'SELL_ALGORITHM' },
            { tab: 'leverage', symbol: '∞', label: 'LEVERAGE_ENGINE' },
            { tab: 'borrow', symbol: '∑', label: 'BORROW_FUNCTION' }
          ].map(({ tab, symbol, label }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-mono font-bold transition-all duration-300 text-sm sm:text-base border relative overflow-hidden group ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white border-red-500/30 shadow-lg shadow-red-500/25'
                  : 'bg-black/50 text-gray-400 hover:text-white border-gray-600/30 hover:border-red-500/30'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col items-center space-y-1">
                <span className="text-lg">{symbol}</span>
                <span className="text-xs">{label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Token Status Terminal */}
        <div className="bg-black/80 backdrop-blur-md border border-green-500/30 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4 border-b border-green-500/30 pb-2">
              <span className="text-green-400 font-mono font-bold text-lg mr-2">λ</span>
              <h3 className="text-green-400 font-mono font-bold text-sm">TOKEN_STATUS_MATRIX</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm font-mono">
              <div className="bg-gray-900/50 rounded-lg p-3 border border-green-500/20">
                <div className="text-gray-400 mb-1">LARRY_BALANCE::</div>
                <div className="text-green-400 font-bold">{balance} LARRY</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-green-500/20">
                <div className="text-gray-400 mb-1">SEI_BALANCE::</div>
                <div className="flex items-center">
                  <div className="text-blue-400 font-bold">
                    {seiBalanceLoading ? 'LOADING...' :
                     seiBalance ? parseFloat(formatEther(seiBalance.value)).toFixed(4) : '0.0000'} SEI
                  </div>
                  {seiBalanceLoading && (
                    <div className="ml-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                {seiBalanceError && (
                  <div className="text-red-400 text-xs mt-1">ERROR_LOADING_BALANCE</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buy/Sell Algorithm Interface */}
        {(activeTab === 'buy' || activeTab === 'sell') && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-3 font-mono font-bold text-sm">
                {activeTab === 'buy' ? '∇ INPUT_VECTOR::SEI_AMOUNT' : '∫ INPUT_VECTOR::LARRY_AMOUNT'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 pr-16 sm:pr-20 text-gray-300 placeholder-gray-500 focus:border-green-400 focus:outline-none text-sm sm:text-base font-mono relative z-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance]:textfield"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('MAX BUTTON CLICKED - Buy Tab');
                    handleMaxClick();
                  }}
                  disabled={false}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all duration-300 border z-20 cursor-pointer ${
                    maxButtonClicked
                      ? 'bg-green-500 text-white border-green-400 animate-pulse'
                      : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-500 hover:to-blue-500 border-green-500/30'
                  }`}
                >
                  MAX_EXECUTE
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-md border border-green-500/30 rounded-lg p-4 sm:p-6">
              <div className="flex items-center mb-4 border-b border-green-500/30 pb-2">
                <span className="text-green-400 font-mono font-bold text-lg mr-2">Δ</span>
                <h4 className="text-green-400 font-mono font-bold text-sm">CALCULATION_ENGINE</h4>
              </div>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between py-2 border-b border-green-500/20">
                  <span className="text-gray-400">OUTPUT_VECTOR::</span>
                  <span className="text-green-400 font-bold">
                    {outputAmount} {activeTab === 'buy' ? 'LARRY' : 'SEI'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">FEE_ALGORITHM::</span>
                  <span className="text-blue-400 font-bold">{activeTab === 'buy' ? buyFeePercent : sellFeePercent}%</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleTrade}
              disabled={isPending || !inputAmount}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 sm:py-5 rounded-lg font-mono font-bold text-base sm:text-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-green-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">
                {isPending ? 'PROCESSING_TRANSACTION...' : `EXECUTE_${activeTab.toUpperCase()}_ALGORITHM`}
              </span>
            </button>
          </div>
        )}

        {/* Leverage Algorithm Interface */}
        {activeTab === 'leverage' && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-3 font-mono font-bold text-sm">
                ∞ POSITION_SIZE::SEI_VECTOR
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Enter SEI amount for leveraged position"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 pr-20 sm:pr-24 text-gray-300 placeholder-gray-500 focus:border-blue-400 focus:outline-none text-sm sm:text-base font-mono relative z-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance]:textfield"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('MAX BUTTON CLICKED - Leverage Tab');
                    handleMaxClick();
                  }}
                  disabled={false}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all duration-300 border z-20 cursor-pointer ${
                    maxButtonClicked
                      ? 'bg-blue-500 text-white border-blue-400 animate-pulse'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 border-blue-500/30'
                  }`}
                >
                  MAX_CALCULATE
                </button>
              </div>
              <p className="text-xs text-gray-400 font-mono mt-2">
                Total SEI position size for recursive leverage algorithm. Payment = fees + 1% collateral only.
              </p>
            </div>

            <div>
              <label className="block text-gray-300 mb-3 font-mono font-bold text-sm">
                Δ TIME_CONSTRAINT::DAYS_VECTOR
                <span className="text-blue-400 font-bold ml-2">{days}</span>
              </label>
              <input
                type="range"
                min="1"
                max="365"
                step="1"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full accent-blue-500"
              />
              <input
                type="number"
                placeholder="365"
                min="1"
                max="365"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="mt-3 w-full bg-black/50 border border-blue-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-gray-300 placeholder-gray-500 focus:border-blue-400 focus:outline-none text-sm sm:text-base font-mono"
              />
            </div>

            {leverageQuote && (
              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-md border border-red-500/30 rounded-lg p-4 sm:p-6 space-y-4">
                <div className="flex items-center mb-4 border-b border-red-500/30 pb-2">
                  <span className="text-red-400 font-mono font-bold text-lg mr-2">∞</span>
                  <h4 className="text-red-400 font-mono font-bold text-sm">LEVERAGE_CALCULATION_ENGINE</h4>
                </div>

                <div className="space-y-3 text-sm font-mono">
                  <div className="flex justify-between py-2 border-b border-red-500/20">
                    <span className="text-gray-400">POSITION_SIZE::</span>
                    <span className="text-red-400 font-bold">{leverageQuote.ethPosition} SEI</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-red-500/20">
                    <span className="text-gray-400">PAYMENT_VECTOR::</span>
                    <span className="text-orange-400 font-bold">{leverageQuote.requiredEth} SEI</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-red-500/20">
                    <span className="text-gray-400">LEVERAGE_RATIO::</span>
                    <span className="text-yellow-400 font-bold text-lg">
                      {leverageQuote.leverageRatio}x
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-red-500/20">
                    <span className="text-gray-400">BORROW_AMOUNT::</span>
                    <span className="text-blue-400 font-bold">{leverageQuote.borrowAmount} SEI</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">TOTAL_FEES::</span>
                    <span className="text-purple-400 font-bold">{leverageQuote.totalFee} SEI</span>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-3 border border-red-500/20">
                  <div className="text-xs font-mono text-gray-400 mb-2">INTEREST_CALCULATION::</div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-gray-400">APR_RATE::</span>
                      <span className="text-green-400 ml-1">{leverageQuote.apr}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">DURATION::</span>
                      <span className="text-blue-400 ml-1">{days} days</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Algorithm Warning */}
            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-md border border-yellow-500/30 rounded-lg p-4 sm:p-6">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-400 font-mono font-bold text-lg">⚠</span>
                <div className="text-sm font-mono text-yellow-200 flex-1">
                  <p className="font-bold mb-2 text-yellow-400">RECURSIVE_LEVERAGE_ALGORITHM::</p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Position size specification triggers LARRY collateral minting and SEI borrowing execution.
                    Payment structure: fees + 1% collateral only. Time-based liquidation constraints apply.
                    <span className="text-yellow-400 block mt-2">f(x) = borrow(x) → recursive_position_growth</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleTrade}
              disabled={isPending || !inputAmount || !leverageQuote || (leverageQuote && parseFloat(leverageQuote.requiredEth) > parseFloat(formatEther(seiBalance?.value || BigInt(0)))) || hasActiveLoan}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 sm:py-5 rounded-lg font-mono font-bold text-base sm:text-lg hover:from-red-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center">
                <span className="text-xl mr-3">∞</span>
                <span>
                  {isPending ? 'EXECUTING_LEVERAGE_ALGORITHM...' :
                   hasActiveLoan ? 'CLOSE_EXISTING_LOAN_FIRST' :
                   !leverageQuote ? 'INPUT_POSITION_SIZE' :
                   (leverageQuote && parseFloat(leverageQuote.requiredEth) > parseFloat(formatEther(seiBalance?.value || BigInt(0)))) ? 'INSUFFICIENT_BALANCE' :
                   'START_RECURSIVE_LEVERAGE'}
                </span>
              </span>
            </button>
        </div>
      )}

        {/* Borrow Algorithm Interface */}
        {activeTab === 'borrow' && (
          <div className="space-y-6">
            {/* Current Loan Status Terminal */}
            {hasActiveLoan && loan && (
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 sm:p-6">
                <div className="flex items-center mb-4 border-b border-blue-500/30 pb-2">
                  <span className="text-blue-400 font-mono font-bold text-lg mr-2">∑</span>
                  <h4 className="text-blue-400 font-mono font-bold text-sm">ACTIVE_LOAN_STATUS</h4>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div className="bg-black/50 rounded-lg p-3 border border-blue-500/20">
                    <div className="text-gray-400 mb-1">BORROWED_AMOUNT::</div>
                    <div className="text-blue-400 font-bold">{parseFloat(loan.borrowed).toFixed(4)} SEI</div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-3 border border-blue-500/20">
                    <div className="text-gray-400 mb-1">COLLATERAL_LOCKED::</div>
                    <div className="text-cyan-400 font-bold">{parseFloat(loan.collateral).toFixed(4)} LARRY</div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-blue-500/20">
                  <div className="text-xs font-mono text-gray-400">
                    EXPIRATION_TIMESTAMP:: {loan.endDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          
            {/* Collateral Analysis Terminal */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 sm:p-6">
              <div className="flex items-center mb-4 border-b border-purple-500/30 pb-2">
                <span className="text-purple-400 font-mono font-bold text-lg mr-2">∂</span>
                <h4 className="text-purple-400 font-mono font-bold text-sm">COLLATERAL_ANALYSIS_ENGINE</h4>
              </div>

              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between py-2 border-b border-purple-500/20">
                  <span className="text-gray-400">COLLATERAL_BALANCE::</span>
                  <span className="text-purple-400 font-bold">{balance} LARRY</span>
                </div>
                <div className="flex justify-between py-2 border-b border-purple-500/20">
                  <span className="text-gray-400">{hasActiveLoan ? 'ADDITIONAL_BORROWABLE::' : 'MAX_BORROWABLE::'}</span>
                  <span className="text-pink-400 font-bold">{maxBorrowAmount} SEI</span>
                </div>
              </div>

              <div className="mt-3 p-3 bg-black/50 rounded-lg border border-purple-500/20">
                <div className="text-xs font-mono text-gray-400">
                  {hasActiveLoan
                    ? 'RECURSIVE_BORROWING:: Stack additional loans on existing position'
                    : 'COLLATERAL_RATIO:: 99% maximum LTV for optimal leverage efficiency'
                  }
                </div>
              </div>
            </div>
          
            <div>
              <label className="block text-gray-300 mb-3 font-mono font-bold text-sm">
                ∑ {hasActiveLoan ? 'ADDITIONAL_BORROW_VECTOR::' : 'INITIAL_BORROW_VECTOR::'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  value={inputAmount}
                  max={maxBorrowAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 pr-20 sm:pr-24 text-gray-300 placeholder-gray-500 focus:border-purple-400 focus:outline-none text-sm sm:text-base font-mono relative z-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance]:textfield"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('MAX BUTTON CLICKED - Borrow Tab');
                    if (maxBorrowAmount && parseFloat(maxBorrowAmount) > 0) {
                      setInputAmount(maxBorrowAmount);
                    } else {
                      console.log('No max borrow amount available');
                    }
                  }}
                  disabled={false}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all duration-300 border z-20 cursor-pointer ${
                    maxButtonClicked
                      ? 'bg-purple-500 text-white border-purple-400 animate-pulse'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 border-purple-500/30'
                  }`}
                >
                  MAX_BORROW
                </button>
              </div>
              {inputAmount && parseFloat(inputAmount) > parseFloat(maxBorrowAmount) && (
                <div className="text-red-400 text-xs font-mono mt-2">
                  COLLATERAL_LIMIT_EXCEEDED:: Cannot exceed {maxBorrowAmount} SEI
                </div>
              )}
            </div>
          
            {!hasActiveLoan && (
              <div>
                <label className="block text-gray-300 mb-3 font-mono font-bold text-sm">
                  Δ TIME_CONSTRAINT_VECTOR:: <span className="text-purple-400 font-bold">{days} days</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="365"
                  step="1"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full accent-purple-500"
                />
                <input
                  type="number"
                  placeholder="365"
                  min="1"
                  max="365"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="mt-3 w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-gray-300 placeholder-gray-500 focus:border-purple-400 focus:outline-none text-sm sm:text-base font-mono"
                />
              </div>
            )}
          
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 sm:p-6">
              <div className="flex items-center mb-4 border-b border-purple-500/30 pb-2">
                <span className="text-purple-400 font-mono font-bold text-lg mr-2">λ</span>
                <h4 className="text-purple-400 font-mono font-bold text-sm">COLLATERAL_CALCULATION_ENGINE</h4>
              </div>

              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between py-2 border-b border-purple-500/20">
                  <span className="text-gray-400">
                    {hasActiveLoan ? 'ADDITIONAL_COLLATERAL::' : 'REQUIRED_COLLATERAL::'}
                  </span>
                  <span className="text-purple-400 font-bold">{requiredCollateral} LARRY</span>
                </div>

                {!hasActiveLoan && (
                  <div className="flex justify-between py-2 border-b border-purple-500/20">
                    <span className="text-gray-400">INTEREST_RATE::</span>
                    <span className="text-pink-400 font-bold">3.9% APR</span>
                  </div>
                )}

                <div className="flex justify-between py-2">
                  <span className="text-gray-400">BORROW_OUTPUT::</span>
                  <span className="text-cyan-400 font-bold">
                    {inputAmount ? (parseFloat(inputAmount) * 0.99).toFixed(4) : '0'} SEI
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleTrade}
              disabled={isPending || !inputAmount || parseFloat(inputAmount) > parseFloat(maxBorrowAmount) || parseFloat(requiredCollateral) > parseFloat(balance)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 sm:py-5 rounded-lg font-mono font-bold text-base sm:text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-purple-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center">
                <span className="text-xl mr-3">∑</span>
                <span>
                  {isPending ? 'EXECUTING_BORROW_ALGORITHM...' :
                   parseFloat(inputAmount) > parseFloat(maxBorrowAmount) ? 'COLLATERAL_INSUFFICIENT' :
                   parseFloat(requiredCollateral) > parseFloat(balance) ? 'LARRY_BALANCE_INSUFFICIENT' :
                   hasActiveLoan ? 'EXTEND_BORROW_POSITION' : 'INITIALIZE_LOAN_PROTOCOL'}
                </span>
              </span>
            </button>
        </div>
      )}

        {/* Algorithm Execution Status */}
        {isConfirmed && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/30 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
            <div className="relative z-10 flex items-center">
              <span className="text-green-400 font-mono font-bold text-lg mr-3">✓</span>
              <p className="text-green-400 font-mono font-bold text-sm">ALGORITHM_EXECUTION_SUCCESSFUL:: Transaction confirmed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}