'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

const seiNetwork = {
  id: 1329,
  name: 'Sei Network',
  iconUrl: 'https://assets.coingecko.com/coins/images/28205/large/Sei_Logo_-_Transparent.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://evm-rpc.sei-apis.com'] },
  },
  blockExplorers: {
    default: { name: 'Seitrace', url: 'https://seitrace.com' },
  },
  contracts: {
    larryTalbot: {
      address: '0x888d81e3ea5E8362B5f69188CBCF34Fa8da4b888' as `0x${string}`,
    },
  },
};

const config = getDefaultConfig({
  appName: 'Larry Talbot DeFi',
  projectId: 'e78d121a165909ad1ec1cd20c2af0f9a',
  chains: [seiNetwork],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}