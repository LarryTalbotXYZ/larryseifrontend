'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileConnectButton from '@/components/MobileConnectButton';
import TradingInterface from '@/components/TradingInterface';
import LoanDashboard from '@/components/LoanDashboard';
import { Activity, BookOpen, Menu, X } from 'lucide-react';
import { useChainId, useChains } from 'wagmi';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('buy');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chainId = useChainId();
  const chains = useChains();
  const chainName = chains.find(c => c.id === chainId)?.name ?? 'Base Network';

  return (
    <div className="min-h-screen flex flex-col text-slate-100 bg-slate-950">
      {/* Premium Dark Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-slate-900/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">LARRY</span>
              <span className="text-[10px] font-medium text-violet-400 tracking-wider uppercase">Protocol</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">Home</Link>
            <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm">Documentation</Link>
            <span className="text-white font-medium text-sm border-b-2 border-violet-500 pb-1">Trading App</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <MobileConnectButton />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-x-0 border-b-0 rounded-none absolute w-full backdrop-blur-3xl">
            <div className="px-6 py-6 space-y-6 flex flex-col">
              <Link href="/" className="text-slate-300 hover:text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/docs" className="text-slate-300 hover:text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Documentation</Link>
              <Link href="/dashboard" className="text-white font-medium text-lg" onClick={() => setMobileMenuOpen(false)}>Trading App</Link>
              <div className="pt-4 border-t border-slate-700/50">
                <MobileConnectButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-28 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Trading Console</h1>
              <p className="text-slate-400">Execute swaps, build leverage loops, and manage your collateral.</p>
            </div>
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              {chainName}
            </div>
          </div>

          <div className="grid gap-12">
            {/* Primary Action Interface */}
            <div>
              <TradingInterface activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Position Manager */}
            <div>
              <LoanDashboard />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/60 bg-slate-900/50 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-slate-500 text-sm">
            <Activity className="w-4 h-4" />
            <span>LARRY Protocol © 2026</span>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/docs" className="text-slate-500 hover:text-slate-300 transition-colors">Documentation</Link>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}