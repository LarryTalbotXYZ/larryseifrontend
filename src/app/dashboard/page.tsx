'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Moon } from 'lucide-react';
import TradingInterface from '@/components/TradingInterface';
import LoanDashboard from '@/components/LoanDashboard';
import { useLarryContract } from '@/hooks/useLarryContract';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#ffd700]/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Moon className="w-8 h-8 text-[#ffd700] moon-glow" />
            <h1 className="text-2xl font-bold text-[#ffd700]">LARRY TALBOT</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/docs" className="text-[#e6e6f0] hover:text-[#ffd700] transition-colors">
              Docs
            </Link>
            <ConnectButton.Custom>
            {({ openConnectModal, account, mounted }) => {
              const ready = mounted;
              const connected = ready && account;

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          className="bg-[#ffd700] text-[#0a0a0f] px-6 py-2 rounded-lg font-semibold hover:bg-[#b8860b] transition-colors"
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    return (
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#2c2c34] px-4 py-2 rounded-lg border border-[#ffd700]/20">
                          <span className="text-[#ffd700] font-mono">
                            {account.displayName}
                          </span>
                        </div>
                        <ConnectButton />
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          </div>
        </div>
      </header>

      {/* Dashboard Header */}
      <section className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-8">Dashboard</h2>
        </div>
      </section>

      {/* Loan Dashboard */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <LoanDashboard />
        </div>
      </section>

      {/* Trading Interface */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <TradingInterface activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ffd700]/20 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#e6e6f0]/60">© 2024 Larry Talbot. The curse of the werewolf lives on Sei Network.</p>
        </div>
      </footer>
    </div>
  );
}