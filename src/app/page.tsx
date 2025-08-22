'use client';

import Link from 'next/link';
import MobileConnectButton from '@/components/MobileConnectButton';
import { useState, useEffect } from 'react';
import { useLarryContract } from '@/hooks/useLarryContract';
import { formatEther } from 'viem';
import { VideoLogo } from '@/components/VideoLogo';

// Mathematical symbols for visual elements
const MATH_SYMBOLS = ['∑', '∫', '∂', '∇', '∞', '∮', '∯', '∱', '∲', '∴', '∵', '⊥', '∥', '∦', '≅', '≈', '≠', '≤', '≥', '⊂', '⊃', '⊆', '⊇', '∈', '∉', '∋', '∌', '⊕', '⊗', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '∧', '∨', '¬', '∀', '∃', '∄', '∅', '∆', '∇', '∈', '∉', '∋', '∌', '⊂', '⊃', '⊄', '⊅', '⊆', '⊇', '⊈', '⊉', '⊊', '⊋', '∩', '∪', '∧', '∨', '∩', '∪', '∧', '∨', '∩', '∪'];

export default function Home() {
  const { currentPrice, buyFeePercent, backing } = useLarryContract();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-black text-white overflow-hidden ${glitchActive ? 'animate-pulse' : ''}`}>
      {/* Cyberpunk Matrix Background */}
      <div className="fixed inset-0 z-0">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Scan lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" style={{animationDuration: '3s', animationIterationCount: 'infinite'}}></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" style={{animationDelay: '1s', animationDuration: '4s', animationIterationCount: 'infinite'}}></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{animationDelay: '2s', animationDuration: '3.5s', animationIterationCount: 'infinite'}}></div>
        </div>

        {/* Mathematical symbols floating */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-lg animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            >
              {MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)]}
            </div>
          ))}
        </div>

        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>

        {/* Radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_#1a0033_0%,_transparent_50%),radial-gradient(circle_at_70%_80%,_#330033_0%,_transparent_50%),radial-gradient(circle_at_50%_50%,_#000033_0%,_transparent_50%)]"></div>
      </div>

      {/* Cyberpunk Header */}
      <nav className="relative z-10 border-b border-red-500/30 bg-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center p-6 lg:px-12">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
            <VideoLogo size="medium" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight font-mono text-white">LARRY</span>
              <span className="text-xs font-mono text-red-400">Δ-Protocol</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <span className="text-green-400 font-mono font-medium text-sm">[HOME]</span>
            <Link href="/docs" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">DOCS.exe</Link>
            <Link href="/veyaka" className="text-gray-400 hover:text-purple-400 transition-colors font-mono text-sm">VEYAKA.sys</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-red-400 transition-colors font-mono text-sm">TRADE.λ</Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <MobileConnectButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-lg bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 font-mono text-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-red-500/30">
            <div className="px-6 py-4 space-y-4">
              <span className="block text-green-400 font-mono font-medium py-2 text-sm">[HOME]</span>
              <Link
                href="/docs"
                className="block text-gray-400 hover:text-green-400 transition-colors font-mono py-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                DOCS.exe
              </Link>
              <Link
                href="/veyaka"
                className="block text-gray-400 hover:text-purple-400 transition-colors font-mono py-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                VEYAKA.sys
              </Link>
              <Link
                href="/dashboard"
                className="block text-gray-400 hover:text-red-400 transition-colors font-mono py-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                TRADE.λ
              </Link>
              <div className="pt-4 border-t border-red-500/30">
                <MobileConnectButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hacker Hero Section */}
        <section className="px-6 lg:px-12 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Status indicator with mathematical flair */}
                  <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg px-4 py-2 border border-red-500/30 backdrop-blur-sm">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-mono text-red-400">SEI_NETWORK::ACTIVE</span>
                    <span className="ml-2 text-green-400">∫dx</span>
                  </div>

                  {/* Glitch effect title */}
                  <div className={`transition-all duration-200 ${glitchActive ? 'animate-pulse text-red-400' : ''}`}>
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-mono">
                      <span className="text-white">Δ-PROTOCOL </span>
                      <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                        MATRIX
                      </span>
                    </h1>
                  </div>

                  <div className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl space-y-4 font-mono">
                    <p className="border-l-4 border-green-400 pl-4 bg-green-400/5">
                      <span className="text-green-400">∇ PRICE_GUARANTEE</span>: f&apos;(x) &gt; 0 | Mathematically enforced upward trajectory
                    </p>
                    <p className="border-l-4 border-blue-400 pl-4 bg-blue-400/5">
                      <span className="text-blue-400">∞ LEVERAGE_ENGINE</span>: 1 SEI &rarr; 100 SEI through recursive mathematical operations
                    </p>
                    <p className="border-l-4 border-purple-400 pl-4 bg-purple-400/5">
                      <span className="text-purple-400">λ RECURSIVE_ALGORITHM</span>: f(f(x)) | Infinite stacking with 99% LTV ratio
                    </p>
                    <p className="border-l-4 border-red-400 pl-4 bg-red-400/5">
                      <span className="text-red-400">Δ TIME_BASED_LOANS</span>: No liquidation risk, pure mathematical time constraints
                    </p>
                  </div>
                </div>

                {/* Cyberpunk buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-purple-600 text-white px-8 py-4 rounded-lg font-mono font-bold hover:from-red-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 border border-red-500/30 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10">EXECUTE_PROTOCOL</span>
                    <svg className="ml-2 w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>

                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center border border-green-500/30 px-8 py-4 rounded-lg font-mono font-semibold hover:bg-green-500/10 transition-all duration-300 backdrop-blur-sm text-green-400 hover:text-green-300"
                  >
                    <span className="mr-2">∫</span>
                    READ_DOCS
                    <span className="ml-2">dx</span>
                  </Link>
                </div>
              </div>

              {/* Cyberpunk Stats Terminal */}
              <div className="space-y-6">
                <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl p-8 relative overflow-hidden">
                  {/* Terminal header */}
                  <div className="flex items-center justify-between mb-6 border-b border-red-500/30 pb-2">
                    <h3 className="text-lg font-mono font-bold text-red-400">TERMINAL::METRICS</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Scan line effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent translate-x-[-100%] animate-pulse"></div>

                  <div className="grid grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-2 bg-gray-900/30 rounded-lg p-4 border border-gray-700/30">
                      <div className="text-2xl font-mono font-bold text-green-400">
                        {currentPrice ? `${currentPrice.toFixed(2)}` : '0.00'}
                      </div>
                      <div className="text-xs font-mono text-gray-400">LARRY/SEI::PRICE</div>
                    </div>

                    <div className="space-y-2 bg-gray-900/30 rounded-lg p-4 border border-gray-700/30">
                      <div className="text-2xl font-mono font-bold text-blue-400">
                        {backing ? `${parseFloat(formatEther(backing as bigint)).toFixed(2)}` : '0.00'}
                      </div>
                      <div className="text-xs font-mono text-gray-400">SEI::LOCKED</div>
                    </div>

                    <div className="space-y-2 bg-gray-900/30 rounded-lg p-4 border border-gray-700/30">
                      <div className="text-2xl font-mono font-bold text-purple-400">1B</div>
                      <div className="text-xs font-mono text-gray-400">MAX_SUPPLY::∞</div>
                    </div>

                    <div className="space-y-2 bg-gray-900/30 rounded-lg p-4 border border-gray-700/30">
                      <div className="text-2xl font-mono font-bold text-red-400">{buyFeePercent}%</div>
                      <div className="text-xs font-mono text-gray-400">PROTOCOL_FEE::Δ</div>
                    </div>
                  </div>
                </div>

                {/* Cyberpunk Command Interface */}
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-lg p-4 hover:from-blue-900/30 hover:to-cyan-900/30 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                          <span className="text-blue-400 font-mono font-bold">∞</span>
                        </div>
                        <div>
                          <div className="text-sm font-mono font-medium text-blue-400">LEVERAGE_LOOP.exe</div>
                          <div className="text-xs font-mono text-gray-400">20x exposure | 500 SEI → 10K SEI</div>
                        </div>
                      </div>
                      <div className="text-green-400 text-sm font-mono">[ACTIVE]</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-4 hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                          <span className="text-purple-400 font-mono font-bold">Δ</span>
                        </div>
                        <div>
                          <div className="text-sm font-mono font-medium text-purple-400">GOVERNANCE_VOTE.sys</div>
                          <div className="text-xs font-mono text-gray-400">Direct emissions | Auto-optimized</div>
                        </div>
                      </div>
                      <div className="text-yellow-400 text-sm font-mono">[AUTO]</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cyberpunk Algorithm Section */}
        <section className="px-6 lg:px-12 py-20 border-t border-red-500/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg px-6 py-2 border border-red-500/30 mb-6">
                <span className="text-red-400 font-mono text-sm mr-2">ALGORITHM::</span>
                <span className="text-white font-mono">INFINITE_LOOP</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-mono mb-6">
                <span className="text-white">∞ </span>
                <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  LEVERAGE_MATRIX
                </span>
              </h2>
              <p className="text-xl text-gray-300 font-mono">Transform 1 SEI → 100 SEI through recursive mathematical operations</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Algorithm Steps */}
              <div className="space-y-6">
                <div className="bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-blue-500/30 pb-2">
                    <span className="text-blue-400 font-mono font-bold text-lg mr-2">λ</span>
                    <h3 className="text-xl font-mono font-bold text-blue-400">RECURSIVE_ALGORITHM</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { step: "01", action: "INITIALIZE_POSITION", detail: "Deploy SEI capital to genesis position", color: "text-green-400" },
                      { step: "02", action: "BORROW_MAX_LTV", detail: "Extract 99% collateral value in SEI", color: "text-blue-400" },
                      { step: "03", action: "REINVEST_COLLATERAL", detail: "Deploy borrowed SEI into LARRY tokens", color: "text-purple-400" },
                      { step: "04", action: "RECURSE_INFINITELY", detail: "Repeat algorithm until target leverage achieved", color: "text-red-400" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-900/30 to-gray-800/30 rounded-lg border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300">
                        <div className={`w-12 h-12 ${item.color.replace('text-', 'bg-').replace('400', '500/20')} rounded-lg flex items-center justify-center border border-current font-mono font-bold text-sm`}>
                          {item.step}
                        </div>
                        <div>
                          <p className={`text-white font-mono font-semibold text-sm ${item.color}`}>{item.action}</p>
                          <p className="text-gray-400 text-xs font-mono">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

                              {/* Right: Mathematical Benefits */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-green-500/30 pb-2">
                    <span className="text-green-400 font-mono font-bold text-lg mr-2">Δ</span>
                    <h3 className="text-xl font-mono font-bold text-green-400">MATHEMATICAL_ADVANTAGES</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { symbol: "∇", title: "MONOTONIC_FUNCTION", desc: "f'(x) > 0 | Prices mathematically guaranteed to increase", color: "text-green-400" },
                      { symbol: "∪", title: "MAXIMUM_LEVERAGE", desc: "LTV = 99% | Highest ratio in decentralized mathematics", color: "text-blue-400" },
                      { symbol: "∞", title: "NO_LIQUIDATION", desc: "Time-based constraints | Price-independent stability", color: "text-purple-400" },
                      { symbol: "∑", title: "INFINITE_RECURSION", desc: "Recursive loops | Exponential position growth", color: "text-red-400" },
                      { symbol: "λ", title: "RECURSIVE_BORROWING", desc: "f(f(x)) | Stack leverage infinitely through mathematical recursion", color: "text-yellow-400" },
                      { symbol: "∂", title: "PARTIAL_COLLATERAL", desc: "99% borrowable | Keep 1% for infinite loops", color: "text-cyan-400" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 bg-gray-900/30 rounded-lg hover:bg-gray-800/30 transition-all duration-300">
                        <span className={`text-2xl font-bold ${item.color}`}>{item.symbol}</span>
                        <div>
                          <p className={`text-white font-mono font-semibold text-sm ${item.color}`}>{item.title}</p>
                          <p className="text-gray-300 text-xs font-mono mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Terminal */}
                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-mono font-bold text-red-400 mb-3">EXECUTE_ALGORITHM?</h4>
                    <p className="text-gray-300 mb-6 font-mono text-sm">Initialize recursive leverage protocol</p>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-mono font-bold hover:from-red-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 border border-red-500/30 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <span className="relative z-10">START_RECURSION</span>
                      <svg className="ml-2 w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Price Protection & Leverage Showcase */}
        <section className="px-6 lg:px-12 py-20 border-t border-red-500/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg px-6 py-2 border border-red-500/30 mb-6">
                <span className="text-red-400 font-mono text-sm mr-2">CORE::</span>
                <span className="text-white font-mono">PRICE_PROTECTION</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-mono mb-6">
                <span className="text-white">f(x) = </span>
                <span className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                  x + Δx
                </span>
              </h2>
              <p className="text-xl text-gray-300 font-mono max-w-3xl mx-auto">
                The fundamental mathematical principle: <span className="text-green-400">prices only increase</span>, creating the perfect foundation for infinite leverage strategies.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Price Protection Analysis */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-green-500/30 pb-2">
                    <span className="text-green-400 font-mono font-bold text-xl mr-2">∇</span>
                    <h3 className="text-xl font-mono font-bold text-green-400">PRICE_MONOTONICITY</h3>
                  </div>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">SAFETY_CONSTRAINT::</div>
                      <div className="text-gray-300">lastPrice ≤ newPrice + 10000</div>
                      <div className="text-xs text-gray-400 mt-1">Mathematical guarantee of upward trajectory</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">BACKING_MECHANISM::</div>
                      <div className="text-gray-300">getBacking() = contract_balance + totalBorrowed</div>
                      <div className="text-xs text-gray-400 mt-1">Self-reinforcing value accumulation</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">PRICE_CALCULATION::</div>
                      <div className="text-gray-300">price = (backing × 10^18) ÷ totalSupply</div>
                      <div className="text-xs text-gray-400 mt-1">Deterministic upward price movement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leverage Mechanics Deep Dive */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-blue-500/30 pb-2">
                    <span className="text-blue-400 font-mono font-bold text-xl mr-2">∞</span>
                    <h3 className="text-xl font-mono font-bold text-blue-400">LEVERAGE_ALGORITHMS</h3>
                  </div>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">COLLATERAL_RATIO::</div>
                      <div className="text-gray-300">LTV = 99% | borrowAmount = collateral × 0.99</div>
                      <div className="text-xs text-gray-400 mt-1">Maximum leverage efficiency</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">RECURSIVE_FUNCTION::</div>
                      <div className="text-gray-300">f(x) = x + f(borrow(x)) | Infinite stacking</div>
                      <div className="text-xs text-gray-400 mt-1">Mathematical leverage recursion</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">TIME_BASED_LOANS::</div>
                      <div className="text-gray-300">loanEndDate = startTime + (days × 86400)</div>
                      <div className="text-xs text-gray-400 mt-1">No liquidation risk, pure time-based</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">INTEREST_CALCULATION::</div>
                      <div className="text-gray-300">interest = (0.039e18 × days) ÷ 365 + 0.001e18</div>
                      <div className="text-xs text-gray-400 mt-1">3.9% APR with precision mathematics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Leverage Calculator Simulation */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-mono font-bold text-purple-400 mb-2">LEVERAGE_SIMULATION</h3>
                <p className="text-gray-300 font-mono text-sm">Mathematical projection of recursive leverage growth</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-3xl font-mono font-bold text-green-400 mb-2">1 SEI</div>
                  <div className="text-sm font-mono text-gray-400">INITIAL_INVESTMENT</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">Starting capital</div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-3xl font-mono font-bold text-blue-400 mb-2">99 SEI</div>
                  <div className="text-sm font-mono text-gray-400">FIRST_BORROW</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">99% of collateral value</div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-3xl font-mono font-bold text-red-400 mb-2">∞ SEI</div>
                  <div className="text-sm font-mono text-gray-400">THEORETICAL_MAX</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">Infinite recursive loops</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-lg px-6 py-3 border border-red-500/30">
                  <span className="text-red-400 font-mono text-sm mr-3">CALCULATION:</span>
                  <span className="text-white font-mono">1 → 99 → 9801 → 970299 → ∞</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cyberpunk Protocol Matrix */}
        <section className="px-6 lg:px-12 py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg px-6 py-2 border border-purple-500/30 mb-6">
                <span className="text-purple-400 font-mono text-sm mr-2">MATRIX::</span>
                <span className="text-white font-mono">PROTOCOL_ARCHITECTURE</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-mono mb-6">
                <span className="text-white">Δ-PROTOCOL </span>
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  MATRIX_SYSTEM
                </span>
              </h2>
              <p className="text-xl text-gray-300 font-mono max-w-3xl mx-auto">
                Self-reinforcing mathematical algorithms converting transaction entropy into structured liquidity across distributed networks.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Entropy Conversion */}
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/30 rounded-xl p-8 hover:from-green-900/30 hover:to-emerald-900/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 border border-green-400/30">
                    <span className="text-green-400 font-mono font-bold text-xl">∫</span>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-green-400 mb-4">ENTROPY_CONVERSION</h3>
                  <p className="text-gray-300 mb-6 font-mono text-sm">
                    Every transaction generates entropy, automatically converted to governance tokens maximizing voting weight in the protocol matrix.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-green-500/20">
                      <span className="text-gray-400 font-mono">TRANSACTION_FEE</span>
                      <span className="text-green-400 font-mono">{buyFeePercent}%</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400 font-mono">GOVERNANCE_POWER</span>
                      <span className="text-green-400 font-mono">MAXIMUM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recursive Leverage Engine */}
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/30 rounded-xl p-8 hover:from-blue-900/30 hover:to-cyan-900/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 border border-blue-400/30">
                    <span className="text-blue-400 font-mono font-bold text-xl">∞</span>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-blue-400 mb-4">RECURSIVE_ENGINE</h3>
                  <p className="text-gray-300 mb-6 font-mono text-sm">
                    Advanced recursive algorithms enable maximum leverage through time-based constraint systems with mathematical precision.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-blue-500/20">
                      <span className="text-gray-400 font-mono">MAX_LEVERAGE</span>
                      <span className="text-blue-400 font-mono">20x</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-blue-500/20">
                      <span className="text-gray-400 font-mono">COLLATERAL_RATIO</span>
                      <span className="text-blue-400 font-mono">99%</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400 font-mono">INTEREST_RATE</span>
                      <span className="text-blue-400 font-mono">3.9%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emission Control Matrix */}
              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-xl p-8 hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 border border-purple-400/30">
                    <span className="text-purple-400 font-mono font-bold text-xl">Δ</span>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-purple-400 mb-4">EMISSION_MATRIX</h3>
                  <p className="text-gray-300 mb-6 font-mono text-sm">
                    Accumulated mathematical power directs liquidity incentives to LARRY pools across all supported network topologies.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-purple-500/20">
                      <span className="text-gray-400 font-mono">VOTING_STRATEGY</span>
                      <span className="text-purple-400 font-mono">AUTOMATED</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400 font-mono">TARGET_POOLS</span>
                      <span className="text-purple-400 font-mono">LARRY/*</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cyberpunk Contract Database */}
        <section className="px-6 lg:px-12 py-20 border-t border-red-500/30">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl p-8 relative overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center justify-between mb-8 border-b border-red-500/30 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-red-400 font-mono font-bold text-xl">&gt;</span>
                  <h3 className="text-2xl font-mono font-bold text-red-400">CONTRACT_DATABASE</h3>
                </div>
                <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-lg border border-green-500/30">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-mono">VERIFIED::ACTIVE</span>
                </div>
              </div>

              {/* Scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent translate-x-[-100%] animate-pulse"></div>

              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">NETWORK::</span>
                    <span className="text-green-400 font-mono">SEI_BLOCKCHAIN</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">TOKEN_SYMBOL::</span>
                    <span className="text-blue-400 font-mono">LARRY</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">DECIMAL_PRECISION::</span>
                    <span className="text-purple-400 font-mono">18</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">MAX_SUPPLY::</span>
                    <span className="text-red-400 font-mono">1,000,000,000</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">COLLATERAL_RATIO::</span>
                    <span className="text-green-400 font-mono">99%</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">FEE_ALGORITHM::</span>
                    <span className="text-yellow-400 font-mono">{buyFeePercent}%→GOVERNANCE</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-600/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span className="text-gray-400 text-sm font-mono">CONTRACT_ADDRESS::BLOCKCHAIN</span>
                  <button className="text-gray-400 hover:text-green-400 text-sm font-mono transition-colors">COPY_HASH</button>
                </div>
                <div className="font-mono text-sm text-green-400 break-all bg-black/50 p-3 rounded border border-green-500/20 relative z-10">
                  0x888d81e3ea5E8362B5f69188CBCF34Fa8da4b888
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Cyberpunk Footer */}
      <footer className="relative z-10 border-t border-red-500/30 bg-black/80 backdrop-blur-md px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <VideoLogo size="small" />
              <div className="flex flex-col">
                <span className="text-gray-400 font-mono">© 2025 LARRY_PROTOCOL</span>
                <span className="text-xs text-red-400 font-mono">Δ-MATRIX_SYSTEM</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="https://discord.gg/bqFEPA56Tc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-all duration-300 transform hover:scale-110 font-mono text-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
              <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110 font-mono text-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://x.com/btb_finance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-all duration-300 transform hover:scale-110 font-mono text-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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