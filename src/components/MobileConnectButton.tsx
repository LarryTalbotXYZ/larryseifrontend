'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function MobileConnectButton() {
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
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
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
                    <span className="hidden sm:inline">Wrong Network</span>
                    <span className="sm:hidden">Network</span>
                  </button>
                );
              }

              return (
                <div className="flex items-center space-x-2 bg-slate-800/60 p-1 sm:p-1.5 rounded-xl border border-slate-700/50 backdrop-blur-md">
                  {chain.hasIcon && (
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden ml-1 hidden sm:block"
                      style={{
                        background: chain.iconBackground,
                      }}
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  )}

                  <button
                    onClick={openAccountModal}
                    className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 px-3 py-1.5 sm:py-1.5 rounded-lg font-medium text-xs sm:text-sm transition-all"
                  >
                    <span className="sm:hidden">
                      {account.address.slice(0, 4)}...{account.address.slice(-4)}
                    </span>
                    <span className="hidden sm:inline">
                      {account.displayName}
                    </span>
                  </button>

                  {account.displayBalance && (
                    <div className="text-violet-300 font-medium text-xs sm:text-sm hidden sm:block px-2">
                      {account.displayBalance}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}