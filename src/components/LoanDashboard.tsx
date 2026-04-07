'use client';

import { useAccount } from 'wagmi';
import { Clock, Shield, AlertTriangle, XCircle, Zap, RefreshCw, Layers } from 'lucide-react';
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
    <div className="glass-panel p-6 sm:p-8 w-full max-w-xl mx-auto mt-8 border border-blue-500/20 bg-gradient-to-br from-slate-900/80 to-blue-900/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Active Position
          </h3>
        </div>
        
        {isExpired && (
          <span className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold border border-red-500/20 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" /> Expired
          </span>
        )}
        {isExpiringSoon && !isExpired && (
          <span className="bg-orange-500/10 text-orange-400 px-4 py-2 rounded-lg text-sm font-semibold border border-orange-500/20 flex items-center">
            <Clock className="w-4 h-4 mr-2" /> Expiring Soon
          </span>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
          <p className="text-sm font-medium text-slate-400 mb-2 flex items-center">
            <Shield className="w-4 h-4 mr-1 text-green-400" /> 
            Collateral
          </p>
          <div className="text-2xl font-bold text-white">
            {parseFloat(loan.collateral).toFixed(8).replace(/\.?0+$/, '') || '0'}
          </div>
          <div className="text-slate-500 text-xs mt-1">LARRY</div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
          <p className="text-sm font-medium text-slate-400 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1 text-red-400" /> 
            Debt
          </p>
          <div className="text-2xl font-bold text-white">
            {parseFloat(loan.borrowed).toFixed(8).replace(/\.?0+$/, '') || '0'}
          </div>
          <div className="text-slate-500 text-xs mt-1">ETH</div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 col-span-2 lg:col-span-1">
          <p className="text-sm font-medium text-slate-400 mb-2 flex items-center">
            <Clock className="w-4 h-4 mr-1 text-blue-400" /> 
            Time Left
          </p>
          <div className={`text-2xl font-bold ${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-orange-400' : 'text-white'}`}>
            {isExpired ? '0' : `${daysUntilExpiry}`}
          </div>
          <div className={`text-xs mt-1 ${isExpired ? 'text-red-400' : 'text-slate-500'}`}>
            {isExpired ? 'Loan Overdue' : 'Days Remaining'}
          </div>
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-8">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Position Expiration</span>
          <span className="font-semibold text-white">{loan.endDate.toLocaleDateString()}</span>
        </div>
      </div>

      {/* Action Area */}
      <div className="space-y-6">
        {/* Extend Loan */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Extend Position Time</h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              placeholder="Days"
              min="1"
              max="365"
              value={extendDays}
              onChange={(e) => {
                const val = e.target.value;
                if (!val || parseInt(val) >= 0) setExtendDays(val);
              }}
              className="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 outline-none font-medium"
            />
            <button
              onClick={handleExtendLoan}
              disabled={isPending || !extendDays || parseInt(extendDays) <= 0}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 min-w-32"
            >
              Extend
            </button>
          </div>
          {!!extensionFeeData && parseInt(extendDays) > 0 && (
            <div className="text-sm text-slate-400 mt-3">
              Fee: <span className="font-semibold text-blue-400">{(parseFloat(formatEther(extensionFeeData as bigint))).toFixed(8).replace(/\.?0+$/, '') || '0'} ETH</span>
            </div>
          )}
        </div>

        {/* Repayment Features */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-white mb-4">Partial Repay</h4>
            <div className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="ETH Amount"
                min="0"
                max={loan.borrowed}
                value={repayAmount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val || parseFloat(val) >= 0) setRepayAmount(val);
                }}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500 outline-none font-medium"
              />
              <button
                onClick={handleRepay}
                disabled={isPending || !repayAmount || parseFloat(repayAmount) <= 0}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                Submit Payment
              </button>
            </div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Close Position</h4>
              <p className="text-xs text-slate-400 mb-4">You can fully repay manually or flash close by sacrificing 1% collateral.</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleFullRepay}
                disabled={isPending}
                className="w-full border border-green-500/50 text-green-400 hover:bg-green-500/10 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center text-sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Full Repayment
              </button>
              <button
                onClick={handleFlashClose}
                disabled={isPending}
                className="w-full bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500/20 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center text-sm"
              >
                <Zap className="w-4 h-4 mr-2" /> Flash Close
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}