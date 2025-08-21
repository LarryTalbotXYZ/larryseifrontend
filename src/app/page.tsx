'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useLarryContract } from '@/hooks/useLarryContract';
import { formatEther } from 'viem';

export default function Home() {
  const { currentPrice, buyFeePercent, leverageFeePercent, backing } = useLarryContract();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#1a1a2e_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_#16213e_0%,_transparent_50%),radial-gradient(circle_at_40%_40%,_#0f3460_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
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
      <nav className="relative z-10 border-b border-gray-800 backdrop-blur">
        <div className="flex justify-between items-center p-6 lg:px-12">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">⚡</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">LARRY</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <span className="text-yellow-400 font-medium">Home</span>
            <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</Link>
            <Link href="/veyaka" className="text-gray-300 hover:text-white transition-colors">VeYAKA</Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Trading</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <ConnectButton />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
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
          <div className="md:hidden bg-gray-900/95 backdrop-blur border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <span className="block text-yellow-400 font-medium py-2">Home</span>
              <Link 
                href="/docs" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link 
                href="/veyaka" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                VeYAKA
              </Link>
              <Link 
                href="/dashboard" 
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trading
              </Link>
              <div className="pt-4 border-t border-gray-800">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 lg:px-12 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                    <span className="text-sm text-gray-300">Live on Sei Network</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="block text-white">Liquidity</span>
                    <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                      Engineered
                    </span>
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-2xl">
                    Advanced DeFi primitive that transforms trading fees into governance power, 
                    directing emissions across all v3,3 networks through automated leverage strategies.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/dashboard" 
                    className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    Launch Protocol
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/docs" 
                    className="inline-flex items-center justify-center border border-gray-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all"
                  >
                    Read Documentation
                  </Link>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="space-y-6">
                <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-lg font-semibold mb-6 text-gray-300">Protocol Metrics</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-white">
                        {currentPrice ? `${currentPrice.toFixed(6)}` : '0.000000'}
                      </div>
                      <div className="text-sm text-gray-400">LARRY/SEI</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-white">
                        {backing ? `${parseFloat(formatEther(backing as bigint)).toFixed(0)}` : '0'}
                      </div>
                      <div className="text-sm text-gray-400">SEI Locked</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-white">1B</div>
                      <div className="text-sm text-gray-400">Max Supply</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-white">{buyFeePercent}%</div>
                      <div className="text-sm text-gray-400">Protocol Fee</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 hover:bg-gray-900/50 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Leverage Loop</div>
                          <div className="text-xs text-gray-400">20x exposure from 500 SEI</div>
                        </div>
                      </div>
                      <div className="text-green-400 text-sm">Active</div>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 hover:bg-gray-900/50 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">Governance Voting</div>
                          <div className="text-xs text-gray-400">Direct emissions to pools</div>
                        </div>
                      </div>
                      <div className="text-yellow-400 text-sm">Auto</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 lg:px-12 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-white">Protocol </span>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Architecture</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Self-reinforcing mechanisms that convert trading activity into sustainable liquidity across decentralized networks.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Fee Conversion */}
              <div className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/50 transition-all">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Fee → Power Conversion</h3>
                <p className="text-gray-400 mb-6">
                  Every trading fee automatically purchases and locks governance tokens for maximum voting weight across v3,3 protocols.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trading Fee</span>
                    <span className="text-white">{buyFeePercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Governance Allocation</span>
                    <span className="text-green-400">100%</span>
                  </div>
                </div>
              </div>

              {/* Leverage Mechanics */}
              <div className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/50 transition-all">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Recursive Leverage</h3>
                <p className="text-gray-400 mb-6">
                  Advanced lending protocols enable extreme leverage through recursive borrowing strategies with time-based liquidations.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Leverage</span>
                    <span className="text-white">20x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Loan-to-Value</span>
                    <span className="text-blue-400">99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">APR Interest</span>
                    <span className="text-white">3.9%</span>
                  </div>
                </div>
              </div>

              {/* Emission Direction */}
              <div className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/50 transition-all">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Emission Control</h3>
                <p className="text-gray-400 mb-6">
                  Accumulated voting power directs liquidity incentives to LARRY pools across all supported networks and protocols.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Voting Strategy</span>
                    <span className="text-white">Automated</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Pools</span>
                    <span className="text-purple-400">LARRY/*</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contract Details */}
        <section className="px-6 lg:px-12 py-20 border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/30 backdrop-blur border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Contract Information</h3>
                <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Verified</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Network</span>
                    <span className="text-white">Sei</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Symbol</span>
                    <span className="text-white">LARRY</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Decimals</span>
                    <span className="text-white">18</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Max Supply</span>
                    <span className="text-white">1,000,000,000</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Backing Ratio</span>
                    <span className="text-green-400">99%</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">Fee Structure</span>
                    <span className="text-white">{buyFeePercent}% → Governance</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-800/50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Contract Address</span>
                  <button className="text-gray-400 hover:text-white text-sm">Copy</button>
                </div>
                <div className="mt-2 font-mono text-sm text-white break-all">
                  0x888d81e3ea5E8362B5f69188CBCF34Fa8da4b888
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xs">⚡</span>
              </div>
              <span className="text-gray-400">© 2024 LARRY Protocol</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="https://discord.gg/bqFEPA56Tc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
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