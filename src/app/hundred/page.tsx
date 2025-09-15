'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MobileConnectButton from '@/components/MobileConnectButton';
import { VideoLogo } from '@/components/VideoLogo';

export default function HundredTokenPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [poolApr, setPoolApr] = useState(500);

  useEffect(() => {
    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 3000);

    // Simulate daily progression
    const dayInterval = setInterval(() => {
      setCurrentDay(prev => prev + 1);
      setPoolApr(prev => Math.min(prev + 25, 10000)); // Cap at 10,000%
    }, 5000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(dayInterval);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white overflow-hidden ${glitchActive ? 'animate-pulse' : ''}`}>
      {/* Cyberpunk Matrix Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#ff0041 1px, transparent 1px), linear-gradient(90deg, #ff0041 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black"></div>
      </div>

      {/* Header */}
      <nav className="relative z-10 border-b border-red-500/30 bg-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center p-6 lg:px-12">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300">
            <VideoLogo size="medium" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight font-mono text-white">HUNDRED</span>
              <span className="text-xs font-mono text-red-400">100 TOKEN</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors font-mono text-sm">HOME</Link>
            <Link href="/docs" className="text-gray-400 hover:text-red-400 transition-colors font-mono text-sm">DOCS</Link>
            <Link href="/lev" className="text-gray-400 hover:text-red-400 transition-colors font-mono text-sm">LEVERAGE</Link>
            <span className="text-red-400 font-mono font-medium text-sm">[HUNDRED]</span>
          </div>

          <MobileConnectButton />
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg px-6 py-2 border border-red-500/30 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-red-400 font-mono text-sm">HUNDRED TOKEN</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight font-mono mb-6">
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                100
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 font-mono max-w-3xl mx-auto mb-8">
              A deflationary flywheel token with 100 total supply. Daily sells create a powerful YAKA accumulation mechanism.
            </p>

            {/* Token Stats */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              <div className="bg-black/80 border border-red-500/30 rounded-xl p-6">
                <div className="text-3xl font-mono font-bold text-red-400 mb-2">100</div>
                <div className="text-gray-400 font-mono text-sm">TOTAL SUPPLY</div>
              </div>
              <div className="bg-black/80 border border-orange-500/30 rounded-xl p-6">
                <div className="text-3xl font-mono font-bold text-orange-400 mb-2">~0.274</div>
                <div className="text-gray-400 font-mono text-sm">DAILY SELL</div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Warning */}
        <section className="px-6 lg:px-12 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/50 rounded-xl p-8">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">⚠️</div>
                <div>
                  <h3 className="text-red-400 font-mono font-bold text-xl mb-3">HIGH RISK WARNING</h3>
                  <p className="text-gray-300 font-mono mb-4">
                    HUNDRED (100) is an extremely high-risk experimental token. By participating, you acknowledge and accept:
                  </p>
                  <ul className="text-gray-300 font-mono text-sm space-y-2 list-disc list-inside">
                    <li>Daily token sales create selling pressure and reduce circulating supply</li>
                    <li>Token value is highly volatile and speculative</li>
                    <li>No guarantee of returns or token value preservation</li>
                    <li>YAKA accumulation mechanism may fail or underperform</li>
                    <li>Pool APR increases are not guaranteed</li>
                    <li>You may lose your entire investment</li>
                  </ul>
                  <p className="text-red-400 font-mono font-bold mt-4">
                    Only invest what you can afford to lose completely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flywheel Mechanism */}
        <section className="px-6 lg:px-12 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-mono font-bold text-center mb-12 text-white">
              THE FLYWHEEL MECHANISM
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Process Flow */}
              <div className="space-y-6">
                <div className="bg-black/80 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-mono font-bold">1</div>
                    <h3 className="text-blue-400 font-mono font-bold text-lg">DAILY SELL</h3>
                  </div>
                  <p className="text-gray-300 font-mono text-sm">
                    Every day, approximately 0.274 HUNDRED tokens (~0.274% of total supply) are automatically sold for YAKA tokens.
                  </p>
                </div>

                <div className="bg-black/80 border border-purple-500/30 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-mono font-bold">2</div>
                    <h3 className="text-purple-400 font-mono font-bold text-lg">LIQUID YAKA VOTING</h3>
                  </div>
                  <p className="text-gray-300 font-mono text-sm">
                    All purchased YAKA tokens remain as liquid YAKA and are used for voting power to direct emissions to HUNDRED pools.
                  </p>
                </div>

                <div className="bg-black/80 border border-green-500/30 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-mono font-bold">3</div>
                    <h3 className="text-green-400 font-mono font-bold text-lg">DUAL POOL VOTING</h3>
                  </div>
                  <p className="text-gray-300 font-mono text-sm">
                    Liquid YAKA votes for two HUNDRED liquidity pools: 100/LYT and 100/LARRY, increasing their rewards allocation and creating multiple earning opportunities.
                  </p>
                </div>

                <div className="bg-black/80 border border-yellow-500/30 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-mono font-bold">4</div>
                    <h3 className="text-yellow-400 font-mono font-bold text-lg">DUAL APR BOOST</h3>
                  </div>
                  <p className="text-gray-300 font-mono text-sm">
                    Higher allocations increase APRs in both 100/LYT and 100/LARRY pools, attracting liquidity to multiple pairs and creating broader ecosystem demand for HUNDRED tokens.
                  </p>
                </div>
              </div>

              {/* Right: Live Stats */}
              <div className="space-y-6">
                <div className="bg-black/80 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-red-400 font-mono font-bold text-lg mb-6">LIVE FLYWHEEL STATS</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                      <span className="text-gray-400 font-mono text-sm">Day</span>
                      <span className="text-white font-mono font-bold">{currentDay}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                      <span className="text-gray-400 font-mono text-sm">Remaining Supply</span>
                      <span className="text-white font-mono font-bold">{(100 - (currentDay - 1) * 0.274).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
                      <span className="text-gray-400 font-mono text-sm">Pool APR</span>
                      <span className="text-yellow-400 font-mono font-bold">
                        {poolApr >= 10000 ? '10,000%' : `${poolApr.toLocaleString()}%`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-400 font-mono text-sm">Next Sell</span>
                      <span className="text-red-400 font-mono font-bold">~0.274 100</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/80 border border-orange-500/30 rounded-xl p-6">
                  <h3 className="text-orange-400 font-mono font-bold text-lg mb-4">FLYWHEEL POWER</h3>
                  <div className="relative">
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((poolApr / 10000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-400 font-mono text-xs mt-2">
                      Flywheel Strength: {Math.min((poolApr / 10000) * 100, 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-blue-400 font-mono font-bold text-lg mb-4">PROJECTED OUTCOME</h3>
                  <div className="space-y-3 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">In 30 days:</span>
                      <span className="text-white">~1,250% APR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">In 6 months:</span>
                      <span className="text-yellow-400">~5,000% APR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">In 1 year:</span>
                      <span className="text-red-400">10,000% APR MAX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Pool System */}
        <section className="px-6 lg:px-12 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-mono font-bold text-center mb-12 text-white">
              DUAL POOL SYSTEM
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-mono font-bold text-xl">💧</span>
                  </div>
                  <div>
                    <h3 className="text-blue-400 font-mono font-bold text-xl">100/LYT POOL</h3>
                    <p className="text-gray-400 font-mono text-sm">HUNDRED × LYT Liquidity</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                    <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                      <div>
                        <p className="text-blue-400">Target APR:</p>
                        <p className="text-white text-lg">500% - 10,000%</p>
                      </div>
                      <div>
                        <p className="text-blue-400">Voting Power:</p>
                        <p className="text-white text-lg">50% YAKA</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 font-mono text-sm">
                    Provides liquidity for HUNDRED tokens paired with LYT, creating a primary trading pair 
                    with extreme yield opportunities.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-mono font-bold text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-mono font-bold text-xl">100/LARRY POOL</h3>
                    <p className="text-gray-400 font-mono text-sm">HUNDRED × LARRY Liquidity</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-black/50 rounded-lg p-4 border border-purple-500/20">
                    <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                      <div>
                        <p className="text-purple-400">Target APR:</p>
                        <p className="text-white text-lg">500% - 10,000%</p>
                      </div>
                      <div>
                        <p className="text-purple-400">Voting Power:</p>
                        <p className="text-white text-lg">50% YAKA</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 font-mono text-sm">
                    Provides liquidity for HUNDRED tokens paired with LARRY, creating an alternative trading pair 
                    and diversifying the ecosystem.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/80 border border-yellow-500/30 rounded-xl p-8">
              <h3 className="text-yellow-400 font-mono font-bold text-xl mb-6 text-center">
                LIQUID YAKA VOTING STRATEGY
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                    <span className="text-yellow-400 font-mono font-bold text-2xl">1</span>
                  </div>
                  <h4 className="text-yellow-400 font-mono font-bold mb-2">YAKA PURCHASE</h4>
                  <p className="text-gray-300 font-mono text-xs">
                    Daily token sales automatically purchase liquid YAKA tokens from the market.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                    <span className="text-yellow-400 font-mono font-bold text-2xl">2</span>
                  </div>
                  <h4 className="text-yellow-400 font-mono font-bold mb-2">SPLIT VOTING</h4>
                  <p className="text-gray-300 font-mono text-xs">
                    Liquid YAKA is split 50/50 to vote for both 100/LYT and 100/LARRY pool emissions.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                    <span className="text-yellow-400 font-mono font-bold text-2xl">3</span>
                  </div>
                  <h4 className="text-yellow-400 font-mono font-bold mb-2">DUAL REWARDS</h4>
                  <p className="text-gray-300 font-mono text-xs">
                    Both pools receive increased emissions, creating multiple high-APR opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Token Contract Details */}
        <section className="px-6 lg:px-12 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-black/80 border border-gray-700/30 rounded-xl p-8">
              <h2 className="text-2xl font-mono font-bold text-white mb-6 text-center">
                TOKEN CONTRACT DETAILS
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-green-400 font-mono font-bold text-lg">Contract Features</h3>
                  <ul className="space-y-2 text-sm font-mono text-gray-300">
                    <li>• ERC20 standard compliance</li>
                    <li>• ERC1363 payable token support</li>
                    <li>• Burnable token functionality</li>
                    <li>• ERC20Permit for gasless approvals</li>
                    <li>• Fixed supply of 100 tokens</li>
                    <li>• 18 decimal precision</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-purple-400 font-mono font-bold text-lg">Technical Specs</h3>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">HUNDRED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Symbol:</span>
                      <span className="text-white">100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Supply:</span>
                      <span className="text-white">100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Decimals:</span>
                      <span className="text-white">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">License:</span>
                      <span className="text-white">MIT</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-600/30">
                <h4 className="text-yellow-400 font-mono font-bold mb-3">Solidity Contract Code</h4>
                <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.4.0
pragma solidity ^0.8.27;

import {ERC1363} from "@openzeppelin/contracts/token/ERC20/extensions/ERC1363.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract HUNDRED is ERC20, ERC20Burnable, ERC1363, ERC20Permit {
    constructor(address recipient)
        ERC20("HUNDRED", "100")
        ERC20Permit("HUNDRED")
    {
        _mint(recipient, 100 * 10 ** decimals());
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 lg:px-12 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-mono font-bold text-center mb-12 text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-black/80 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-red-400 font-mono font-bold mb-3">What happens when all tokens are sold?</h3>
                  <p className="text-gray-300 font-mono text-sm">
                    At the current selling rate, all 100 tokens will be sold within 1 year. 
                    By then, a massive amount of YAKA would be locked, potentially creating significant pool rewards.
                  </p>
                </div>

                <div className="bg-black/80 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-blue-400 font-mono font-bold mb-3">How does the APR increase work?</h3>
                  <p className="text-gray-300 font-mono text-sm">
                    As more liquid YAKA accumulates and votes for the 100/LYT and 100/LARRY pools, they receive larger shares of YAKA emissions. 
                    The dual-pool flywheel creates extreme APRs starting at 500% and reaching up to 10,000% across both pools.
                  </p>
                </div>

                <div className="bg-black/80 border border-green-500/30 rounded-xl p-6">
                  <h3 className="text-green-400 font-mono font-bold mb-3">Can the flywheel fail?</h3>
                  <p className="text-gray-300 font-mono text-sm">
                    Yes. If YAKA price crashes, pool voting doesn&apos;t work as expected, or liquidity providers don&apos;t respond to APR increases, 
                    the mechanism could fail to create sustainable value.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-black/80 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-purple-400 font-mono font-bold mb-3">What are the main risks?</h3>
                  <p className="text-gray-300 font-mono text-sm">
                    Total loss of investment, token becoming worthless, YAKA price volatility, 
                    regulatory risks, smart contract risks, and market manipulation are all possible.
                  </p>
                </div>

                <div className="bg-black/80 border border-yellow-500/30 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-mono font-bold mb-3">Who controls the sell mechanism?</h3>
                  <p className="text-gray-300 font-mono text-sm">
                    The sell mechanism should be automated and decentralized. Check the contract code and governance 
                    to understand who has control over the daily selling process.
                  </p>
                </div>

                <div className="bg-black/80 border border-orange-500/30 rounded-xl p-6">
                  <h3 className="text-orange-400 font-mono font-bold mb-3">Is this legal financial advice?</h3>
                  <p className="text-gray-300 font-mono text-sm">
                    No. This is purely educational information about an experimental token mechanism. 
                    Consult qualified financial advisors before making any investment decisions.
                  </p>
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
                <span className="text-gray-400 font-mono">© 2025 HUNDRED PROTOCOL</span>
                <span className="text-xs text-red-400 font-mono">HIGH RISK EXPERIMENTAL TOKEN</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <p className="text-gray-400 font-mono text-sm">
                SUPPLY: {(100 - (currentDay - 1) * 0.274).toFixed(1)}/100
              </p>
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}