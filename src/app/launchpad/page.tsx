'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
// deploy UI moved to /launchpad/create
import MobileConnectButton from '@/components/MobileConnectButton';
import { VideoLogo } from '@/components/VideoLogo';

export default function Launchpad() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // step state removed; launch moved to /launchpad/create

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
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
            <VideoLogo size="medium" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight font-mono text-white">LARRY</span>
              <span className="text-xs font-mono text-red-400">LAUNCHPAD</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">HOME</Link>
            <Link href="/docs" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">DOCS</Link>
            <Link href="/veyaka" className="text-gray-400 hover:text-purple-400 transition-colors font-mono text-sm">VEYAKA</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-red-400 transition-colors font-mono text-sm">TRADING</Link>
            <span className="text-yellow-400 font-mono font-medium text-sm">[LAUNCHPAD]</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <MobileConnectButton />
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-green-500/30">
            <div className="px-4 py-6 space-y-4">
              <Link href="/" className="block text-gray-400 hover:text-green-400 transition-colors font-mono py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
              <Link href="/docs" className="block text-gray-400 hover:text-green-400 transition-colors font-mono py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>DOCS</Link>
              <Link href="/veyaka" className="block text-gray-400 hover:text-purple-400 transition-colors font-mono py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>VEYAKA</Link>
              <Link href="/dashboard" className="block text-gray-400 hover:text-red-400 transition-colors font-mono py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>TRADING</Link>
              <span className="block text-yellow-400 font-mono font-medium py-2 text-sm">[LAUNCHPAD]</span>
              <div className="pt-4 border-t border-gray-700">
                <MobileConnectButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg px-4 sm:px-6 py-2 border border-red-500/30 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-red-400 font-mono text-sm mr-2">LAUNCHPAD::</span>
                <span className="text-white font-mono">ACTIVE</span>
              </div>

              <div className={`transition-all duration-200 ${glitchActive ? 'animate-pulse text-red-400' : ''}`}>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight font-mono mb-6">
                  <span className="text-white">CREATE YOUR </span>
                  <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    MEME TOKEN
                  </span>
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-gray-300 font-mono max-w-4xl mx-auto">
                Launch your meme token backed by LARRY with built-in price protection, 
                leverage features, and automatic rewards for token creators.
              </p>
            </div>

            {/* What Makes This Different */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 sm:p-8 mb-12">
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-green-400 mb-6 text-center">
                🚀 Why LARRY Launchpad?
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-black/50 border border-green-500/20 rounded-lg p-4">
                  <div className="text-green-400 font-bold mb-2 flex items-center">
                    <span className="mr-2">📈</span>
                    LARRY Backed
                  </div>
                  <p className="text-sm text-gray-300">Every token is backed by real LARRY, not just hype</p>
                </div>

                <div className="bg-black/50 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-blue-400 font-bold mb-2 flex items-center">
                    <span className="mr-2">💰</span>
                    Creator Earnings
                  </div>
                  <p className="text-sm text-gray-300">Earn 0.8% on all buy/sell trades + 30% on leverage</p>
                </div>

                <div className="bg-black/50 border border-purple-500/20 rounded-lg p-4">
                  <div className="text-purple-400 font-bold mb-2 flex items-center">
                    <span className="mr-2">🛡️</span>
                    Price Protection
                  </div>
                  <p className="text-sm text-gray-300">LARRY backing grows = your token price grows too</p>
                </div>

                <div className="bg-black/50 border border-red-500/20 rounded-lg p-4">
                  <div className="text-red-400 font-bold mb-2 flex items-center">
                    <span className="mr-2">⚡</span>
                    Leverage Ready
                  </div>
                  <p className="text-sm text-gray-300">Users can leverage trade your token up to 20x</p>
                </div>

                <div className="bg-black/50 border border-yellow-500/20 rounded-lg p-4">
                  <div className="text-yellow-400 font-bold mb-2 flex items-center">
                    <span className="mr-2">🔥</span>
                    Deflationary
                  </div>
                  <p className="text-sm text-gray-300">Token burns reduce supply and increase value</p>
                </div>

                <div className="bg-black/50 border border-cyan-500/20 rounded-lg p-4">
                  <div className="text-cyan-400 font-bold mb-2 flex items-center">
                    <span className="mr-2">⏰</span>
                    Safe Loans
                  </div>
                  <p className="text-sm text-gray-300">Time-based loans, no sudden liquidations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 sm:px-6 lg:px-12 py-12 border-t border-green-500/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-mono font-bold text-blue-400 mb-4">
                ⚙️ How It Works
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Every meme token is a smart contract backed by LARRY tokens. Here&apos;s how the magic happens:
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="bg-green-500/20 rounded-full w-12 h-12 flex items-center justify-center font-mono font-bold text-green-400 flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-400 mb-2">🎨 Create Your Token</h3>
                    <p className="text-gray-300 mb-4">
                      Choose your token name, symbol, and initial LARRY backing amount. 
                      Deploy your smart contract on SEI Network.
                    </p>
                    <div className="bg-black/50 rounded p-3 text-sm font-mono">
                      <span className="text-gray-400">Example:</span> <span className="text-green-400">DOGE2</span> backed by <span className="text-blue-400">1000 LARRY</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="bg-blue-500/20 rounded-full w-12 h-12 flex items-center justify-center font-mono font-bold text-blue-400 flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">💰 Users Buy Your Token</h3>
                    <p className="text-gray-300 mb-4">
                      When someone buys your token with LARRY, the smart contract:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">•</span>
                        <span className="text-gray-300">Takes their LARRY and adds it to backing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">•</span>
                        <span className="text-gray-300">Mints new tokens for the buyer</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">•</span>
                        <span className="text-gray-300">Pays you 0.8% fee automatically</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="bg-purple-500/20 rounded-full w-12 h-12 flex items-center justify-center font-mono font-bold text-purple-400 flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-400 mb-2">🚀 LARRY Price Grows</h3>
                    <p className="text-gray-300 mb-4">
                      As LARRY&apos;s global price increases (through protocol growth), 
                      YOUR token price automatically increases too!
                    </p>
                    <div className="bg-purple-500/20 rounded p-3 text-sm">
                      <span className="text-purple-300 font-bold">Even if your project fails, LARRY&apos;s success lifts your token!</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="bg-red-500/20 rounded-full w-12 h-12 flex items-center justify-center font-mono font-bold text-red-400 flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-400 mb-2">⚡ Advanced Features</h3>
                    <p className="text-gray-300 mb-4">
                      Your token automatically gets:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400">•</span>
                          <span className="text-gray-300">20x leverage trading</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400">•</span>
                          <span className="text-gray-300">Time-based safe loans</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400">•</span>
                          <span className="text-gray-300">Deflationary burns</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400">•</span>
                          <span className="text-gray-300">Price protection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Earnings */}
        <section className="px-4 sm:px-6 lg:px-12 py-12 border-t border-green-500/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-mono font-bold text-green-400 mb-4">
                💰 How You Earn Money
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Multiple ways to earn from your meme token launch
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {/* Trading Fees */}
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">💎</div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Trading Fees</h3>
                  <p className="text-gray-300 text-sm">Automatic earnings from all trades</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/50 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">Buy/Sell Trades</span>
                      <span className="text-green-400 font-bold">0.8%</span>
                    </div>
                    <p className="text-xs text-gray-400">You get 0.8% of every buy and sell automatically</p>
                  </div>

                  <div className="bg-green-500/10 rounded p-3 text-center">
                    <p className="text-sm text-green-300">
                      <strong>Example:</strong> $10,000 daily volume = <span className="text-green-400">$80/day</span> passive income
                    </p>
                  </div>
                </div>
              </div>

              {/* Leverage Fees */}
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Leverage Fees</h3>
                  <p className="text-gray-300 text-sm">Higher earnings from leveraged trades</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/50 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">Leverage Trades</span>
                      <span className="text-blue-400 font-bold">30%</span>
                    </div>
                    <p className="text-xs text-gray-400">30% of all leverage fees go to you</p>
                  </div>

                  <div className="bg-black/50 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">Interest Earned</span>
                      <span className="text-blue-400 font-bold">3.9% APR</span>
                    </div>
                    <p className="text-xs text-gray-400">Users pay 3.9% annual interest on loans</p>
                  </div>

                  <div className="bg-blue-500/10 rounded p-3 text-center">
                    <p className="text-sm text-blue-300">
                      <strong>Bonus:</strong> Leverage users create more volume = more fees for you
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings Example */}
            <div className="mt-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-purple-400 mb-2">📊 Real Earnings Example</h3>
                <p className="text-gray-300">What you could earn with moderate success</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-black/50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">$1,000</div>
                  <div className="text-sm text-gray-400 mb-4">Daily Volume</div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Trading fees:</span>
                      <span className="text-green-400">$8/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly:</span>
                      <span className="text-green-400">$240</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">$10,000</div>
                  <div className="text-sm text-gray-400 mb-4">Daily Volume</div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Trading fees:</span>
                      <span className="text-blue-400">$80/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly:</span>
                      <span className="text-blue-400">$2,400</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">$50,000</div>
                  <div className="text-sm text-gray-400 mb-4">Daily Volume</div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Trading fees:</span>
                      <span className="text-purple-400">$400/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly:</span>
                      <span className="text-purple-400">$12,000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded p-4">
                <p className="text-sm text-green-300">
                  <strong>Plus:</strong> LARRY price growth automatically increases your token backing!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="px-4 sm:px-6 lg:px-12 py-12 border-t border-green-500/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-mono font-bold text-blue-400 mb-4">
                🛡️ Built-in Safety Features
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Every token gets enterprise-grade safety and advanced features automatically
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                <div className="text-2xl mb-3">📈</div>
                <h3 className="text-green-400 font-bold mb-2">Price Protection</h3>
                <p className="text-sm text-gray-300">Smart contract prevents price from crashing below backing value</p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                <div className="text-2xl mb-3">⚡</div>
                <h3 className="text-blue-400 font-bold mb-2">20x Leverage</h3>
                <p className="text-sm text-gray-300">Users can leverage trade your token safely with time-based loans</p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                <div className="text-2xl mb-3">🔥</div>
                <h3 className="text-purple-400 font-bold mb-2">Auto Burns</h3>
                <p className="text-sm text-gray-300">Failed loans burn tokens, reducing supply and increasing price</p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <div className="text-2xl mb-3">⏰</div>
                <h3 className="text-red-400 font-bold mb-2">Safe Liquidations</h3>
                <p className="text-sm text-gray-300">No sudden liquidations - only time-based at midnight UTC</p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                <div className="text-2xl mb-3">💰</div>
                <h3 className="text-yellow-400 font-bold mb-2">LARRY Backing</h3>
                <p className="text-sm text-gray-300">Every token backed by real LARRY tokens, not just promises</p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-6">
                <div className="text-2xl mb-3">🚀</div>
                <h3 className="text-cyan-400 font-bold mb-2">SEI Network</h3>
                <p className="text-sm text-gray-300">Ultra-fast transactions with minimal fees on SEI blockchain</p>
              </div>
            </div>
          </div>
        </section>

        {/* Launch CTA */}
        <section className="px-4 sm:px-6 lg:px-12 py-12 lg:py-20 border-t border-green-500/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 backdrop-blur-md border border-red-500/30 rounded-xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center bg-gradient-to-r from-red-600/30 to-purple-600/30 rounded-lg px-6 py-2 border border-red-500/30 mb-8">
                  <span className="text-red-400 font-mono text-sm mr-2">READY::</span>
                  <span className="text-white font-mono">TO_LAUNCH</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-mono font-bold text-white mb-6">
                  LAUNCH YOUR MEME TOKEN TODAY
                </h3>
                
                <p className="text-lg text-gray-300 font-mono mb-8 max-w-2xl mx-auto">
                  Create a LARRY-backed token with built-in price protection, 
                  leverage features, and automatic earnings from trading fees.
                </p>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-8">
                  <h4 className="text-green-400 font-bold mb-4">🎯 What You Get:</h4>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm text-left">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>LARRY-backed smart contract</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>0.8% earnings on all trades</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>30% earnings on leverage</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>Price protection built-in</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>20x leverage for users</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>Benefits from LARRY growth</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                  <Link
                    href="/launchpad/create"
                    className="inline-flex items-center bg-gradient-to-r from-red-600 to-purple-600 text-white px-8 py-4 rounded-lg font-mono font-bold hover:from-red-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 border border-red-500/30 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10">CREATE TOKEN</span>
                    <svg className="ml-2 w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>

                  <Link
                    href="/launchpad/create"
                    className="inline-flex items-center justify-center border border-green-500/30 px-8 py-4 rounded-lg font-mono font-semibold hover:bg-green-500/10 transition-all duration-300 backdrop-blur-sm text-green-400 hover:text-green-300"
                  >
                    <span className="mr-2">🚀</span>
                    LAUNCH FROM FRONTEND
                  </Link>

                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center border border-green-500/30 px-8 py-4 rounded-lg font-mono font-semibold hover:bg-green-500/10 transition-all duration-300 backdrop-blur-sm text-green-400 hover:text-green-300"
                  >
                    <span className="mr-2">📚</span>
                    READ DOCS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* launch section removed; see /launchpad/create */}

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/30 bg-black/80 backdrop-blur-md px-4 sm:px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <VideoLogo size="small" />
              <div className="flex flex-col">
                <span className="text-gray-400 font-mono">© 2025 LARRY LAUNCHPAD</span>
                <span className="text-xs text-red-400 font-mono">MEME TOKEN CREATOR</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="https://t.me/btbfinance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://x.com/btb_finance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">
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

// SimpleLaunchForm removed; see /launchpad/create
// SimpleLaunchForm removed; see /launchpad/create