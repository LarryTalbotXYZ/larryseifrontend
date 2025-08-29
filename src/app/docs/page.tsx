'use client';

import Link from 'next/link';
import { useState } from 'react';
import MobileConnectButton from '@/components/MobileConnectButton';

export default function Docs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { id: 'how-it-works', label: 'How It Works', icon: '⚙️' },
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
                      <h2 className="text-xl font-mono font-bold text-blue-400 mb-4">🚀 How Leverage Works</h2>
                      <p className="text-gray-300 mb-6">
                        Unlike traditional DeFi, LARRY&apos;s leverage system is designed to be safe and user-friendly. 
                        You can borrow up to 99% of your LARRY value as SEI, then use that SEI to buy more LARRY.
                      </p>

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

                    <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-mono font-bold text-purple-400 mb-4">🧮 Leverage Calculator</h2>
                      <p className="text-gray-300 mb-4">Here&apos;s how your position grows with each loop:</p>
                      
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
                    </div>
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
                    </div>
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
                    </div>
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
                    ].map((faq, index) => (
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
                            <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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