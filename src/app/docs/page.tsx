'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Moon, ArrowLeft, Shield, Zap, DollarSign, TrendingUp, AlertTriangle, Users } from 'lucide-react';

export default function Docs() {
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
            <Link href="/dashboard" className="text-[#e6e6f0] hover:text-[#ffd700] transition-colors text-sm sm:text-base">
              Dashboard
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Documentation Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-[#ffd700] hover:text-[#b8860b] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffd700] mb-4">🐺 LARRY on SEI</h1>
        <p className="text-lg sm:text-xl text-[#e6e6f0]/80 mb-8 sm:mb-12">Built by BTB Finance - A deflationary, fully-backed token with fee-free arbitrage opportunities</p>

        {/* What is LARRY Section */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ffd700] mb-4 sm:mb-6 flex items-center">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
            What is LARRY?
          </h2>
          
          <div className="space-y-4 text-[#e6e6f0]/90 mb-6">
            <ul className="space-y-2 list-disc list-inside ml-4">
              <li>A token fully backed by <strong className="text-[#ffd700]">SEI</strong> inside the smart contract</li>
              <li>Designed for <strong className="text-[#ffd700]">liquidity providers</strong> — LARRY incentivizes USDC/LARRY pools on Yaka and Dragon</li>
              <li>Built to <strong className="text-[#ffd700]">increase in price</strong> with every buy/sell/borrow</li>
              <li>Enables <strong className="text-[#ffd700]">looping strategies</strong>: buy → borrow → buy again (repeat)</li>
              <li>Has a <strong className="text-[#ffd700]">deflationary supply</strong> through liquidations and burn mechanics</li>
              <li><strong className="text-[#ffd700]">Whitelisted addresses</strong> for fee-free arbitrage opportunities</li>
              <li>Helps grow <strong className="text-[#ffd700]">LP depth</strong> on SEI through strategic incentives</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h3 className="text-[#ffd700] font-semibold mb-2">Network</h3>
              <p className="text-[#e6e6f0]">SEI Network</p>
            </div>
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h3 className="text-[#ffd700] font-semibold mb-2">Owned By</h3>
              <p className="text-[#e6e6f0]">BTB Finance</p>
            </div>
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h3 className="text-[#ffd700] font-semibold mb-2">Loops Supported</h3>
              <p className="text-[#e6e6f0]">✅ (Buy → Borrow → Buy)</p>
            </div>
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h3 className="text-[#ffd700] font-semibold mb-2">Supply Type</h3>
              <p className="text-[#e6e6f0]">Deflationary</p>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#ffd700] mb-4">LARRY Price Mechanism</h3>
          <div className="space-y-4 text-[#e6e6f0]/90">
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <code className="text-[#ffd700] text-lg">price = (SEI in contract + total borrowed SEI) / total LARRY supply</code>
            </div>
            <p>So when:</p>
            <ul className="space-y-2 list-disc list-inside ml-4">
              <li>Users <strong className="text-[#ffd700]">buy</strong> LARRY → SEI enters the contract → price goes up</li>
              <li>Users <strong className="text-[#ffd700]">sell</strong> LARRY → LARRY burns → supply goes down → price goes up</li>
              <li><strong className="text-[#ffd700]">Borrowing fees</strong>, <strong className="text-[#ffd700]">interest</strong>, and <strong className="text-[#ffd700]">liquidation proceeds</strong> stay in the contract → price goes up</li>
            </ul>
          </div>
        </section>

        {/* Looping Strategy Section */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3" />
            🔁 How Looping Works
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <p className="text-lg">Start with 1000 SEI (@ $0.50):</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#ffd700]/20">
                <thead>
                  <tr className="bg-[#1a1a2e]">
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">Step</th>
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">Action</th>
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">SEI Used</th>
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">LARRY Received</th>
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#ffd700]/20 p-3">1</td>
                    <td className="border border-[#ffd700]/20 p-3">Buy LARRY</td>
                    <td className="border border-[#ffd700]/20 p-3">1000</td>
                    <td className="border border-[#ffd700]/20 p-3">~996.25</td>
                    <td className="border border-[#ffd700]/20 p-3">0.25% fee, price increases</td>
                  </tr>
                  <tr className="bg-[#1a1a2e]/50">
                    <td className="border border-[#ffd700]/20 p-3">2</td>
                    <td className="border border-[#ffd700]/20 p-3">Borrow SEI</td>
                    <td className="border border-[#ffd700]/20 p-3">~986</td>
                    <td className="border border-[#ffd700]/20 p-3">996.25 LARRY</td>
                    <td className="border border-[#ffd700]/20 p-3">99% LTV, borrow against LARRY</td>
                  </tr>
                  <tr>
                    <td className="border border-[#ffd700]/20 p-3">3</td>
                    <td className="border border-[#ffd700]/20 p-3">Buy more LARRY</td>
                    <td className="border border-[#ffd700]/20 p-3">986</td>
                    <td className="border border-[#ffd700]/20 p-3">~982</td>
                    <td className="border border-[#ffd700]/20 p-3">More price increase</td>
                  </tr>
                  <tr className="bg-[#1a1a2e]/50">
                    <td className="border border-[#ffd700]/20 p-3">4</td>
                    <td className="border border-[#ffd700]/20 p-3">Borrow again</td>
                    <td className="border border-[#ffd700]/20 p-3">~972</td>
                    <td className="border border-[#ffd700]/20 p-3">982 LARRY</td>
                    <td className="border border-[#ffd700]/20 p-3">Repeat</td>
                  </tr>
                  <tr>
                    <td className="border border-[#ffd700]/20 p-3">...</td>
                    <td className="border border-[#ffd700]/20 p-3">Continue looping</td>
                    <td className="border border-[#ffd700]/20 p-3">...</td>
                    <td className="border border-[#ffd700]/20 p-3 text-2xl">🚀</td>
                    <td className="border border-[#ffd700]/20 p-3">Watch your LARRY stack grow</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h4 className="text-[#ffd700] font-bold mb-2">Every loop:</h4>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>More SEI gets locked in the contract</li>
                <li>LARRY price increases</li>
                <li>You accumulate more LARRY</li>
                <li>Treasury strengthens</li>
              </ul>
            </div>

            <p className="text-lg">You can <strong className="text-[#ffd700]">unwind</strong> anytime by selling LARRY back into SEI. The protocol always honors redemption based on current backing.</p>
          </div>
        </section>

        {/* Fees & Deflation Section */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3" />
            🔥 Fees & Deflation
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#ffd700]/20">
                <thead>
                  <tr className="bg-[#1a1a2e]">
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">Action</th>
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">Fee</th>
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">Team Share</th>
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">Protocol Share</th>
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#ffd700]/20 p-3">Buy/Sell</td>
                    <td className="border border-[#ffd700]/20 p-3">0.1%</td>
                    <td className="border border-[#ffd700]/20 p-3">~0.05%</td>
                    <td className="border border-[#ffd700]/20 p-3">~0.05%</td>
                    <td className="border border-[#ffd700]/20 p-3">BTB incentivizes DEX LPs</td>
                  </tr>
                  <tr className="bg-[#1a1a2e]/50">
                    <td className="border border-[#ffd700]/20 p-3">Borrow</td>
                    <td className="border border-[#ffd700]/20 p-3">~3.9% APR + fees</td>
                    <td className="border border-[#ffd700]/20 p-3">~30%</td>
                    <td className="border border-[#ffd700]/20 p-3">~70%</td>
                    <td className="border border-[#ffd700]/20 p-3">Interest stays in contract</td>
                  </tr>
                  <tr>
                    <td className="border border-[#ffd700]/20 p-3">Liquidation</td>
                    <td className="border border-[#ffd700]/20 p-3">100% LARRY burned</td>
                    <td className="border border-[#ffd700]/20 p-3">0%</td>
                    <td className="border border-[#ffd700]/20 p-3">SEI retained</td>
                    <td className="border border-[#ffd700]/20 p-3">Deflationary burn + backing strength</td>
                  </tr>
                  <tr className="bg-[#1a1a2e]/50">
                    <td className="border border-[#ffd700]/20 p-3">Whitelisted</td>
                    <td className="border border-[#ffd700]/20 p-3">0%</td>
                    <td className="border border-[#ffd700]/20 p-3">0%</td>
                    <td className="border border-[#ffd700]/20 p-3">0%</td>
                    <td className="border border-[#ffd700]/20 p-3">Fee-free trading for arbitrageurs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <p><strong className="text-[#ffd700]">BTB Finance</strong> uses collected fees to <strong className="text-[#ffd700]">incentivize liquidity providers</strong> on <strong className="text-[#ffd700]">Yaka Swap</strong> and <strong className="text-[#ffd700]">Dragon Swap</strong> for USDC/LARRY pools. This creates deeper liquidity and better trading conditions for all users.</p>
            </div>
          </div>
        </section>

        {/* YAKA Integration Section */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <DollarSign className="w-8 h-8 mr-3" />
            🧩 Arbitrage & Volatility Strategy
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <p><strong className="text-[#ffd700]">BTB Finance</strong> maintains <strong className="text-[#ffd700]">whitelisted addresses</strong> that trade <strong className="text-[#ffd700]">fee-free</strong>, allowing for optimal arbitrage execution. This creates:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">⚡ Instant arbitrage</h3>
                <p>When price opportunities arise</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">💹 Higher volatility rewards</h3>
                <p>More trading = more fees</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">🧪 Enhanced LP rewards</h3>
                <p>On Yaka and Dragon Swap</p>
              </div>
            </div>

            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h4 className="text-[#ffd700] font-bold mb-2">As market volatility increases:</h4>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>More trading opportunities emerge</li>
                <li>Whitelisted addresses capture arbitrage before others</li>
                <li>More fees flow to liquidity providers</li>
                <li><strong className="text-[#ffd700]">Price stability improves</strong> through efficient arbitrage</li>
              </ul>
            </div>

            <p className="text-lg text-center">This is a <strong className="text-[#ffd700]">profitable flywheel</strong> of volatility → arbitrage → fees → LP rewards → repeat 🔁</p>
          </div>
        </section>

        {/* Who Should Use LARRY Section */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <Users className="w-8 h-8 mr-3" />
            🧠 Who Should Use LARRY?
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2 flex items-center">
                  🧑‍🌾 Liquidity Providers
                </h3>
                <p>Earn boosted APR from YAKA votes</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2 flex items-center">
                  💹 Traders
                </h3>
                <p>Accumulate LARRY early, benefit from price rise</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2 flex items-center">
                  🧪 Loopers
                </h3>
                <p>Use LARRY to safely leverage SEI over time</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2 flex items-center">
                  🧰 Protocols
                </h3>
                <p>Use LARRY as a backed, deflationary, price-positive asset</p>
              </div>
            </div>
          </div>
        </section>

        {/* Built for SEI Section */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3" />
            🛠️ Built for SEI by BTB Finance
          </h2>
          
          <div className="space-y-4 text-[#e6e6f0]/90">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Ultra-low gas fees on SEI</h3>
                <p>Perfect for looping and arbitrage</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Near-instant finality</h3>
                <p>Safe liquidations and MEV capture</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Dual DEX incentives</h3>
                <p>Yaka Swap + Dragon Swap LPs</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Whitelisted arbitrage</h3>
                <p>Fee-free trading for optimal execution</p>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Contract Analysis */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <Shield className="w-8 h-8 mr-3" />
            📋 Smart Contract Features
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">🏷️ Whitelisted Addresses</h3>
                <p>Fee-free trading for BTB Finance arbitrage operations</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">🔒 Max Supply Cap</h3>
                <p>1 billion LARRY tokens maximum supply</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">💰 Dynamic Pricing</h3>
                <p>Price = (Contract Balance + Total Borrowed) / Total Supply</p>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">🔥 Auto Liquidation</h3>
                <p>Daily liquidation at midnight UTC burns expired collateral</p>
              </div>
            </div>
            
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <h4 className="text-[#ffd700] font-bold mb-2">Key Contract Mechanisms:</h4>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li><strong>Safety Checks:</strong> Price cannot decrease by more than 10,000 wei per transaction</li>
                <li><strong>Leverage Options:</strong> Up to 99% LTV with 365-day maximum duration</li>
                <li><strong>Flash Close:</strong> Instant position closure with 1% fee</li>
                <li><strong>Fee Distribution:</strong> ~30% to BTB Finance, ~70% stays in contract</li>
                <li><strong>Collateral Management:</strong> Contract holds all borrowed LARRY as collateral</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Liquidation System Section */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3" />
            🔍 Built-in Liquidation System
          </h2>
          
          <div className="space-y-4 text-[#e6e6f0]/90">
            <ul className="space-y-2 list-disc list-inside ml-4">
              <li>If a user over-loops or if price drops, their LARRY is liquidated</li>
              <li>All LARRY is <strong className="text-[#ffd700]">burned</strong>, and the SEI is retained in the protocol</li>
              <li>This reduces supply and increases price — even during market stress</li>
              <li><strong className="text-[#ffd700]">Automated process:</strong> Liquidations happen daily at 00:00 UTC</li>
            </ul>
          </div>
        </section>

        {/* Price Simulation Section */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3" />
            📈 Price Simulation Example
          </h2>
          
          <div className="space-y-4 text-[#e6e6f0]/90">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">1M LARRY supply</h3>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">500K SEI in contract</h3>
              </div>
              <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
                <h3 className="text-[#ffd700] font-semibold mb-2">Initial price = 0.50 SEI</h3>
              </div>
            </div>
            
            <p>User buys 1000 SEI worth of LARRY → 0.25% fee → 997.5 SEI goes into contract → new price is slightly higher</p>
            <p>More users loop → backing grows → supply inflates slower → <strong className="text-[#ffd700]">price increases continuously</strong></p>
          </div>
        </section>

        {/* Summary Section */}
        <section className="werewolf-card p-4 sm:p-6 lg:p-8 rounded-xl mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold text-[#ffd700] mb-6 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3" />
            🚀 Summary
          </h2>
          
          <div className="space-y-6 text-[#e6e6f0]/90">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#ffd700]/20">
                <thead>
                  <tr className="bg-[#1a1a2e]">
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">Feature</th>
                    <th className="border border-[#ffd700]/20 p-3 text-[#ffd700] text-left">LARRY Token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#ffd700]/20 p-3">Backed By</td>
                    <td className="border border-[#ffd700]/20 p-3">SEI</td>
                  </tr>
                  <tr className="bg-[#1a1a2e]/50">
                    <td className="border border-[#ffd700]/20 p-3">Loops Supported</td>
                    <td className="border border-[#ffd700]/20 p-3">✅ (Buy → Borrow → Buy)</td>
                  </tr>
                  <tr>
                    <td className="border border-[#ffd700]/20 p-3">Deflationary Supply</td>
                    <td className="border border-[#ffd700]/20 p-3">✅ Via daily liquidation burns</td>
                  </tr>
                  <tr className="bg-[#1a1a2e]/50">
                    <td className="border border-[#ffd700]/20 p-3">Liquidity Incentives</td>
                    <td className="border border-[#ffd700]/20 p-3">✅ via YAKA votes</td>
                  </tr>
                  <tr>
                    <td className="border border-[#ffd700]/20 p-3">Fee Usage</td>
                    <td className="border border-[#ffd700]/20 p-3">Flows to Yaka & Dragon Swap LPs</td>
                  </tr>
                  <tr className="bg-[#1a1a2e]/50">
                    <td className="border border-[#ffd700]/20 p-3">Price Mechanism</td>
                    <td className="border border-[#ffd700]/20 p-3">Always increasing with activity</td>
                  </tr>
                  <tr>
                    <td className="border border-[#ffd700]/20 p-3">Built On</td>
                    <td className="border border-[#ffd700]/20 p-3">SEI</td>
                  </tr>
                  <tr className="bg-[#1a1a2e]/50">
                    <td className="border border-[#ffd700]/20 p-3">Owned By</td>
                    <td className="border border-[#ffd700]/20 p-3">BTB Finance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center space-y-4">
              <p className="text-2xl font-bold text-[#ffd700]">LARRY isn&apos;t just a token. It&apos;s a liquidity machine.</p>
              <p className="text-xl">Backed. Deflationary. Loopable. On SEI.</p>
            </div>
          </div>
        </section>

        {/* Risk Warning */}
        <section className="bg-[#8b0000]/20 p-4 sm:p-6 lg:p-8 rounded-xl border border-[#8b0000]/40 mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold text-[#8b0000] mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3" />
            ⚠️ Important Notice
          </h2>
          <div className="space-y-4 text-[#e6e6f0]/90">
            <p><strong className="text-[#8b0000]">This is not financial advice.</strong> LARRY tokens and looping strategies carry significant risks including potential total loss of invested capital.</p>
            <p className="text-[#8b0000] font-semibold">Please understand the risks and only invest what you can afford to lose.</p>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#ffd700]/20">
              <p className="text-[#ffd700] font-semibold mb-2">Want to see more?</p>
              <ul className="space-y-1 text-[#e6e6f0]/80 text-sm">
                <li>• Smart contract source code</li>
                <li>• Frontend widgets for the loop/unwind UI</li>
                <li>• Real-time price chart integrations</li>
                <li>• Loop calculators and risk metrics</li>
              </ul>
            </div>
            
            <div className="flex items-center space-x-6">
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
            
            <p className="text-[#e6e6f0]/60">LARRY by BTB Finance - The volatility-driven liquidity machine on SEI.</p>
            
            <Link href="/dashboard" className="inline-flex items-center bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] px-6 py-3 rounded-lg font-bold hover:from-[#b8860b] hover:to-[#ffd700] transition-all">
              Start Trading
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}