'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import MEME_ARTIFACT from '../tokenbackend/out/meme.sol/MEME.json';
import MobileConnectButton from '@/components/MobileConnectButton';
import { VideoLogo } from '@/components/VideoLogo';

export default function CreateLaunchPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="relative z-10 border-b border-green-500/30 bg-black/80 backdrop-blur-md">
        <div className="flex justify-between items-center p-4 sm:p-6 lg:px-12">
          <Link href="/launchpad" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
            <VideoLogo size="medium" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight font-mono text-white">LARRY</span>
              <span className="text-xs font-mono text-green-400">LAUNCH</span>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <MobileConnectButton />
          </div>
        </div>
      </nav>

      <main className="px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-mono font-bold text-green-400">Launch From Frontend</h1>
            <Link href="/launchpad" className="text-sm font-mono text-gray-300 hover:text-white border border-gray-700 rounded px-3 py-1">Back</Link>
          </div>
          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 sm:p-8">
            <p className="text-gray-300 text-sm font-mono text-center mb-6">Backed by LARRY at 0x888d81e3ea5E8362B5f69188CBCF34Fa8da4b888. Connect wallet above.</p>
            <SimpleLaunchForm />
          </div>
        </div>
      </main>
    </div>
  );
}

function SimpleLaunchForm() {
  const LARRY = '0x888d81e3ea5E8362B5f69188CBCF34Fa8da4b888';
  const [name, setName] = useState('My Meme');
  const [symbol, setSymbol] = useState('MYME');
  const [backingLarry, setBackingLarry] = useState('1');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [deployed, setDeployed] = useState<string | null>(null);
  const [larryBalance, setLarryBalance] = useState<string>('0');
  const [loadingBalance, setLoadingBalance] = useState(false);

  const autoSymbol = (n: string) => n.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase() || 'MEME';

  const handleName = (v: string) => {
    setName(v);
    if (!symbol || symbol === autoSymbol(name)) setSymbol(autoSymbol(v));
  };

  const fetchLarryBalance = async () => {
    try {
      setLoadingBalance(true);
      // @ts-ignore
      const { ethereum } = window as any;
      if (!ethereum) throw new Error('Wallet not found');
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const larryContract = new ethers.Contract(LARRY, [
        'function balanceOf(address owner) view returns (uint256)'
      ], provider);
      
      const balance = await larryContract.balanceOf(userAddress);
      const balanceFormatted = ethers.formatUnits(balance, 18);
      setLarryBalance(balanceFormatted);
    } catch (e: any) {
      console.error('Error fetching LARRY balance:', e);
      setLarryBalance('0');
    } finally {
      setLoadingBalance(false);
    }
  };

  const handleMaxClick = () => {
    if (larryBalance && parseFloat(larryBalance) > 0) {
      setBackingLarry(larryBalance);
    } else {
      fetchLarryBalance();
    }
  };

  // Fetch balance on component mount
  React.useEffect(() => {
    fetchLarryBalance();
  }, []);

  const deploy = async () => {
    try {
      setLoading(true);
      setStatus('Requesting wallet...');
      // @ts-ignore
      const { ethereum } = window as any;
      if (!ethereum) throw new Error('Wallet not found');
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const feeAddress = await signer.getAddress();

      setStatus('Deploying contract...');
      const factory = new ethers.ContractFactory((MEME_ARTIFACT as any).abi, (MEME_ARTIFACT as any).bytecode.object, signer);
      const feeData = await provider.getFeeData();
      const overrides: any = { gasLimit: ethers.toBeHex(7000000) };
      if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
        overrides.maxFeePerGas = feeData.maxFeePerGas;
        overrides.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
      }
      const contract = await factory.deploy(LARRY, name, symbol, overrides);
      await contract.waitForDeployment();
      const addr = await contract.getAddress();
      setDeployed(addr);

      const meme = new ethers.Contract(addr, (MEME_ARTIFACT as any).abi, signer);

      setStatus('Setting fee address...');
      const tx1 = await meme.setFeeAddress(feeAddress);
      await tx1.wait();

      setStatus('Approving LARRY backing...');
      const backingWei = ethers.parseUnits(backingLarry || '0', 18);
      const larry = new ethers.Contract(LARRY, [
        'function approve(address spender, uint256 value) public returns (bool)'
      ], signer);
      const tx2 = await larry.approve(addr, backingWei);
      await tx2.wait();

      setStatus('Starting trading...');
      const tx3 = await meme.setStart(backingWei, 0);
      await tx3.wait();

      setStatus('Done');
    } catch (e: any) {
      setStatus(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-mono text-gray-400">Token Name</label>
          <input value={name} onChange={(e) => handleName(e.target.value)} className="w-full bg-black/60 border border-gray-700 rounded px-3 py-2 text-sm font-mono" />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-mono text-gray-400">Token Symbol</label>
          <input value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} className="w-full bg-black/60 border border-gray-700 rounded px-3 py-2 text-sm font-mono" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="block text-xs font-mono text-gray-400">How Much LARRY to Put In?</label>
          <div className="flex gap-2">
            <input 
              value={backingLarry} 
              onChange={(e) => setBackingLarry(e.target.value)} 
              placeholder="e.g. 1" 
              className="flex-1 bg-black/60 border border-gray-700 rounded px-3 py-2 text-sm font-mono" 
            />
            <button
              type="button"
              onClick={handleMaxClick}
              disabled={loadingBalance}
              className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-400 text-sm font-mono rounded transition-all duration-200"
            >
              {loadingBalance ? '...' : 'MAX'}
            </button>
          </div>
          <p className="text-xs text-green-400 font-mono">
            {loadingBalance ? 'Loading balance...' : 
             larryBalance && parseFloat(larryBalance) > 0 ? 
             `Your LARRY balance: ${parseFloat(larryBalance).toLocaleString()} LARRY` :
             'Your LARRY balance: 0 LARRY (connect wallet to check)'}
          </p>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded p-3 mt-2">
            <p className="text-xs text-blue-200 font-mono mb-2">💡 <strong>What does this mean?</strong></p>
            <ul className="text-xs text-gray-300 font-mono space-y-1">
              <li>• <strong>Initial Backing:</strong> LARRY tokens you put in to start your meme token</li>
              <li>• <strong>Creator advantage:</strong> You get FREE tokens equal to your backing amount</li>
              <li>• <strong>More backing = better:</strong> Higher backing attracts buyers & makes price more stable</li>
              <li>• <strong>MAX button:</strong> Uses all your LARRY tokens for maximum profit potential</li>
              <li>• <strong>Buyers pay fees:</strong> All future buyers pay 2.5% trading fees, but you get your tokens for free!</li>
            </ul>
          </div>
        </div>
      </div>

      <button onClick={deploy} disabled={loading} className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-lg font-mono font-bold transition-all duration-300 border border-green-500/30">
        {loading ? 'Launching…' : 'Launch Token'}
      </button>

      {status && (
        <div className="text-sm font-mono text-gray-300">{status}{deployed ? ` — ${deployed}` : ''}</div>
      )}
    </div>
  );
}


