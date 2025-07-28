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
    <div className="werewolf-card p-4 sm:p-6 rounded-xl mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <h3 className="text-xl sm:text-2xl font-bold text-[#ffd700] flex items-center">
          <Zap className="w-6 h-6 mr-2" />
          Your Leverage Position
        </h3>
        {isExpired && (
          <span className="bg-[#8b0000] text-white px-3 py-1 rounded-lg text-sm font-semibold">
            EXPIRED
          </span>
        )}
        {isExpiringSoon && !isExpired && (
          <span className="bg-[#ff8c00] text-[#0a0a0f] px-3 py-1 rounded-lg text-sm font-semibold">
            EXPIRES SOON
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Collateral */}
        <div className="bg-[#1a1a2e] p-3 sm:p-4 rounded-lg border border-[#ffd700]/20">
          <div className="flex items-center mb-2">
            <Shield className="w-5 h-5 text-[#ffd700] mr-2" />
            <span className="text-[#e6e6f0]/70 text-sm">Collateral</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#ffd700]">
            {parseFloat(loan.collateral).toFixed(4)} LARRY
          </div>
        </div>

        {/* Borrowed */}
        <div className="bg-[#1a1a2e] p-3 sm:p-4 rounded-lg border border-[#8b0000]/40">
          <div className="flex items-center mb-2">
            <DollarSign className="w-5 h-5 text-[#8b0000] mr-2" />
            <span className="text-[#e6e6f0]/70 text-sm">Borrowed</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#8b0000]">
            {parseFloat(loan.borrowed).toFixed(4)} SEI
          </div>
        </div>

        {/* Time Remaining */}
        <div className="bg-[#1a1a2e] p-3 sm:p-4 rounded-lg border border-[#c0c0c0]/20">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-[#c0c0c0] mr-2" />
            <span className="text-[#e6e6f0]/70 text-sm">Time Remaining</span>
          </div>
          <div className={`text-xl sm:text-2xl font-bold ${isExpired ? 'text-[#8b0000]' : isExpiringSoon ? 'text-[#ff8c00]' : 'text-[#c0c0c0]'}`}>
            {isExpired ? 'EXPIRED' : `${daysUntilExpiry} days`}
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/10 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-[#e6e6f0]/70">Expiry Date:</span>
            <span className="text-[#e6e6f0]">{loan.endDate.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#e6e6f0]/70">Collateral Ratio:</span>
            <span className="text-[#ffd700]">99%</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {/* Extend Loan */}
        <div className="bg-[#1a1a2e] p-3 sm:p-4 rounded-lg border border-[#ffd700]/20">
          <h4 className="text-lg font-semibold text-[#ffd700] mb-3 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Extend Loan
          </h4>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <input
              type="number"
              placeholder="Days to extend"
              value={extendDays}
              onChange={(e) => setExtendDays(e.target.value)}
              min="1"
              max="365"
              className="flex-1 bg-[#2c2c34] border border-[#ffd700]/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none text-sm sm:text-base"
            />
            <button
              onClick={handleExtendLoan}
              disabled={isPending || !extendDays || parseInt(extendDays) <= 0}
              className="bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-[#b8860b] hover:to-[#ffd700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Extend
            </button>
          </div>
          <p className="text-[#e6e6f0]/60 text-xs mt-2">
            Extension fee: {extensionFeeData ? (parseFloat(formatEther(extensionFeeData as bigint)).toFixed(6)) : '0.000000'} SEI
          </p>
        </div>

        {/* Partial Repay */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="number"
            placeholder="Amount to repay (SEI)"
            value={repayAmount}
            onChange={(e) => setRepayAmount(e.target.value)}
            max={loan.borrowed}
            className="flex-1 bg-[#1a1a2e] border border-[#ffd700]/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-[#e6e6f0] placeholder-[#e6e6f0]/50 focus:border-[#ffd700] focus:outline-none text-sm sm:text-base"
          />
          <button
            onClick={handleRepay}
            disabled={isPending || !repayAmount || parseFloat(repayAmount) <= 0}
            className="bg-[#c0c0c0] text-[#0a0a0f] px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#d0d0d0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Partial Repay
          </button>
        </div>

        {/* Full Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleFullRepay}
            disabled={isPending}
            className="flex-1 bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] py-2 sm:py-3 rounded-lg font-bold hover:from-[#b8860b] hover:to-[#ffd700] transition-all disabled:opacity-50 text-sm sm:text-base"
          >
            <X className="w-5 h-5 inline mr-2" />
            Close Position (Full Repay)
          </button>
          
          <button
            onClick={handleFlashClose}
            disabled={isPending}
            className="flex-1 bg-gradient-to-r from-[#8b0000] to-[#a00000] text-white py-2 sm:py-3 rounded-lg font-bold hover:from-[#a00000] hover:to-[#8b0000] transition-all disabled:opacity-50 text-sm sm:text-base"
          >
            <TrendingDown className="w-5 h-5 inline mr-2" />
            Flash Close
          </button>
        </div>
      </div>

      {/* Flash Close Info */}
      <div className="mt-4 p-3 bg-[#8b0000]/20 border border-[#8b0000]/40 rounded-lg">
        <p className="text-[#e6e6f0]/80 text-sm">
          <strong className="text-[#8b0000]">Flash Close:</strong> Automatically sells your collateral to repay the loan. 1% fee applies.
        </p>
      </div>

      {isPending && (
        <div className="mt-4 p-4 bg-[#ffd700]/20 border border-[#ffd700]/40 rounded-lg">
          <p className="text-[#ffd700] font-semibold">Transaction in progress...</p>
        </div>
      )}
    </div>
  );
}