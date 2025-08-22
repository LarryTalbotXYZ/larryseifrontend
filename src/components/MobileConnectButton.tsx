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
                    className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-mono font-bold text-xs sm:text-sm transition-all duration-300 border border-red-500/30"
                  >
                    <span className="hidden sm:inline">CONNECT_WALLET</span>
                    <span className="sm:hidden">CONNECT</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="bg-red-600 hover:bg-red-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-mono font-bold text-xs sm:text-sm transition-all duration-300 border border-red-500/30"
                  >
                    <span className="hidden sm:inline">WRONG_NETWORK</span>
                    <span className="sm:hidden">NETWORK</span>
                  </button>
                );
              }

              return (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {chain.hasIcon && (
                    <div
                      className="w-4 h-4 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-gray-600/30 hidden sm:block"
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
                    className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-2 sm:px-4 py-2 sm:py-3 rounded-lg font-mono font-bold text-xs sm:text-sm transition-all duration-300 border border-gray-600/30"
                  >
                    {/* Mobile: Show only first 4 and last 4 characters */}
                    <span className="sm:hidden">
                      {account.address.slice(0, 4)}...{account.address.slice(-4)}
                    </span>
                    {/* Desktop: Show more characters */}
                    <span className="hidden sm:inline">
                      {account.displayName || `${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
                    </span>
                  </button>

                  {account.displayBalance && (
                    <div className="text-white font-mono text-xs sm:text-sm hidden sm:block">
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