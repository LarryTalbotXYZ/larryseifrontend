'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Docs() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#1a1a2e_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_#16213e_0%,_transparent_50%),radial-gradient(circle_at_40%_40%,_#0f3460_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-20">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-12 border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">📚</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">Protocol Docs</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Trading</Link>
          <Link href="/veyaka" className="text-gray-300 hover:text-white transition-colors">VeYAKA</Link>
          <span className="text-yellow-400 font-medium">Documentation</span>
        </div>
        
        <ConnectButton />
      </nav>

      <main className="relative z-10">
        {/* Header Section */}
        <section className="px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Protocol </span>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Documentation</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Built by BTB Finance - A deflationary, fully-backed token with fee-free arbitrage opportunities on SEI Network
              </p>
            </div>
          </div>
        </section>

        <div className="px-6 lg:px-12 pb-20">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* What is LARRY Section */}
            <section className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                What is LARRY?
              </h2>
              
              <div className="space-y-6 text-gray-300 mb-8">
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    A token fully backed by <span className="text-yellow-400 font-semibold">SEI</span> inside the smart contract
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Designed for <span className="text-yellow-400 font-semibold">liquidity providers</span> — LARRY incentivizes USDC/LARRY pools on Yaka and Dragon
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Built to <span className="text-yellow-400 font-semibold">increase in price</span> with every buy/sell/borrow
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Enables <span className="text-yellow-400 font-semibold">looping strategies</span>: buy → borrow → buy again (repeat)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Has a <span className="text-yellow-400 font-semibold">deflationary supply</span> through liquidations and burn mechanics
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-yellow-400 font-semibold">Whitelisted addresses</span> for fee-free arbitrage opportunities
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Helps grow <span className="text-yellow-400 font-semibold">LP depth</span> on SEI through strategic incentives
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { label: 'Network', value: 'SEI Network' },
                  { label: 'Owned By', value: 'BTB Finance' },
                  { label: 'Loops Supported', value: '✅ (Buy → Borrow → Buy)' },
                  { label: 'Supply Type', value: 'Deflationary' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="text-gray-400 text-sm mb-1">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">LARRY Price Mechanism</h3>
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-yellow-400/20">
                  <code className="text-yellow-400 text-lg font-mono">
                    price = (SEI in contract + total borrowed SEI) / total LARRY supply
                  </code>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p className="mb-3">So when:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Users <span className="text-yellow-400 font-semibold">buy</span> LARRY → SEI enters the contract → price goes up
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Users <span className="text-yellow-400 font-semibold">sell</span> LARRY → LARRY burns → supply goes down → price goes up
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-yellow-400 font-semibold">Borrowing fees</span>, <span className="text-yellow-400 font-semibold">interest</span>, and <span className="text-yellow-400 font-semibold">liquidation proceeds</span> stay in the contract → price goes up
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Looping Strategy Section */}
            <section className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                🔁 How Looping Works
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg text-white mb-6">Start with 1000 SEI (@ $0.50):</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-700 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">Step</th>
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">Action</th>
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">SEI Used</th>
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">LARRY Received</th>
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-800/50 transition-colors">
                        <td className="border border-gray-700 p-4">1</td>
                        <td className="border border-gray-700 p-4">Buy LARRY</td>
                        <td className="border border-gray-700 p-4">1000</td>
                        <td className="border border-gray-700 p-4">~996.25</td>
                        <td className="border border-gray-700 p-4">0.25% fee, price increases</td>
                      </tr>
                      <tr className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                        <td className="border border-gray-700 p-4">2</td>
                        <td className="border border-gray-700 p-4">Borrow SEI</td>
                        <td className="border border-gray-700 p-4">~986</td>
                        <td className="border border-gray-700 p-4">996.25 LARRY</td>
                        <td className="border border-gray-700 p-4">99% LTV, borrow against LARRY</td>
                      </tr>
                      <tr className="hover:bg-gray-800/50 transition-colors">
                        <td className="border border-gray-700 p-4">3</td>
                        <td className="border border-gray-700 p-4">Buy more LARRY</td>
                        <td className="border border-gray-700 p-4">986</td>
                        <td className="border border-gray-700 p-4">~982</td>
                        <td className="border border-gray-700 p-4">More price increase</td>
                      </tr>
                      <tr className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                        <td className="border border-gray-700 p-4">4</td>
                        <td className="border border-gray-700 p-4">Borrow again</td>
                        <td className="border border-gray-700 p-4">~972</td>
                        <td className="border border-gray-700 p-4">982 LARRY</td>
                        <td className="border border-gray-700 p-4">Repeat</td>
                      </tr>
                      <tr className="hover:bg-gray-800/50 transition-colors">
                        <td className="border border-gray-700 p-4">...</td>
                        <td className="border border-gray-700 p-4">Continue looping</td>
                        <td className="border border-gray-700 p-4">...</td>
                        <td className="border border-gray-700 p-4 text-2xl">🚀</td>
                        <td className="border border-gray-700 p-4">Watch your LARRY stack grow</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-yellow-400 font-bold mb-4">Every loop:</h4>
                  <ul className="space-y-2 ml-6">
                    {[
                      'More SEI gets locked in the contract',
                      'LARRY price increases',
                      'You accumulate more LARRY',
                      'Treasury strengthens'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-lg">
                  You can <span className="text-yellow-400 font-semibold">unwind</span> anytime by selling LARRY back into SEI. 
                  The protocol always honors redemption based on current backing.
                </p>
              </div>
            </section>

            {/* Fees & Deflation Section */}
            <section className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                🔥 Fees & Deflation
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-700 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">Action</th>
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">Fee</th>
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">Team Share</th>
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">Protocol Share</th>
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-800/50 transition-colors">
                        <td className="border border-gray-700 p-4">Buy/Sell</td>
                        <td className="border border-gray-700 p-4">0.1%</td>
                        <td className="border border-gray-700 p-4">~0.05%</td>
                        <td className="border border-gray-700 p-4">~0.05%</td>
                        <td className="border border-gray-700 p-4">BTB incentivizes DEX LPs</td>
                      </tr>
                      <tr className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                        <td className="border border-gray-700 p-4">Borrow</td>
                        <td className="border border-gray-700 p-4">~3.9% APR + fees</td>
                        <td className="border border-gray-700 p-4">~30%</td>
                        <td className="border border-gray-700 p-4">~70%</td>
                        <td className="border border-gray-700 p-4">Interest stays in contract</td>
                      </tr>
                      <tr className="hover:bg-gray-800/50 transition-colors">
                        <td className="border border-gray-700 p-4">Liquidation</td>
                        <td className="border border-gray-700 p-4">100% LARRY burned</td>
                        <td className="border border-gray-700 p-4">0%</td>
                        <td className="border border-gray-700 p-4">SEI retained</td>
                        <td className="border border-gray-700 p-4">Deflationary burn + backing strength</td>
                      </tr>
                      <tr className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                        <td className="border border-gray-700 p-4">Whitelisted</td>
                        <td className="border border-gray-700 p-4">0%</td>
                        <td className="border border-gray-700 p-4">0%</td>
                        <td className="border border-gray-700 p-4">0%</td>
                        <td className="border border-gray-700 p-4">Fee-free trading for arbitrageurs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <p>
                    <span className="text-yellow-400 font-semibold">BTB Finance</span> uses collected fees to{' '}
                    <span className="text-yellow-400 font-semibold">incentivize liquidity providers</span> on{' '}
                    <span className="text-yellow-400 font-semibold">Yaka Swap</span> and{' '}
                    <span className="text-yellow-400 font-semibold">Dragon Swap</span> for USDC/LARRY pools. 
                    This creates deeper liquidity and better trading conditions for all users.
                  </p>
                </div>
              </div>
            </section>

            {/* Arbitrage Strategy Section */}
            <section className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                🧩 Arbitrage & Volatility Strategy
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  <span className="text-yellow-400 font-semibold">BTB Finance</span> maintains{' '}
                  <span className="text-yellow-400 font-semibold">whitelisted addresses</span> that trade{' '}
                  <span className="text-yellow-400 font-semibold">fee-free</span>, allowing for optimal arbitrage execution. This creates:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: '⚡', title: 'Instant arbitrage', desc: 'When price opportunities arise' },
                    { icon: '💹', title: 'Higher volatility rewards', desc: 'More trading = more fees' },
                    { icon: '🧪', title: 'Enhanced LP rewards', desc: 'On Yaka and Dragon Swap' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-center">
                      <div className="text-2xl mb-3">{item.icon}</div>
                      <h3 className="text-yellow-400 font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-yellow-400 font-bold mb-4">As market volatility increases:</h4>
                  <ul className="space-y-2 ml-6">
                    {[
                      'More trading opportunities emerge',
                      'Whitelisted addresses capture arbitrage before others',
                      'More fees flow to liquidity providers',
                      'Price stability improves through efficient arbitrage'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {index === 3 ? (
                          <span><span className="text-yellow-400 font-semibold">{item}</span></span>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-lg text-center">
                  This is a <span className="text-yellow-400 font-semibold">profitable flywheel</span> of volatility → arbitrage → fees → LP rewards → repeat 🔁
                </p>
              </div>
            </section>

            {/* Who Should Use LARRY Section */}
            <section className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                🧠 Who Should Use LARRY?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: '🧑‍🌾', title: 'Liquidity Providers', desc: 'Earn boosted APR from YAKA votes' },
                  { icon: '💹', title: 'Traders', desc: 'Accumulate LARRY early, benefit from price rise' },
                  { icon: '🧪', title: 'Loopers', desc: 'Use LARRY to safely leverage SEI over time' },
                  { icon: '🧰', title: 'Protocols', desc: 'Use LARRY as a backed, deflationary, price-positive asset' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-yellow-400 font-semibold mb-2 flex items-center">
                      <span className="mr-3 text-xl">{item.icon}</span>
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Built for SEI Section */}
            <section className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                🛠️ Built for SEI by BTB Finance
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Ultra-low gas fees on SEI', desc: 'Perfect for looping and arbitrage' },
                  { title: 'Near-instant finality', desc: 'Safe liquidations and MEV capture' },
                  { title: 'Dual DEX incentives', desc: 'Yaka Swap + Dragon Swap LPs' },
                  { title: 'Whitelisted arbitrage', desc: 'Fee-free trading for optimal execution' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-yellow-400 font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Smart Contract Features */}
            <section className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                📋 Smart Contract Features
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: '🏷️', title: 'Whitelisted Addresses', desc: 'Fee-free trading for BTB Finance arbitrage operations' },
                    { icon: '🔒', title: 'Max Supply Cap', desc: '1 billion LARRY tokens maximum supply' },
                    { icon: '💰', title: 'Dynamic Pricing', desc: 'Price = (Contract Balance + Total Borrowed) / Total Supply' },
                    { icon: '🔥', title: 'Auto Liquidation', desc: 'Daily liquidation at midnight UTC burns expired collateral' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-yellow-400 font-semibold mb-2 flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-yellow-400 font-bold mb-4">Key Contract Mechanisms:</h4>
                  <ul className="space-y-2 ml-6">
                    {[
                      { label: 'Safety Checks:', desc: 'Price cannot decrease by more than 10,000 wei per transaction' },
                      { label: 'Leverage Options:', desc: 'Up to 99% LTV with 365-day maximum duration' },
                      { label: 'Flash Close:', desc: 'Instant position closure with 1% fee' },
                      { label: 'Fee Distribution:', desc: '~30% to BTB Finance, ~70% stays in contract' },
                      { label: 'Collateral Management:', desc: 'Contract holds all borrowed LARRY as collateral' }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><span className="text-yellow-400 font-semibold">{item.label}</span> {item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                🚀 Summary
              </h2>
              
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-700 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">Feature</th>
                        <th className="border border-gray-700 p-4 text-yellow-400 text-left font-semibold">LARRY Token</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: 'Backed By', value: 'SEI' },
                        { feature: 'Loops Supported', value: '✅ (Buy → Borrow → Buy)' },
                        { feature: 'Deflationary Supply', value: '✅ Via daily liquidation burns' },
                        { feature: 'Liquidity Incentives', value: '✅ via YAKA votes' },
                        { feature: 'Fee Usage', value: 'Flows to Yaka & Dragon Swap LPs' },
                        { feature: 'Price Mechanism', value: 'Always increasing with activity' },
                        { feature: 'Built On', value: 'SEI' },
                        { feature: 'Owned By', value: 'BTB Finance' }
                      ].map((item, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-800/30' : ''} hover:bg-gray-800/50 transition-colors`}>
                          <td className="border border-gray-700 p-4 text-gray-300">{item.feature}</td>
                          <td className="border border-gray-700 p-4 text-white">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-center space-y-4 py-8">
                  <p className="text-3xl font-bold text-yellow-400">LARRY isn't just a token. It's a liquidity machine.</p>
                  <p className="text-xl text-gray-300">Backed. Deflationary. Loopable. On SEI.</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <section className="text-center py-12">
              <div className="space-y-8">
                
                <div className="flex justify-center items-center space-x-8">
                  <a 
                    href="https://t.me/btbfinance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
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
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>@btb_finance</span>
                  </a>
                </div>
                
                <p className="text-gray-400">LARRY by BTB Finance - The volatility-driven liquidity machine on SEI.</p>
                
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105"
                >
                  Start Trading
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xs">📚</span>
              </div>
              <span className="text-gray-400">© 2024 LARRY Protocol Documentation</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://x.com/btb_finance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}