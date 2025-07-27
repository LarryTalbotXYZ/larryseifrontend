'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Moon, Zap, TrendingUp, Shield, Coins, Users, ArrowRight, DollarSign, Clock, Target, Repeat, AlertTriangle, BarChart3 } from 'lucide-react';
import { useLarryContract } from '@/hooks/useLarryContract';

export default function Home() {
  const { currentPrice } = useLarryContract();

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
            <Link href="/dashboard" className="text-[#e6e6f0] hover:text-[#ffd700] transition-colors">
              Dashboard
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#ffd700] via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
            Transform Under the Moon
          </h2>
          <p className="text-xl text-[#e6e6f0]/80 mb-12 leading-relaxed">
            Larry Talbot rises on Sei Network. Buy, leverage, and borrow LARRY tokens 
            with the power of the werewolf. When the moon is full, fortunes are made.
          </p>
          
          {/* CTA Button */}
          <Link href="/dashboard" className="inline-flex items-center bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#b8860b] hover:to-[#ffd700] transition-all transform hover:scale-105 mb-16">
            Enter the Pack
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="werewolf-card p-6 rounded-xl">
              <Coins className="w-8 h-8 text-[#ffd700] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#ffd700] mb-2">1B LARRY</h3>
              <p className="text-[#e6e6f0]/70">Max Supply</p>
            </div>
            <div className="werewolf-card p-6 rounded-xl">
              <TrendingUp className="w-8 h-8 text-[#ffd700] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#ffd700] mb-2">
                ${currentPrice ? currentPrice.toFixed(6) : '0.000000'}
              </h3>
              <p className="text-[#e6e6f0]/70">Current Price</p>
            </div>
            <div className="werewolf-card p-6 rounded-xl">
              <Shield className="w-8 h-8 text-[#ffd700] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#ffd700] mb-2">99%</h3>
              <p className="text-[#e6e6f0]/70">Collateral Ratio</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[#ffd700] mb-4">How LARRY Works</h3>
          <p className="text-xl text-[#e6e6f0]/80">Understanding the werewolf-powered DeFi protocol</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="werewolf-card p-8 rounded-xl">
            <TrendingUp className="w-12 h-12 text-[#ffd700] mb-6" />
            <h4 className="text-2xl font-bold text-[#ffd700] mb-4">SEI-Backed Tokens</h4>
            <p className="text-[#e6e6f0]/80 mb-4">Every LARRY token is backed by SEI deposits in the smart contract, ensuring intrinsic value.</p>
            <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
              <li>• Price = Total SEI Backing ÷ Total LARRY Supply</li>
              <li>• Deflationary mechanics through token burning</li>
              <li>• Protocol fees increase backing ratio over time</li>
            </ul>
          </div>
          
          <div className="werewolf-card p-8 rounded-xl">
            <Repeat className="w-12 h-12 text-[#ffd700] mb-6" />
            <h4 className="text-2xl font-bold text-[#ffd700] mb-4">Buy & Sell</h4>
            <p className="text-[#e6e6f0]/80 mb-4">Simple trading with built-in price protection and liquidity.</p>
            <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
              <li>• 0.1% trading fee on buy/sell</li>
              <li>• Instant liquidity from contract backing</li>
              <li>• Max buttons for easy position sizing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trading Features */}
      <section className="container mx-auto px-6 py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[#ffd700] mb-4">Trading Features</h3>
          <p className="text-xl text-[#e6e6f0]/80">Advanced DeFi tools for the modern werewolf</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="werewolf-card p-8 rounded-xl">
            <Zap className="w-12 h-12 text-[#ffd700] mb-6" />
            <h4 className="text-2xl font-bold text-[#ffd700] mb-4">Leverage Trading</h4>
            <p className="text-[#e6e6f0]/80 mb-4">Amplify your positions with up to 99% collateralization.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#1a1a2e] p-3 rounded border border-[#ffd700]/20">
                <div className="text-[#ffd700] font-bold">1%</div>
                <div className="text-[#e6e6f0]/70 text-sm">Leverage Fee</div>
              </div>
              <div className="bg-[#1a1a2e] p-3 rounded border border-[#ffd700]/20">
                <div className="text-[#ffd700] font-bold">365 Days</div>
                <div className="text-[#e6e6f0]/70 text-sm">Max Duration</div>
              </div>
            </div>
            <div className="bg-[#8b0000]/20 p-3 rounded border border-[#8b0000]/40">
              <p className="text-[#8b0000] text-sm font-semibold">⚠️ High risk - can lose all collateral</p>
            </div>
          </div>
          
          <div className="werewolf-card p-8 rounded-xl">
            <DollarSign className="w-12 h-12 text-[#ffd700] mb-6" />
            <h4 className="text-2xl font-bold text-[#ffd700] mb-4">Borrowing & Loans</h4>
            <p className="text-[#e6e6f0]/80 mb-4">Borrow SEI using LARRY as collateral without selling.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#1a1a2e] p-3 rounded border border-[#ffd700]/20">
                <div className="text-[#ffd700] font-bold">99%</div>
                <div className="text-[#e6e6f0]/70 text-sm">Loan-to-Value</div>
              </div>
              <div className="bg-[#1a1a2e] p-3 rounded border border-[#ffd700]/20">
                <div className="text-[#ffd700] font-bold">3.9%</div>
                <div className="text-[#e6e6f0]/70 text-sm">APR Interest</div>
              </div>
            </div>
            <ul className="text-[#e6e6f0]/70 space-y-1 text-sm">
              <li>• Extend loans up to 365 days</li>
              <li>• Partial repayment options</li>
              <li>• Flash close for instant exit</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contract Information */}
      <section className="container mx-auto px-6 py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[#ffd700] mb-4">Contract Details</h3>
          <p className="text-xl text-[#e6e6f0]/80">Deployed on Sei Network</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="werewolf-card p-8 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h4 className="text-[#ffd700] font-semibold mb-2">Network</h4>
                <p className="text-[#e6e6f0]">Sei Network</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h4 className="text-[#ffd700] font-semibold mb-2">Token Symbol</h4>
                <p className="text-[#e6e6f0]">LARRY</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h4 className="text-[#ffd700] font-semibold mb-2">Max Supply</h4>
                <p className="text-[#e6e6f0]">1,000,000,000 LARRY</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h4 className="text-[#ffd700] font-semibold mb-2">Decimals</h4>
                <p className="text-[#e6e6f0]">18</p>
              </div>
            </div>
            
            <div className="mt-6 bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h4 className="text-[#ffd700] font-semibold mb-2">Contract Address</h4>
              <p className="text-[#e6e6f0] font-mono text-sm break-all">0x888d81e3ea5E8362B5f69188CBCF34Fa8da4b888</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section className="container mx-auto px-6 py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[#ffd700] mb-4">Tokenomics</h3>
          <p className="text-xl text-[#e6e6f0]/80">Deflationary mechanics benefit the pack</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="werewolf-card p-8 rounded-xl text-center">
            <Target className="w-12 h-12 text-[#ffd700] mx-auto mb-6" />
            <h4 className="text-xl font-bold text-[#ffd700] mb-4">Burning Mechanisms</h4>
            <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
              <li>• Liquidated loans burn collateral</li>
              <li>• Flash close burns LARRY</li>
              <li>• Initial 1% burn on launch</li>
            </ul>
          </div>
          
          <div className="werewolf-card p-8 rounded-xl text-center">
            <BarChart3 className="w-12 h-12 text-[#ffd700] mx-auto mb-6" />
            <h4 className="text-xl font-bold text-[#ffd700] mb-4">Fee Structure</h4>
            <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
              <li>• Buy/Sell: 0.1% each</li>
              <li>• Leverage: 1% + 3.9% APR</li>
              <li>• Flash Close: 1%</li>
            </ul>
          </div>
          
          <div className="werewolf-card p-8 rounded-xl text-center">
            <Clock className="w-12 h-12 text-[#ffd700] mx-auto mb-6" />
            <h4 className="text-xl font-bold text-[#ffd700] mb-4">Liquidation</h4>
            <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
              <li>• Daily at 00:00 UTC</li>
              <li>• Expired loans liquidated</li>
              <li>• Collective burning process</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[#ffd700] mb-4">The Wolf&apos;s Arsenal</h3>
          <p className="text-xl text-[#e6e6f0]/80">Advanced DeFi features for the modern trader</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="werewolf-card p-8 rounded-xl text-center">
            <Moon className="w-12 h-12 text-[#ffd700] mx-auto mb-6 moon-glow" />
            <h4 className="text-xl font-bold text-[#ffd700] mb-4">Moon-Backed Value</h4>
            <p className="text-[#e6e6f0]/70">Every LARRY token is backed by SEI, creating intrinsic value that grows with adoption and deflationary mechanics.</p>
          </div>
          
          <div className="werewolf-card p-8 rounded-xl text-center">
            <Zap className="w-12 h-12 text-[#ffd700] mx-auto mb-6" />
            <h4 className="text-xl font-bold text-[#ffd700] mb-4">Lightning Fast</h4>
            <p className="text-[#e6e6f0]/70">Built on Sei Network for ultra-fast transactions and low fees. Trade with the speed of the werewolf.</p>
          </div>
          
          <div className="werewolf-card p-8 rounded-xl text-center">
            <Users className="w-12 h-12 text-[#ffd700] mx-auto mb-6" />
            <h4 className="text-xl font-bold text-[#ffd700] mb-4">Pack Finance</h4>
            <p className="text-[#e6e6f0]/70">Community-driven DeFi where liquidations and burns benefit all remaining token holders in the pack.</p>
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="container mx-auto px-6 py-20 border-t border-[#8b0000]/40">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#8b0000]/20 p-8 rounded-xl border border-[#8b0000]/40">
            <div className="flex items-start mb-4">
              <AlertTriangle className="w-8 h-8 text-[#8b0000] mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-[#8b0000] mb-4">Risk Warning</h3>
                <div className="space-y-3 text-[#e6e6f0]/90">
                  <p><strong className="text-[#8b0000]">This is not financial advice.</strong> LARRY tokens and associated DeFi features carry significant risks:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Smart contract risks and potential bugs</li>
                    <li>High leverage can result in total loss of collateral</li>
                    <li>Loan liquidations result in permanent loss</li>
                    <li>Market volatility can cause rapid value changes</li>
                    <li>Regulatory risks in DeFi protocols</li>
                  </ul>
                  <p className="text-[#8b0000] font-semibold">Only invest what you can afford to lose. The werewolf's curse is powerful, but not without danger.</p>
                </div>
              </div>
            </div>
          </div>
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
