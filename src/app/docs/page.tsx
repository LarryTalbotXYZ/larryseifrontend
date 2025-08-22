'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Mathematical symbols for visual elements
const MATH_SYMBOLS = ['∑', '∫', '∂', '∇', '∞', '∮', '∯', '∱', '∲', '∴', '∵', '⊥', '∥', '∦', '≅', '≈', '≠', '≤', '≥', '⊂', '⊃', '⊆', '⊇', '∈', '∉', '∋', '∌', '⊕', '⊗', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '∧', '∨', '¬', '∀', '∃', '∄', '∅', '∆', '∇', '∈', '∉', '∋', '∌', '⊂', '⊃', '⊄', '⊅', '⊆', '⊇'];

export default function Docs() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 8000 + Math.random() * 7000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Matrix Grid Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#0a0a0a_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_#1a1a2e_0%,_transparent_50%),radial-gradient(circle_at_40%_40%,_#0f0f23_0%,_transparent_50%)]"></div>

        {/* Matrix Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Floating Mathematical Symbols */}
        {MATH_SYMBOLS.map((symbol, i) => (
          <div
            key={i}
            className="absolute text-green-400/20 font-mono font-bold text-2xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {symbol}
          </div>
        ))}

        {/* Scanning Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse opacity-20"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse opacity-15" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse opacity-20" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse opacity-15" style={{ animationDelay: '6s' }}></div>
        </div>

        {/* Animated Dots */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
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
      <nav className="relative z-10 flex justify-between items-center p-4 sm:p-6 lg:px-12 border-b border-green-500/30 backdrop-blur-md">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-pulse"></div>
            <span className="text-black font-mono font-bold text-sm sm:text-lg relative z-10">λ</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-lg sm:text-2xl font-mono font-bold tracking-tight transition-all duration-300 ${glitchActive ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
              QUANTUM_DOCS
            </span>
            <span className="text-xs text-blue-400 font-mono hidden sm:block">MATHEMATICAL_PROTOCOL_ANALYSIS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors font-mono text-sm">HOME</Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm">TRADING_ENGINE</Link>
          <Link href="/veyaka" className="text-gray-300 hover:text-purple-400 transition-colors font-mono text-sm">VE_YAKA</Link>
          <span className="text-green-400 font-mono font-bold text-sm border-b-2 border-green-400 pb-1">DOCUMENTATION</span>
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

        {/* Desktop Connect Button */}
        <div className="hidden md:block">
          <ConnectButton />
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-green-500/30 absolute top-full left-0 right-0 z-50">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" className="block text-gray-300 hover:text-green-400 transition-colors font-mono text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
              HOME
            </Link>
            <Link href="/dashboard" className="block text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
              TRADING_ENGINE
            </Link>
            <Link href="/veyaka" className="block text-gray-300 hover:text-purple-400 transition-colors font-mono text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
              VE_YAKA
            </Link>
            <span className="block text-green-400 font-mono font-bold text-sm py-2 border-l-2 border-green-400 pl-2">DOCUMENTATION</span>
            <div className="pt-4 border-t border-gray-700">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10">
        {/* Header Section */}
        <section className="px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors mb-6 font-mono text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                [RETURN_HOME]
              </Link>

              <div className="relative mb-6">
                <h1 className={`text-3xl sm:text-4xl lg:text-6xl font-mono font-bold mb-4 transition-all duration-300 ${glitchActive ? 'text-red-400 animate-pulse' : ''}`}>
                  <span className="text-green-400">∫</span>
                  <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">PROTOCOL_MATHEMATICS</span>
                  <span className="text-green-400">dx</span>
                </h1>
                <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-green-400"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-blue-400"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-purple-400"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-red-400"></div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-3">
                    <span className="text-green-400 font-mono font-bold mr-2">λ</span>
                    <span className="text-blue-400 font-mono text-sm">SYSTEM_STATUS::OPERATIONAL</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed font-mono text-sm sm:text-base">
                    <span className="text-green-400">Built by BTB Finance</span> - A deflationary, fully-backed token with{' '}
                    <span className="text-blue-400">mathematically-proven arbitrage opportunities</span> on{' '}
                    <span className="text-purple-400">SEI Network</span>. Where finance meets quantum mathematics.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono">ΔPRICE &gt; 0</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-mono">BACKED_ASSET</span>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-mono">DEFLATIONARY</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-mono">LOOP_ENABLED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="px-4 sm:px-6 lg:px-12 pb-12 sm:pb-20">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">

            {/* What is LARRY Section */}
            <section className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-green-400 mb-6 flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <span className="text-black font-mono font-bold text-sm sm:text-lg relative z-10">∑</span>
                  </div>
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    QUANTUM_LARRY_PROTOCOL
                  </span>
                </h2>
              
                <div className="space-y-4 text-gray-300 mb-8 font-mono text-sm sm:text-base">
                  <div className="bg-black/30 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <span className="text-green-400 font-bold mr-2">λ</span>
                      <span className="text-blue-400">CORE_ALGORITHM::BACKED_ASSET_MODEL</span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-400 font-bold mr-3 mt-1">∴</span>
                        <span>Token fully backed by <span className="text-green-400 font-semibold">[SEI_ASSET]</span> inside smart contract</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 font-bold mr-3 mt-1">∫</span>
                        <span>Designed for <span className="text-blue-400 font-semibold">liquidity_providers</span> — incentivizes USDC/LARRY pools</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 font-bold mr-3 mt-1">∂</span>
                        <span>Built with <span className="text-purple-400 font-semibold">monotonic_price_function</span>: f&apos;(x) &gt; 0 guaranteed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 font-bold mr-3 mt-1">∇</span>
                        <span>Enables <span className="text-red-400 font-semibold">recursive_leverage</span>: buy → borrow → buy → repeat</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-400 font-bold mr-3 mt-1">∑</span>
                        <span>Deflationary supply via <span className="text-yellow-400 font-semibold">burn_mechanics</span> and liquidation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 font-bold mr-3 mt-1">∞</span>
                        <span><span className="text-green-400 font-semibold">whitelisted_addresses</span> for fee-free arbitrage execution</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 font-bold mr-3 mt-1">Δ</span>
                        <span>Grows <span className="text-blue-400 font-semibold">LP_depth</span> through mathematical incentives</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { label: 'NETWORK', value: 'SEI_PROTOCOL', icon: '🔗', color: 'green' },
                    { label: 'OWNED_BY', value: 'BTB_FINANCE', icon: '🏛️', color: 'blue' },
                    { label: 'LOOP_STATUS', value: 'ENABLED', icon: '🔄', color: 'purple' },
                    { label: 'SUPPLY_MODEL', value: 'DEFLATIONARY', icon: '📉', color: 'red' }
                  ].map((item, index) => (
                    <div key={index} className={`bg-gray-900/50 backdrop-blur border border-${item.color}-500/30 rounded-lg p-4 relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent`}></div>
                      <div className="relative z-10">
                        <div className={`flex items-center mb-2`}>
                          <span className="text-lg mr-2">{item.icon}</span>
                          <span className={`text-${item.color}-400 font-mono text-xs`}>{item.label}</span>
                        </div>
                        <div className={`text-${item.color}-400 font-mono font-bold text-sm`}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <span className="text-green-400 font-mono font-bold mr-2">∂</span>
                      <h3 className="text-green-400 font-mono font-bold text-sm">PRICE_CALCULATION_ENGINE</h3>
                    </div>

                    <div className="bg-black/50 border border-green-500/20 rounded-lg p-4 mb-4 relative">
                      <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-225"></div>
                      <code className="text-green-400 text-sm sm:text-lg font-mono block text-center">
                        <span className="text-blue-400">price</span> = (<span className="text-purple-400">SEI_contract</span> + <span className="text-red-400">SEI_borrowed</span>) / <span className="text-yellow-400">total_LARRY_supply</span>
                      </code>
                    </div>

                    <div className="space-y-3 text-gray-300 font-mono text-sm">
                      <div className="flex items-center mb-2">
                        <span className="text-green-400 font-bold mr-2">λ</span>
                        <span className="text-blue-400">MONOTONIC_PRICE_FUNCTION</span>
                      </div>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-start">
                          <span className="text-green-400 font-bold mr-3 mt-1">→</span>
                          <span><span className="text-green-400 font-semibold">BUY_EVENT</span> → SEI enters contract → <span className="text-blue-400">Δprice &gt; 0</span></span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-red-400 font-bold mr-3 mt-1">→</span>
                          <span><span className="text-red-400 font-semibold">SELL_EVENT</span> → LARRY burns → supply ↓ → <span className="text-purple-400">Δprice &gt; 0</span></span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-400 font-bold mr-3 mt-1">→</span>
                          <span><span className="text-purple-400 font-semibold">BORROW_FEES</span> + <span className="text-yellow-400">INTEREST</span> + <span className="text-blue-400">LIQUIDATION</span> → contract value ↑ → <span className="text-green-400">Δprice &gt; 0</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Looping Strategy Section */}
            <section className="bg-gray-900/50 backdrop-blur border border-blue-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-blue-400 mb-6 flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <span className="text-black font-mono font-bold text-sm sm:text-lg relative z-10">∇</span>
                  </div>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    RECURSIVE_LEVERAGE_ENGINE
                  </span>
                </h2>
              
                <div className="space-y-6 text-gray-300 font-mono text-sm sm:text-base">
                  <div className="bg-black/30 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <span className="text-blue-400 font-bold mr-2">∫</span>
                      <span className="text-purple-400">LOOP_SIMULATION::INITIAL_CONDITIONS</span>
                    </div>
                    <p className="text-blue-400">Starting with <span className="text-green-400 font-bold">1000 SEI</span> (@ $0.50 valuation)</p>
                  </div>

                  {/* Mobile Card Layout */}
                  <div className="block sm:hidden space-y-4">
                    {[
                      { step: 1, action: 'BUY_LARRY', seiUsed: 1000, larryReceived: '~996.25', comment: '0.25% fee, price increases', color: 'green' },
                      { step: 2, action: 'BORROW_SEI', seiUsed: '~986', larryReceived: '996.25 LARRY', comment: '99% LTV, borrow against LARRY', color: 'blue' },
                      { step: 3, action: 'BUY_LARRY_AGAIN', seiUsed: 986, larryReceived: '~982', comment: 'More price increase', color: 'purple' },
                      { step: 4, action: 'BORROW_AGAIN', seiUsed: '~972', larryReceived: '982 LARRY', comment: 'Repeat cycle', color: 'red' },
                      { step: '...', action: 'CONTINUE_LOOP', seiUsed: '...', larryReceived: '🚀', comment: 'Watch LARRY stack grow', color: 'yellow' }
                    ].map((item, index) => (
                      <div key={index} className={`bg-gray-900/50 border border-${item.color}-500/30 rounded-lg p-4 relative overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent`}></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-${item.color}-400 font-mono font-bold`}>STEP_{item.step}</span>
                            <span className={`text-${item.color}-400 text-sm`}>{item.action}</span>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-400">SEI_USED:</span>
                              <span className="text-green-400">{item.seiUsed}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">LARRY_RECEIVED:</span>
                              <span className="text-blue-400">{item.larryReceived}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">COMMENT:</span>
                              <span className="text-purple-400">{item.comment}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table Layout */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-700 rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-700 p-3 sm:p-4 text-blue-400 text-left font-mono font-bold text-xs sm:text-sm">STEP</th>
                          <th className="border border-gray-700 p-3 sm:p-4 text-blue-400 text-left font-mono font-bold text-xs sm:text-sm">ACTION</th>
                          <th className="border border-gray-700 p-3 sm:p-4 text-blue-400 text-left font-mono font-bold text-xs sm:text-sm">SEI_USED</th>
                          <th className="border border-gray-700 p-3 sm:p-4 text-blue-400 text-left font-mono font-bold text-xs sm:text-sm">LARRY_RECEIVED</th>
                          <th className="border border-gray-700 p-3 sm:p-4 text-blue-400 text-left font-mono font-bold text-xs sm:text-sm">COMMENT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-800/50 transition-colors">
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono">1</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-green-400">BUY_LARRY</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-blue-400">1000</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-purple-400">~996.25</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-yellow-400">0.25% fee, price increases</td>
                        </tr>
                        <tr className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono">2</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-blue-400">BORROW_SEI</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-green-400">~986</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-red-400">996.25 LARRY</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-purple-400">99% LTV, borrow against LARRY</td>
                        </tr>
                        <tr className="hover:bg-gray-800/50 transition-colors">
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono">3</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-purple-400">BUY_LARRY_AGAIN</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-blue-400">986</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-green-400">~982</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-yellow-400">More price increase</td>
                        </tr>
                        <tr className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono">4</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-red-400">BORROW_AGAIN</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-purple-400">~972</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-blue-400">982 LARRY</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-green-400">Repeat cycle</td>
                        </tr>
                        <tr className="hover:bg-gray-800/50 transition-colors">
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono">...</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-yellow-400">CONTINUE_LOOP</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-gray-400">...</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-2xl">🚀</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-blue-400">Watch LARRY stack grow</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur border border-blue-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <span className="text-blue-400 font-mono font-bold mr-2">∞</span>
                        <h4 className="text-blue-400 font-mono font-bold text-sm">RECURSIVE_FEEDBACK_LOOP</h4>
                      </div>
                      <div className="space-y-3">
                        {[
                          { icon: '→', text: 'More SEI gets locked in contract', color: 'green' },
                          { icon: '→', text: 'LARRY price increases (Δprice > 0)', color: 'blue' },
                          { icon: '→', text: 'You accumulate more LARRY tokens', color: 'purple' },
                          { icon: '→', text: 'Treasury strengthens (backing ratio ↑)', color: 'red' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <span className={`text-${item.color}-400 font-bold mr-3 mt-1`}>{item.icon}</span>
                            <span className={`text-${item.color}-400 font-mono text-sm`}>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-purple-400 font-mono font-bold mr-2">Δ</span>
                      <span className="text-blue-400 font-mono text-sm">EXIT_STRATEGY::UNWIND_PROTOCOL</span>
                    </div>
                    <p className="text-gray-300 font-mono text-sm">
                      You can <span className="text-purple-400 font-semibold">unwind</span> anytime by selling LARRY back into SEI.
                      Protocol always honors redemption based on current <span className="text-green-400">mathematical_backing</span>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Fees & Deflation Section */}
            <section className="bg-gray-900/50 backdrop-blur border border-red-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-yellow-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-red-400 mb-6 flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-400 to-yellow-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <span className="text-black font-mono font-bold text-sm sm:text-lg relative z-10">∑</span>
                  </div>
                  <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                    DEFLATION_ENGINE
                  </span>
                </h2>
              
                <div className="space-y-6 text-gray-300 font-mono text-sm sm:text-base">
                  {/* Mobile Card Layout */}
                  <div className="block sm:hidden space-y-4">
                    {[
                      { action: 'BUY/SELL', fee: '0.1%', teamShare: '~0.05%', protocolShare: '~0.05%', purpose: 'DEX LP incentives', color: 'green' },
                      { action: 'BORROW', fee: '~3.9% APR + fees', teamShare: '~30%', protocolShare: '~70%', purpose: 'Interest stays in contract', color: 'blue' },
                      { action: 'LIQUIDATION', fee: '100% LARRY burned', teamShare: '0%', protocolShare: 'SEI retained', purpose: 'Deflationary burn + backing', color: 'red' },
                      { action: 'WHITELISTED', fee: '0%', teamShare: '0%', protocolShare: '0%', purpose: 'Fee-free arbitrage execution', color: 'purple' }
                    ].map((item, index) => (
                      <div key={index} className={`bg-gray-900/50 border border-${item.color}-500/30 rounded-lg p-4 relative overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent`}></div>
                        <div className="relative z-10">
                          <div className={`text-${item.color}-400 font-mono font-bold mb-3 text-center`}>{item.action}</div>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-400">FEE:</span>
                              <span className="text-green-400">{item.fee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">TEAM_SHARE:</span>
                              <span className="text-blue-400">{item.teamShare}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">PROTOCOL_SHARE:</span>
                              <span className="text-purple-400">{item.protocolShare}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">PURPOSE:</span>
                              <span className="text-yellow-400">{item.purpose}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table Layout */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-700 rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-700 p-3 sm:p-4 text-red-400 text-left font-mono font-bold text-xs sm:text-sm">ACTION</th>
                          <th className="border border-gray-700 p-3 sm:p-4 text-red-400 text-left font-mono font-bold text-xs sm:text-sm">FEE</th>
                          <th className="border border-gray-700 p-3 sm:p-4 text-red-400 text-left font-mono font-bold text-xs sm:text-sm">TEAM_SHARE</th>
                          <th className="border border-gray-700 p-3 sm:p-4 text-red-400 text-left font-mono font-bold text-xs sm:text-sm">PROTOCOL_SHARE</th>
                          <th className="border border-gray-700 p-3 sm:p-4 text-red-400 text-left font-mono font-bold text-xs sm:text-sm">PURPOSE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-800/50 transition-colors">
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-green-400">BUY/SELL</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-blue-400">0.1%</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-purple-400">~0.05%</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-yellow-400">~0.05%</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-gray-300">DEX LP incentives</td>
                        </tr>
                        <tr className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-blue-400">BORROW</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-green-400">~3.9% APR + fees</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-red-400">~30%</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-purple-400">~70%</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-gray-300">Interest stays in contract</td>
                        </tr>
                        <tr className="hover:bg-gray-800/50 transition-colors">
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-red-400">LIQUIDATION</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-yellow-400">100% LARRY burned</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-green-400">0%</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-blue-400">SEI retained</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-gray-300">Deflationary burn + backing strength</td>
                        </tr>
                        <tr className="bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-purple-400">WHITELISTED</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-green-400">0%</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-blue-400">0%</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-red-400">0%</td>
                          <td className="border border-gray-700 p-3 sm:p-4 font-mono text-gray-300">Fee-free arbitrage execution</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur border border-red-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <span className="text-red-400 font-mono font-bold mr-2">λ</span>
                        <span className="text-yellow-400 font-mono text-sm">INCENTIVE_DISTRIBUTION_ALGORITHM</span>
                      </div>
                      <p className="text-gray-300 font-mono text-sm">
                        <span className="text-red-400 font-semibold">[BTB_FINANCE]</span> uses collected fees to{' '}
                        <span className="text-blue-400 font-semibold">incentivize_liquidity_providers</span> on{' '}
                        <span className="text-green-400 font-semibold">[YAKA_SWAP]</span> and{' '}
                        <span className="text-purple-400 font-semibold">[DRAGON_SWAP]</span> for USDC/LARRY pools.
                        This creates <span className="text-yellow-400">deeper_liquidity</span> and <span className="text-green-400">optimal_trading_conditions</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Arbitrage Strategy Section */}
            <section className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-yellow-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-green-400 mb-6 flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-yellow-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <span className="text-black font-mono font-bold text-sm sm:text-lg relative z-10">∞</span>
                  </div>
                  <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                    VOLATILITY_ENGINE
                  </span>
                </h2>
              
                <div className="space-y-6 text-gray-300 font-mono text-sm sm:text-base">
                  <div className="bg-black/30 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <span className="text-green-400 font-bold mr-2">λ</span>
                      <span className="text-yellow-400">ARBITRAGE_EXECUTION_ENGINE</span>
                    </div>
                    <p className="text-gray-300">
                      <span className="text-green-400 font-semibold">[BTB_FINANCE]</span> maintains{' '}
                      <span className="text-blue-400 font-semibold">whitelisted_addresses</span> that trade{' '}
                      <span className="text-red-400 font-semibold">fee_free</span>, allowing for <span className="text-purple-400">optimal_arbitrage_execution</span>. This creates:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: '⚡', title: 'INSTANT_ARBITRAGE', desc: 'When price opportunities arise', color: 'yellow' },
                      { icon: '💹', title: 'VOLATILITY_REWARDS', desc: 'More trading = more fees', color: 'blue' },
                      { icon: '🧪', title: 'LP_ENHANCEMENT', desc: 'On Yaka and Dragon Swap', color: 'purple' }
                    ].map((item, index) => (
                      <div key={index} className={`bg-gray-900/50 border border-${item.color}-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent`}></div>
                        <div className="relative z-10 text-center">
                          <div className="text-2xl mb-3">{item.icon}</div>
                          <h3 className={`text-${item.color}-400 font-mono font-bold text-xs sm:text-sm mb-2`}>{item.title}</h3>
                          <p className="text-gray-300 text-xs sm:text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <span className="text-green-400 font-mono font-bold mr-2">∂</span>
                        <h4 className="text-green-400 font-mono font-bold text-sm">VOLATILITY_FEEDBACK_LOOP</h4>
                      </div>
                      <div className="space-y-3">
                        {[
                          { icon: '→', text: 'More trading opportunities emerge', color: 'green' },
                          { icon: '→', text: 'Whitelisted addresses capture arbitrage first', color: 'blue' },
                          { icon: '→', text: 'Enhanced fees flow to liquidity providers', color: 'purple' },
                          { icon: '→', text: 'Price stability through efficient arbitrage', color: 'red' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <span className={`text-${item.color}-400 font-bold mr-3 mt-1`}>{item.icon}</span>
                            <span className={`text-${item.color}-400 font-mono text-sm`}>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 border border-yellow-500/20 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-yellow-400 font-mono font-bold mr-2">∞</span>
                      <span className="text-blue-400 font-mono text-sm">FEEDBACK_LOOP_ENGINE</span>
                    </div>
                    <p className="text-gray-300 font-mono text-sm">
                      This is a <span className="text-yellow-400 font-semibold">mathematically_profitable_flywheel</span> of{' '}
                      <span className="text-red-400">volatility</span> → <span className="text-blue-400">arbitrage</span> → <span className="text-green-400">fees</span> → <span className="text-purple-400">LP_rewards</span> → <span className="text-green-400">repeat</span> 🔄
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Who Should Use LARRY Section */}
            <section className="bg-gray-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-purple-400 mb-6 flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <span className="text-black font-mono font-bold text-sm sm:text-lg relative z-10">λ</span>
                  </div>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    TARGET_USERS_PROTOCOL
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: '🧑‍🌾', title: 'LIQUIDITY_PROVIDERS', desc: 'Earn boosted APR from YAKA votes', color: 'green' },
                    { icon: '💹', title: 'MATHEMATICAL_TRADERS', desc: 'Accumulate LARRY early, benefit from price rise', color: 'blue' },
                    { icon: '🧪', title: 'RECURSIVE_LOOPERS', desc: 'Use LARRY to safely leverage SEI over time', color: 'purple' },
                    { icon: '🧰', title: 'PROTOCOL_INTEGRATORS', desc: 'Use LARRY as a backed, deflationary, price-positive asset', color: 'red' }
                  ].map((item, index) => (
                    <div key={index} className={`bg-gray-900/50 border border-${item.color}-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent`}></div>
                      <div className="relative z-10">
                        <h3 className={`text-${item.color}-400 font-mono font-bold text-sm mb-3 flex items-center`}>
                          <span className="mr-3 text-xl">{item.icon}</span>
                          {item.title}
                        </h3>
                        <p className="text-gray-300 font-mono text-xs sm:text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Built for SEI Section */}
            <section className="bg-gray-900/50 backdrop-blur border border-blue-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-blue-400 mb-6 flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <span className="text-black font-mono font-bold text-sm sm:text-lg relative z-10">∆</span>
                  </div>
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    SEI_OPTIMIZATION_LAYER
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'ULTRA_LOW_GAS_FEES', desc: 'Perfect for recursive looping and arbitrage', color: 'green', icon: '⚡' },
                    { title: 'INSTANT_FINALITY', desc: 'Safe liquidations and MEV capture', color: 'blue', icon: '⚡' },
                    { title: 'DUAL_DEX_INCENTIVES', desc: 'Yaka Swap + Dragon Swap LP rewards', color: 'purple', icon: '🔗' },
                    { title: 'WHITELISTED_ARBITRAGE', desc: 'Fee-free trading for optimal execution', color: 'red', icon: '∞' }
                  ].map((item, index) => (
                    <div key={index} className={`bg-gray-900/50 border border-${item.color}-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent`}></div>
                      <div className="relative z-10">
                        <h3 className={`text-${item.color}-400 font-mono font-bold text-sm mb-2 flex items-center`}>
                          <span className="mr-2">{item.icon}</span>
                          {item.title}
                        </h3>
                        <p className="text-gray-300 font-mono text-xs sm:text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Smart Contract Features */}
            <section className="bg-gray-900/50 backdrop-blur border border-indigo-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-indigo-400 mb-6 flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-400 to-violet-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <span className="text-black font-mono font-bold text-sm sm:text-lg relative z-10">∮</span>
                  </div>
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    SMART_CONTRACT_ARCHITECTURE
                  </span>
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: '🏷️', title: 'WHITELISTED_ADDRESSES', desc: 'Fee-free trading for BTB arbitrage operations', color: 'green' },
                      { icon: '🔒', title: 'SUPPLY_CAP_LIMIT', desc: '1 billion LARRY tokens maximum supply', color: 'blue' },
                      { icon: '💰', title: 'DYNAMIC_PRICING_ENGINE', desc: 'Price = (Contract Balance + Total Borrowed) / Total Supply', color: 'purple' },
                      { icon: '🔥', title: 'AUTO_LIQUIDATION_SYSTEM', desc: 'Daily liquidation at midnight UTC burns expired collateral', color: 'red' }
                    ].map((item, index) => (
                      <div key={index} className={`bg-gray-900/50 border border-${item.color}-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent`}></div>
                        <div className="relative z-10">
                          <h3 className={`text-${item.color}-400 font-mono font-bold text-sm mb-2 flex items-center`}>
                            <span className="mr-3">{item.icon}</span>
                            {item.title}
                          </h3>
                          <p className="text-gray-300 font-mono text-xs sm:text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur border border-indigo-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <span className="text-indigo-400 font-mono font-bold mr-2">∮</span>
                        <h4 className="text-indigo-400 font-mono font-bold text-sm">CORE_MECHANISM_ANALYSIS</h4>
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: 'SAFETY_CHECKS', desc: 'Price cannot decrease by more than 10,000 wei per transaction', color: 'red', icon: '⚠️' },
                          { label: 'LEVERAGE_OPTIONS', desc: 'Up to 99% LTV with 365-day maximum duration', color: 'blue', icon: '⚡' },
                          { label: 'FLASH_CLOSE', desc: 'Instant position closure with 1% fee', color: 'green', icon: '⚡' },
                          { label: 'FEE_DISTRIBUTION', desc: '~30% to BTB Finance, ~70% stays in contract', color: 'yellow', icon: '💰' },
                          { label: 'COLLATERAL_MANAGEMENT', desc: 'Contract holds all borrowed LARRY as collateral', color: 'purple', icon: '🔒' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start">
                            <span className={`text-${item.color}-400 mr-3 mt-1`}>{item.icon}</span>
                            <span className="text-gray-300 font-mono text-sm">
                              <span className={`text-${item.color}-400 font-semibold`}>{item.label}:</span> {item.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-xl p-4 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-green-400 mb-6 flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-pulse"></div>
                    <span className="text-black font-mono font-bold text-sm sm:text-lg relative z-10">∫</span>
                  </div>
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    PROTOCOL_SUMMARY_MATRIX
                  </span>
                </h2>

                <div className="space-y-6">
                  {/* Mobile Card Layout for Summary Table */}
                  <div className="block sm:hidden space-y-4">
                    {[
                      { feature: 'BACKED_BY', value: '[SEI_ASSET]', icon: '🔗', color: 'green' },
                      { feature: 'LOOPS_SUPPORTED', value: 'ENABLED (BUY→BORROW→BUY)', icon: '🔄', color: 'blue' },
                      { feature: 'DEFLATIONARY_SUPPLY', value: 'ACTIVE (DAILY_BURNS)', icon: '📉', color: 'red' },
                      { feature: 'LIQUIDITY_INCENTIVES', value: 'YAKA_VOTES_ENABLED', icon: '💧', color: 'purple' },
                      { feature: 'FEE_USAGE', value: 'DEX_LP_REWARDS', icon: '💰', color: 'yellow' },
                      { feature: 'PRICE_MECHANISM', value: 'MONOTONIC_INCREASING', icon: '📈', color: 'green' },
                      { feature: 'BUILT_ON', value: '[SEI_PROTOCOL]', icon: '⚙️', color: 'blue' },
                      { feature: 'OWNED_BY', value: '[BTB_FINANCE]', icon: '🏛️', color: 'purple' }
                    ].map((item, index) => (
                      <div key={index} className={`bg-gray-900/50 border border-${item.color}-500/30 rounded-lg p-4 relative overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent`}></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-${item.color}-400 font-mono font-bold text-sm`}>{item.feature}</span>
                            <span className="text-lg">{item.icon}</span>
                          </div>
                          <div className={`text-${item.color}-400 font-mono text-sm`}>{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table Layout */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-700 rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-700 p-3 sm:p-4 text-green-400 text-left font-mono font-bold text-xs sm:text-sm">FEATURE</th>
                          <th className="border border-gray-700 p-3 sm:p-4 text-green-400 text-left font-mono font-bold text-xs sm:text-sm">LARRY_PROTOCOL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { feature: 'BACKED_BY', value: '[SEI_ASSET]', color: 'green' },
                          { feature: 'LOOPS_SUPPORTED', value: 'ENABLED (BUY→BORROW→BUY)', color: 'blue' },
                          { feature: 'DEFLATIONARY_SUPPLY', value: 'ACTIVE (DAILY_BURNS)', color: 'red' },
                          { feature: 'LIQUIDITY_INCENTIVES', value: 'YAKA_VOTES_ENABLED', color: 'purple' },
                          { feature: 'FEE_USAGE', value: 'DEX_LP_REWARDS', color: 'yellow' },
                          { feature: 'PRICE_MECHANISM', value: 'MONOTONIC_INCREASING', color: 'green' },
                          { feature: 'BUILT_ON', value: '[SEI_PROTOCOL]', color: 'blue' },
                          { feature: 'OWNED_BY', value: '[BTB_FINANCE]', color: 'purple' }
                        ].map((item, index) => (
                          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-800/30' : ''} hover:bg-gray-800/50 transition-colors`}>
                            <td className="border border-gray-700 p-3 sm:p-4 text-gray-300 font-mono text-sm">{item.feature}</td>
                            <td className={`border border-gray-700 p-3 sm:p-4 text-${item.color}-400 font-mono font-bold text-sm`}>{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-black/30 border border-green-500/20 rounded-lg p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-green-400 font-mono font-bold mr-2">∞</span>
                      <span className="text-blue-400 font-mono text-sm">QUANTUM_LIQUIDITY_ENGINE</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-mono font-bold text-green-400 mb-2">
                      LARRY ≠ TOKEN
                    </p>
                    <p className="text-lg sm:text-xl text-gray-300 font-mono">
                      LARRY = <span className="text-green-400">BACKED</span> + <span className="text-blue-400">DEFLATIONARY</span> + <span className="text-purple-400">LOOPABLE</span> + <span className="text-red-400">SEI_OPTIMIZED</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <section className="bg-gray-900/50 backdrop-blur border border-green-500/30 rounded-xl p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5"></div>
              <div className="relative z-10">
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <a
                      href="https://t.me/btbfinance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-green-400 transition-colors font-mono text-sm flex items-center space-x-2"
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
                      className="text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>@btb_finance</span>
                    </a>
                  </div>

                  <div className="bg-black/30 border border-green-500/20 rounded-lg p-6">
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-green-400 font-mono font-bold mr-2">λ</span>
                      <span className="text-blue-400 font-mono text-sm">VOLATILITY_LIQUIDITY_ENGINE</span>
                    </div>
                    <p className="text-gray-300 font-mono text-center text-sm sm:text-base">
                      [LARRY_PROTOCOL] by [BTB_FINANCE] - The <span className="text-red-400">mathematically_optimized</span> <span className="text-purple-400">liquidity_machine</span> on <span className="text-green-400">[SEI_NETWORK]</span>
                    </p>
                  </div>

                  <div className="text-center">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center bg-gradient-to-r from-green-400 to-blue-600 text-black px-6 sm:px-8 py-4 rounded-lg font-mono font-bold hover:from-green-500 hover:to-blue-700 transition-all transform hover:scale-105 text-sm sm:text-base"
                    >
                      <span className="mr-2">▶</span>
                      INITIATE_TRADING_SEQUENCE
                      <span className="ml-2">▶</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/30 backdrop-blur-md px-4 sm:px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-pulse"></div>
                <span className="text-black font-mono font-bold text-sm relative z-10">λ</span>
              </div>
              <span className="text-gray-400 font-mono text-sm">© 2025 QUANTUM_PROTOCOL_ANALYSIS</span>
            </div>

            <div className="flex items-center space-x-6">
              <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span>@btbfinance</span>
              </a>
              <a href="https://x.com/btb_finance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors font-mono text-sm flex items-center space-x-2">
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