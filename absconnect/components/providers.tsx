"use client"

import type React from "react"
import { useState } from "react"
import { RainbowKitProvider, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit"
import { abstractWallet } from "@abstract-foundation/agw-react/connectors"
import { abstractTestnet, abstract } from "wagmi/chains"
import { createConfig, WagmiProvider } from "wagmi"
import { http } from "viem"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Get the project ID from environment variables
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ""

// Determine which chain to use based on environment
const chain = process.env.NEXT_PUBLIC_USE_TESTNET === "true" ? abstractTestnet : abstract

const connectors = connectorsForWallets(
  [
    {
      groupName: "Abstract",
      wallets: [abstractWallet],
    },
  ],
  {
    appName: "Abstract Wallet Demo",
    projectId,
    appDescription: "A simple template for integrating Abstract Global Wallet",
    appUrl: "",
  },
)

export const config = createConfig({
  connectors,
  chains: [chain],
  transports: {
    [chain.id]: http(),
  },
  ssr: true,
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} chains={[chain]}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
