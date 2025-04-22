export interface User {
  id: string;
  walletAddress: string;
  nickname: string;
  classId: string;
  archetype: 'player' | 'contractor';
  roles: string[];
  level: number;
  experience: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  archetype: 'player' | 'contractor';
  abilities: Ability[];
  requirements: {
    level: number;
    items?: string[];
  };
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  manaCost: number;
  damage?: number;
  healing?: number;
  effects?: Effect[];
}

export interface Effect {
  type: 'buff' | 'debuff' | 'dot' | 'hot';
  duration: number;
  value: number;
  description: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable' | 'quest';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  stats?: {
    damage?: number;
    defense?: number;
    health?: number;
    mana?: number;
  };
  requirements?: {
    level: number;
    class?: string[];
  };
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'available' | 'in_progress' | 'completed';
  deadline?: Date;
  requirements?: {
    level: number;
    items?: string[];
  };
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  contractor: User;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  deadline: Date;
  requirements: {
    level: number;
    class?: string[];
    items?: string[];
  };
  applicants?: User[];
  assignedPlayer?: User;
}

export type NotificationType = 'quest' | 'mission' | 'system' | 'achievement';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: {
    questId?: string;
    missionId?: string;
    achievementId?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  completedAt?: Date;
}

export interface ChatMessage {
  id: string;
  sender: User;
  content: string;
  timestamp: Date;
  type: 'text' | 'system' | 'quest' | 'mission';
  data?: {
    questId?: string;
    missionId?: string;
  };
}

export interface TradeOffer {
  id: string;
  sender: User;
  receiver: User;
  items: {
    itemId: string;
    quantity: number;
  }[];
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface LeaderboardEntry {
  user: User;
  score: number;
  rank: number;
  change: number;
  stats: {
    questsCompleted: number;
    missionsCompleted: number;
    totalReward: number;
  };
} 