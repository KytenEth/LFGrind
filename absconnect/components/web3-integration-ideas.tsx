"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Idea = {
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
}

const WEB3_IDEAS: Idea[] = [
  // ERC20 Token Ideas
  {
    title: "Token Creator",
    description: "Build a simple interface for creating and deploying custom ERC20 tokens without coding knowledge.",
    difficulty: "Beginner",
    category: "ERC20",
  },
  {
    title: "Token Vesting Dashboard",
    description:
      "Create a dashboard for managing token vesting schedules for team, investors, and community allocations.",
    difficulty: "Intermediate",
    category: "ERC20",
  },
  {
    title: "Token Airdrop Tool",
    description: "Build a tool for conducting token airdrops to multiple addresses with verification and tracking.",
    difficulty: "Beginner",
    category: "ERC20",
  },
  {
    title: "Token Governance System",
    description: "Create a governance system where token holders can vote on proposals proportional to their holdings.",
    difficulty: "Intermediate",
    category: "ERC20",
  },
  {
    title: "Token Staking Platform",
    description: "Build a platform where users can stake tokens to earn rewards or participate in governance.",
    difficulty: "Intermediate",
    category: "ERC20",
  },
  {
    title: "Token Burn Dashboard",
    description: "Create a dashboard for tracking token burns and their impact on circulating supply.",
    difficulty: "Beginner",
    category: "ERC20",
  },
  {
    title: "Token Distribution Platform",
    description: "Build a platform for conducting fair token launches with various distribution mechanisms.",
    difficulty: "Advanced",
    category: "ERC20",
  },
  {
    title: "Token Swap Interface",
    description: "Create a simple interface for swapping between different ERC20 tokens.",
    difficulty: "Beginner",
    category: "ERC20",
  },
  {
    title: "Token Analytics Dashboard",
    description: "Build a dashboard for tracking token metrics like price, volume, holders, and transactions.",
    difficulty: "Intermediate",
    category: "ERC20",
  },
  {
    title: "Token Lockup Manager",
    description: "Create a tool for managing token lockups with time-based or condition-based unlocking.",
    difficulty: "Intermediate",
    category: "ERC20",
  },
  {
    title: "Token Faucet",
    description: "Build a faucet for distributing small amounts of tokens for testing purposes.",
    difficulty: "Beginner",
    category: "ERC20",
  },
  {
    title: "Token Streaming Payments",
    description:
      "Create a system for streaming token payments continuously over time rather than in discrete transfers.",
    difficulty: "Advanced",
    category: "ERC20",
  },
  {
    title: "Token-Gated Content Platform",
    description: "Build a platform where content access is gated behind token ownership or staking.",
    difficulty: "Intermediate",
    category: "ERC20",
  },
  {
    title: "Token Rewards System",
    description: "Create a system for rewarding users with tokens for completing tasks or participating in activities.",
    difficulty: "Intermediate",
    category: "ERC20",
  },
  {
    title: "Token Subscription Service",
    description:
      "Build a subscription service where users pay with tokens for recurring access to content or services.",
    difficulty: "Intermediate",
    category: "ERC20",
  },

  // Casual Games
  {
    title: "Blockchain Tic-Tac-Toe",
    description:
      "Create a simple tic-tac-toe game where moves are recorded on-chain and winners receive token rewards.",
    difficulty: "Beginner",
    category: "Games",
  },
  {
    title: "NFT Rock-Paper-Scissors",
    description: "Build a rock-paper-scissors game where players use NFT items with special properties.",
    difficulty: "Beginner",
    category: "Games",
  },
  {
    title: "On-Chain Hangman",
    description: "Create a hangman word guessing game with on-chain verification and token rewards.",
    difficulty: "Beginner",
    category: "Games",
  },
  {
    title: "Blockchain Trivia Game",
    description: "Build a trivia game where questions and answers are stored on-chain and winners earn tokens.",
    difficulty: "Intermediate",
    category: "Games",
  },
  {
    title: "NFT Memory Match Game",
    description: "Create a memory matching game where cards are NFTs that players can collect by winning.",
    difficulty: "Intermediate",
    category: "Games",
  },
  {
    title: "Blockchain Word Puzzle",
    description: "Build a word puzzle game where solutions are verified on-chain and reward tokens.",
    difficulty: "Intermediate",
    category: "Games",
  },
  {
    title: "On-Chain Battleship",
    description:
      "Create a battleship game where ship positions are committed to the blockchain with zero-knowledge proofs.",
    difficulty: "Advanced",
    category: "Games",
  },
  {
    title: "NFT Puzzle Game",
    description: "Build a puzzle game where completing puzzles unlocks pieces of an NFT collection.",
    difficulty: "Intermediate",
    category: "Games",
  },
  {
    title: "Blockchain Minesweeper",
    description: "Create a minesweeper game where the board is generated on-chain for provable fairness.",
    difficulty: "Intermediate",
    category: "Games",
  },
  {
    title: "Token-Powered Snake Game",
    description: "Build a snake game where players can spend tokens for power-ups and earn by achieving high scores.",
    difficulty: "Beginner",
    category: "Games",
  },

  // Card Games
  {
    title: "Blockchain Poker",
    description: "Create a poker game with on-chain shuffling and dealing for provable fairness.",
    difficulty: "Advanced",
    category: "Card Games",
  },
  {
    title: "NFT Collectible Card Game",
    description: "Build a collectible card game where cards are NFTs with unique properties and abilities.",
    difficulty: "Advanced",
    category: "Card Games",
  },
  {
    title: "On-Chain Blackjack",
    description: "Create a blackjack game with provably fair card dealing and token betting.",
    difficulty: "Intermediate",
    category: "Card Games",
  },
  {
    title: "Blockchain Solitaire",
    description: "Build a solitaire game where completed games are verified on-chain and reward tokens.",
    difficulty: "Intermediate",
    category: "Card Games",
  },
  {
    title: "NFT Card Battler",
    description: "Create a card battling game where cards are NFTs with stats that evolve based on battle outcomes.",
    difficulty: "Advanced",
    category: "Card Games",
  },
  {
    title: "On-Chain Uno",
    description: "Build an Uno-style card game with on-chain verification and multiplayer functionality.",
    difficulty: "Intermediate",
    category: "Card Games",
  },
  {
    title: "Blockchain Hearts",
    description: "Create a hearts card game with provably fair card distribution and token rewards.",
    difficulty: "Intermediate",
    category: "Card Games",
  },
  {
    title: "NFT Trading Card Marketplace",
    description:
      "Build a marketplace specifically for trading card NFTs with features like pack opening and collections.",
    difficulty: "Advanced",
    category: "Card Games",
  },
  {
    title: "On-Chain Gin Rummy",
    description: "Create a gin rummy game with blockchain-based verification and token wagering.",
    difficulty: "Intermediate",
    category: "Card Games",
  },
  {
    title: "Blockchain Card Deck Generator",
    description:
      "Build a tool for generating provably fair card decks for various card games using blockchain randomness.",
    difficulty: "Intermediate",
    category: "Card Games",
  },

  // DeFi Ideas
  {
    title: "Token Swap Interface",
    description:
      "Create a simple interface for swapping tokens using a DEX protocol like Uniswap or Abstract's liquidity pools.",
    difficulty: "Beginner",
    category: "DeFi",
  },
  {
    title: "Yield Farming Dashboard",
    description:
      "Build a dashboard that shows available yield farming opportunities and expected APYs across different protocols.",
    difficulty: "Intermediate",
    category: "DeFi",
  },
  {
    title: "Lending & Borrowing Platform",
    description:
      "Develop a platform where users can lend their assets to earn interest or borrow assets by providing collateral.",
    difficulty: "Advanced",
    category: "DeFi",
  },
  {
    title: "Liquidity Pool Visualizer",
    description:
      "Create a tool that visualizes liquidity pools, their compositions, and impermanent loss calculations.",
    difficulty: "Intermediate",
    category: "DeFi",
  },
  {
    title: "Staking Interface",
    description: "Build an interface for staking tokens to earn rewards or participate in network security.",
    difficulty: "Beginner",
    category: "DeFi",
  },
  {
    title: "Automated Portfolio Rebalancer",
    description: "Create a tool that automatically rebalances a user's portfolio based on predefined allocations.",
    difficulty: "Advanced",
    category: "DeFi",
  },
  {
    title: "Flash Loan Arbitrage Bot",
    description: "Develop a bot that identifies and executes arbitrage opportunities using flash loans.",
    difficulty: "Advanced",
    category: "DeFi",
  },
  {
    title: "Decentralized Insurance Platform",
    description:
      "Build a platform for users to purchase insurance against smart contract failures or other crypto risks.",
    difficulty: "Advanced",
    category: "DeFi",
  },
  {
    title: "Synthetic Assets Exchange",
    description: "Create an exchange for trading synthetic assets that track the price of real-world assets.",
    difficulty: "Advanced",
    category: "DeFi",
  },
  {
    title: "Collateralized Debt Position (CDP) Manager",
    description: "Build a tool for managing CDPs, allowing users to mint stablecoins against their collateral.",
    difficulty: "Intermediate",
    category: "DeFi",
  },

  // GamblingFi Ideas
  {
    title: "Decentralized Lottery",
    description: "Create a transparent lottery system where winners are selected using verifiable random functions.",
    difficulty: "Intermediate",
    category: "GamblingFi",
  },
  {
    title: "Prediction Markets",
    description: "Build a platform where users can create and participate in prediction markets on various outcomes.",
    difficulty: "Advanced",
    category: "GamblingFi",
  },
  {
    title: "On-chain Poker Game",
    description: "Develop a poker game that runs entirely on-chain with provable fairness.",
    difficulty: "Advanced",
    category: "GamblingFi",
  },
  {
    title: "Sports Betting Platform",
    description: "Create a decentralized sports betting platform with oracle integration for results.",
    difficulty: "Advanced",
    category: "GamblingFi",
  },
  {
    title: "Dice Rolling Game",
    description: "Build a simple dice game with provably fair outcomes using blockchain randomness.",
    difficulty: "Beginner",
    category: "GamblingFi",
  },
  {
    title: "Coin Flip dApp",
    description: "Create a simple coin flip game with 50/50 odds and instant payouts.",
    difficulty: "Beginner",
    category: "GamblingFi",
  },
  {
    title: "Decentralized Casino",
    description: "Build a full-featured casino with multiple games and provable fairness.",
    difficulty: "Advanced",
    category: "GamblingFi",
  },
  {
    title: "Blockchain Roulette",
    description: "Develop a roulette game with verifiable random outcomes on the blockchain.",
    difficulty: "Intermediate",
    category: "GamblingFi",
  },
  {
    title: "NFT Lottery",
    description: "Create a lottery where tickets are NFTs and winners receive special NFT rewards.",
    difficulty: "Intermediate",
    category: "GamblingFi",
  },
  {
    title: "Skill-Based Wagering Platform",
    description: "Build a platform where users can wager on skill-based games or competitions.",
    difficulty: "Advanced",
    category: "GamblingFi",
  },

  // SociFi (Social Finance) Ideas
  {
    title: "Social Token Platform",
    description: "Create a platform for creators to launch and manage their own social tokens.",
    difficulty: "Intermediate",
    category: "SociFi",
  },
  {
    title: "Decentralized Social Media",
    description: "Build a social media platform where users own their content as NFTs and can monetize engagement.",
    difficulty: "Advanced",
    category: "SociFi",
  },
  {
    title: "Community Treasury Management",
    description: "Develop a tool for DAOs to manage their treasury assets with community voting.",
    difficulty: "Intermediate",
    category: "SociFi",
  },
  {
    title: "Reputation-Based Lending",
    description: "Create a lending platform where loan terms are based on on-chain reputation and social connections.",
    difficulty: "Advanced",
    category: "SociFi",
  },
  {
    title: "Group Investment Clubs",
    description: "Build a platform for friends to pool funds and invest together in crypto assets.",
    difficulty: "Intermediate",
    category: "SociFi",
  },
  {
    title: "Content Monetization Platform",
    description: "Create a platform where creators can monetize content directly from their audience.",
    difficulty: "Intermediate",
    category: "SociFi",
  },
  {
    title: "Social Trading Platform",
    description: "Build a platform where users can follow and copy trades of successful traders.",
    difficulty: "Advanced",
    category: "SociFi",
  },
  {
    title: "Decentralized Dating App",
    description: "Create a dating app where user data is stored on-chain and matches are made using token incentives.",
    difficulty: "Advanced",
    category: "SociFi",
  },
  {
    title: "Community-Owned Marketplace",
    description: "Build a marketplace where governance and fees are controlled by the community.",
    difficulty: "Advanced",
    category: "SociFi",
  },
  {
    title: "Social Impact Funding Platform",
    description: "Create a platform for funding social impact projects with transparent tracking of funds.",
    difficulty: "Intermediate",
    category: "SociFi",
  },

  // NFT Ideas
  {
    title: "NFT Marketplace",
    description: "Build a marketplace for buying, selling, and trading NFTs with support for multiple collections.",
    difficulty: "Intermediate",
    category: "NFT",
  },
  {
    title: "NFT Minting dApp",
    description: "Create a simple interface for users to mint their own NFTs without coding knowledge.",
    difficulty: "Beginner",
    category: "NFT",
  },
  {
    title: "NFT Gallery",
    description: "Build a virtual gallery for displaying and showcasing NFT collections.",
    difficulty: "Intermediate",
    category: "NFT",
  },
  {
    title: "Dynamic NFTs",
    description: "Create NFTs that change based on external data or user interactions.",
    difficulty: "Advanced",
    category: "NFT",
  },
  {
    title: "NFT Lending Platform",
    description: "Build a platform where users can borrow against their NFTs or lend to earn interest.",
    difficulty: "Advanced",
    category: "NFT",
  },
  {
    title: "NFT Fractionalization",
    description: "Create a tool for fractionalizing expensive NFTs to allow partial ownership.",
    difficulty: "Advanced",
    category: "NFT",
  },
  {
    title: "NFT Royalty Tracker",
    description: "Build a dashboard for creators to track royalties earned from secondary sales of their NFTs.",
    difficulty: "Intermediate",
    category: "NFT",
  },
  {
    title: "NFT-Gated Content Platform",
    description: "Create a platform where content access is gated behind NFT ownership.",
    difficulty: "Intermediate",
    category: "NFT",
  },
  {
    title: "NFT Rarity Calculator",
    description: "Build a tool that analyzes and ranks NFTs based on trait rarity within a collection.",
    difficulty: "Intermediate",
    category: "NFT",
  },
  {
    title: "NFT-Based Game",
    description: "Create a game where NFTs are used as characters, items, or other in-game assets.",
    difficulty: "Advanced",
    category: "NFT",
  },

  // DAO Tools
  {
    title: "Governance Voting Interface",
    description: "Build a simple interface for DAO governance voting with proposal creation and voting.",
    difficulty: "Intermediate",
    category: "DAO",
  },
  {
    title: "DAO Treasury Dashboard",
    description: "Create a dashboard for tracking and visualizing DAO treasury assets and allocations.",
    difficulty: "Intermediate",
    category: "DAO",
  },
  {
    title: "Contributor Compensation System",
    description: "Build a system for managing and distributing compensation to DAO contributors.",
    difficulty: "Advanced",
    category: "DAO",
  },
  {
    title: "DAO Formation Wizard",
    description: "Create a tool that guides users through the process of creating their own DAO.",
    difficulty: "Intermediate",
    category: "DAO",
  },
  {
    title: "Multi-Signature Wallet Interface",
    description: "Build an interface for managing multi-signature wallets commonly used by DAOs.",
    difficulty: "Intermediate",
    category: "DAO",
  },

  // Infrastructure
  {
    title: "Blockchain Explorer",
    description: "Create a custom explorer for viewing transactions, blocks, and accounts on a specific chain.",
    difficulty: "Advanced",
    category: "Infrastructure",
  },
  {
    title: "Gas Fee Estimator",
    description: "Build a tool that estimates gas fees and suggests optimal transaction timing.",
    difficulty: "Intermediate",
    category: "Infrastructure",
  },
  {
    title: "Cross-Chain Bridge Interface",
    description: "Create an interface for transferring assets between different blockchains.",
    difficulty: "Advanced",
    category: "Infrastructure",
  },
  {
    title: "Wallet Transaction History Analyzer",
    description: "Build a tool that analyzes wallet transaction history and provides insights.",
    difficulty: "Intermediate",
    category: "Infrastructure",
  },
  {
    title: "Smart Contract Deployment Interface",
    description: "Create a user-friendly interface for deploying and interacting with smart contracts.",
    difficulty: "Intermediate",
    category: "Infrastructure",
  },

  // Identity & Privacy
  {
    title: "Decentralized Identity Solution",
    description: "Build a solution for managing decentralized identities and verifiable credentials.",
    difficulty: "Advanced",
    category: "Identity",
  },
  {
    title: "Zero-Knowledge Proof Authentication",
    description: "Create an authentication system using zero-knowledge proofs for privacy.",
    difficulty: "Advanced",
    category: "Identity",
  },
  {
    title: "Reputation System",
    description: "Build a decentralized reputation system based on on-chain activity and attestations.",
    difficulty: "Advanced",
    category: "Identity",
  },

  // Metaverse
  {
    title: "Virtual Land Marketplace",
    description: "Create a marketplace for buying, selling, and renting virtual land in the metaverse.",
    difficulty: "Advanced",
    category: "Metaverse",
  },
  {
    title: "Metaverse Avatar Creator",
    description: "Build a tool for creating and customizing avatars for use in the metaverse.",
    difficulty: "Intermediate",
    category: "Metaverse",
  },
  {
    title: "Virtual Event Platform",
    description: "Create a platform for hosting and attending events in the metaverse.",
    difficulty: "Advanced",
    category: "Metaverse",
  },

  // RealFi (Real World Assets)
  {
    title: "Tokenized Real Estate Platform",
    description: "Build a platform for fractional ownership of real estate through tokenization.",
    difficulty: "Advanced",
    category: "RealFi",
  },
  {
    title: "Carbon Credit Marketplace",
    description: "Create a marketplace for trading tokenized carbon credits and offsets.",
    difficulty: "Advanced",
    category: "RealFi",
  },
  {
    title: "Invoice Financing Platform",
    description: "Build a platform for businesses to get financing against their invoices through tokenization.",
    difficulty: "Advanced",
    category: "RealFi",
  },

  // Education
  {
    title: "Learn-to-Earn Platform",
    description: "Create a platform where users earn tokens for completing educational content about blockchain.",
    difficulty: "Intermediate",
    category: "Education",
  },
  {
    title: "Interactive Smart Contract Tutorial",
    description: "Build an interactive tutorial for learning to write and deploy smart contracts.",
    difficulty: "Intermediate",
    category: "Education",
  },
  {
    title: "Blockchain Simulation Tool",
    description: "Create a visual simulation tool that demonstrates how blockchain works.",
    difficulty: "Intermediate",
    category: "Education",
  },

  // Analytics
  {
    title: "DeFi Portfolio Tracker",
    description: "Build a dashboard for tracking DeFi investments across multiple protocols.",
    difficulty: "Intermediate",
    category: "Analytics",
  },
  {
    title: "Protocol Analytics Dashboard",
    description: "Create a dashboard for visualizing key metrics of DeFi protocols.",
    difficulty: "Advanced",
    category: "Analytics",
  },
  {
    title: "Whale Activity Monitor",
    description: "Build a tool that tracks and alerts on large transactions by 'whale' addresses.",
    difficulty: "Intermediate",
    category: "Analytics",
  },

  // Payments
  {
    title: "Crypto Payment Gateway",
    description: "Create a payment gateway for merchants to accept cryptocurrency payments.",
    difficulty: "Intermediate",
    category: "Payments",
  },
  {
    title: "Recurring Payment System",
    description: "Build a system for setting up and managing recurring cryptocurrency payments.",
    difficulty: "Intermediate",
    category: "Payments",
  },
  {
    title: "Cross-Border Remittance Solution",
    description: "Create a solution for sending money internationally using cryptocurrencies.",
    difficulty: "Intermediate",
    category: "Payments",
  },

  // Supply Chain
  {
    title: "Product Authenticity Verification",
    description: "Build a system for verifying product authenticity using blockchain and NFTs.",
    difficulty: "Advanced",
    category: "Supply Chain",
  },
  {
    title: "Supply Chain Tracking Platform",
    description: "Create a platform for tracking products through the supply chain with blockchain verification.",
    difficulty: "Advanced",
    category: "Supply Chain",
  },

  // Healthcare
  {
    title: "Medical Record Management",
    description: "Build a system for securely storing and sharing medical records using blockchain.",
    difficulty: "Advanced",
    category: "Healthcare",
  },
  {
    title: "Pharmaceutical Supply Chain Verification",
    description: "Create a system for verifying the authenticity of pharmaceuticals through the supply chain.",
    difficulty: "Advanced",
    category: "Healthcare",
  },

  // Energy
  {
    title: "Peer-to-Peer Energy Trading",
    description: "Build a platform for trading excess renewable energy with neighbors using blockchain.",
    difficulty: "Advanced",
    category: "Energy",
  },
  {
    title: "Carbon Footprint Tracking",
    description: "Create a system for tracking and offsetting carbon footprints using blockchain.",
    difficulty: "Advanced",
    category: "Energy",
  },

  // Gaming
  {
    title: "Play-to-Earn Game",
    description: "Build a game where players can earn cryptocurrency or NFTs through gameplay.",
    difficulty: "Advanced",
    category: "Gaming",
  },
  {
    title: "In-Game Asset Marketplace",
    description: "Create a marketplace for trading in-game assets as NFTs.",
    difficulty: "Intermediate",
    category: "Gaming",
  },
  {
    title: "On-Chain Game Mechanics",
    description: "Develop game mechanics that run entirely on-chain for transparency and fairness.",
    difficulty: "Advanced",
    category: "Gaming",
  },
]

export function Web3IntegrationIdeas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const categories = Array.from(new Set(WEB3_IDEAS.map((idea) => idea.category)))

  const filteredIdeas = WEB3_IDEAS.filter(
    (idea) =>
      (selectedCategory === null || idea.category === selectedCategory) &&
      (idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Web3 Integration Ideas</CardTitle>
        <CardDescription>Explore various web3 integration ideas for your next project</CardDescription>
        <div className="mt-4 space-y-4">
          <Input
            placeholder="Search ideas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredIdeas.map((idea, index) => (
            <Card key={index}>
              <CardHeader className="py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <CardTitle className="text-lg">{idea.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {idea.category}
                    </Badge>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full w-fit ${
                      idea.difficulty === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : idea.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {idea.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p>{idea.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
