'use client';

import Link from 'next/link';
import { useState } from 'react';
import MobileConnectButton from '@/components/MobileConnectButton';
import FlowDiagram from '@/components/FlowDiagram';

export default function Docs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { id: 'how-it-works', label: 'How It Works', icon: '⚙️' },
    { id: 'borrowing', label: 'Borrowing Details', icon: '🏦' },
    { id: 'leverage', label: 'Leverage System', icon: '📈' },
    { id: 'fees', label: 'Fees & Rewards', icon: '💰' },
    { id: 'safety', label: 'Safety Features', icon: '🛡️' },
    { id: 'faq', label: 'FAQ', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Header */}
      <nav className="relative z-10 border-b border-green-500/30 bg-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center p-4 sm:p-6 lg:px-12">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-mono font-bold">📚</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-mono text-green-400">LARRY DOCS</span>
              <span className="text-xs text-blue-400 font-mono hidden sm:block">User Guide</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors font-mono text-sm">HOME</Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm">TRADING</Link>
            <Link href="/veyaka" className="text-gray-300 hover:text-purple-400 transition-colors font-mono text-sm">VEYAKA</Link>
            <Link href="/launchpad" className="text-gray-300 hover:text-yellow-400 transition-colors font-mono text-sm">LAUNCHPAD</Link>
            <span className="text-green-400 font-mono font-bold text-sm border-b-2 border-green-400 pb-1">DOCS</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-green-400 hover:text-green-300 transition-colors p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-green-500/30">
            <div className="px-4 py-6 space-y-4">
              <Link href="/" className="block text-gray-300 hover:text-green-400 transition-colors font-mono text-sm py-2" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
              <Link href="/dashboard" className="block text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm py-2" onClick={() => setMobileMenuOpen(false)}>TRADING</Link>
              <Link href="/veyaka" className="block text-gray-300 hover:text-purple-400 transition-colors font-mono text-sm py-2" onClick={() => setMobileMenuOpen(false)}>VEYAKA</Link>
              <Link href="/launchpad" className="block text-gray-300 hover:text-yellow-400 transition-colors font-mono text-sm py-2" onClick={() => setMobileMenuOpen(false)}>LAUNCHPAD</Link>
              <span className="block text-green-400 font-mono font-bold text-sm py-2 border-l-2 border-green-400 pl-2">DOCS</span>
              <div className="pt-4 border-t border-gray-700">
                <MobileConnectButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Mobile Horizontal Scroll, Desktop Vertical */}
          <div className="lg:w-64 lg:min-h-screen bg-gray-900/50 border-r border-green-500/30">
            {/* Mobile: Horizontal scroll */}
            <div className="lg:hidden flex overflow-x-auto p-4 space-x-2 border-b border-green-500/30">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-sm whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'text-gray-400 hover:text-green-400'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </div>

            {/* Desktop: Vertical list */}
            <div className="hidden lg:block p-6 space-y-2">
              <h3 className="text-green-400 font-mono font-bold text-sm mb-4">Navigation</h3>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-mono text-sm text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-12">
            <div className="max-w-4xl mx-auto space-y-8">

              {/* Overview Section */}
              {activeSection === 'overview' && (
                <section>
                  <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors mb-4 font-mono text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Home
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-mono font-bold text-green-400 mb-4">
                      📖 What is LARRY?
                    </h1>
                  </div>

                  <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6 mb-8">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🚀</span>
                      <h2 className="text-xl font-mono font-bold text-blue-400">Simple Explanation</h2>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed mb-4">
                      LARRY is a smart token on SEI Network that lets you multiply your SEI holdings through safe borrowing. 
                      Think of it like a savings account that also gives you leverage - you can turn 1 SEI into 20+ SEI exposure 
                      without the risk of sudden liquidations.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h3 className="text-green-400 font-mono font-bold mb-2">✅ What LARRY Does</h3>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Guarantees price only goes up</li>
                          <li>• Lets you borrow against your tokens</li>
                          <li>• Gives you up to 20x leverage safely</li>
                          <li>• Pays rewards to holders</li>
                        </ul>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <h3 className="text-red-400 font-mono font-bold mb-2">❌ What LARRY Doesn&apos;t Do</h3>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• No sudden liquidations</li>
                          <li>• No complex DeFi knowledge needed</li>
                          <li>• No price crashes (protected)</li>
                          <li>• No hidden fees or surprises</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                    <h2 className="text-xl font-mono font-bold text-blue-400 mb-4">🎯 Built For</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h3 className="text-blue-300 font-bold mb-2">New Users</h3>
                        <p className="text-gray-300">Want to grow SEI holdings safely without complex strategies</p>
                      </div>
                      <div>
                        <h3 className="text-blue-300 font-bold mb-2">Experienced Traders</h3>
                        <p className="text-gray-300">Looking for sustainable leverage without liquidation risk</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-green-500/30">
                    <div></div>
                    <button
                      onClick={() => setActiveSection('getting-started')}
                      className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      Getting Started
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </section>
              )}

              {/* Getting Started Section */}
              {activeSection === 'getting-started' && (
                <section>
                  <h1 className="text-3xl sm:text-4xl font-mono font-bold text-green-400 mb-8">
                    🚀 Getting Started
                  </h1>

                  <div className="space-y-6">
                    <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-green-400 mb-4">Step 1: Connect Your Wallet</h2>
                      <p className="text-gray-300 mb-4">
                        You&apos;ll need a wallet with SEI tokens. Popular choices include Keplr, Leap, or Compass.
                      </p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                        <p className="text-sm text-green-300">
                          💡 <strong>Tip:</strong> Start with a small amount (like 10-50 SEI) to test the system before going bigger.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-blue-400 mb-4">Step 2: Buy LARRY Tokens</h2>
                      <p className="text-gray-300 mb-4">
                        Use the trading interface to swap your SEI for LARRY tokens. The smart contract ensures 
                        you always get a fair price that only goes up over time.
                      </p>
                      <Link 
                        href="/dashboard" 
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-mono text-sm transition-colors"
                      >
                        Go to Trading →
                      </Link>
                    </div>

                    <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-purple-400 mb-4">Step 3: Start Leveraging (Optional)</h2>
                      <p className="text-gray-300 mb-4">
                        Once you own LARRY, you can borrow SEI against it (up to 99% of the value) and buy more LARRY. 
                        This creates a leverage loop that multiplies your position.
                      </p>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
                        <p className="text-sm text-yellow-300">
                          ⚠️ <strong>Remember:</strong> Higher leverage = higher risk. Start small and understand the system first.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-green-400 mb-4">Step 4: Earn Rewards</h2>
                      <p className="text-gray-300 mb-4">
                        Just by holding LARRY, you earn rewards from trading fees and the deflationary mechanics. 
                        No staking or complex actions required.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                          <h3 className="text-green-300 font-bold mb-1">Automatic Rewards</h3>
                          <p className="text-gray-300">Price increases from fees and burns</p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                          <h3 className="text-blue-300 font-bold mb-1">Voting Benefits</h3>
                          <p className="text-gray-300">Protocol votes for LARRY pool rewards</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-green-500/30">
                    <button
                      onClick={() => setActiveSection('overview')}
                      className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveSection('how-it-works')}
                      className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      How It Works
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </section>
              )}

              {/* How It Works Section */}
              {activeSection === 'how-it-works' && (
                <section>
                  <h1 className="text-3xl sm:text-4xl font-mono font-bold text-green-400 mb-8">
                    ⚙️ How It Works
                  </h1>

                  <div className="space-y-8">
                    <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-green-400 mb-4">🔒 Price Protection</h2>
                      <p className="text-gray-300 mb-4">
                        LARRY uses a smart contract mechanism that prevents the price from going down. Here&apos;s how:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-black/50 border border-green-500/20 rounded p-4">
                          <h3 className="text-green-300 font-bold mb-2">When You Buy LARRY</h3>
                          <p className="text-sm text-gray-300">Your SEI goes into the contract → More backing → Price can only increase</p>
                        </div>
                        <div className="bg-black/50 border border-red-500/20 rounded p-4">
                          <h3 className="text-red-300 font-bold mb-2">When You Sell LARRY</h3>
                          <p className="text-sm text-gray-300">LARRY tokens get burned → Less supply → Price increase for remaining holders</p>
                        </div>
                        <div className="bg-black/50 border border-blue-500/20 rounded p-4">
                          <h3 className="text-blue-300 font-bold mb-2">Safety Mechanism</h3>
                          <p className="text-sm text-gray-300">Smart contract prevents price drops beyond tiny amounts (0.001%)</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-blue-400 mb-4">🔄 The Leverage Loop</h2>
                      <p className="text-gray-300 mb-4">
                        This is how you can multiply your SEI exposure safely:
                      </p>
                      
                      {/* Mobile: Card Layout */}
                      <div className="block sm:hidden space-y-4">
                        {[
                          { step: 1, action: 'Buy LARRY', detail: 'Trade SEI for LARRY tokens', color: 'green' },
                          { step: 2, action: 'Borrow SEI', detail: 'Use LARRY as collateral (up to 99%)', color: 'blue' },
                          { step: 3, action: 'Buy More LARRY', detail: 'Use borrowed SEI to buy more LARRY', color: 'purple' },
                          { step: 4, action: 'Repeat', detail: 'Keep looping to build bigger position', color: 'red' }
                        ].map((item) => (
                          <div key={item.step} className={`bg-${item.color}-500/10 border border-${item.color}-500/20 rounded p-4`}>
                            <div className={`text-${item.color}-400 font-bold mb-2`}>Step {item.step}: {item.action}</div>
                            <div className="text-sm text-gray-300">{item.detail}</div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop: Flow Diagram */}
                      <div className="hidden sm:block">
                        <div className="flex items-center justify-between text-center">
                          <div className="bg-green-500/10 border border-green-500/20 rounded p-4 flex-1 mx-2">
                            <div className="text-green-400 font-bold mb-1">1. Buy LARRY</div>
                            <div className="text-xs text-gray-300">Trade SEI for LARRY</div>
                          </div>
                          <div className="text-green-400 text-xl">→</div>
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4 flex-1 mx-2">
                            <div className="text-blue-400 font-bold mb-1">2. Borrow SEI</div>
                            <div className="text-xs text-gray-300">Use LARRY as collateral</div>
                          </div>
                          <div className="text-blue-400 text-xl">→</div>
                          <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4 flex-1 mx-2">
                            <div className="text-purple-400 font-bold mb-1">3. Buy More</div>
                            <div className="text-xs text-gray-300">Increase position</div>
                          </div>
                          <div className="text-purple-400 text-xl">↻</div>
                        </div>
                      </div>

                      <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
                        <h3 className="text-yellow-300 font-bold mb-2">📊 Example Result</h3>
                        <p className="text-sm text-gray-300">Start with 100 SEI → After 5 loops → Control ~2000 SEI worth of LARRY exposure</p>
                      </div>

                      {/* How LARRY Works - Core Mechanics Diagrams */}
                      <div className="mt-8 space-y-6">
                        {/* Price Protection Diagram */}
                        <FlowDiagram
                          title="Price Protection Mechanism"
                          nodes={[
                            { id: 'transaction', label: 'Any Transaction', type: 'user', description: 'Buy/Sell/Liquidation' },
                            { id: 'safetycheck', label: 'Safety Check', type: 'contract', description: 'Price validation' },
                            { id: 'backing', label: 'Update Backing', type: 'system', description: 'SEI pool increases' },
                            { id: 'price', label: 'Price Increase', type: 'reward', description: 'Only goes up!' }
                          ]}
                          connections={[
                            { from: 'transaction', to: 'safetycheck' },
                            { from: 'safetycheck', to: 'backing' },
                            { from: 'backing', to: 'price' }
                          ]}
                          note="Smart contract prevents price drops >0.001% while allowing unlimited upside through increased backing."
                          className="bg-green-500/10 border-green-500/20"
                        />

                        {/* Token Burn Mechanism */}
                        <FlowDiagram
                          title="Deflationary Token Burns"
                          nodes={[
                            { id: 'sell', label: 'User Sells LARRY', type: 'user', description: '10,000 LARRY' },
                            { id: 'burn', label: 'Tokens Burned', type: 'contract', description: 'Destroyed forever' },
                            { id: 'supply', label: 'Supply Decreases', type: 'system', description: 'Less LARRY exists' },
                            { id: 'benefit', label: 'Holders Benefit', type: 'reward', description: 'Higher price per token' }
                          ]}
                          connections={[
                            { from: 'sell', to: 'burn' },
                            { from: 'burn', to: 'supply' },
                            { from: 'supply', to: 'benefit' }
                          ]}
                          note="Every sell burns tokens permanently, making remaining tokens more valuable - price increases even on sells!"
                          className="bg-red-500/10 border-red-500/20"
                        />

                        {/* Leverage Loop Diagram */}
                        <FlowDiagram
                          title="Leverage Loop Process"
                          nodes={[
                            { id: 'start', label: 'Start with SEI', type: 'user', description: '100 SEI' },
                            { id: 'buy', label: 'Buy LARRY', type: 'contract', description: '99 LARRY tokens' },
                            { id: 'borrow', label: 'Borrow SEI', type: 'system', description: '98 SEI (99% LTV)' },
                            { id: 'repeat', label: 'Repeat Loop', type: 'reward', description: 'Build position' }
                          ]}
                          connections={[
                            { from: 'start', to: 'buy' },
                            { from: 'buy', to: 'borrow' },
                            { from: 'borrow', to: 'repeat', curved: true }
                          ]}
                          note="Each loop multiplies your exposure while the price protection mechanism keeps your position safe from sudden liquidations."
                          className="bg-blue-500/10 border-blue-500/20"
                        />
                      </div>
                    </div>

                    {/* Price Appreciation Examples */}
                    <div className="bg-gray-900/50 border border-yellow-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-yellow-400 mb-4">📊 Concrete Price Examples</h2>
                      <p className="text-gray-300 mb-6">
                        Based on the smart contract formula: <code className="bg-black/50 px-2 py-1 rounded text-green-400">Price = (Total SEI Backing) ÷ (Total LARRY Supply)</code>
                      </p>

                      <div className="space-y-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                          <h3 className="text-green-300 font-bold mb-3">Scenario 1: Trading Volume Impact</h3>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p><strong>Starting State:</strong> 1M LARRY tokens, 1M SEI backing → Price: 1.00 SEI</p>
                            <p><strong>Daily Trading:</strong> 100,000 SEI volume, 0.25% fees = 250 SEI to protocol</p>
                            <p><strong>After Fees:</strong> 1.00025M SEI backing, 1M LARRY → Price: 1.00025 SEI</p>
                            <p><strong>Monthly Growth:</strong> 250 SEI × 30 days = 7,500 SEI → Price: 1.0075 SEI</p>
                            <p className="text-green-400"><strong>Result: +0.75% price increase from trading fees alone</strong></p>
                          </div>
                          
                          {/* Trading Volume Chart */}
                          <div className="mt-4 bg-black/50 rounded-lg p-4">
                            <h4 className="text-green-300 font-bold mb-3 text-center">📈 Daily Fee Accumulation</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                              <div className="bg-green-500/20 rounded p-2 text-center">
                                <div className="text-green-400 font-bold">Day 1</div>
                                <div className="text-gray-300">+250 SEI</div>
                                <div className="text-green-300">1.00025</div>
                              </div>
                              <div className="bg-green-500/30 rounded p-2 text-center">
                                <div className="text-green-400 font-bold">Day 7</div>
                                <div className="text-gray-300">+1,750 SEI</div>
                                <div className="text-green-300">1.00175</div>
                              </div>
                              <div className="bg-green-500/40 rounded p-2 text-center">
                                <div className="text-green-400 font-bold">Day 15</div>
                                <div className="text-gray-300">+3,750 SEI</div>
                                <div className="text-green-300">1.00375</div>
                              </div>
                              <div className="bg-green-500/50 rounded p-2 text-center">
                                <div className="text-green-400 font-bold">Day 30</div>
                                <div className="text-gray-300">+7,500 SEI</div>
                                <div className="text-green-300 font-bold">1.0075</div>
                              </div>
                            </div>
                            <FlowDiagram
                              title="Trading Fee Flow"
                              nodes={[
                                { id: 'volume', label: '100k SEI Volume', type: 'user', description: 'Daily trading' },
                                { id: 'fees', label: '0.25% Fee', type: 'contract', description: '250 SEI captured' },
                                { id: 'backing', label: 'Backing Pool', type: 'system', description: 'Grows daily' },
                                { id: 'price', label: 'Price Increase', type: 'reward', description: '+0.75% monthly' }
                              ]}
                              connections={[
                                { from: 'volume', to: 'fees' },
                                { from: 'fees', to: 'backing' },
                                { from: 'backing', to: 'price' }
                              ]}
                              note="Consistent trading volume creates steady, compounding price growth through fee accumulation."
                              className="mt-4 bg-green-500/10"
                            />
                          </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4">
                          <h3 className="text-blue-300 font-bold mb-3">Scenario 2: Token Burns from Sells</h3>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p><strong>Starting State:</strong> 1M LARRY tokens, 1M SEI backing → Price: 1.00 SEI</p>
                            <p><strong>Someone Sells:</strong> 10,000 LARRY for ~9,975 SEI (after 0.25% fee)</p>
                            <p><strong>LARRY Burned:</strong> 10,000 LARRY destroyed permanently</p>
                            <p><strong>New State:</strong> 990,000 LARRY tokens, 990,025 SEI backing</p>
                            <p><strong>New Price:</strong> 990,025 ÷ 990,000 = 1.000025 SEI per LARRY</p>
                            <p className="text-blue-400"><strong>Result: Price increases even when someone sells!</strong></p>
                          </div>

                          {/* Token Burn Chart */}
                          <div className="mt-4 bg-black/50 rounded-lg p-4">
                            <h4 className="text-blue-300 font-bold mb-3 text-center">🔥 Burn & Price Impact</h4>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-red-500/20 rounded p-3 text-center">
                                <div className="text-red-400 font-bold mb-2">BEFORE SELL</div>
                                <div className="text-xs text-gray-300 space-y-1">
                                  <div>LARRY Supply: <span className="text-white">1,000,000</span></div>
                                  <div>SEI Backing: <span className="text-white">1,000,000</span></div>
                                  <div className="border-t border-gray-600 pt-1">
                                    Price: <span className="text-red-300 font-bold">1.00 SEI</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-green-500/20 rounded p-3 text-center">
                                <div className="text-green-400 font-bold mb-2">AFTER SELL</div>
                                <div className="text-xs text-gray-300 space-y-1">
                                  <div>LARRY Supply: <span className="text-white">990,000</span> ↓</div>
                                  <div>SEI Backing: <span className="text-white">990,025</span> ↓</div>
                                  <div className="border-t border-gray-600 pt-1">
                                    Price: <span className="text-green-300 font-bold">1.000025</span> ↑
                                  </div>
                                </div>
                              </div>
                            </div>
                            <FlowDiagram
                              title="Deflationary Sell Mechanism"
                              nodes={[
                                { id: 'sell', label: 'User Sells', type: 'user', description: '10,000 LARRY' },
                                { id: 'burn', label: 'Tokens Burned', type: 'contract', description: 'Permanent destruction' },
                                { id: 'ratio', label: 'Better Ratio', type: 'system', description: 'Less supply vs backing' },
                                { id: 'benefit', label: 'Price Up', type: 'reward', description: 'Holders benefit' }
                              ]}
                              connections={[
                                { from: 'sell', to: 'burn' },
                                { from: 'burn', to: 'ratio' },
                                { from: 'ratio', to: 'benefit' }
                              ]}
                              note="Selling burns tokens permanently, improving the backing-to-supply ratio for all remaining holders."
                              className="mt-4 bg-blue-500/10"
                            />
                          </div>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4">
                          <h3 className="text-purple-300 font-bold mb-3">Scenario 3: Liquidation Benefits</h3>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p><strong>Starting State:</strong> 1M LARRY tokens, 1M SEI backing</p>
                            <p><strong>Liquidation Event:</strong> 50,000 LARRY collateral burned, 49,500 SEI debt stays</p>
                            <p><strong>Net Effect:</strong> 950,000 LARRY tokens, 1,049,500 SEI backing</p>
                            <p><strong>New Price:</strong> 1,049,500 ÷ 950,000 = 1.1047 SEI per LARRY</p>
                            <p className="text-purple-400"><strong>Result: +10.47% price increase for remaining holders!</strong></p>
                          </div>

                          {/* Liquidation Chart */}
                          <div className="mt-4 bg-black/50 rounded-lg p-4">
                            <h4 className="text-purple-300 font-bold mb-3 text-center">⚡ Liquidation Impact</h4>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              <div className="bg-yellow-500/20 rounded p-3 text-center">
                                <div className="text-yellow-400 font-bold mb-2">BEFORE</div>
                                <div className="text-xs text-gray-300 space-y-1">
                                  <div>Supply: <span className="text-white">1M</span></div>
                                  <div>Backing: <span className="text-white">1M</span></div>
                                  <div className="border-t border-gray-600 pt-1">
                                    Price: <span className="text-yellow-300">1.00</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-red-500/20 rounded p-3 text-center">
                                <div className="text-red-400 font-bold mb-2">LIQUIDATION</div>
                                <div className="text-xs text-gray-300 space-y-1">
                                  <div>Burn: <span className="text-red-300">50k LARRY</span></div>
                                  <div>Keep: <span className="text-green-300">49.5k SEI</span></div>
                                  <div className="border-t border-gray-600 pt-1">
                                    <span className="text-purple-300">Midnight UTC</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-green-500/20 rounded p-3 text-center">
                                <div className="text-green-400 font-bold mb-2">AFTER</div>
                                <div className="text-xs text-gray-300 space-y-1">
                                  <div>Supply: <span className="text-white">950k</span> ↓</div>
                                  <div>Backing: <span className="text-white">1.05M</span> ↑</div>
                                  <div className="border-t border-gray-600 pt-1">
                                    Price: <span className="text-green-300 font-bold">1.1047</span> ↑
                                  </div>
                                </div>
                              </div>
                            </div>
                            <FlowDiagram
                              title="Liquidation Benefit Flow"
                              nodes={[
                                { id: 'expire', label: 'Loan Expires', type: 'user', description: 'Midnight UTC' },
                                { id: 'liquidate', label: 'Auto Liquidation', type: 'contract', description: 'Burn collateral' },
                                { id: 'transfer', label: 'SEI Stays', type: 'system', description: 'Debt remains in pool' },
                                { id: 'boost', label: 'Price Boost', type: 'reward', description: '+10.47% instantly' }
                              ]}
                              connections={[
                                { from: 'expire', to: 'liquidate' },
                                { from: 'liquidate', to: 'transfer' },
                                { from: 'transfer', to: 'boost' }
                              ]}
                              note="Failed loans burn collateral but keep borrowed SEI, creating massive backing increases for holders."
                              className="mt-4 bg-purple-500/10"
                            />
                          </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 rounded p-4">
                          <h3 className="text-red-300 font-bold mb-3">Scenario 4: Compound Growth</h3>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p><strong>Month 1:</strong> Trading fees + burns = 2% price growth</p>
                            <p><strong>Month 2:</strong> Same activity on higher base = 2.04% additional growth</p>
                            <p><strong>Month 3:</strong> Continued compounding = 2.08% additional growth</p>
                            <p><strong>Year 1:</strong> ~27% total price appreciation from organic growth</p>
                            <p className="text-red-400"><strong>Result: Mathematical guarantee of upward pressure!</strong></p>
                          </div>

                          {/* Compound Growth Chart */}
                          <div className="mt-4 bg-black/50 rounded-lg p-4">
                            <h4 className="text-red-300 font-bold mb-3 text-center">📈 Compound Growth Trajectory</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                              <div className="bg-red-500/20 rounded p-3 text-center">
                                <div className="text-red-400 font-bold text-xs">Month 1</div>
                                <div className="text-white text-sm">1.02 SEI</div>
                                <div className="text-green-300 text-xs">+2.0%</div>
                              </div>
                              <div className="bg-red-500/30 rounded p-3 text-center">
                                <div className="text-red-400 font-bold text-xs">Month 3</div>
                                <div className="text-white text-sm">1.061 SEI</div>
                                <div className="text-green-300 text-xs">+6.1%</div>
                              </div>
                              <div className="bg-red-500/40 rounded p-3 text-center">
                                <div className="text-red-400 font-bold text-xs">Month 6</div>
                                <div className="text-white text-sm">1.126 SEI</div>
                                <div className="text-green-300 text-xs">+12.6%</div>
                              </div>
                              <div className="bg-red-500/50 rounded p-3 text-center">
                                <div className="text-red-400 font-bold text-xs">Year 1</div>
                                <div className="text-white text-sm font-bold">1.27 SEI</div>
                                <div className="text-green-300 text-xs font-bold">+27%</div>
                              </div>
                            </div>
                            <FlowDiagram
                              title="Compound Growth Engine"
                              nodes={[
                                { id: 'activity', label: 'Protocol Activity', type: 'user', description: 'Trading + Borrowing' },
                                { id: 'mechanisms', label: 'Growth Mechanisms', type: 'contract', description: 'Fees + Burns' },
                                { id: 'base', label: 'Higher Base Price', type: 'system', description: 'Compounding effect' },
                                { id: 'exponential', label: 'Exponential Growth', type: 'reward', description: '27% annually' }
                              ]}
                              connections={[
                                { from: 'activity', to: 'mechanisms' },
                                { from: 'mechanisms', to: 'base' },
                                { from: 'base', to: 'exponential', curved: true }
                              ]}
                              note="Each month builds on the previous month&apos;s gains, creating exponential compound growth over time."
                              className="mt-4 bg-red-500/10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
                        <h3 className="text-yellow-300 font-bold mb-2">🔒 Price Protection Mechanism</h3>
                        <p className="text-sm text-gray-300">
                          The smart contract&apos;s safetyCheck function prevents price drops greater than 0.001% per transaction, 
                          ensuring the price can only decrease by tiny amounts while having unlimited upside potential.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-purple-400 mb-4">💰 Reward System</h2>
                      <p className="text-gray-300 mb-4">
                        Three ways LARRY holders earn:
                      </p>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="bg-green-500/10 border border-green-500/20 rounded p-4 text-center">
                          <div className="text-2xl mb-2">📈</div>
                          <h3 className="text-green-300 font-bold mb-2">Price Growth</h3>
                          <p className="text-xs text-gray-300">Every transaction increases backing and burns supply</p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4 text-center">
                          <div className="text-2xl mb-2">🗳️</div>
                          <h3 className="text-blue-300 font-bold mb-2">Governance Voting</h3>
                          <p className="text-xs text-gray-300">Protocol votes to direct rewards to LARRY pools</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4 text-center">
                          <div className="text-2xl mb-2">🔥</div>
                          <h3 className="text-purple-300 font-bold mb-2">Deflationary Burns</h3>
                          <p className="text-xs text-gray-300">Regular token burns reduce supply permanently</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-green-500/30">
                    <button
                      onClick={() => setActiveSection('getting-started')}
                      className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Getting Started
                    </button>
                    <button
                      onClick={() => setActiveSection('borrowing')}
                      className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      Borrowing Details
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </section>
              )}

              {/* Borrowing Details Section */}
              {activeSection === 'borrowing' && (
                <section>
                  <h1 className="text-3xl sm:text-4xl font-mono font-bold text-green-400 mb-8">
                    🏦 Borrowing Details
                  </h1>

                  <div className="space-y-8">
                    <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-blue-400 mb-4">🎯 How Borrowing Works</h2>
                      <p className="text-gray-300 mb-6">
                        LARRY&apos;s borrowing system lets you use your LARRY tokens as collateral to borrow SEI, 
                        which you can then use to buy more LARRY and create leverage positions.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                          <h3 className="text-green-300 font-bold mb-3">✅ Key Features</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <strong>99% LTV:</strong> Borrow up to 99% of your LARRY value</li>
                            <li>• <strong>3.9% APR:</strong> Low annual interest rate</li>
                            <li>• <strong>Flexible Terms:</strong> 1-365 day loan duration</li>
                            <li>• <strong>No Price Liquidations:</strong> Only time-based expiry</li>
                            <li>• <strong>Flash Close:</strong> Exit instantly with 1% fee</li>
                          </ul>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4">
                          <h3 className="text-blue-300 font-bold mb-3">📋 Available Actions</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <strong>borrow():</strong> Initial loan against LARRY</li>
                            <li>• <strong>borrowMore():</strong> Increase existing loan</li>
                            <li>• <strong>leverage():</strong> Combined buy + borrow in one tx</li>
                            <li>• <strong>repay():</strong> Partial loan repayment</li>
                            <li>• <strong>closePosition():</strong> Full repayment</li>
                            <li>• <strong>flashClosePosition():</strong> Instant exit</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-purple-400 mb-4">🔢 Borrowing Math Examples</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4">
                          <h3 className="text-purple-300 font-bold mb-3">Example 1: Basic Borrow</h3>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p><strong>You have:</strong> 1000 LARRY tokens (worth ~1000 SEI)</p>
                            <p><strong>You can borrow:</strong> 990 SEI (99% LTV)</p>
                            <p><strong>30-day interest:</strong> ~3.2 SEI (3.9% APR × 30/365 days)</p>
                            <p><strong>Fee to protocol:</strong> ~1 SEI (30% of interest)</p>
                            <p><strong>You receive:</strong> ~986 SEI</p>
                          </div>

                          {/* Basic Borrow Chart */}
                          <div className="mt-4 bg-black/50 rounded-lg p-4">
                            <h4 className="text-purple-300 font-bold mb-3 text-center">🏦 Basic Borrow Breakdown</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                              <div className="bg-blue-500/20 rounded p-3 text-center">
                                <div className="text-blue-400 font-bold">COLLATERAL</div>
                                <div className="text-white text-lg">1000</div>
                                <div className="text-gray-300">LARRY tokens</div>
                              </div>
                              <div className="bg-green-500/20 rounded p-3 text-center">
                                <div className="text-green-400 font-bold">MAX BORROW</div>
                                <div className="text-white text-lg">990</div>
                                <div className="text-gray-300">SEI (99% LTV)</div>
                              </div>
                              <div className="bg-red-500/20 rounded p-3 text-center">
                                <div className="text-red-400 font-bold">INTEREST</div>
                                <div className="text-white text-lg">3.2</div>
                                <div className="text-gray-300">SEI (30 days)</div>
                              </div>
                              <div className="bg-yellow-500/20 rounded p-3 text-center">
                                <div className="text-yellow-400 font-bold">NET RECEIVED</div>
                                <div className="text-white text-lg font-bold">986</div>
                                <div className="text-gray-300">SEI in hand</div>
                              </div>
                            </div>
                            <FlowDiagram
                              title="Basic Borrow Process"
                              nodes={[
                                { id: 'deposit', label: '1000 LARRY', type: 'user', description: 'Your collateral' },
                                { id: 'contract', label: 'Borrow Contract', type: 'contract', description: 'Holds collateral' },
                                { id: 'calculate', label: '99% LTV Check', type: 'system', description: '990 SEI max' },
                                { id: 'receive', label: '986 SEI', type: 'reward', description: 'After interest' }
                              ]}
                              connections={[
                                { from: 'deposit', to: 'contract' },
                                { from: 'contract', to: 'calculate' },
                                { from: 'calculate', to: 'receive' }
                              ]}
                              note="Basic borrowing gives you immediate liquidity while keeping your LARRY position through collateral."
                              className="mt-4 bg-purple-500/10"
                            />
                          </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                          <h3 className="text-green-300 font-bold mb-3">Example 2: Leverage Function</h3>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p><strong>You send:</strong> 1000 SEI + fees (~13 SEI)</p>
                            <p><strong>System mints:</strong> ~987 LARRY to contract as collateral</p>
                            <p><strong>You borrow:</strong> ~980 SEI (99% of backing value)</p>
                            <p><strong>Net result:</strong> 980 SEI to buy more LARRY + 987 LARRY collateral</p>
                            <p><strong>Total position:</strong> Control ~1967 SEI worth of LARRY</p>
                          </div>

                          {/* Leverage Function Chart */}
                          <div className="mt-4 bg-black/50 rounded-lg p-4">
                            <h4 className="text-green-300 font-bold mb-3 text-center">⚡ One-Click Leverage Process</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                              <div className="bg-yellow-500/20 rounded p-3 text-center">
                                <div className="text-yellow-400 font-bold mb-2">STEP 1: INPUT</div>
                                <div className="text-xs text-gray-300 space-y-1">
                                  <div>You send: <span className="text-white">1,000 SEI</span></div>
                                  <div>Plus fees: <span className="text-white">+13 SEI</span></div>
                                  <div className="border-t border-gray-600 pt-1">
                                    Total: <span className="text-yellow-300 font-bold">1,013 SEI</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-blue-500/20 rounded p-3 text-center">
                                <div className="text-blue-400 font-bold mb-2">STEP 2: AUTO-MINT</div>
                                <div className="text-xs text-gray-300 space-y-1">
                                  <div>Contract mints: <span className="text-white">987 LARRY</span></div>
                                  <div>Held as collateral</div>
                                  <div className="border-t border-gray-600 pt-1">
                                    Borrows: <span className="text-blue-300 font-bold">980 SEI</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-green-500/20 rounded p-3 text-center">
                                <div className="text-green-400 font-bold mb-2">STEP 3: RESULT</div>
                                <div className="text-xs text-gray-300 space-y-1">
                                  <div>You get: <span className="text-white">980 SEI</span></div>
                                  <div>Buy more LARRY: <span className="text-white">~977</span></div>
                                  <div className="border-t border-gray-600 pt-1">
                                    Total: <span className="text-green-300 font-bold">1,964 LARRY</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <FlowDiagram
                              title="Leverage Function Flow"
                              nodes={[
                                { id: 'input', label: '1,013 SEI', type: 'user', description: 'Single transaction' },
                                { id: 'leverage', label: 'leverage()', type: 'contract', description: 'Auto-execution' },
                                { id: 'mint', label: 'Mint & Borrow', type: 'system', description: '987 LARRY + 980 SEI' },
                                { id: 'double', label: '2x Position', type: 'reward', description: '~1,964 LARRY total' }
                              ]}
                              connections={[
                                { from: 'input', to: 'leverage' },
                                { from: 'leverage', to: 'mint' },
                                { from: 'mint', to: 'double' }
                              ]}
                              note="One transaction automatically creates a leveraged position with optimal efficiency and minimal fees."
                              className="mt-4 bg-green-500/10"
                            />
                          </div>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
                          <h3 className="text-yellow-300 font-bold mb-3">Example 3: Flash Close</h3>
                          <div className="text-sm text-gray-300 space-y-2">
                            <p><strong>Your collateral:</strong> 1000 LARRY (worth 1200 SEI after growth)</p>
                            <p><strong>Your debt:</strong> 990 SEI borrowed</p>
                            <p><strong>Flash close fee:</strong> 12 SEI (1% of collateral value)</p>
                            <p><strong>You receive:</strong> 198 SEI (1200 - 990 - 12)</p>
                            <p><strong>Protocol burns:</strong> 1000 LARRY (deflationary)</p>
                          </div>

                          {/* Flash Close Chart */}
                          <div className="mt-4 bg-black/50 rounded-lg p-4">
                            <h4 className="text-yellow-300 font-bold mb-3 text-center">⚡ Flash Close Calculation</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                              <div className="bg-blue-500/20 rounded p-3 text-center">
                                <div className="text-blue-400 font-bold text-xs">COLLATERAL</div>
                                <div className="text-white text-sm">1000 LARRY</div>
                                <div className="text-gray-300 text-xs">Worth 1200 SEI</div>
                              </div>
                              <div className="bg-red-500/20 rounded p-3 text-center">
                                <div className="text-red-400 font-bold text-xs">DEBT</div>
                                <div className="text-white text-sm">-990 SEI</div>
                                <div className="text-gray-300 text-xs">Must repay</div>
                              </div>
                              <div className="bg-orange-500/20 rounded p-3 text-center">
                                <div className="text-orange-400 font-bold text-xs">FLASH FEE</div>
                                <div className="text-white text-sm">-12 SEI</div>
                                <div className="text-gray-300 text-xs">1% of value</div>
                              </div>
                              <div className="bg-green-500/20 rounded p-3 text-center">
                                <div className="text-green-400 font-bold text-xs">NET PROFIT</div>
                                <div className="text-white text-sm font-bold">+198 SEI</div>
                                <div className="text-gray-300 text-xs">You receive</div>
                              </div>
                            </div>
                            <div className="bg-gray-800/50 rounded p-3 mb-4">
                              <h5 className="text-yellow-300 font-bold mb-2 text-center">📊 Profit Breakdown</h5>
                              <div className="flex items-center justify-center space-x-2 text-xs">
                                <span className="text-blue-300">1200 SEI</span>
                                <span className="text-gray-400">-</span>
                                <span className="text-red-300">990 SEI</span>
                                <span className="text-gray-400">-</span>
                                <span className="text-orange-300">12 SEI</span>
                                <span className="text-gray-400">=</span>
                                <span className="text-green-300 font-bold">198 SEI profit</span>
                              </div>
                            </div>
                            <FlowDiagram
                              title="Flash Close Mechanism"
                              nodes={[
                                { id: 'initiate', label: 'Flash Close', type: 'user', description: 'Single click exit' },
                                { id: 'burn', label: 'Burn Collateral', type: 'contract', description: '1000 LARRY destroyed' },
                                { id: 'calculate', label: 'Calculate Profit', type: 'system', description: '1200-990-12 SEI' },
                                { id: 'profit', label: 'Receive Profit', type: 'reward', description: '198 SEI to you' }
                              ]}
                              connections={[
                                { from: 'initiate', to: 'burn' },
                                { from: 'burn', to: 'calculate' },
                                { from: 'calculate', to: 'profit' }
                              ]}
                              note="Flash close instantly converts your LARRY gains to SEI profit, perfect for taking profits without loan management."
                              className="mt-4 bg-yellow-500/10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-red-400 mb-4">⏰ Time-Based Liquidations</h2>
                      <p className="text-gray-300 mb-6">
                        Unlike traditional DeFi, LARRY doesn&apos;t liquidate based on price movements. 
                        Instead, loans expire at midnight UTC after your chosen duration.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-red-500/10 border border-red-500/20 rounded p-4">
                          <h3 className="text-red-300 font-bold mb-3">What Happens at Expiry</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• Your LARRY collateral gets burned</li>
                            <li>• Borrowed SEI stays in protocol</li>
                            <li>• This is deflationary for other LARRY holders</li>
                            <li>• You lose your collateral but no additional penalties</li>
                          </ul>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                          <h3 className="text-green-300 font-bold mb-3">How to Avoid Liquidation</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <strong>Repay early:</strong> Use repay() or closePosition()</li>
                            <li>• <strong>Extend loan:</strong> Pay interest to extend duration</li>
                            <li>• <strong>Flash close:</strong> Instant exit with 1% fee</li>
                            <li>• <strong>Set reminders:</strong> Track expiry dates carefully</li>
                          </ul>
                        </div>
                      </div>

                      {/* Time-Based Liquidation Chart */}
                      <div className="mt-6 bg-black/50 rounded-lg p-4">
                        <h4 className="text-red-300 font-bold mb-3 text-center">⏰ Time-Based Liquidation Timeline</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
                          <div className="bg-green-500/20 rounded p-3 text-center">
                            <div className="text-green-400 font-bold text-xs">DAY 1-29</div>
                            <div className="text-white text-sm">✅ SAFE</div>
                            <div className="text-gray-300 text-xs">Loan active</div>
                          </div>
                          <div className="bg-yellow-500/20 rounded p-3 text-center">
                            <div className="text-yellow-400 font-bold text-xs">DAY 30</div>
                            <div className="text-white text-sm">⚠️ EXPIRES</div>
                            <div className="text-gray-300 text-xs">Midnight UTC</div>
                          </div>
                          <div className="bg-red-500/20 rounded p-3 text-center">
                            <div className="text-red-400 font-bold text-xs">AUTO-LIQ</div>
                            <div className="text-white text-sm">🔥 BURN</div>
                            <div className="text-gray-300 text-xs">Collateral lost</div>
                          </div>
                          <div className="bg-blue-500/20 rounded p-3 text-center">
                            <div className="text-blue-400 font-bold text-xs">PROTOCOL</div>
                            <div className="text-white text-sm">📈 GAINS</div>
                            <div className="text-gray-300 text-xs">SEI stays</div>
                          </div>
                        </div>
                        <FlowDiagram
                          title="Liquidation Timeline"
                          nodes={[
                            { id: 'borrow', label: 'Loan Starts', type: 'user', description: '30-day timer' },
                            { id: 'countdown', label: 'Time Passes', type: 'contract', description: 'Midnight UTC countdown' },
                            { id: 'expire', label: 'Loan Expires', type: 'system', description: 'Auto-liquidation' },
                            { id: 'burn', label: 'Assets Burned', type: 'reward', description: 'Deflationary for holders' }
                          ]}
                          connections={[
                            { from: 'borrow', to: 'countdown' },
                            { from: 'countdown', to: 'expire' },
                            { from: 'expire', to: 'burn' }
                          ]}
                          note="Unlike price-based liquidations, time-based expiry gives you predictable deadlines and no sudden surprises."
                          className="mt-4 bg-red-500/10"
                        />
                      </div>
                    </div>

                    {/* Borrowing Flow Diagram */}
                    <FlowDiagram
                      title="Borrowing Process Flow"
                      nodes={[
                        { id: 'deposit', label: 'Deposit LARRY', type: 'user', description: 'Send collateral' },
                        { id: 'contract', label: 'Smart Contract', type: 'contract', description: 'Holds collateral' },
                        { id: 'borrow', label: 'Receive SEI', type: 'system', description: 'Up to 99% LTV' },
                        { id: 'repay', label: 'Repay or Expire', type: 'reward', description: 'Get collateral back' }
                      ]}
                      connections={[
                        { from: 'deposit', to: 'contract' },
                        { from: 'contract', to: 'borrow' },
                        { from: 'borrow', to: 'repay' }
                      ]}
                      note="Borrowing is over-collateralized with time-based expiry instead of price-based liquidations, making it much safer than traditional DeFi."
                      className="mt-8"
                    />
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-green-500/30">
                    <button
                      onClick={() => setActiveSection('how-it-works')}
                      className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      How It Works
                    </button>
                    <button
                      onClick={() => setActiveSection('leverage')}
                      className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      Leverage System
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </section>
              )}

              {/* Leverage Section */}
              {activeSection === 'leverage' && (
                <section>
                  <h1 className="text-3xl sm:text-4xl font-mono font-bold text-green-400 mb-8">
                    📈 Leverage System
                  </h1>

                  <div className="space-y-8">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-blue-400 mb-4">🚀 Two Ways to Get Leverage</h2>
                      <p className="text-gray-300 mb-6">
                        LARRY offers two distinct approaches to building leveraged positions. Understanding the difference is crucial for choosing the right strategy.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4">
                          <h3 className="text-purple-300 font-bold mb-3">Method 1: leverage() Function</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <strong>Single transaction</strong> - buy and borrow combined</li>
                            <li>• <strong>Automatic process</strong> - contract handles everything</li>
                            <li>• <strong>Fixed 2x leverage</strong> - standardized multiplier</li>
                            <li>• <strong>Lower fees</strong> - optimized transaction costs</li>
                            <li>• <strong>Beginner friendly</strong> - set and forget approach</li>
                          </ul>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/20 rounded p-4">
                          <h3 className="text-orange-300 font-bold mb-3">Method 2: Manual Loop</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <strong>Multiple transactions</strong> - buy → borrow → repeat</li>
                            <li>• <strong>Manual control</strong> - you decide each step</li>
                            <li>• <strong>Variable leverage</strong> - 2x, 5x, 10x, 20x+</li>
                            <li>• <strong>Higher fees</strong> - multiple transaction costs</li>
                            <li>• <strong>Advanced strategy</strong> - maximum flexibility</li>
                          </ul>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                          <h3 className="text-green-300 font-bold mb-3">✅ Safe Features</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <strong>No liquidations:</strong> Time-based loans only</li>
                            <li>• <strong>99% LTV:</strong> Borrow almost your full value</li>
                            <li>• <strong>Flexible terms:</strong> 30-365 day loans</li>
                            <li>• <strong>Low interest:</strong> 3.9% annual rate</li>
                          </ul>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 rounded p-4">
                          <h3 className="text-red-300 font-bold mb-3">⚠️ Important Notes</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <strong>Time limits:</strong> Must repay within loan period</li>
                            <li>• <strong>Interest costs:</strong> 3.9% annual + small fees</li>
                            <li>• <strong>Price risk:</strong> If LARRY price drops, less profit</li>
                            <li>• <strong>Start small:</strong> Test with small amounts first</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Method Comparison Charts */}
                    <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-green-400 mb-4">📊 Method Comparison Charts</h2>
                      
                      <div className="space-y-8">
                        {/* leverage() Function Chart */}
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-6">
                          <h3 className="text-purple-300 font-bold mb-4">Method 1: leverage() Function Process</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden text-sm">
                              <thead>
                                <tr className="bg-purple-800/50">
                                  <th className="border border-gray-700 p-3 text-purple-300 font-mono">Step</th>
                                  <th className="border border-gray-700 p-3 text-purple-300 font-mono">Action</th>
                                  <th className="border border-gray-700 p-3 text-purple-300 font-mono">You Send</th>
                                  <th className="border border-gray-700 p-3 text-purple-300 font-mono">Contract Does</th>
                                  <th className="border border-gray-700 p-3 text-purple-300 font-mono">You Get</th>
                                </tr>
                              </thead>
                              <tbody className="font-mono text-sm">
                                <tr className="hover:bg-gray-800/50">
                                  <td className="border border-gray-700 p-3 text-gray-300">1</td>
                                  <td className="border border-gray-700 p-3 text-gray-300">Call leverage()</td>
                                  <td className="border border-gray-700 p-3 text-yellow-400">1,000 SEI + 13 SEI fees</td>
                                  <td className="border border-gray-700 p-3 text-blue-400">Mints 987 LARRY as collateral</td>
                                  <td className="border border-gray-700 p-3 text-green-400">980 SEI borrowed</td>
                                </tr>
                                <tr className="bg-gray-800/30 hover:bg-gray-800/50">
                                  <td className="border border-gray-700 p-3 text-gray-300">2</td>
                                  <td className="border border-gray-700 p-3 text-gray-300">Buy more LARRY</td>
                                  <td className="border border-gray-700 p-3 text-yellow-400">980 SEI borrowed</td>
                                  <td className="border border-gray-700 p-3 text-blue-400">Auto-converts to LARRY</td>
                                  <td className="border border-gray-700 p-3 text-green-400">977 LARRY tokens</td>
                                </tr>
                                <tr className="hover:bg-gray-800/50">
                                  <td className="border border-gray-700 p-3 font-bold text-purple-400" colSpan={2}>Total Result</td>
                                  <td className="border border-gray-700 p-3 font-bold text-purple-400">1,013 SEI invested</td>
                                  <td className="border border-gray-700 p-3 font-bold text-purple-400">2x leverage achieved</td>
                                  <td className="border border-gray-700 p-3 font-bold text-purple-400">~1,964 LARRY controlled</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4 bg-purple-500/10 border border-purple-500/20 rounded p-3">
                            <p className="text-sm text-purple-200">
                              <strong>Key Benefit:</strong> Single transaction, automatic execution, fixed 2x leverage with minimal fees.
                            </p>
                          </div>
                        </div>

                        {/* Manual Loop Chart */}
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded p-6">
                          <h3 className="text-orange-300 font-bold mb-4">Method 2: Manual Leverage Loop Process</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden text-sm">
                              <thead>
                                <tr className="bg-orange-800/50">
                                  <th className="border border-gray-700 p-3 text-orange-300 font-mono">Loop</th>
                                  <th className="border border-gray-700 p-3 text-orange-300 font-mono">Transaction</th>
                                  <th className="border border-gray-700 p-3 text-orange-300 font-mono">SEI Used</th>
                                  <th className="border border-gray-700 p-3 text-orange-300 font-mono">LARRY Owned</th>
                                  <th className="border border-gray-700 p-3 text-orange-300 font-mono">SEI Borrowed</th>
                                  <th className="border border-gray-700 p-3 text-orange-300 font-mono">Total Exposure</th>
                                </tr>
                              </thead>
                              <tbody className="font-mono text-sm">
                                <tr className="hover:bg-gray-800/50">
                                  <td className="border border-gray-700 p-3 text-gray-300">Start</td>
                                  <td className="border border-gray-700 p-3 text-gray-300">buy()</td>
                                  <td className="border border-gray-700 p-3 text-yellow-400">1,000</td>
                                  <td className="border border-gray-700 p-3 text-blue-400">997</td>
                                  <td className="border border-gray-700 p-3 text-purple-400">0</td>
                                  <td className="border border-gray-700 p-3 text-green-400">1,000</td>
                                </tr>
                                <tr className="bg-gray-800/30 hover:bg-gray-800/50">
                                  <td className="border border-gray-700 p-3 text-gray-300">1</td>
                                  <td className="border border-gray-700 p-3 text-gray-300">borrow() + buy()</td>
                                  <td className="border border-gray-700 p-3 text-yellow-400">987</td>
                                  <td className="border border-gray-700 p-3 text-blue-400">1,981</td>
                                  <td className="border border-gray-700 p-3 text-purple-400">987</td>
                                  <td className="border border-gray-700 p-3 text-green-400">1,987</td>
                                </tr>
                                <tr className="hover:bg-gray-800/50">
                                  <td className="border border-gray-700 p-3 text-gray-300">2</td>
                                  <td className="border border-gray-700 p-3 text-gray-300">borrow() + buy()</td>
                                  <td className="border border-gray-700 p-3 text-yellow-400">1,961</td>
                                  <td className="border border-gray-700 p-3 text-blue-400">3,936</td>
                                  <td className="border border-gray-700 p-3 text-purple-400">2,948</td>
                                  <td className="border border-gray-700 p-3 text-green-400">3,948</td>
                                </tr>
                                <tr className="bg-gray-800/30 hover:bg-gray-800/50">
                                  <td className="border border-gray-700 p-3 text-gray-300">3</td>
                                  <td className="border border-gray-700 p-3 text-gray-300">borrow() + buy()</td>
                                  <td className="border border-gray-700 p-3 text-yellow-400">3,898</td>
                                  <td className="border border-gray-700 p-3 text-blue-400">7,824</td>
                                  <td className="border border-gray-700 p-3 text-purple-400">6,846</td>
                                  <td className="border border-gray-700 p-3 text-green-400">7,846</td>
                                </tr>
                                <tr className="hover:bg-gray-800/50">
                                  <td className="border border-gray-700 p-3 text-gray-300">5+</td>
                                  <td className="border border-gray-700 p-3 text-gray-300">Continue looping</td>
                                  <td className="border border-gray-700 p-3 text-yellow-400">15,000+</td>
                                  <td className="border border-gray-700 p-3 text-blue-400">30,000+</td>
                                  <td className="border border-gray-700 p-3 text-purple-400">29,000+</td>
                                  <td className="border border-gray-700 p-3 font-bold text-green-400">30,000+</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4 bg-orange-500/10 border border-orange-500/20 rounded p-3">
                            <p className="text-sm text-orange-200">
                              <strong>Key Benefit:</strong> Unlimited leverage potential (10x, 20x+) with full control over position size and timing.
                            </p>
                          </div>
                        </div>

                        {/* Cost Comparison */}
                        <div className="bg-red-500/10 border border-red-500/20 rounded p-6">
                          <h3 className="text-red-300 font-bold mb-4">💰 Cost Comparison (Starting with 1,000 SEI)</h3>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4">
                              <h4 className="text-purple-300 font-bold mb-2">leverage() Function Costs</h4>
                              <ul className="text-sm text-gray-300 space-y-1">
                                <li>• Initial leverage fee: ~13 SEI</li>
                                <li>• One buy transaction: ~2.5 SEI</li>
                                <li>• <strong>Total fees: ~15.5 SEI</strong></li>
                                <li>• <strong>Leverage achieved: 2x</strong></li>
                                <li>• <strong>Efficiency: High</strong></li>
                              </ul>
                            </div>
                            <div className="bg-orange-500/10 border border-orange-500/20 rounded p-4">
                              <h4 className="text-orange-300 font-bold mb-2">Manual Loop Costs (5 loops)</h4>
                              <ul className="text-sm text-gray-300 space-y-1">
                                <li>• Multiple borrow fees: ~45 SEI</li>
                                <li>• Multiple buy transactions: ~37.5 SEI</li>
                                <li>• <strong>Total fees: ~82.5 SEI</strong></li>
                                <li>• <strong>Leverage achieved: 30x</strong></li>
                                <li>• <strong>Efficiency: Maximum gain</strong></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-purple-400 mb-4">🧮 Advanced Leverage Calculator</h2>
                      <p className="text-gray-300 mb-4">Here&apos;s how your position grows with each loop:</p>
                      
                      {/* Leverage Growth Visualization */}
                      <div className="mb-6 bg-black/50 rounded-lg p-4">
                        <h4 className="text-purple-300 font-bold mb-3 text-center">📊 Position Growth Visualization</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                          <div className="bg-gray-500/20 rounded p-3 text-center">
                            <div className="text-gray-400 font-bold text-xs">START</div>
                            <div className="text-white text-sm">1,000</div>
                            <div className="text-gray-300 text-xs">1x leverage</div>
                            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                              <div className="bg-gray-400 h-2 rounded-full" style={{width: '3%'}}></div>
                            </div>
                          </div>
                          <div className="bg-blue-500/20 rounded p-3 text-center">
                            <div className="text-blue-400 font-bold text-xs">LOOP 1</div>
                            <div className="text-white text-sm">1,986</div>
                            <div className="text-gray-300 text-xs">2x leverage</div>
                            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                              <div className="bg-blue-400 h-2 rounded-full" style={{width: '7%'}}></div>
                            </div>
                          </div>
                          <div className="bg-green-500/20 rounded p-3 text-center">
                            <div className="text-green-400 font-bold text-xs">LOOP 2</div>
                            <div className="text-white text-sm">3,936</div>
                            <div className="text-gray-300 text-xs">4x leverage</div>
                            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                              <div className="bg-green-400 h-2 rounded-full" style={{width: '13%'}}></div>
                            </div>
                          </div>
                          <div className="bg-yellow-500/20 rounded p-3 text-center">
                            <div className="text-yellow-400 font-bold text-xs">LOOP 3</div>
                            <div className="text-white text-sm">7,795</div>
                            <div className="text-gray-300 text-xs">8x leverage</div>
                            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                              <div className="bg-yellow-400 h-2 rounded-full" style={{width: '26%'}}></div>
                            </div>
                          </div>
                          <div className="bg-red-500/20 rounded p-3 text-center">
                            <div className="text-red-400 font-bold text-xs">LOOP 5+</div>
                            <div className="text-white text-sm font-bold">30,000+</div>
                            <div className="text-gray-300 text-xs">30x leverage</div>
                            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                              <div className="bg-red-400 h-2 rounded-full" style={{width: '100%'}}></div>
                            </div>
                          </div>
                        </div>
                        <FlowDiagram
                          title="Exponential Leverage Growth"
                          nodes={[
                            { id: 'start', label: '1,000 SEI', type: 'user', description: 'Initial investment' },
                            { id: 'loop1', label: '2x Position', type: 'contract', description: '1,986 SEI exposure' },
                            { id: 'loop3', label: '8x Position', type: 'system', description: '7,795 SEI exposure' },
                            { id: 'max', label: '30x Position', type: 'reward', description: '30,000+ SEI exposure' }
                          ]}
                          connections={[
                            { from: 'start', to: 'loop1' },
                            { from: 'loop1', to: 'loop3' },
                            { from: 'loop3', to: 'max' }
                          ]}
                          note="Each loop approximately doubles your position size, creating exponential growth potential."
                          className="mt-4 bg-purple-500/10"
                        />
                      </div>
                      
                      {/* Mobile: Card format */}
                      <div className="block sm:hidden space-y-4">
                        {[
                          { loop: 'Start', sei: '1,000', larry: '0', borrowed: '0', total: '1,000' },
                          { loop: 'Loop 1', sei: '0', larry: '996', borrowed: '986', total: '1,986' },
                          { loop: 'Loop 2', sei: '0', larry: '1,978', borrowed: '1,958', total: '3,936' },
                          { loop: 'Loop 3', sei: '0', larry: '3,917', borrowed: '3,878', total: '7,795' },
                          { loop: 'Loop 5', sei: '0', larry: '15,000+', borrowed: '14,850+', total: '30,000+' }
                        ].map((row, index) => (
                          <div key={index} className="bg-black/50 border border-purple-500/20 rounded p-4">
                            <div className="text-purple-400 font-bold mb-2">{row.loop}</div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div><span className="text-gray-400">SEI:</span> <span className="text-green-400">{row.sei}</span></div>
                              <div><span className="text-gray-400">LARRY:</span> <span className="text-blue-400">{row.larry}</span></div>
                              <div><span className="text-gray-400">Borrowed:</span> <span className="text-purple-400">{row.borrowed}</span></div>
                              <div><span className="text-gray-400">Total Exposure:</span> <span className="text-yellow-400">{row.total}</span></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop: Table format */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden">
                          <thead>
                            <tr className="bg-gray-800">
                              <th className="border border-gray-700 p-3 text-purple-400 font-mono text-sm">Loop</th>
                              <th className="border border-gray-700 p-3 text-green-400 font-mono text-sm">SEI Held</th>
                              <th className="border border-gray-700 p-3 text-blue-400 font-mono text-sm">LARRY Held</th>
                              <th className="border border-gray-700 p-3 text-purple-400 font-mono text-sm">SEI Borrowed</th>
                              <th className="border border-gray-700 p-3 text-yellow-400 font-mono text-sm">Total Exposure</th>
                            </tr>
                          </thead>
                          <tbody className="font-mono text-sm">
                            <tr className="hover:bg-gray-800/50">
                              <td className="border border-gray-700 p-3 text-gray-300">Start</td>
                              <td className="border border-gray-700 p-3 text-green-400">1,000</td>
                              <td className="border border-gray-700 p-3 text-blue-400">0</td>
                              <td className="border border-gray-700 p-3 text-purple-400">0</td>
                              <td className="border border-gray-700 p-3 text-yellow-400">1,000</td>
                            </tr>
                            <tr className="bg-gray-800/30 hover:bg-gray-800/50">
                              <td className="border border-gray-700 p-3 text-gray-300">Loop 1</td>
                              <td className="border border-gray-700 p-3 text-green-400">0</td>
                              <td className="border border-gray-700 p-3 text-blue-400">996</td>
                              <td className="border border-gray-700 p-3 text-purple-400">986</td>
                              <td className="border border-gray-700 p-3 text-yellow-400">1,986</td>
                            </tr>
                            <tr className="hover:bg-gray-800/50">
                              <td className="border border-gray-700 p-3 text-gray-300">Loop 2</td>
                              <td className="border border-gray-700 p-3 text-green-400">0</td>
                              <td className="border border-gray-700 p-3 text-blue-400">1,978</td>
                              <td className="border border-gray-700 p-3 text-purple-400">1,958</td>
                              <td className="border border-gray-700 p-3 text-yellow-400">3,936</td>
                            </tr>
                            <tr className="bg-gray-800/30 hover:bg-gray-800/50">
                              <td className="border border-gray-700 p-3 text-gray-300">Loop 3</td>
                              <td className="border border-gray-700 p-3 text-green-400">0</td>
                              <td className="border border-gray-700 p-3 text-blue-400">3,917</td>
                              <td className="border border-gray-700 p-3 text-purple-400">3,878</td>
                              <td className="border border-gray-700 p-3 text-yellow-400">7,795</td>
                            </tr>
                            <tr className="hover:bg-gray-800/50">
                              <td className="border border-gray-700 p-3 text-gray-300">Loop 5+</td>
                              <td className="border border-gray-700 p-3 text-green-400">0</td>
                              <td className="border border-gray-700 p-3 text-blue-400">15,000+</td>
                              <td className="border border-gray-700 p-3 text-purple-400">14,850+</td>
                              <td className="border border-gray-700 p-3 text-yellow-400 font-bold">30,000+</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
                        <p className="text-sm text-yellow-300">
                          <strong>Note:</strong> This assumes stable prices. Real results depend on LARRY price movements and market conditions.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-red-400 mb-4">⚠️ Risk Management</h2>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-red-300 font-bold mb-3">Potential Risks</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <strong>Time pressure:</strong> Must repay loans on time</li>
                            <li>• <strong>Interest costs:</strong> Reduce profits over time</li>
                            <li>• <strong>Market risk:</strong> LARRY price could stagnate</li>
                            <li>• <strong>Complexity:</strong> More loops = more to manage</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-green-300 font-bold mb-3">Risk Mitigation</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <strong>Start small:</strong> Test with 10-50 SEI first</li>
                            <li>• <strong>Set reminders:</strong> Track loan expiry dates</li>
                            <li>• <strong>Keep reserves:</strong> Always have SEI for repayment</li>
                            <li>• <strong>Monitor closely:</strong> Check positions regularly</li>
                          </ul>
                        </div>
                      </div>

                      {/* Leverage Risk Management Diagram */}
                      <FlowDiagram
                        title="Safe Leverage Management"
                        nodes={[
                          { id: 'entry', label: 'Start Small', type: 'user', description: '10-50 SEI' },
                          { id: 'leverage', label: 'Build Position', type: 'system', description: 'Loop carefully' },
                          { id: 'monitor', label: 'Track Loans', type: 'contract', description: 'Set reminders' },
                          { id: 'exit', label: 'Safe Exit', type: 'reward', description: 'Flash close or repay' }
                        ]}
                        connections={[
                          { from: 'entry', to: 'leverage' },
                          { from: 'leverage', to: 'monitor' },
                          { from: 'monitor', to: 'exit' }
                        ]}
                        note="Follow this systematic approach to leverage safely: start small, build gradually, monitor closely, and always have an exit strategy."
                        className="mt-6"
                      />

                      {/* Method-Specific Flow Diagrams */}
                      <div className="mt-8 space-y-8">
                        <FlowDiagram
                          title="leverage() Function Flow"
                          nodes={[
                            { id: 'send', label: 'Send SEI + Fees', type: 'user', description: '1,013 SEI total' },
                            { id: 'contract', label: 'Smart Contract', type: 'contract', description: 'One transaction' },
                            { id: 'mint', label: 'Mint LARRY', type: 'system', description: '987 LARRY collateral' },
                            { id: 'borrow', label: 'Auto-Borrow', type: 'reward', description: '980 SEI received' }
                          ]}
                          connections={[
                            { from: 'send', to: 'contract' },
                            { from: 'contract', to: 'mint' },
                            { from: 'contract', to: 'borrow' }
                          ]}
                          note="Single-transaction leverage: simple, efficient, fixed 2x multiplier with automatic execution."
                          className="bg-purple-500/10 border-purple-500/20"
                        />

                        <FlowDiagram
                          title="Manual Leverage Loop"
                          nodes={[
                            { id: 'buy1', label: 'Buy LARRY', type: 'user', description: '1,000 SEI → 997 LARRY' },
                            { id: 'borrow1', label: 'Borrow SEI', type: 'contract', description: '987 SEI borrowed' },
                            { id: 'buy2', label: 'Buy More LARRY', type: 'system', description: '984 LARRY more' },
                            { id: 'loop', label: 'Repeat Loop', type: 'reward', description: 'Scale to 10x-30x' }
                          ]}
                          connections={[
                            { from: 'buy1', to: 'borrow1' },
                            { from: 'borrow1', to: 'buy2' },
                            { from: 'buy2', to: 'loop', curved: true }
                          ]}
                          note="Multi-transaction approach: maximum control and unlimited leverage potential, higher fees but bigger gains."
                          className="bg-orange-500/10 border-orange-500/20"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-green-500/30">
                    <button
                      onClick={() => setActiveSection('how-it-works')}
                      className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Borrowing Details
                    </button>
                    <button
                      onClick={() => setActiveSection('fees')}
                      className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      Fees & Rewards
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </section>
              )}

              {/* Fees Section */}
              {activeSection === 'fees' && (
                <section>
                  <h1 className="text-3xl sm:text-4xl font-mono font-bold text-green-400 mb-8">
                    💰 Fees & Rewards
                  </h1>

                  <div className="space-y-8">
                    <div className="bg-gray-900/50 border border-blue-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-blue-400 mb-4">💸 Fee Structure</h2>
                      <p className="text-gray-300 mb-6">
                        LARRY has simple, transparent fees. All fees go toward improving the protocol and rewarding holders.
                      </p>

                      {/* Mobile Cards */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { action: 'Buy/Sell LARRY', fee: '0.25%', purpose: 'Supports price growth', color: 'green' },
                          { action: 'Borrow SEI', fee: '3.9% APR', purpose: 'Interest to protocol', color: 'blue' },
                          { action: 'Flash Close Loan', fee: '1%', purpose: 'Quick exit option', color: 'purple' },
                          { action: 'Liquidation', fee: '0%', purpose: 'Automatic at midnight', color: 'red' }
                        ].map((item, index) => (
                          <div key={index} className={`bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-lg p-4`}>
                            <h3 className={`text-${item.color}-400 font-bold text-sm mb-2`}>{item.action}</h3>
                            <div className={`text-${item.color}-300 text-lg font-bold mb-2`}>{item.fee}</div>
                            <p className="text-xs text-gray-300">{item.purpose}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded p-4">
                        <h3 className="text-green-300 font-bold mb-2">💡 Fee Benefits</h3>
                        <p className="text-sm text-gray-300">
                          Unlike most DeFi protocols, LARRY&apos;s fees directly benefit holders through price appreciation and reward voting.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-green-400 mb-4">🎁 How You Earn Rewards</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">📈</span>
                            <h3 className="text-green-300 font-bold">Automatic Price Growth</h3>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            Every transaction adds to the protocol&apos;s backing, which mathematically increases the LARRY price.
                          </p>
                          <div className="bg-black/50 rounded p-3">
                            <p className="text-xs text-green-200 font-mono">
                              Price = (Total SEI Backing) ÷ (Total LARRY Supply)
                            </p>
                          </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">🗳️</span>
                            <h3 className="text-blue-300 font-bold">Governance Voting Power</h3>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            The protocol accumulates voting power in YAKA governance and automatically votes to direct 
                            rewards to LARRY trading pairs.
                          </p>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-black/50 rounded p-2">
                              <div className="text-blue-200 font-bold">YAKA Swap</div>
                              <div className="text-gray-300">LARRY/USDC rewards</div>
                            </div>
                            <div className="bg-black/50 rounded p-2">
                              <div className="text-blue-200 font-bold">Dragon Swap</div>
                              <div className="text-gray-300">LARRY/SEI rewards</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">🔥</span>
                            <h3 className="text-purple-300 font-bold">Deflationary Burns</h3>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            Regular token burns reduce the total supply, making your tokens more scarce and valuable.
                          </p>
                          <div className="bg-black/50 rounded p-3">
                            <p className="text-xs text-purple-200">
                              <strong>Burn triggers:</strong> Liquidations, sells, and daily cleanup operations
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-yellow-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-yellow-400 mb-4">📊 Reward Distribution</h2>
                      <p className="text-gray-300 mb-4">Here&apos;s where the fees go:</p>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-black/50 border border-gray-600 rounded p-4">
                          <h3 className="text-white font-bold mb-3">Fee Sources</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• Trading fees (0.25%)</li>
                            <li>• Borrowing interest (3.9% APR)</li>
                            <li>• Flash close fees (1%)</li>
                            <li>• Arbitrage profits</li>
                          </ul>
                        </div>
                        
                        <div className="bg-black/50 border border-gray-600 rounded p-4">
                          <h3 className="text-white font-bold mb-3">Distribution</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• <span className="text-green-400">~70%</span> Back to protocol (increases backing)</li>
                            <li>• <span className="text-blue-400">~25%</span> Liquidity provider rewards</li>
                            <li>• <span className="text-purple-400">~5%</span> Development fund</li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded p-4">
                        <p className="text-sm text-green-300">
                          <strong>Result:</strong> The more the protocol is used, the more valuable LARRY becomes for all holders.
                        </p>
                      </div>

                      {/* Fee Distribution Diagram */}
                      <FlowDiagram
                        title="Fee Distribution Flow"
                        nodes={[
                          { id: 'fees', label: 'Protocol Fees', type: 'contract', description: 'Trading & Interest' },
                          { id: 'backing', label: 'Protocol Backing', type: 'reward', description: '~70%' },
                          { id: 'lp', label: 'LP Rewards', type: 'system', description: '~25%' },
                          { id: 'dev', label: 'Development', type: 'team', description: '~5%' }
                        ]}
                        connections={[
                          { from: 'fees', to: 'backing', percentage: '70%' },
                          { from: 'fees', to: 'lp', percentage: '25%' },
                          { from: 'fees', to: 'dev', percentage: '5%' }
                        ]}
                        note="Most fees flow back to increase LARRY backing, directly benefiting all holders through price appreciation."
                        className="mt-8"
                      />
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-green-500/30">
                    <button
                      onClick={() => setActiveSection('leverage')}
                      className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Leverage System
                    </button>
                    <button
                      onClick={() => setActiveSection('safety')}
                      className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      Safety Features
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </section>
              )}

              {/* Safety Section */}
              {activeSection === 'safety' && (
                <section>
                  <h1 className="text-3xl sm:text-4xl font-mono font-bold text-green-400 mb-8">
                    🛡️ Safety Features
                  </h1>

                  <div className="space-y-8">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-green-400 mb-4">🔒 Price Protection</h2>
                      <p className="text-gray-300 mb-6">
                        LARRY&apos;s most important safety feature is built-in price protection. The smart contract 
                        prevents the price from crashing, making it much safer than typical DeFi tokens.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-black/50 border border-green-500/20 rounded p-4">
                          <h3 className="text-green-300 font-bold mb-3">✅ What&apos;s Protected</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• Price can&apos;t drop more than 0.001% per transaction</li>
                            <li>• Every buy increases the price floor</li>
                            <li>• Token burns reduce supply permanently</li>
                            <li>• Backing always grows from fees and interest</li>
                          </ul>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 rounded p-4">
                          <h3 className="text-red-300 font-bold mb-3">⚠️ What&apos;s Not Protected</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• Market demand can still fluctuate</li>
                            <li>• No guarantee of price increases</li>
                            <li>• External market conditions affect trading</li>
                            <li>• Smart contract risks still exist</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-blue-400 mb-4">⏰ Time-Based Loans</h2>
                      <p className="text-gray-300 mb-6">
                        Unlike traditional DeFi, LARRY doesn&apos;t use price-based liquidations. Instead, loans are time-based, 
                        giving you predictable repayment schedules.
                      </p>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="bg-green-500/10 border border-green-500/20 rounded p-4 text-center">
                          <div className="text-2xl mb-2">📅</div>
                          <h3 className="text-green-300 font-bold mb-2">Flexible Duration</h3>
                          <p className="text-xs text-gray-300">Choose 30-365 days for your loan term</p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4 text-center">
                          <div className="text-2xl mb-2">🚫</div>
                          <h3 className="text-blue-300 font-bold mb-2">No Sudden Liquidations</h3>
                          <p className="text-xs text-gray-300">Only liquidated at midnight UTC after expiry</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4 text-center">
                          <div className="text-2xl mb-2">⚡</div>
                          <h3 className="text-purple-300 font-bold mb-2">Flash Close Option</h3>
                          <p className="text-xs text-gray-300">Exit early with 1% fee anytime</p>
                        </div>
                      </div>

                      <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
                        <p className="text-sm text-yellow-300">
                          <strong>Pro tip:</strong> Set calendar reminders for loan expiry dates to avoid automatic liquidation.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-purple-400 mb-4">🔧 Smart Contract Security</h2>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-purple-300 font-bold mb-3">Built-in Safeguards</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• Maximum supply cap (1 billion LARRY)</li>
                            <li>• Price manipulation protection</li>
                            <li>• Automatic liquidation system</li>
                            <li>• Whitelisted address system for authorized operations</li>
                            <li>• Daily cleanup operations</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-red-300 font-bold mb-3">Best Practices</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li>• Start with small amounts to learn</li>
                            <li>• Never invest more than you can afford to lose</li>
                            <li>• Keep track of your loan expiry dates</li>
                            <li>• Monitor your positions regularly</li>
                            <li>• Join the community for updates and support</li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded p-4">
                        <h3 className="text-red-300 font-bold mb-2">⚠️ Important Disclaimer</h3>
                        <p className="text-sm text-gray-300">
                          While LARRY has many safety features, all DeFi protocols carry risks. Smart contracts can have bugs, 
                          market conditions can change, and no investment is guaranteed. Always do your own research and 
                          only invest what you can afford to lose.
                        </p>
                      </div>

                      {/* Safety Features Diagram */}
                      <FlowDiagram
                        title="LARRY Safety System"
                        nodes={[
                          { id: 'user', label: 'User Action', type: 'user', description: 'Buy/Sell/Borrow' },
                          { id: 'contract', label: 'Smart Contract', type: 'contract', description: 'Price Protection' },
                          { id: 'time', label: 'Time-Based Loans', type: 'system', description: 'No Liquidations' },
                          { id: 'protection', label: 'Price Floor', type: 'reward', description: 'Always Protected' }
                        ]}
                        connections={[
                          { from: 'user', to: 'contract' },
                          { from: 'contract', to: 'time' },
                          { from: 'contract', to: 'protection' }
                        ]}
                        note="Multiple layers of protection ensure user safety: price floors, time-based liquidations, and smart contract safeguards."
                        className="mt-8"
                      />
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-green-500/30">
                    <button
                      onClick={() => setActiveSection('fees')}
                      className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Fees & Rewards
                    </button>
                    <button
                      onClick={() => setActiveSection('faq')}
                      className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      FAQ
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </section>
              )}

              {/* FAQ Section */}
              {activeSection === 'faq' && (
                <section>
                  <h1 className="text-3xl sm:text-4xl font-mono font-bold text-green-400 mb-8">
                    ❓ Frequently Asked Questions
                  </h1>

                  <div className="space-y-6">
                    {[
                      {
                        q: "Is LARRY safe to use?",
                        a: "LARRY has several safety features including price protection, time-based loans (no sudden liquidations), and built-in smart contract safeguards. However, all DeFi carries risks, so start small and only invest what you can afford to lose.",
                        category: "Safety"
                      },
                      {
                        q: "How much can I leverage?",
                        a: "You can borrow up to 99% of your LARRY token value as SEI. By repeating this process (looping), you can achieve 10-20x leverage or more. The exact amount depends on fees and your risk tolerance.",
                        category: "Leverage"
                      },
                      {
                        q: "What happens if I can&apos;t repay my loan?",
                        a: "Loans are automatically liquidated at midnight UTC after expiry. Your LARRY collateral gets burned (deflationary for other holders) and the borrowed SEI stays in the protocol. You can also flash close early for a 1% fee.",
                        category: "Loans"
                      },
                      {
                        q: "How do I earn rewards?",
                        a: "Just by holding LARRY! Rewards come from: 1) Price appreciation from protocol fees, 2) Deflationary token burns, 3) Governance voting that directs trading rewards to LARRY pools. No staking required.",
                        category: "Rewards"
                      },
                      {
                        q: "What are the fees?",
                        a: "Trading fees are 0.25% on buy/sell. Borrowing costs 3.9% APR plus small fees. Flash closing costs 1%. All fees benefit LARRY holders through price appreciation and protocol growth.",
                        category: "Fees"
                      },
                      {
                        q: "Can the LARRY price crash?",
                        a: "The smart contract has built-in price protection that prevents major drops (max 0.001% per transaction). However, market demand can still fluctuate. The protocol is designed to trend upward over time through backing growth.",
                        category: "Price"
                      },
                      {
                        q: "How do I get started?",
                        a: "1) Connect your wallet with SEI tokens, 2) Buy some LARRY through the trading interface, 3) Optionally start leveraging by borrowing SEI against your LARRY, 4) Monitor your positions and earn rewards automatically.",
                        category: "Getting Started"
                      },
                      {
                        q: "What&apos;s the minimum amount to start?",
                        a: "There&apos;s no official minimum, but we recommend starting with at least 10-50 SEI to cover gas fees and test the system. You can always add more later as you get comfortable.",
                        category: "Getting Started"
                      },
                      {
                        q: "Is this available on other chains?",
                        a: "LARRY is currently only on SEI Network, which offers ultra-low fees perfect for leverage looping. There are no plans for other chains at this time.",
                        category: "Technical"
                      },
                      {
                        q: "Where can I get help?",
                        a: "Join the Telegram community @btbfinance for support, updates, and discussion. You can also follow @btb_finance on X (Twitter) for announcements.",
                        category: "Support"
                      }
                    ].map((faq, index) => {
                      // Define visual elements for each FAQ category
                      const getVisualContent = (category: string, faqIndex: number) => {
                        switch (category) {
                          case 'Safety':
                            return (
                              <div className="mt-4">
                                <FlowDiagram
                                  title="Safety Layers"
                                  nodes={[
                                    { id: 'price', label: 'Price Floor', type: 'reward', description: 'Max 0.001% drop/tx' },
                                    { id: 'time', label: 'Time Loans', type: 'system', description: 'No price liquidations' },
                                    { id: 'contract', label: 'Smart Contract', type: 'contract', description: 'Audited protection' },
                                    { id: 'user', label: 'Your Safety', type: 'user', description: 'Multiple protections' }
                                  ]}
                                  connections={[
                                    { from: 'price', to: 'user' },
                                    { from: 'time', to: 'user' },
                                    { from: 'contract', to: 'user' }
                                  ]}
                                  note="Three layers of protection keep your funds safe from sudden liquidations and price manipulation."
                                  className="mb-4"
                                />
                                <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                                  <h4 className="text-green-300 font-bold mb-2">🛡️ Safety Checklist</h4>
                                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                                    <div className="text-gray-300">✅ No sudden liquidations</div>
                                    <div className="text-gray-300">✅ Price floor protection</div>
                                    <div className="text-gray-300">✅ Time-based loans only</div>
                                  </div>
                                </div>
                              </div>
                            );
                          case 'Leverage':
                            return (
                              <div className="mt-4">
                                <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4 mb-4">
                                  <h4 className="text-purple-300 font-bold mb-3">🚀 Leverage Potential Calculator</h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                      <thead>
                                        <tr className="border-b border-purple-500/30">
                                          <th className="text-purple-300 p-2 text-left">Loops</th>
                                          <th className="text-purple-300 p-2 text-left">Leverage</th>
                                          <th className="text-purple-300 p-2 text-left">LARRY Owned</th>
                                          <th className="text-purple-300 p-2 text-left">Risk Level</th>
                                        </tr>
                                      </thead>
                                      <tbody className="font-mono">
                                        <tr className="border-b border-purple-500/20">
                                          <td className="p-2 text-gray-300">0</td>
                                          <td className="p-2 text-blue-400">1x</td>
                                          <td className="p-2 text-green-400">1,000</td>
                                          <td className="p-2 text-green-400">Low</td>
                                        </tr>
                                        <tr className="border-b border-purple-500/20">
                                          <td className="p-2 text-gray-300">2</td>
                                          <td className="p-2 text-yellow-400">4x</td>
                                          <td className="p-2 text-yellow-400">4,000</td>
                                          <td className="p-2 text-yellow-400">Medium</td>
                                        </tr>
                                        <tr className="border-b border-purple-500/20">
                                          <td className="p-2 text-gray-300">5</td>
                                          <td className="p-2 text-orange-400">15x</td>
                                          <td className="p-2 text-orange-400">15,000</td>
                                          <td className="p-2 text-orange-400">High</td>
                                        </tr>
                                        <tr>
                                          <td className="p-2 text-gray-300">10+</td>
                                          <td className="p-2 text-red-400">50x+</td>
                                          <td className="p-2 text-red-400">50,000+</td>
                                          <td className="p-2 text-red-400">Extreme</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <FlowDiagram
                                  title="Leverage Loop Process"
                                  nodes={[
                                    { id: 'start', label: 'Buy LARRY', type: 'user', description: '1,000 SEI → 997 LARRY' },
                                    { id: 'borrow', label: 'Borrow SEI', type: 'contract', description: '99% LTV = 987 SEI' },
                                    { id: 'buy', label: 'Buy More LARRY', type: 'system', description: '987 SEI → 984 LARRY' },
                                    { id: 'loop', label: 'Repeat Process', type: 'reward', description: 'Higher leverage' }
                                  ]}
                                  connections={[
                                    { from: 'start', to: 'borrow' },
                                    { from: 'borrow', to: 'buy' },
                                    { from: 'buy', to: 'loop' },
                                    { from: 'loop', to: 'borrow' }
                                  ]}
                                  note="Each loop increases your LARRY exposure while maintaining the same initial capital."
                                />
                              </div>
                            );
                          case 'Loans':
                            return (
                              <div className="mt-4">
                                <div className="bg-red-500/10 border border-red-500/20 rounded p-4 mb-4">
                                  <h4 className="text-red-300 font-bold mb-3">⏰ Loan Timeline Example</h4>
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-black/50 rounded">
                                      <span className="text-gray-300 font-mono">Day 1:</span>
                                      <span className="text-green-400">Loan starts - 30 days to repay</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-black/50 rounded">
                                      <span className="text-gray-300 font-mono">Day 25:</span>
                                      <span className="text-yellow-400">5 days left - extend or repay</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-black/50 rounded">
                                      <span className="text-gray-300 font-mono">Day 30:</span>
                                      <span className="text-orange-400">Midnight UTC - auto liquidation</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-red-500/20 rounded">
                                      <span className="text-gray-300 font-mono">After Day 30:</span>
                                      <span className="text-red-400">LARRY burned, SEI stays in protocol</span>
                                    </div>
                                  </div>
                                </div>
                                <FlowDiagram
                                  title="Loan Liquidation Process"
                                  nodes={[
                                    { id: 'expiry', label: 'Loan Expires', type: 'system', description: 'Midnight UTC' },
                                    { id: 'burn', label: 'Burn LARRY', type: 'burn', description: 'Collateral destroyed' },
                                    { id: 'keep', label: 'Keep SEI', type: 'contract', description: 'Protocol retains' },
                                    { id: 'holders', label: 'LARRY Holders', type: 'reward', description: 'Benefit from burn' }
                                  ]}
                                  connections={[
                                    { from: 'expiry', to: 'burn' },
                                    { from: 'expiry', to: 'keep' },
                                    { from: 'burn', to: 'holders' }
                                  ]}
                                  note="Expired loans help LARRY holders through deflationary burns and protocol growth."
                                />
                              </div>
                            );
                          case 'Rewards':
                            return (
                              <div className="mt-4">
                                <div className="bg-green-500/10 border border-green-500/20 rounded p-4 mb-4">
                                  <h4 className="text-green-300 font-bold mb-3">💰 Reward Sources Breakdown</h4>
                                  <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="bg-black/50 rounded p-3">
                                      <h5 className="text-blue-400 font-bold mb-2">Protocol Fees</h5>
                                      <ul className="text-sm text-gray-300 space-y-1">
                                        <li>• 0.25% on all trades</li>
                                        <li>• 3.9% APR on loans</li>
                                        <li>• 1% flash close fees</li>
                                        <li>→ Goes to SEI backing</li>
                                      </ul>
                                    </div>
                                    <div className="bg-black/50 rounded p-3">
                                      <h5 className="text-orange-400 font-bold mb-2">Token Burns</h5>
                                      <ul className="text-sm text-gray-300 space-y-1">
                                        <li>• Expired loan collateral</li>
                                        <li>• Team token burns</li>
                                        <li>• Flash close burns</li>
                                        <li>→ Reduces total supply</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <FlowDiagram
                                  title="Automatic Reward System"
                                  nodes={[
                                    { id: 'fees', label: 'Protocol Fees', type: 'system', description: '0.25% + 3.9% APR' },
                                    { id: 'backing', label: 'SEI Backing', type: 'contract', description: 'Increases reserves' },
                                    { id: 'burns', label: 'Token Burns', type: 'burn', description: 'Reduces supply' },
                                    { id: 'holders', label: 'LARRY Price ↑', type: 'reward', description: 'Automatic gains' }
                                  ]}
                                  connections={[
                                    { from: 'fees', to: 'backing' },
                                    { from: 'burns', to: 'holders' },
                                    { from: 'backing', to: 'holders' }
                                  ]}
                                  note="Just hold LARRY - rewards come automatically through price appreciation from fees and burns."
                                />
                              </div>
                            );
                          case 'Fees':
                            return (
                              <div className="mt-4">
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4 mb-4">
                                  <h4 className="text-blue-300 font-bold mb-3">📊 Fee Calculator Example</h4>
                                  <div className="space-y-3">
                                    <div className="bg-black/50 rounded p-3">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300">Buy 1,000 SEI worth of LARRY:</span>
                                        <span className="text-yellow-400 font-mono">2.5 SEI fee</span>
                                      </div>
                                      <div className="text-xs text-gray-400">0.25% trading fee</div>
                                    </div>
                                    <div className="bg-black/50 rounded p-3">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300">Borrow 987 SEI (99% LTV):</span>
                                        <span className="text-purple-400 font-mono">38.5 SEI/year</span>
                                      </div>
                                      <div className="text-xs text-gray-400">3.9% annual interest</div>
                                    </div>
                                    <div className="bg-black/50 rounded p-3">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-300">Flash close position:</span>
                                        <span className="text-orange-400 font-mono">9.87 SEI fee</span>
                                      </div>
                                      <div className="text-xs text-gray-400">1% of borrowed amount</div>
                                    </div>
                                  </div>
                                </div>
                                <FlowDiagram
                                  title="Where Fees Go"
                                  nodes={[
                                    { id: 'user', label: 'You Pay Fees', type: 'user', description: '0.25% + 3.9% + 1%' },
                                    { id: 'protocol', label: 'Protocol Treasury', type: 'contract', description: 'Collects all fees' },
                                    { id: 'backing', label: 'SEI Backing', type: 'system', description: 'Increases reserves' },
                                    { id: 'holders', label: 'LARRY Holders', type: 'reward', description: 'Higher token price' }
                                  ]}
                                  connections={[
                                    { from: 'user', to: 'protocol' },
                                    { from: 'protocol', to: 'backing' },
                                    { from: 'backing', to: 'holders' }
                                  ]}
                                  note="All fees benefit LARRY holders by increasing the backing ratio and token price."
                                />
                              </div>
                            );
                          case 'Price':
                            return (
                              <div className="mt-4">
                                <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4 mb-4">
                                  <h4 className="text-purple-300 font-bold mb-3">📈 Price Protection Mechanism</h4>
                                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                                      <div className="text-green-300 font-bold mb-1">✅ Protected</div>
                                      <div className="text-gray-300">Max drop: 0.001%</div>
                                      <div className="text-gray-300">Per transaction</div>
                                    </div>
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
                                      <div className="text-yellow-300 font-bold mb-1">⚠️ Market Risk</div>
                                      <div className="text-gray-300">Demand can vary</div>
                                      <div className="text-gray-300">Natural fluctuation</div>
                                    </div>
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                                      <div className="text-blue-300 font-bold mb-1">📊 Long-term</div>
                                      <div className="text-gray-300">Backing grows</div>
                                      <div className="text-gray-300">Deflationary burns</div>
                                    </div>
                                  </div>
                                </div>
                                <FlowDiagram
                                  title="Price Protection System"
                                  nodes={[
                                    { id: 'trade', label: 'Trade Attempt', type: 'user', description: 'User tries to sell' },
                                    { id: 'check', label: 'Price Check', type: 'contract', description: 'Smart contract validates' },
                                    { id: 'protect', label: 'Price Protection', type: 'system', description: 'Max 0.001% drop' },
                                    { id: 'safe', label: 'Safe Price', type: 'reward', description: 'Transaction allowed' }
                                  ]}
                                  connections={[
                                    { from: 'trade', to: 'check' },
                                    { from: 'check', to: 'protect' },
                                    { from: 'protect', to: 'safe' }
                                  ]}
                                  note="Smart contract prevents major price drops while allowing natural market movements."
                                />
                              </div>
                            );
                          case 'Getting Started':
                            return (
                              <div className="mt-4">
                                <div className="bg-green-500/10 border border-green-500/20 rounded p-4 mb-4">
                                  <h4 className="text-green-300 font-bold mb-3">🎯 Step-by-Step Getting Started</h4>
                                  <div className="space-y-3">
                                    {[
                                      { step: 1, action: 'Connect Wallet', detail: 'SEI Network with 50+ SEI recommended' },
                                      { step: 2, action: 'Buy LARRY Tokens', detail: 'Start with 10-50 SEI to test the system' },
                                      { step: 3, action: 'Try Basic Features', detail: 'Buy, sell, check your balance' },
                                      { step: 4, action: 'Learn Leverage', detail: 'Borrow against LARRY, start with 2x' },
                                      { step: 5, action: 'Earn Rewards', detail: 'Hold LARRY and earn automatically' }
                                    ].map((item, idx) => (
                                      <div key={idx} className="flex items-center p-3 bg-black/50 rounded">
                                        <div className="bg-green-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                                          {item.step}
                                        </div>
                                        <div className="flex-1">
                                          <div className="text-white font-semibold">{item.action}</div>
                                          <div className="text-gray-400 text-sm">{item.detail}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <FlowDiagram
                                  title="New User Journey"
                                  nodes={[
                                    { id: 'wallet', label: 'Connect Wallet', type: 'user', description: 'SEI Network' },
                                    { id: 'buy', label: 'Buy LARRY', type: 'system', description: '10-50 SEI start' },
                                    { id: 'leverage', label: 'Try Leverage', type: 'contract', description: 'Borrow & loop' },
                                    { id: 'earn', label: 'Earn Rewards', type: 'reward', description: 'Automatic gains' }
                                  ]}
                                  connections={[
                                    { from: 'wallet', to: 'buy' },
                                    { from: 'buy', to: 'leverage' },
                                    { from: 'leverage', to: 'earn' }
                                  ]}
                                  note="Simple progression from basic holding to advanced leverage strategies."
                                />
                              </div>
                            );
                          default:
                            return null;
                        }
                      };

                      return (
                        <div key={index} className="bg-gray-900/50 border border-green-500/30 rounded-lg p-6">
                          <div className="flex items-start space-x-3">
                            <div className="bg-green-500/20 rounded-full p-2 mt-1 flex-shrink-0">
                              <span className="text-green-400 font-bold text-sm">Q</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-green-400 font-bold mb-2">{faq.q}</h3>
                              <div className="flex items-center space-x-2 mb-3">
                                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-mono">
                                  {faq.category}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed mb-4">{faq.a}</p>
                              {getVisualContent(faq.category, index)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-12 bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                    <h2 className="text-xl font-mono font-bold text-green-400 mb-4">Still Have Questions?</h2>
                    <p className="text-gray-300 mb-6">
                      Join our community for real-time support and discussion with other LARRY users.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="https://t.me/btbfinance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        Join Telegram
                      </a>
                      <a
                        href="https://x.com/btb_finance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        Follow on X
                      </a>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-green-500/30">
                    <button
                      onClick={() => setActiveSection('safety')}
                      className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-mono transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Safety Features
                    </button>
                    <div></div>
                  </div>
                </section>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/30 bg-black/80 backdrop-blur-md px-4 sm:px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-mono font-bold text-sm">📚</span>
              </div>
              <span className="text-gray-400 font-mono text-sm">© 2025 LARRY PROTOCOL DOCS</span>
            </div>

            <div className="flex items-center space-x-6">
              <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://x.com/btb_finance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
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