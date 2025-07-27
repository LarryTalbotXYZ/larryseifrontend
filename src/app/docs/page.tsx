'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Moon, ArrowLeft, Shield, Zap, DollarSign, TrendingUp, AlertTriangle, Clock, Users } from 'lucide-react';

export default function Docs() {
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
            <Link href="/dashboard" className="text-[#e6e6f0] hover:text-[#ffd700] transition-colors">
              Dashboard
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Documentation Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-[#ffd700] hover:text-[#b8860b] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-5xl font-bold text-[#ffd700] mb-4">LARRY Token Documentation</h1>
        <p className="text-xl text-[#e6e6f0]/80 mb-12">Understanding the werewolf-powered DeFi protocol on Sei Network</p>

        {/* Token Info Section */}
        <section className="werewolf-card p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <Shield className="w-8 h-8 mr-3" />
            Token Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h3 className="text-[#ffd700] font-semibold mb-2">Network</h3>
              <p className="text-[#e6e6f0]">Sei Network</p>
            </div>
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h3 className="text-[#ffd700] font-semibold mb-2">Contract Address</h3>
              <p className="text-[#e6e6f0] font-mono text-sm break-all">0x888d81e3ea5E8362B5f69188CBCF34Fa8da4b888</p>
            </div>
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h3 className="text-[#ffd700] font-semibold mb-2">Max Total Supply</h3>
              <p className="text-[#e6e6f0]">1,000,000,000 LARRY</p>
            </div>
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h3 className="text-[#ffd700] font-semibold mb-2">Token Symbol</h3>
              <p className="text-[#e6e6f0]">LARRY</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-[#ffd700] mb-4">Intrinsic Value Mechanism</h3>
          <div className="space-y-4 text-[#e6e6f0]/90">
            <p>Each LARRY token is <strong className="text-[#ffd700]">backed by SEI tokens</strong> deposited in the protocol's smart contract. This SEI token pool ensures real, liquid value behind each token.</p>
            <p>Through burning mechanisms and accumulated fees, <strong className="text-[#ffd700]">the ratio of SEI per LARRY can only increase</strong>, creating deflationary pressure that benefits long-term holders.</p>
            <p>The werewolf curse ensures that when the moon is full (liquidations occur), the pack grows stronger through strategic token burning.</p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="werewolf-card p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3" />
            How LARRY Works
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-3">🌙 Buying LARRY</h3>
              <p>When you buy LARRY tokens, you send SEI to the smart contract. The contract mints new LARRY tokens based on the current backing ratio. A small fee (0.1%) goes to the protocol treasury.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-3">🐺 Selling LARRY</h3>
              <p>When you sell LARRY tokens, the contract burns your tokens and returns the equivalent SEI value. This burning mechanism helps maintain scarcity and supports the token price.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-3">⚡ Price Calculation</h3>
              <p>The LARRY price is determined by: <code className="bg-[#1a1a2e] px-2 py-1 rounded text-[#ffd700]">Total SEI Backing ÷ Total LARRY Supply</code></p>
              <p>This ensures every LARRY token has intrinsic value backed by real SEI deposits.</p>
            </div>
          </div>
        </section>

        {/* Leverage Section */}
        <section className="werewolf-card p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3" />
            Leverage Trading
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <p>LARRY's leverage system allows advanced traders to amplify their positions by borrowing SEI against their LARRY holdings.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Leverage Fee</h3>
                <p>Reduced from 2.5% to 1% for leveraged positions</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Maximum Duration</h3>
                <p>Up to 365 days</p>
              </div>
            </div>

            <div className="bg-[#8b0000]/20 p-4 rounded-lg border border-[#8b0000]/40">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-[#8b0000] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-[#8b0000] font-bold mb-2">Critical Warning</h4>
                  <p className="text-[#e6e6f0]/90">Using leverage carries significant risks. It is possible to lose all of your collateral. Please understand the risks before trading.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loans Section */}
        <section className="werewolf-card p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <DollarSign className="w-8 h-8 mr-3" />
            Borrowing & Loans
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <p>Users can borrow SEI tokens using LARRY as collateral, unlocking liquidity without selling their position.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Loan-to-Value</h3>
                <p>Up to 99% of LARRY value</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Duration</h3>
                <p>1 - 365 days</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Interest Rate</h3>
                <p>3.9% APR</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-3">🕛 Liquidation Process</h3>
              <p>If a loan defaults (expires without repayment), the LARRY collateral is burned. This burning increases the SEI/LARRY ratio, benefiting all remaining token holders.</p>
              <p className="text-[#c0c0c0] mt-2">Liquidated positions are burned collectively at 00:00 UTC daily - when the werewolf transformation is complete.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-3">⚡ Flash Close</h3>
              <p>Users can instantly close their position by burning their LARRY collateral to redeem underlying SEI tokens, subject to a 1% fee and applicable interest rates.</p>
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section className="werewolf-card p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <Users className="w-8 h-8 mr-3" />
            Tokenomics & Mechanisms
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-3">🔥 Deflationary Mechanics</h3>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Liquidated loan collateral is permanently burned</li>
                <li>Flash close positions burn LARRY to release SEI</li>
                <li>Protocol fees accumulate, increasing backing ratio</li>
                <li>Maximum supply cap ensures scarcity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-3">💰 Fee Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                  <h4 className="text-[#ffd700] font-semibold mb-2">Trading Fees</h4>
                  <p>Buy: 0.1% | Sell: 0.1%</p>
                </div>
                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                  <h4 className="text-[#ffd700] font-semibold mb-2">Leverage Fee</h4>
                  <p>1% + 3.9% APR interest</p>
                </div>
                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                  <h4 className="text-[#ffd700] font-semibold mb-2">Flash Close Fee</h4>
                  <p>1% of collateral value</p>
                </div>
                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                  <h4 className="text-[#ffd700] font-semibold mb-2">Loan Extension</h4>
                  <p>3.9% APR × extension days</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Disclaimer */}
        <section className="bg-[#8b0000]/20 p-8 rounded-xl border border-[#8b0000]/40 mb-8">
          <h2 className="text-2xl font-bold text-[#8b0000] mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3" />
            Risk Disclaimer
          </h2>
          <div className="space-y-4 text-[#e6e6f0]/90">
            <p><strong className="text-[#8b0000]">This is not financial advice.</strong> LARRY tokens and the associated DeFi protocol carry significant risks.</p>
            <ul className="space-y-2 list-disc list-inside ml-4">
              <li>Smart contract risks and potential bugs</li>
              <li>Liquidation risks for leveraged positions</li>
              <li>Market volatility can cause rapid value changes</li>
              <li>Potential total loss of invested capital</li>
              <li>Regulatory risks in DeFi protocols</li>
            </ul>
            <p className="text-[#8b0000] font-semibold">Please proceed with due diligence and only invest what you can afford to lose. The werewolf's curse is powerful, but not without danger.</p>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-[#e6e6f0]/60 mb-4">© 2024 Larry Talbot. The curse of the werewolf lives on Sei Network.</p>
          <Link href="/dashboard" className="inline-flex items-center bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] px-6 py-3 rounded-lg font-bold hover:from-[#b8860b] hover:to-[#ffd700] transition-all">
            Start Trading
          </Link>
        </div>
      </div>
    </div>
  );
}