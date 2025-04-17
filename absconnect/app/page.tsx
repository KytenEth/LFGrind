import { WalletConnect } from "@/components/wallet-connect"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Web3IntegrationIdeas } from "@/components/web3-integration-ideas"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Abstract Wallet Template</h1>
          </div>
          <div className="flex items-center gap-4">
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Abstract Global Wallet Integration</CardTitle>
              <CardDescription>
                A simple template for integrating Abstract Global Wallet with RainbowKit v2
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This template provides a minimal setup for integrating Abstract Global Wallet with your Next.js
                application. It includes:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>RainbowKit v2 integration</li>
                <li>Abstract Global Wallet connector</li>
                <li>Wagmi hooks for wallet interactions</li>
                <li>Responsive design with Tailwind CSS</li>
              </ul>
              <div className="flex gap-4">
                <a href="https://docs.abs.xyz/abstract-global-wallet/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Learn About Abstract</Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Clone this template</li>
                  <li>Add your WalletConnect Project ID to .env.local</li>
                  <li>Customize the UI to match your brand</li>
                  <li>Add your contract interactions</li>
                  <li>Build your dApp functionality</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Seamless wallet connection with RainbowKit UI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Abstract Global Wallet integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Multiple wallet options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Responsive design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>TypeScript support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Web3IntegrationIdeas />
        </div>
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>Abstract Global Wallet Integration Template</p>
            <p className="text-sm mt-2">Built with Next.js, RainbowKit, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
