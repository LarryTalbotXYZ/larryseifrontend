'use client';

import { useAccount } from 'wagmi';
import { Clock, DollarSign, Shield, TrendingDown, Zap, X, Plus } from 'lucide-react';
import { useUserLarryData, useLarryContract, useTradeCalculations } from '@/hooks/useLarryContract';
import { useState } from 'react';
import { formatEther } from 'viem';

export default function LoanDashboard() {
  const { address, isConnected } = useAccount();
  const { loan } = useUserLarryData(address);
  const { repayLoan, closeLoan, flashClose, extendLoan, isPending } = useLarryContract();
  const { useExtensionFee } = useTradeCalculations();
  const [repayAmount, setRepayAmount] = useState('');
  const [extendDays, setExtendDays] = useState('30');

  // Get the actual extension fee from the contract
  const { data: extensionFeeData } = useExtensionFee(
    loan?.borrowed || '0', 
    parseInt(extendDays) || 0
  );

  if (!isConnected || !loan || (loan.collateral === '0' && loan.borrowed === '0')) {
    return null;
  }

  const isLoanActive = parseFloat(loan.collateral) > 0 || parseFloat(loan.borrowed) > 0;
  const daysUntilExpiry = Math.max(0, Math.floor((loan.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const isExpiringSoon = daysUntilExpiry <= 7;
  const isExpired = daysUntilExpiry <= 0;

  const handleRepay = () => {
    if (repayAmount && parseFloat(repayAmount) > 0) {
      repayLoan(repayAmount);
    }
  };

  const handleFullRepay = () => {
    closeLoan(loan.borrowed);
  };

  const handleFlashClose = () => {
    flashClose();
  };

  const handleExtendLoan = () => {
    if (extendDays && parseInt(extendDays) > 0 && extensionFeeData) {
      extendLoan(extendDays, extensionFeeData as bigint);
    }
  };

  if (!isLoanActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
          <div className="flex items-center">
            <span className="text-blue-400 font-mono font-bold text-xl mr-3">∞</span>
            <h3 className="text-xl sm:text-2xl font-mono font-bold text-blue-400">
              RECURSIVE_LEVERAGE_POSITION
            </h3>
          </div>
          {isExpired && (
            <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg text-sm font-mono font-bold border border-red-500/30">
              TIME_CONSTRAINT_EXCEEDED
            </span>
          )}
          {isExpiringSoon && !isExpired && (
            <span className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-mono font-bold border border-orange-500/30">
              EXPIRATION_WARNING
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Collateral */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <span className="text-green-400 font-mono font-bold text-lg mr-2">∂</span>
                <span className="text-gray-400 font-mono text-sm">COLLATERAL_ASSET</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-green-400">
                {parseFloat(loan.collateral).toFixed(2)}
              </div>
              <div className="text-green-400 font-mono text-xs mt-1">LARRY_TOKENS</div>
            </div>
          </div>

          {/* Borrowed */}
          <div className="bg-black/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <span className="text-red-400 font-mono font-bold text-lg mr-2">∑</span>
                <span className="text-gray-400 font-mono text-sm">BORROWED_AMOUNT</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-red-400">
                {parseFloat(loan.borrowed).toFixed(2)}
              </div>
              <div className="text-red-400 font-mono text-xs mt-1">SEI_TOKENS</div>
            </div>
          </div>

          {/* Time Remaining */}
          <div className="bg-black/50 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <span className="text-blue-400 font-mono font-bold text-lg mr-2">Δ</span>
                <span className="text-gray-400 font-mono text-sm">TIME_CONSTRAINT</span>
              </div>
              <div className={`text-2xl sm:text-3xl font-mono font-bold ${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-orange-400' : 'text-blue-400'}`}>
                {isExpired ? 'EXCEEDED' : `${daysUntilExpiry}`}
              </div>
              <div className={`font-mono text-xs mt-1 ${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-orange-400' : 'text-blue-400'}`}>
                {isExpired ? 'TIME_CONSTRAINT_VIOLATED' : 'DAYS_REMAINING'}
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Parameters */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex items-center mb-4 border-b border-purple-500/30 pb-2">
            <span className="text-purple-400 font-mono font-bold text-lg mr-2">λ</span>
            <h4 className="text-purple-400 font-mono font-bold text-sm">PROTOCOL_CONSTRAINTS</h4>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm font-mono">
            <div className="flex justify-between py-2 border-b border-purple-500/20">
              <span className="text-gray-400">EXPIRATION_TIMESTAMP::</span>
              <span className="text-purple-400 font-bold">{loan.endDate.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-purple-500/20">
              <span className="text-gray-400">COLLATERAL_RATIO::</span>
              <span className="text-pink-400 font-bold">99%</span>
            </div>
          </div>
        </div>

        {/* Algorithm Controls */}
        <div className="space-y-4">
          {/* Extend Time Constraint */}
          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 sm:p-6">
            <div className="flex items-center mb-4 border-b border-blue-500/30 pb-2">
              <span className="text-blue-400 font-mono font-bold text-lg mr-2">+</span>
              <h4 className="text-blue-400 font-mono font-bold text-sm">EXTEND_TIME_CONSTRAINT</h4>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <input
                type="number"
                placeholder="Additional days"
                value={extendDays}
                onChange={(e) => setExtendDays(e.target.value)}
                min="1"
                max="365"
                className="flex-1 bg-black/50 border border-blue-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-gray-300 placeholder-gray-500 focus:border-blue-400 focus:outline-none text-sm sm:text-base font-mono relative z-10"
              />
              <button
                onClick={handleExtendLoan}
                disabled={isPending || !extendDays || parseInt(extendDays) <= 0}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-mono font-bold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">EXECUTE_EXTENSION</span>
              </button>
            </div>

            <div className="mt-3 p-3 bg-black/50 rounded-lg border border-blue-500/20">
              <div className="text-xs font-mono text-gray-400 mb-1">EXTENSION_FEE_CALCULATION::</div>
              <div className="text-blue-400 font-mono font-bold">
                {extensionFeeData ? (parseFloat(formatEther(extensionFeeData as bigint)).toFixed(2)) : '0.00'} SEI
              </div>
            </div>
          </div>

          {/* Partial Debt Repayment */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <input
              type="number"
              placeholder="Partial repayment amount (SEI)"
              value={repayAmount}
              onChange={(e) => setRepayAmount(e.target.value)}
              max={loan.borrowed}
              className="flex-1 bg-black/50 border border-gray-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-gray-300 placeholder-gray-500 focus:border-gray-400 focus:outline-none text-sm sm:text-base font-mono relative z-10"
            />
            <button
              onClick={handleRepay}
              disabled={isPending || !repayAmount || parseFloat(repayAmount) <= 0}
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-mono font-bold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">PARTIAL_REPAYMENT</span>
            </button>
          </div>

          {/* Position Termination */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleFullRepay}
              disabled={isPending}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-4 rounded-lg font-mono font-bold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-green-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center">
                <span className="text-lg mr-2">×</span>
                <span>CLOSE_POSITION_FULL_REPAY</span>
              </span>
            </button>

            <button
              onClick={handleFlashClose}
              disabled={isPending}
              className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 sm:py-4 rounded-lg font-mono font-bold hover:from-red-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center">
                <span className="text-lg mr-2">↓</span>
                <span>FLASH_CLOSE_PROTOCOL</span>
              </span>
            </button>
          </div>
      </div>

        {/* Protocol Information */}
        <div className="mt-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-md border border-red-500/30 rounded-lg p-4 sm:p-6">
          <div className="flex items-start space-x-3">
            <span className="text-red-400 font-mono font-bold text-lg">⚠</span>
            <div className="text-sm font-mono text-red-200 flex-1">
              <p className="font-bold mb-2 text-red-400">FLASH_CLOSE_ALGORITHM::</p>
              <p className="text-xs text-gray-300 leading-relaxed">
                Automatic collateral liquidation protocol executes LARRY to SEI conversion with 1% algorithmic fee.
                Time-constraint independent termination mechanism.
                <span className="text-red-400 block mt-2">f(x) = liquidation(collateral) → debt_resolution</span>
              </p>
            </div>
          </div>
        </div>

        {isPending && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-md border border-yellow-500/30 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
            <div className="relative z-10 flex items-center">
              <span className="text-yellow-400 font-mono font-bold text-lg mr-3">⟳</span>
              <p className="text-yellow-400 font-mono font-bold text-sm">TRANSACTION_EXECUTION_IN_PROGRESS...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}