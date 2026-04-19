'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useBalance, useAccount } from 'wagmi';
import { formatUnits } from 'viem';

export default function MobileConnectButton() {
  const { address, chainId } = useAccount();
  const { data: balanceData } = useBalance({ address, chainId });

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="bg-violet-600 hover:bg-violet-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium text-sm transition-all shadow-md shadow-violet-500/20"
                  >
                    <span className="hidden sm:inline">Connect Wallet</span>
                    <span className="sm:hidden">Connect</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium text-sm transition-all border border-red-500/30"
                  >
                    Wrong Network ↕
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  {/* Chain switcher — clearly labeled */}
                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-500 text-slate-100 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all"
                    title="Switch network"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <div
                        className="w-4 h-4 rounded-full overflow-hidden shrink-0"
                        style={{ background: chain.iconBackground }}
                      >
                        <img alt={chain.name ?? 'Chain'} src={chain.iconUrl} className="w-full h-full" />
                      </div>
                    )}
                    <span>{chain.name ?? 'Network'}</span>
                    <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Account + balance */}
                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 text-slate-200 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all backdrop-blur-md"
                  >
                    <span className="sm:hidden">
                      {account.address.slice(0, 4)}...{account.address.slice(-4)}
                    </span>
                    <span className="hidden sm:inline">{account.displayName}</span>
                    {balanceData && (
                      <span className="hidden sm:inline text-violet-300 border-l border-slate-600 pl-2">
                        {parseFloat(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4)} {balanceData.symbol}
                      </span>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
