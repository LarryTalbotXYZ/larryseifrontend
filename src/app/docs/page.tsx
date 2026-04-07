'use client';

import Link from 'next/link';
import { useState } from 'react';
import MobileConnectButton from '@/components/MobileConnectButton';
import FlowDiagram from '@/components/FlowDiagram';
import { BookOpen, Rocket, Settings, Landmark, TrendingUp, ShieldCheck, HelpCircle, Activity, Menu, X, ArrowRight, CornerDownRight } from 'lucide-react';

export default function Docs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'getting-started', label: 'Getting Started', icon: <Rocket className="w-5 h-5" /> },
    { id: 'how-it-works', label: 'How It Works', icon: <Settings className="w-5 h-5" /> },
    { id: 'borrowing', label: 'Borrowing Details', icon: <Landmark className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-slate-900/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">LARRY</span>
              <span className="text-[10px] font-medium text-blue-400 tracking-wider uppercase">Documentation</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">Home</Link>
            <span className="text-white font-medium text-sm border-b-2 border-violet-500 pb-1">Documentation</span>
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
      </nav>

      {/* Main Layout */}
      <main className="relative z-10 max-w-7xl mx-auto pt-24 min-h-screen flex flex-col lg:flex-row">
        
        {/* Sidebar */}
        <aside className="lg:w-72 lg:fixed lg:h-[calc(100vh-6rem)] lg:overflow-y-auto section-no-scrollbar">
          {/* Mobile Horizontal Scroll */}
          <div className="lg:hidden flex overflow-x-auto p-4 space-x-2 border-b border-slate-800/50 section-no-scrollbar">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all font-medium ${
                  activeSection === section.id
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-800/20'
                }`}
              >
                <span className={activeSection === section.id ? 'text-violet-400' : 'text-slate-500'}>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop Vertical List */}
          <div className="hidden lg:block p-6 lg:pr-8 space-y-2 lg:border-r border-slate-800/50 min-h-full">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 pl-4 mt-4">Topics</h3>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm text-left transition-all font-medium group ${
                  activeSection === section.id
                    ? 'bg-violet-500/10 text-white border border-violet-500/20 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <div className={`transition-colors ${activeSection === section.id ? 'text-violet-400' : 'text-slate-500 group-hover:text-violet-400'}`}>
                  {section.icon}
                </div>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Documentation Content Area */}
        <div className="flex-1 p-6 lg:pl-80 lg:py-10 max-w-4xl max-w-full">
          
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">What is LARRY?</h1>
                <p className="text-slate-400 text-lg">A powerful primitive for maximizing yield logic on the Base network.</p>
              </div>

              <div className="glass-panel p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Mission Brief</h2>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  LARRY is a smart token built on Ethereum Layer 2 designed to multiply your underlying portfolio exposure securely. By providing collateral-backed borrowing logic paired with an algorithmic price preservation mechanism, the LARRY protocol enables deep leverage while minimizing liquidation tail risks.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
                    <h3 className="text-emerald-400 font-bold mb-3 flex items-center text-sm"><ShieldCheck className="w-4 h-4 mr-2" /> Protocol Strengths</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li>• Strict price preservation models</li>
                      <li>• Deep collateralization (up to 99% logic allows)</li>
                      <li>• Built-in leverage compounding features</li>
                      <li>• Auto-accruing holder value over time</li>
                    </ul>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5">
                    <h3 className="text-rose-400 font-bold mb-3 flex items-center text-sm"><Activity className="w-4 h-4 mr-2" /> Key Distinctives</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li>• No erratic wick liquidations</li>
                      <li>• Simple and intuitive interface</li>
                      <li>• Non-custodial mechanics</li>
                      <li>• Advanced transparent logic</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Getting Started Section */}
          {activeSection === 'getting-started' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Getting Started</h1>
                <p className="text-slate-400 text-lg">Your path to mastering the Base leverage engine.</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    step: '1', title: 'Connect Web3 Wallet', color: 'violet', 
                    content: 'Ensure you are connected to the Base app network utilizing Metamask, Rabby, or Coinbase Wallet. Provide ETH for gas.'
                  },
                  {
                    step: '2', title: 'Acquire LARRY', color: 'blue',
                    content: 'Move to the Trading page and convert ETH directly to LARRY token to access the algorithmic up-only value tracking mechanism.'
                  },
                  {
                    step: '3', title: 'Establish Collateral', color: 'emerald',
                    content: 'With LARRY positioned in your wallet, utilize the leverage tools to access ETH debt securely. Start modestly.'
                  }
                ].map((s) => (
                  <div key={s.step} className="glass-panel p-6 flex gap-6 items-start">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-${s.color}-500/10 border border-${s.color}-500/20 flex flex-col items-center justify-center font-bold text-${s.color}-400 text-xl`}>
                      {s.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{s.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How It Works Section */}
          {activeSection === 'how-it-works' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h1>
                <p className="text-slate-400 text-lg">Underlying logic to compound and preserve value.</p>
              </div>

              <div className="glass-panel p-8">
                <h2 className="text-xl font-bold text-white mb-4">Algorithmic Base Backing</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  The primary directive of LARRY is preventing downside slippage effectively. Any transaction processing through the primary node ensures standard deflationary mechanics trigger.
                </p>

                <FlowDiagram
                  title="Preservation Workflow Structure"
                  nodes={[
                    { id: 'tx', label: 'Transaction Trigger', type: 'user', description: 'Trade Occurs' },
                    { id: 'math', label: 'Logic Evaluation', type: 'system', description: 'Slippage Verify' },
                    { id: 'backing', label: 'Treasury Backing', type: 'contract', description: 'Reserves Up' },
                    { id: 'appreciation', label: 'Unit Gain', type: 'reward', description: 'Floor Raised' }
                  ]}
                  connections={[
                    { from: 'tx', to: 'math' },
                    { from: 'math', to: 'backing' },
                    { from: 'backing', to: 'appreciation' }
                  ]}
                  note="Protocol mathematics assure backing is injected symmetrically, preserving base collateral evaluations per token unit."
                />
              </div>

              <div className="glass-panel p-8">
                <h2 className="text-xl font-bold text-white mb-4">The Leverage Flywheel Matrix</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  Once users secure liquidity against LARRY, subsequent iteration compounds the net notional values immediately. 
                </p>

                <FlowDiagram
                  title="Infinite Flywheel Architecture"
                  nodes={[
                    { id: 'start', label: 'Initialize ETH', type: 'user', description: 'Root Asset' },
                    { id: 'larry', label: 'Exchange Asset', type: 'contract', description: 'Acquire Tokens' },
                    { id: 'debt', label: 'Incur Debt', type: 'system', description: 'Mint ~99% ETH' },
                    { id: 'loop', label: 'Repeat Cycle', type: 'reward', description: 'Increase Target' }
                  ]}
                  connections={[
                    { from: 'start', to: 'larry' },
                    { from: 'larry', to: 'debt' },
                    { from: 'debt', to: 'loop' }
                  ]}
                  note="Collateral looping facilitates massive scale in market tracking while mitigating hard margin call logic."
                />
              </div>
            </div>
          )}

          {/* Borrowing Details Section */}
          {activeSection === 'borrowing' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Borrowing Interfaces</h1>
                <p className="text-slate-400 text-lg">Mastering margin lines and position durations.</p>
              </div>

              <div className="glass-panel p-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center"><Activity className="w-5 h-5 mr-3 text-blue-400" /> Primary Attributes</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CornerDownRight className="w-4 h-4 text-slate-500 mr-2 mt-1" />
                        <div>
                          <strong className="text-slate-200 block">Up to 99% Loaning Value</strong>
                          <span className="text-xs text-slate-400">Maximize structural leverage limits natively.</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CornerDownRight className="w-4 h-4 text-slate-500 mr-2 mt-1" />
                        <div>
                          <strong className="text-slate-200 block">Abstract Interest (3.9% Net)</strong>
                          <span className="text-xs text-slate-400">Favorable long-carry debt logic configurations.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                    <h3 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">Example Simulation</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Position Collateral</span>
                        <span className="text-white font-mono">1,000 LARRY</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Max Debt Boundary</span>
                        <span className="text-violet-400 font-mono">~990 ETH</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-slate-400">Nominal Target Span</span>
                        <span className="text-emerald-400 font-mono">1 - 365 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex justify-end">
            <button
               onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex < sections.length - 1) setActiveSection(sections[currentIndex + 1].id);
                  else setActiveSection(sections[0].id);
               }}
               className="group flex items-center space-x-3 text-slate-400 hover:text-white transition-colors"
            >
              <span>Next Topic</span>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}