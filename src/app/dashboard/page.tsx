'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import TradingInterface from '@/components/TradingInterface';
import LoanDashboard from '@/components/LoanDashboard';

// Mathematical symbols for visual elements
const MATH_SYMBOLS = ['∑', '∫', '∂', '∇', '∞', '∮', '∯', '∱', '∲', '∴', '∵', '⊥', '∥', '∦', '≅', '≈', '≠', '≤', '≥', '⊂', '⊃', '⊆', '⊇', '∈', '∉', '∋', '∌', '⊕', '⊗', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '∧', '∨', '¬', '∀', '∃', '∄', '∅', '∆', '∇', '∈', '∉', '∋', '∌', '⊂', '⊃', '⊄', '⊅', '⊆', '⊇', '⊈', '⊉', '⊊', '⊋', '∩', '∪', '∧', '∨', '∩', '∪', '∧', '∨', '∩', '∪'];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('buy');
  const [glitchActive, setGlitchActive] = useState(false);

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
          {[...Array(20)].map((_, i) => (
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
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="text-white font-mono text-xl font-bold relative z-10">∑</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight font-mono text-white">LARRY</span>
              <span className="text-xs font-mono text-red-400">Δ-TERMINAL</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">HOME.exe</Link>
            <Link href="/docs" className="text-gray-400 hover:text-green-400 transition-colors font-mono text-sm">DOCS.exe</Link>
            <Link href="/veyaka" className="text-gray-400 hover:text-purple-400 transition-colors font-mono text-sm">VEYAKA.sys</Link>
            <span className="text-green-400 font-mono font-medium text-sm">[ACTIVE_SESSION]</span>
          </div>

          <ConnectButton />
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hacker Terminal Header */}
        <section className="px-6 lg:px-12 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-lg px-4 py-2 border border-red-500/30 backdrop-blur-sm">
                  <span className="text-red-400 font-mono text-sm mr-2">TERMINAL::</span>
                  <span className="text-white font-mono">ACTIVE_SESSION</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold font-mono">
                  <span className="text-white">Δ-TRADING_</span>
                  <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    TERMINAL
                  </span>
                </h1>
                <p className="text-xl text-gray-300 font-mono max-w-2xl">
                  <span className="text-green-400">λ</span> Execute advanced leverage algorithms and recursive borrowing strategies
                </p>
              </div>

              {/* Live Status Terminal */}
              <div className="hidden lg:flex items-center bg-black/80 backdrop-blur-md border border-green-500/30 rounded-xl px-6 py-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></div>
                <div className="text-left">
                  <div className="text-green-400 font-mono text-sm">PROTOCOL_STATUS::</div>
                  <div className="text-white font-mono text-sm">MATHEMATICAL_ENGINE_ACTIVE</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cyberpunk Dashboard Terminal */}
        <section className="px-6 lg:px-12 pb-20">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Mathematical Trading Engine */}
            <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
              <div className="p-8 border-b border-red-500/30 relative z-10">
                <div className="flex items-center mb-3 border-b border-red-500/30 pb-2">
                  <span className="text-red-400 font-mono font-bold text-xl mr-3">∫</span>
                  <h2 className="text-2xl font-mono font-bold text-red-400">MATHEMATICAL_TRADING_ENGINE</h2>
                </div>
                <p className="text-gray-300 font-mono text-sm">Execute recursive algorithms and leverage functions with mathematical precision</p>
              </div>
              <div className="p-8 relative z-10">
                <TradingInterface activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
            </div>

            {/* Leverage Position Matrix */}
            <div className="bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] animate-pulse"></div>
              <div className="p-8 border-b border-blue-500/30 relative z-10">
                <div className="flex items-center mb-3 border-b border-blue-500/30 pb-2">
                  <span className="text-blue-400 font-mono font-bold text-xl mr-3">∞</span>
                  <h2 className="text-2xl font-mono font-bold text-blue-400">LEVERAGE_POSITION_MATRIX</h2>
                </div>
                <p className="text-gray-300 font-mono text-sm">Monitor recursive borrowing strategies and time-based loan constraints</p>
              </div>
              <div className="p-8 relative z-10">
                <LoanDashboard />
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
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-pulse"></div>
                <span className="text-white font-mono font-bold text-sm relative z-10">∑</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-mono">© 2025 LARRY_PROTOCOL</span>
                <span className="text-xs text-red-400 font-mono">Δ-MATRIX_SYSTEM</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
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