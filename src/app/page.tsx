'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Moon, Zap, TrendingUp, Shield, Coins, Users, ArrowRight, DollarSign, Target, Repeat, AlertTriangle } from 'lucide-react';
import { useLarryContract } from '@/hooks/useLarryContract';
import { formatEther } from 'viem';

export default function Home() {
  const { currentPrice, buyFeePercent, leverageFeePercent, backing } = useLarryContract();

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
            <Link href="/veyaka" className="text-[#e6e6f0] hover:text-[#ffd700] transition-colors text-sm sm:text-base hidden sm:inline">
              VeYAKA
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
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
              <DollarSign className="w-8 h-8 text-[#ffd700] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#ffd700] mb-2">
                {backing ? `${parseFloat(formatEther(backing as bigint)).toFixed(2)} SEI` : '0.00 SEI'}
              </h3>
              <p className="text-[#e6e6f0]/70">TVL</p>
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
            <h4 className="text-2xl font-bold text-[#ffd700] mb-4">Extreme Leverage Loops</h4>
            <p className="text-[#e6e6f0]/80 mb-4">Turn 500 SEI into 10,000 SEI exposure through recursive leverage.</p>
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
        
        {/* Leverage Loop Integration */}
        <div className="mt-16 mb-12">
          <div className="werewolf-card p-8 rounded-xl border-2 border-[#ffd700]/30">
            <h4 className="text-2xl font-bold text-[#ffd700] mb-6 text-center">🚀 Leverage Loop: 500 SEI → 10,000 SEI Exposure</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 bg-[#ffd700] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold text-xs">1</div>
                    <div className="text-[#ffd700] font-semibold">Start with 500 SEI</div>
                  </div>
                  <div className="text-[#e6e6f0]/80 text-sm">Buy LARRY tokens with your initial capital</div>
                  <div className="text-[#10b981] font-bold text-sm">Position: 500 SEI</div>
                </div>
                
                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 bg-[#ffd700] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold text-xs">2</div>
                    <div className="text-[#ffd700] font-semibold">Leverage Loop #1</div>
                  </div>
                  <div className="text-[#e6e6f0]/80 text-sm">Use LARRY as collateral, borrow 495 SEI (99% LTV)</div>
                  <div className="text-[#10b981] font-bold text-sm">Position: 995 SEI</div>
                </div>
                
                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 bg-[#ffd700] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold text-xs">3</div>
                    <div className="text-[#ffd700] font-semibold">Repeat Process</div>
                  </div>
                  <div className="text-[#e6e6f0]/80 text-sm">Buy more LARRY, leverage again, compound exposure</div>
                  <div className="text-[#10b981] font-bold text-sm">Keep looping...</div>
                </div>
                
                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 bg-[#ffd700] rounded-full flex items-center justify-center text-[#0a0a0f] font-bold text-xs">∞</div>
                    <div className="text-[#ffd700] font-semibold">Final Result</div>
                  </div>
                  <div className="text-[#e6e6f0]/80 text-sm">Achieve massive leverage through recursive borrowing</div>
                  <div className="text-[#10b981] font-bold text-lg">Position: ~10,000 SEI (20x)</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto border-4 border-[#10b981] rounded-full flex items-center justify-center bg-gradient-to-br from-[#10b981]/20 to-transparent">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#10b981]">20x</div>
                      <div className="text-xs text-[#e6e6f0]/70">LEVERAGE</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg p-4">
                  <h5 className="text-[#10b981] font-semibold mb-3">💰 Profit Potential</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#e6e6f0]/70">LARRY +10%:</span>
                      <span className="text-[#10b981] font-bold">+200% Returns</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#e6e6f0]/70">LARRY +50%:</span>
                      <span className="text-[#10b981] font-bold">+1000% Returns</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#8b0000]/10 border border-[#8b0000]/30 rounded-lg p-4">
                  <h5 className="text-[#8b0000] font-semibold mb-3">⚠️ Risk</h5>
                  <div className="space-y-1 text-xs text-[#e6e6f0]/70">
                    <div>• Time-based loans - no price liquidation</div>
                    <div>• Must repay by loan end date or lose collateral</div>
                    <div>• {leverageFeePercent}% fee + 3.9% APR interest</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link href="/dashboard" className="inline-flex items-center bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#059669] hover:to-[#10b981] transition-all text-sm">
                    Try Leverage Loop
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Why This Matters */}
        <div className="mt-12">
          <div className="werewolf-card p-8 rounded-xl">
            <h4 className="text-2xl font-bold text-[#ffd700] mb-6 text-center">Why Volatility Strategy &gt; Static Tokens</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h5 className="text-lg font-semibold text-[#ffd700]">Traditional DeFi:</h5>
                <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
                  <li>• Relies on speculation for growth</li>
                  <li>• Equal fees for all participants</li>
                  <li>• Limited arbitrage opportunities</li>
                  <li>• Doesn&apos;t benefit from volatility</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-lg font-semibold text-[#10b981]">LARRY&apos;s Arbitrage Strategy:</h5>
                <ul className="text-[#e6e6f0]/70 space-y-2 text-sm">
                  <li>• Profits from market volatility and inefficiencies</li>
                  <li>• Fee-free trading for optimal execution</li>
                  <li>• Creates sustainable yield for liquidity providers</li>
                  <li>• Self-reinforcing growth through activity</li>
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
                    <li>Time-based loans: must repay by end date or lose collateral</li>
                    <li>Loan defaults result in permanent collateral loss</li>
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
                href="https://discord.gg/bqFEPA56Tc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#e6e6f0]/70 hover:text-[#ffd700] transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
                <span>Join Discord</span>
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
