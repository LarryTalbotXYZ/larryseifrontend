'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Moon, Zap, TrendingUp, Shield, Coins, Users, ArrowRight } from 'lucide-react';
import { useLarryContract } from '@/hooks/useLarryContract';

export default function Home() {
  const { currentPrice } = useLarryContract();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#ffd700]/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Moon className="w-8 h-8 text-[#ffd700] moon-glow" />
            <h1 className="text-2xl font-bold text-[#ffd700]">LARRY TALBOT</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-[#e6e6f0] hover:text-[#ffd700] transition-colors">
              Dashboard
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#ffd700] via-[#c0c0c0] to-[#ffd700] bg-clip-text text-transparent">
            Transform Under the Moon
          </h2>
          <p className="text-xl text-[#e6e6f0]/80 mb-12 leading-relaxed">
            Larry Talbot rises on Sei Network. Buy, leverage, and borrow LARRY tokens 
            with the power of the werewolf. When the moon is full, fortunes are made.
          </p>
          
          {/* CTA Button */}
          <Link href="/dashboard" className="inline-flex items-center bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-[#0a0a0f] px-8 py-4 rounded-lg font-bold text-lg hover:from-[#b8860b] hover:to-[#ffd700] transition-all transform hover:scale-105 mb-16">
            Enter the Pack
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="werewolf-card p-6 rounded-xl">
              <Coins className="w-8 h-8 text-[#ffd700] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#ffd700] mb-2">1B LARRY</h3>
              <p className="text-[#e6e6f0]/70">Max Supply</p>
            </div>
            <div className="werewolf-card p-6 rounded-xl">
              <TrendingUp className="w-8 h-8 text-[#ffd700] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#ffd700] mb-2">
                ${currentPrice ? currentPrice.toFixed(6) : '0.000000'}
              </h3>
              <p className="text-[#e6e6f0]/70">Current Price</p>
            </div>
            <div className="werewolf-card p-6 rounded-xl">
              <Shield className="w-8 h-8 text-[#ffd700] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#ffd700] mb-2">99%</h3>
              <p className="text-[#e6e6f0]/70">Collateral Ratio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20 border-t border-[#ffd700]/20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[#ffd700] mb-4">The Wolf&apos;s Arsenal</h3>
          <p className="text-xl text-[#e6e6f0]/80">Unleash the power of decentralized finance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="werewolf-card p-8 rounded-xl text-center">
            <Moon className="w-12 h-12 text-[#ffd700] mx-auto mb-6 moon-glow" />
            <h4 className="text-xl font-bold text-[#ffd700] mb-4">Moon-Backed Value</h4>
            <p className="text-[#e6e6f0]/70">Every LARRY token is backed by SEI, creating intrinsic value that grows with adoption.</p>
          </div>
          
          <div className="werewolf-card p-8 rounded-xl text-center">
            <Zap className="w-12 h-12 text-[#ffd700] mx-auto mb-6" />
            <h4 className="text-xl font-bold text-[#ffd700] mb-4">Lightning Leverage</h4>
            <p className="text-[#e6e6f0]/70">Amplify your positions with up to 99% collateralization for maximum capital efficiency.</p>
          </div>
          
          <div className="werewolf-card p-8 rounded-xl text-center">
            <Users className="w-12 h-12 text-[#ffd700] mx-auto mb-6" />
            <h4 className="text-xl font-bold text-[#ffd700] mb-4">Pack Finance</h4>
            <p className="text-[#e6e6f0]/70">Borrow and lend with the pack. Community-driven DeFi for the next generation.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ffd700]/20 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#e6e6f0]/60">© 2024 Larry Talbot. The curse of the werewolf lives on Sei Network.</p>
        </div>
      </footer>
    </div>
  );
}
