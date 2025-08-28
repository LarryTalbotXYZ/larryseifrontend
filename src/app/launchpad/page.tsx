'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MobileConnectButton from '@/components/MobileConnectButton';
import { VideoLogo } from '@/components/VideoLogo';

// Mathematical symbols for visual elements
const MATH_SYMBOLS = ['∑', '∫', '∂', '∇', '∞', '∮', '∯', '∱', '∲', '∴', '∵', '⊥', '∥', '∦', '≅', '≈', '≠', '≤', '≥', '⊂', '⊃', '⊆', '⊇', '∈', '∉', '∋', '∌', '⊕', '⊗', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '∧', '∨', '¬', '∀', '∃', '∄', '∅', '∆', '∇', '∈', '∉', '∋', '∌', '⊂', '⊃', '⊄', '⊅', '⊆', '⊇'];

export default function Launchpad() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 5000);
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
              <span className="text-xs font-mono text-red-400">LAUNCHPAD</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">HOME</Link>
            <Link href="/docs" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">DOCS.exe</Link>
            <Link href="/veyaka" className="text-gray-400 hover:text-purple-400 transition-colors font-mono text-sm">YAKA.sys</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-red-400 transition-colors font-mono text-sm">TRADE.λ</Link>
            <span className="text-yellow-400 font-mono font-medium text-sm">[LAUNCHPAD]</span>
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
              <Link
                href="/"
                className="block text-gray-400 hover:text-green-400 transition-colors font-mono py-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>
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
                YAKA.sys
              </Link>
              <Link
                href="/dashboard"
                className="block text-gray-400 hover:text-red-400 transition-colors font-mono py-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                TRADE.λ
              </Link>
              <span className="block text-yellow-400 font-mono font-medium py-2 text-sm">[LAUNCHPAD]</span>
              <div className="pt-4 border-t border-red-500/30">
                <MobileConnectButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 lg:px-12 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg px-6 py-2 border border-red-500/30 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-red-400 font-mono text-sm mr-2">LAUNCHPAD::</span>
                <span className="text-white font-mono">ACTIVE</span>
              </div>

              <div className={`transition-all duration-200 ${glitchActive ? 'animate-pulse text-red-400' : ''}`}>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-mono mb-6">
                  <span className="text-white">LAUNCH YOUR </span>
                  <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    TOKEN
                  </span>
                </h1>
              </div>

              <p className="text-xl text-gray-300 font-mono max-w-4xl mx-auto">
                Deploy your token on the LARRY Protocol and leverage the same mathematical principles that guarantee price growth. 
                Transform your project into a self-reinforcing value accumulation system.
              </p>
            </div>

            {/* Contract Info */}
            <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl p-8 mb-12">
              <div className="flex items-center justify-between mb-6 border-b border-red-500/30 pb-2">
                <h3 className="text-lg font-mono font-bold text-red-400">CONTRACT::SPECIFICATIONS</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">NETWORK::</span>
                    <span className="text-green-400 font-mono">SEI_BLOCKCHAIN</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">MAX_SUPPLY::</span>
                    <span className="text-red-400 font-mono">1,000,000,000</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">BACKING_TOKEN::</span>
                    <span className="text-blue-400 font-mono">LARRY</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">DECIMAL_PRECISION::</span>
                    <span className="text-purple-400 font-mono">18</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">COLLATERAL_RATIO::</span>
                    <span className="text-green-400 font-mono">99%</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-700/30 bg-gray-900/30 rounded-lg px-4">
                    <span className="text-gray-400 font-mono">LIQUIDITY_DEX::</span>
                    <span className="text-yellow-400 font-mono">YAKA_EXCHANGE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intrinsic Value Section */}
        <section className="px-6 lg:px-12 py-20 border-t border-red-500/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg px-6 py-2 border border-green-500/30 mb-6">
                <span className="text-green-400 font-mono text-sm mr-2">VALUE::</span>
                <span className="text-white font-mono">INTRINSIC_BACKING</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-mono mb-6">
                <span className="text-white">∇ </span>
                <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  INTRINSIC_VALUE
                </span>
              </h2>
              <p className="text-xl text-gray-300 font-mono max-w-4xl mx-auto">
                Each token is backed by LARRY tokens deposited into the protocol's smart contract. 
                This pool of LARRY ensures every token is secured by real, liquid value.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Backing Mechanism */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-green-500/30 pb-2">
                    <span className="text-green-400 font-mono font-bold text-xl mr-2">∑</span>
                    <h3 className="text-xl font-mono font-bold text-green-400">BACKING_MECHANISM</h3>
                  </div>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">COLLATERAL_POOL::</div>
                      <div className="text-gray-300">backing = contract_balance + totalBorrowed</div>
                      <div className="text-xs text-gray-400 mt-1">LARRY tokens deposited for token backing</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">PRICE_FLOOR::</div>
                      <div className="text-gray-300">price = (backing × 10^18) ÷ totalSupply</div>
                      <div className="text-xs text-gray-400 mt-1">Mathematical guarantee of intrinsic value</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">BURNING_MECHANISM::</div>
                      <div className="text-gray-300">Fees + liquidations → ratio(LARRY/TOKEN) ↑</div>
                      <div className="text-xs text-gray-400 mt-1">Only increases, never decreases backing ratio</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Liquidity & DEX Integration */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-blue-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-blue-500/30 pb-2">
                    <span className="text-blue-400 font-mono font-bold text-xl mr-2">∞</span>
                    <h3 className="text-xl font-mono font-bold text-blue-400">LIQUIDITY_SYSTEM</h3>
                  </div>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">DEX_INTEGRATION::</div>
                      <div className="text-gray-300">YAKA Exchange listing for market trading</div>
                      <div className="text-xs text-gray-400 mt-1">Independent market price discovery</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">ARBITRAGE_OPPORTUNITY::</div>
                      <div className="text-gray-300">Contract price vs DEX price discrepancies</div>
                      <div className="text-xs text-gray-400 mt-1">Profit from price inefficiencies</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">INCENTIVIZED_LIQUIDITY::</div>
                      <div className="text-gray-300">Protocol revenue → YAKA voting bribes</div>
                      <div className="text-xs text-gray-400 mt-1">Sustainable liquidity incentives</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Flow Diagram */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-mono font-bold text-purple-400 mb-2">VALUE_FLOW_ALGORITHM</h3>
                <p className="text-gray-300 font-mono text-sm">Mathematical value accumulation through fee mechanisms</p>
              </div>

              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-2xl font-mono font-bold text-green-400 mb-2">USER</div>
                  <div className="text-sm font-mono text-gray-400">DEPOSITS</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">1.025 LARRY</div>
                  <div className="mt-4 text-purple-400">↓</div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-2xl font-mono font-bold text-blue-400 mb-2">CONTRACT</div>
                  <div className="text-sm font-mono text-gray-400">BACKING</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">+1.0175 LARRY (70% fee)</div>
                  <div className="mt-4 text-purple-400">↓</div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-2xl font-mono font-bold text-yellow-400 mb-2">MINT</div>
                  <div className="text-sm font-mono text-gray-400">TOKEN</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">1 TOKEN</div>
                  <div className="mt-4 text-purple-400">↓</div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-2xl font-mono font-bold text-red-400 mb-2">PRICE</div>
                  <div className="text-sm font-mono text-gray-400">INCREASE</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">∀ tokens</div>
                  <div className="mt-4 text-green-400">✓</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-lg px-6 py-3 border border-red-500/30">
                  <span className="text-red-400 font-mono text-sm mr-3">FORMULA:</span>
                  <span className="text-white font-mono">newPrice = (backing + 70% fee) ÷ (supply + 1)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Minting & Redeeming Section */}
        <section className="px-6 lg:px-12 py-20 border-t border-red-500/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg px-6 py-2 border border-blue-500/30 mb-6">
                <span className="text-blue-400 font-mono text-sm mr-2">OPERATIONS::</span>
                <span className="text-white font-mono">MINT_REDEEM</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-mono mb-6">
                <span className="text-white">⇄ </span>
                <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                  MINT_REDEEM
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Minting */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-md border border-green-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-green-500/30 pb-2">
                    <span className="text-green-400 font-mono font-bold text-xl mr-2">+</span>
                    <h3 className="text-xl font-mono font-bold text-green-400">MINTING_TOKENS</h3>
                  </div>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">MECHANISM::</div>
                      <div className="text-gray-300">Deposit LARRY → Mint new tokens</div>
                      <div className="text-xs text-gray-400 mt-1">Direct conversion through smart contract</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">FEE_STRUCTURE::</div>
                      <div className="text-gray-300">2.5% fee on minting transactions</div>
                      <div className="text-xs text-gray-400 mt-1">70% → backing, 30% → LP/team/burn</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">SUPPLY_CAP::</div>
                      <div className="text-gray-300">No maximum supply limit</div>
                      <div className="text-xs text-gray-400 mt-1">Infinite minting prevents supply constraints</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                      <div className="text-green-400 mb-2">PRICE_PROTECTION::</div>
                      <div className="text-gray-300">Each mint increases backing ratio</div>
                      <div className="text-xs text-gray-400 mt-1">Dilution impossible due to fee structure</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redeeming */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-md border border-red-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-red-500/30 pb-2">
                    <span className="text-red-400 font-mono font-bold text-xl mr-2">-</span>
                    <h3 className="text-xl font-mono font-bold text-red-400">REDEEMING_TOKENS</h3>
                  </div>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
                      <div className="text-red-400 mb-2">SIMPLE_REDEMPTION::</div>
                      <div className="text-gray-300">'Sell' tokens back to contract</div>
                      <div className="text-xs text-gray-400 mt-1">Burns tokens, returns underlying LARRY</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
                      <div className="text-red-400 mb-2">FEE_STRUCTURE::</div>
                      <div className="text-gray-300">Same 2.5% fee as minting</div>
                      <div className="text-xs text-gray-400 mt-1">Consistent fee distribution model</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
                      <div className="text-red-400 mb-2">INSTANT_DEFAULT::</div>
                      <div className="text-gray-300">Take loan → purposeful default</div>
                      <div className="text-xs text-gray-400 mt-1">Alternative redemption through borrowing</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
                      <div className="text-red-400 mb-2">COLLATERAL_PREMIUM::</div>
                      <div className="text-gray-300">1% premium + interest rates</div>
                      <div className="text-xs text-gray-400 mt-1">Instant default carries additional costs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Minting Example */}
            <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md border border-purple-500/30 rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-mono font-bold text-purple-400 mb-2">MINTING_EXAMPLE</h3>
                <p className="text-gray-300 font-mono text-sm">Step-by-step mathematical demonstration</p>
              </div>

              <div className="space-y-6">
                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-purple-400 font-mono font-bold mb-2">INITIAL_STATE::</div>
                  <div className="text-gray-300 font-mono">
                    100 TOKENS exist | 100 LARRY backing | Price = 1 LARRY/TOKEN
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-blue-400 font-mono font-bold mb-2">USER_ACTION::</div>
                  <div className="text-gray-300 font-mono">
                    User pays 1.025 LARRY (includes 2.5% fee) to mint 1 TOKEN
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-green-400 font-mono font-bold mb-2">FEE_DISTRIBUTION::</div>
                  <div className="text-gray-300 font-mono">
                    • 1.00 LARRY + 0.0175 LARRY (70% of fee) → Contract backing<br/>
                    • 0.001875 LARRY (7.5%) → LP Incentives<br/>
                    • 0.001875 LARRY (7.5%) → Burn Wallet<br/>
                    • 0.003750 LARRY (15%) → Team
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="text-yellow-400 font-mono font-bold mb-2">FINAL_STATE::</div>
                  <div className="text-gray-300 font-mono">
                    101 TOKENS | 101.0175 LARRY backing<br/>
                    New price = 101.0175 ÷ 101 = 1.0001732673 LARRY/TOKEN
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-6 border border-green-500/30">
                  <div className="text-center text-green-400 font-mono font-bold">
                    ✓ RESULT: Every existing token's price increased!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loans & Leverage Section */}
        <section className="px-6 lg:px-12 py-20 border-t border-red-500/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg px-6 py-2 border border-red-500/30 mb-6">
                <span className="text-red-400 font-mono text-sm mr-2">LEVERAGE::</span>
                <span className="text-white font-mono">BORROWING_SYSTEM</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-mono mb-6">
                <span className="text-white">∞ </span>
                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  LOANS_LEVERAGE
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Borrowing System */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-md border border-red-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-red-500/30 pb-2">
                    <span className="text-red-400 font-mono font-bold text-xl mr-2">$</span>
                    <h3 className="text-xl font-mono font-bold text-red-400">BORROWING_MECHANISM</h3>
                  </div>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
                      <div className="text-red-400 mb-2">COLLATERAL::</div>
                      <div className="text-gray-300">Use your tokens as collateral</div>
                      <div className="text-xs text-gray-400 mt-1">Up to 99% LTV ratio available</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
                      <div className="text-red-400 mb-2">LOAN_TERMS::</div>
                      <div className="text-gray-300">1-365 days duration</div>
                      <div className="text-xs text-gray-400 mt-1">Flexible repayment schedules</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
                      <div className="text-red-400 mb-2">INTEREST_RATE::</div>
                      <div className="text-gray-300">Linear scale, base 0.05%</div>
                      <div className="text-xs text-gray-400 mt-1">Collected upfront upon loan initiation</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
                      <div className="text-red-400 mb-2">LIQUIDATION::</div>
                      <div className="text-gray-300">Time-based only, no price risk</div>
                      <div className="text-xs text-gray-400 mt-1">Collective burning at 00:00 UTC daily</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leverage Features */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-md border border-blue-500/30 rounded-xl p-8">
                  <div className="flex items-center mb-6 border-b border-blue-500/30 pb-2">
                    <span className="text-blue-400 font-mono font-bold text-xl mr-2">∞</span>
                    <h3 className="text-xl font-mono font-bold text-blue-400">LEVERAGE_FEATURES</h3>
                  </div>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">ONE_CLICK_LEVERAGE::</div>
                      <div className="text-gray-300">Automated looping in single transaction</div>
                      <div className="text-xs text-gray-400 mt-1">User-friendly leverage interface</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">FEE_DISCOUNT::</div>
                      <div className="text-gray-300">2.5% → 1% minting fee for leverage</div>
                      <div className="text-xs text-gray-400 mt-1">Incentivized leveraged positions</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">RECURSIVE_LOOPS::</div>
                      <div className="text-gray-300">Borrow → Mint → Collateralize → Repeat</div>
                      <div className="text-xs text-gray-400 mt-1">Amplify exposure through mathematics</div>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                      <div className="text-blue-400 mb-2">LIQUIDATION_BENEFIT::</div>
                      <div className="text-gray-300">Defaulted collateral burned → price ↑</div>
                      <div className="text-xs text-gray-400 mt-1">Network benefits from liquidations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interest Rate Calculator */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-mono font-bold text-purple-400 mb-2">INTEREST_RATE_FORMULA</h3>
                <p className="text-gray-300 font-mono text-sm">Linear interest calculation with mathematical precision</p>
              </div>

              <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20 mb-6">
                <div className="text-purple-400 font-mono font-bold mb-4 text-center">CALCULATION_ALGORITHM::</div>
                <div className="text-center space-y-2 font-mono">
                  <div className="text-gray-300">interest = (slope × (days - 1)) + base_rate</div>
                  <div className="text-gray-300">slope = 0.0548% | base_rate = 0.05%</div>
                  <div className="text-xs text-gray-400 mt-2">Example: 10-day loan = 0.0548 × 9 + 0.05 = 0.54% total</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20 text-center">
                  <div className="text-2xl font-mono font-bold text-green-400 mb-2">1 DAY</div>
                  <div className="text-sm font-mono text-gray-400">INTEREST</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">0.05%</div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20 text-center">
                  <div className="text-2xl font-mono font-bold text-blue-400 mb-2">30 DAYS</div>
                  <div className="text-sm font-mono text-gray-400">INTEREST</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">1.64%</div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-purple-500/20 text-center">
                  <div className="text-2xl font-mono font-bold text-red-400 mb-2">365 DAYS</div>
                  <div className="text-sm font-mono text-gray-400">INTEREST</div>
                  <div className="text-xs font-mono text-purple-400 mt-1">20.00%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Launch CTA */}
        <section className="px-6 lg:px-12 py-20 border-t border-red-500/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 backdrop-blur-md border border-red-500/30 rounded-xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center bg-gradient-to-r from-red-600/30 to-purple-600/30 rounded-lg px-6 py-2 border border-red-500/30 mb-8">
                  <span className="text-red-400 font-mono text-sm mr-2">DEPLOY::</span>
                  <span className="text-white font-mono">YOUR_TOKEN</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-mono font-bold text-white mb-6">
                  READY TO LAUNCH YOUR TOKEN?
                </h3>
                
                <p className="text-lg text-gray-300 font-mono mb-8 max-w-2xl mx-auto">
                  Deploy your token with mathematical price protection, infinite leverage capabilities, 
                  and automatic liquidity incentives through YAKA Exchange.
                </p>

                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center bg-gradient-to-r from-red-600 to-purple-600 text-white px-8 py-4 rounded-lg font-mono font-bold hover:from-red-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 border border-red-500/30 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10">DEPLOY_TOKEN</span>
                    <svg className="ml-2 w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>

                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center border border-green-500/30 px-8 py-4 rounded-lg font-mono font-semibold hover:bg-green-500/10 transition-all duration-300 backdrop-blur-sm text-green-400 hover:text-green-300"
                  >
                    <span className="mr-2">∫</span>
                    READ_DOCUMENTATION
                    <span className="ml-2">dx</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-500/30 bg-black/80 backdrop-blur-md px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <VideoLogo size="small" />
              <div className="flex flex-col">
                <span className="text-gray-400 font-mono">© 2025 LARRY_LAUNCHPAD</span>
                <span className="text-xs text-red-400 font-mono">TOKEN_DEPLOYMENT_PROTOCOL</span>
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