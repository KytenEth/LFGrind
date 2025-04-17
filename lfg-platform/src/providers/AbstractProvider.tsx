import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig } from 'wagmi';
import { abstractTestnet } from 'viem/chains';
import { http } from 'viem';
import { AbstractWalletProvider } from '@abstract-foundation/agw-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const config = createConfig({
  chains: [abstractTestnet],
  transports: {
    [abstractTestnet.id]: http()
  }
});

export function AbstractAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AbstractWalletProvider chain={abstractTestnet}>
          {children}
        </AbstractWalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 