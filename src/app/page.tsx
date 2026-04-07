'use client';

import Link from 'next/link';
import MobileConnectButton from '@/components/MobileConnectButton';
import { useState, useEffect } from 'react';
import { useLarryContract } from '@/hooks/useLarryContract';
import { formatEther } from 'viem';
import { Zap, Shield, TrendingUp, Layers, Menu, X, ArrowRight, ChevronRight, Activity } from 'lucide-react';

export default function Home() {
  const { currentPrice, buyFeePercent, backing, totalSupply } = useLarryContract();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-slate-900/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">LARRY</span>
              <span className="text-[10px] font-medium text-violet-400 tracking-wider uppercase">Protocol</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white font-medium text-sm border-b-2 border-violet-500 pb-1">Home</Link>
            <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm">Documentation</Link>
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm">Trading App</Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <MobileConnectButton />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-x-0 border-b-0 rounded-none absolute w-full backdrop-blur-3xl">
            <div className="px-6 py-6 space-y-6 flex flex-col">
              <Link href="/" className="text-white font-medium text-lg" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/docs" className="text-slate-300 hover:text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Documentation</Link>
              <Link href="/dashboard" className="text-slate-300 hover:text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Trading App</Link>
              <div className="pt-4 border-t border-slate-700/50">
                <MobileConnectButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-28">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Decorative background blurs inside hero */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium backdrop-blur-md mb-4">
              <span className="flex h-2 w-2 rounded-full bg-violet-500 mr-2 animate-pulse"></span>
              Live on Base Network
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Advanced Leverage <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                Liquidity Protocol
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Maximize your ETH exposure with guaranteed price protection, dynamic borrowing loops, and automated governance rewards. Start amplifying your portfolio today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                href="/dashboard"
                className="group flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] w-full sm:w-auto"
              >
                Launch App
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/docs"
                className="flex items-center justify-center glass-panel px-8 py-4 rounded-xl font-medium text-lg hover:bg-slate-800/50 transition-all text-white w-full sm:w-auto"
              >
                Read Documentation
              </Link>
            </div>
          </div>
        </section>

        {/* Global Protocol Metrics */}
        <section className="px-6 lg:px-8 pb-20 relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-400">LARRY Price</p>
                  <p className="text-3xl font-bold text-white">
                    {currentPrice ? `${currentPrice.toFixed(7)}` : '0.000'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-400">Total Value Locked</p>
                  <p className="text-3xl font-bold text-white">
                    {backing ? `${parseFloat(formatEther(backing as bigint)) < 0.01 ? parseFloat(formatEther(backing as bigint)).toFixed(6) : parseFloat(formatEther(backing as bigint)).toFixed(2)}` : '0.00'} ETH
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-400">Total Supply</p>
                  <p className="text-3xl font-bold text-white">
                    {totalSupply ? `${parseFloat(formatEther(totalSupply as bigint)).toFixed(0)}` : '0'}
                  </p>
                </div>
                <div className="space-y-2 border-l border-slate-700/50 pl-8">
                  <p className="text-sm font-medium text-slate-400">Protocol Fee</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-violet-400">{buyFeePercent}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Integration */}
        <section className="px-6 lg:px-8 py-24 bg-gradient-to-b from-transparent to-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Designed for Capital Efficiency</h2>
              <p className="text-lg text-slate-400">
                The LARRY contract utilizes mathematical invariants to ensure consistent value backing while allowing aggressive leverage.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel p-8 group hover:border-violet-500/50 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <TrendingUp className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Guaranteed Price Protection</h3>
                <p className="text-slate-400 leading-relaxed">
                  The protocol&apos;s smart contract guarantees that the token price mathematically can only increase, preventing unexpected downside volatility.
                </p>
              </div>

              <div className="glass-panel p-8 group hover:border-violet-500/50 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 border border-violet-500/20 group-hover:bg-violet-500/20 transition-colors">
                  <Layers className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">20-100x Architecture</h3>
                <p className="text-slate-400 leading-relaxed">
                  Borrow up to 99% of your position value in ETH. Utilize automated looping to rapidly scale your overall market exposure.
                </p>
              </div>

              <div className="glass-panel p-8 group hover:border-violet-500/50 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                  <Shield className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Time-Based Loans</h3>
                <p className="text-slate-400 leading-relaxed">
                  Eliminate liquidation engine risk. All borrowing is backed by your own preset time intervals with fixed, predictable rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Layer */}
        <section className="px-6 lg:px-8 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">Execute the Strategy</h2>
                <div className="space-y-6">
                  {[
                    { title: "Deposit ETH", desc: "Start by converting your ETH into LARRY tokens securely through the protocol.", icon: "1" },
                    { title: "Mint Leverage", desc: "Borrow up to 99% of your initial capital against your newly minted LARRY position.", icon: "2" },
                    { title: "Amplify Holdings", desc: "Reinvest borrowed ETH to buy more LARRY, recursively multiplying your position.", icon: "3" }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-violet-400 font-bold border-violet-500/30">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-slate-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="inline-flex items-center text-violet-400 hover:text-violet-300 font-medium mt-10 text-lg group">
                  Enter Trading Dashboard
                  <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="glass-panel p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/50">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white border-b border-slate-700/50 pb-4">Simulation: Smart Leverage</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <span className="text-slate-400">Initial Deposit</span>
                      <span className="font-mono text-white text-lg">1.00 ETH</span>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-6 border-l border-slate-600 border-dashed"></div>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <span className="text-blue-200">First Loop Borrow</span>
                      <span className="font-mono text-blue-400 text-lg">+0.99 ETH</span>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-6 border-l border-slate-600 border-dashed"></div>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-violet-500/10 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                      <span className="text-violet-200 font-medium">Total Capital Exposure</span>
                      <span className="font-mono text-violet-400 text-xl font-bold">100+ ETH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-300 font-medium">LARRY Protocol © 2026</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Discord</a>
            </div>
          </div>
          <div className="mt-8 text-center text-slate-600 text-sm">
            Powered by Base smart contracts. Not financial advice.
          </div>
        </div>
      </footer>
    </div>
  );
}