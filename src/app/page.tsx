'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Moon, Zap, TrendingUp, Shield, Coins, Users, ArrowRight, DollarSign, Target, Repeat, AlertTriangle } from 'lucide-react';
import { useLarryContract } from '@/hooks/useLarryContract';

export default function Home() {
  const { currentPrice, buyFeePercent, sellFeePercent, leverageFeePercent } = useLarryContract();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#ffd700]/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
            <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffd700] moon-glow" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#ffd700]">LARRY TALBOT</h1>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/docs" className="text-[#e6e6f0] hover:text-[#ffd700] transition-colors text-sm sm:text-base">
              Docs
            </Link>
            <Link href="/dashboard" className="text-[#e6e6f0] hover:text-[#ffd700] transition-colors text-sm sm:text-base hidden sm:inline">
              Dashboard
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#ffd700] via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
            Transform Under the Moon
          </h2>
          <p className="text-lg sm:text-xl text-[#e6e6f0]/80 mb-12 leading-relaxed px-4 sm:px-0">
            Larry Talbot builds v3,3 voting power on every network with each trade. Your fees become 
            governance tokens, directing emissions back to LARRY pools. The flywheel strengthens across all chains.
          </p>
          
          {/* CTA Button */}
          <Link href="/dashboard" className="inline-flex items-center bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:from-[#b8860b] hover:to-[#ffd700] transition-all transform hover:scale-105 mb-16">
            Launch App
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
                {currentPrice ? `${currentPrice.toFixed(6)} SEI` : '0.000000 SEI'}
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
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-[#ffd700] mb-4">How LARRY Works</h3>
          <p className="text-lg sm:text-xl text-[#e6e6f0]/80 px-4 sm:px-0">Building v3,3 governance power across all networks</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="werewolf-card p-8 rounded-xl">
            <TrendingUp className="w-12 h-12 text-[#ffd700] mb-6" />
            <h4 className="text-2xl font-bold text-[#ffd700] mb-4">Fees → v3,3 Power</h4>
            <p className="text-[#e6e6f0]/80 mb-4">Every trading fee automatically purchases and locks governance tokens for maximum voting power.</p>
            <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
              <li>• {buyFeePercent}% fee on all DEX trading volume</li>
              <li>• 100% of fees buy governance tokens</li>
              <li>• Auto-lock for maximum voting periods</li>
            </ul>
          </div>
          
          <div className="werewolf-card p-8 rounded-xl">
            <Repeat className="w-12 h-12 text-[#ffd700] mb-6" />
            <h4 className="text-2xl font-bold text-[#ffd700] mb-4">Vote → Higher APR</h4>
            <p className="text-[#e6e6f0]/80 mb-4">Governance votes direct emissions to LARRY pools across networks, boosting liquidity rewards.</p>
            <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
              <li>• Regular epoch voting on v3,3 DEXs</li>
              <li>• All votes go to LARRY pools</li>
              <li>• Higher APR attracts more liquidity</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trading Features */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-[#ffd700] mb-4">Trading Features</h3>
          <p className="text-lg sm:text-xl text-[#e6e6f0]/80 px-4 sm:px-0">Advanced DeFi tools for the modern werewolf</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="werewolf-card p-8 rounded-xl">
            <Zap className="w-12 h-12 text-[#ffd700] mb-6" />
            <h4 className="text-2xl font-bold text-[#ffd700] mb-4">Leverage Trading</h4>
            <p className="text-[#e6e6f0]/80 mb-4">Amplify your positions with up to 99% collateralization.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#1a1a2e] p-3 rounded border border-[#ffd700]/20">
                <div className="text-[#ffd700] font-bold">{leverageFeePercent}%</div>
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
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-[#ffd700] mb-4">Contract Details</h3>
          <p className="text-lg sm:text-xl text-[#e6e6f0]/80 px-4 sm:px-0">Deployed on Sei Network</p>
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
              <p className="text-[#e6e6f0] font-mono text-xs sm:text-sm break-all">0x888d81e3ea5E8362B5f69188CBCF34Fa8da4b888</p>
            </div>
          </div>
        </div>
      </section>

      {/* LARRY v3,3 Flywheel */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-[#ffd700] mb-4">LARRY v3,3 Flywheel</h3>
          <p className="text-lg sm:text-xl text-[#e6e6f0]/80 px-4 sm:px-0">Building voting power on every network with v3,3 DEXs</p>
        </div>
        
        {/* Flywheel Visualization */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="werewolf-card p-8 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-[#1a1a2e] rounded-lg border border-[#ffd700]/20">
                  <div className="w-8 h-8 bg-[#ffd700] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold text-sm">1</div>
                  <div>
                    <div className="text-[#ffd700] font-semibold">LARRY Trading Fees</div>
                    <div className="text-[#e6e6f0]/70 text-sm">{buyFeePercent}% of all trading volume</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-[#1a1a2e] rounded-lg border border-[#ffd700]/20">
                  <div className="w-8 h-8 bg-[#ffd700] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold text-sm">2</div>
                  <div>
                    <div className="text-[#ffd700] font-semibold">Buy v3,3 Tokens</div>
                    <div className="text-[#e6e6f0]/70 text-sm">100% of fees → governance tokens</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-[#1a1a2e] rounded-lg border border-[#ffd700]/20">
                  <div className="w-8 h-8 bg-[#ffd700] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold text-sm">3</div>
                  <div>
                    <div className="text-[#ffd700] font-semibold">Lock for Power</div>
                    <div className="text-[#e6e6f0]/70 text-sm">Max lock periods for voting power</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-[#1a1a2e] rounded-lg border border-[#ffd700]/20">
                  <div className="w-8 h-8 bg-[#ffd700] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold text-sm">4</div>
                  <div>
                    <div className="text-[#ffd700] font-semibold">Vote Emissions</div>
                    <div className="text-[#e6e6f0]/70 text-sm">Direct rewards to LARRY pools</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="w-32 h-32 mx-auto border-4 border-[#ffd700] rounded-full flex items-center justify-center bg-gradient-to-br from-[#ffd700]/20 to-transparent">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#ffd700]">∞</div>
                      <div className="text-xs text-[#e6e6f0]/70">FLYWHEEL</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ffd700] rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-[#ffd700] font-semibold">Higher APR → More Liquidity</div>
                  <div className="text-[#e6e6f0]/70 text-sm">→ More Trading → More Fees</div>
                  <div className="text-[#e6e6f0]/70 text-sm">→ More Tokens → More Voting Power</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Flywheel Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="werewolf-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-[#ffd700]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-[#ffd700]" />
            </div>
            <h4 className="text-lg font-bold text-[#ffd700] mb-2">Fee Conversion</h4>
            <div className="text-[#e6e6f0]/70 text-sm">100% of trading fees automatically purchase governance tokens</div>
          </div>
          
          <div className="werewolf-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-[#ffd700]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-[#ffd700]" />
            </div>
            <h4 className="text-lg font-bold text-[#ffd700] mb-2">Max Voting Power</h4>
            <div className="text-[#e6e6f0]/70 text-sm">Optimal lock periods for maximum governance influence</div>
          </div>
          
          <div className="werewolf-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-[#ffd700]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-[#ffd700]" />
            </div>
            <h4 className="text-lg font-bold text-[#ffd700] mb-2">Boost Rewards</h4>
            <div className="text-[#e6e6f0]/70 text-sm">Direct emissions to LARRY pools for higher APR</div>
          </div>
          
          <div className="werewolf-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-[#ffd700]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Repeat className="w-6 h-6 text-[#ffd700]" />
            </div>
            <h4 className="text-lg font-bold text-[#ffd700] mb-2">Self-Reinforcing</h4>
            <div className="text-[#e6e6f0]/70 text-sm">Each transaction strengthens the flywheel</div>
          </div>
        </div>
        
        {/* Why This Matters */}
        <div className="mt-12">
          <div className="werewolf-card p-8 rounded-xl">
            <h4 className="text-2xl font-bold text-[#ffd700] mb-6 text-center">Why v3,3 Flywheel &gt; Static Tokens</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h5 className="text-lg font-semibold text-[#ffd700]">Traditional Tokens:</h5>
                <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
                  <li>• Sit idle in wallets</li>
                  <li>• No direct utility beyond trading</li>
                  <li>• Value depends on speculation</li>
                  <li>• Don&apos;t generate sustainable yield</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-lg font-semibold text-[#10b981]">LARRY&apos;s v3,3 Strategy:</h5>
                <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
                  <li>• Actively builds governance power on any network</li>
                  <li>• Directs emissions to increase liquidity APR</li>
                  <li>• Creates sustainable yield for LPs</li>
                  <li>• Self-reinforcing growth mechanism</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-[#ffd700] mb-4">The Wolf&apos;s Arsenal</h3>
          <p className="text-lg sm:text-xl text-[#e6e6f0]/80 px-4 sm:px-0">Advanced DeFi features for the modern trader</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-[#8b0000]/40">
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
                  <p className="text-[#8b0000] font-semibold">Only invest what you can afford to lose. The werewolf&apos;s curse is powerful, but not without danger.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ffd700]/20 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#e6e6f0]/60">© 2024 Larry Talbot. The curse of the werewolf lives on Sei Network.</p>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <a 
                href="https://t.me/btbfinance" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#e6e6f0]/70 hover:text-[#ffd700] transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span>@btbfinance</span>
              </a>
              <a 
                href="https://x.com/btb_finance" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#e6e6f0]/70 hover:text-[#ffd700] transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>@btb_finance</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
