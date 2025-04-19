// User Types

// User Profile - Editable attributes
export interface UserProfile {
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  discordId?: string;
  username: string;
  xHandle?: string;
  agwAddress?: string;
  otherWallets?: Wallet[];
  yearOfBirth?: number;
  country?: string;
  languages?: string[];
}

// Wallet information
export interface Wallet {
  address: string;
  chain: string;
  isConnected: boolean;
}

// User Roles
export enum UserRole {
  PLAYER = 'PLAYER',
  CONTRACTOR = 'CONTRACTOR',
  MANAGER = 'MANAGER'
}

// Player Class
export enum PlayerClass {
  CODER = 'CODER',
  UX_UI_DESIGNER = 'UX_UI_DESIGNER',
  TESTER = 'TESTER',
  PRODUCT_MANAGER = 'PRODUCT_MANAGER',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  CONTRACTOR = 'CONTRACTOR'
}

// Class Archetype
export enum ClassArchetype {
  WARRIOR = 'WARRIOR',
  ENGINEER = 'ENGINEER',
  NINJA = 'NINJA',
  SHARPSHOOTER = 'SHARPSHOOTER',
  HEALER = 'HEALER',
  MECHANIC = 'MECHANIC',
  SORCERER = 'SORCERER',
  HIVEMIND = 'HIVEMIND',
  TANK = 'TANK',
  MONK = 'MONK',
  ROYAL_COMMANDER = 'ROYAL_COMMANDER',
  ARCHITECT = 'ARCHITECT',
  MERCENARY = 'MERCENARY',
  CROWNFORGER = 'CROWNFORGER'
}

// Class information for a player
export interface PlayerClassInfo {
  class: PlayerClass;
  archetype: ClassArchetype;
  xp: number;
  level: number;
}

// Main User interface
export interface User {
  id: string;
  profile: UserProfile;
  roles: UserRole[];
  playerClasses?: PlayerClassInfo[];
  
  // System managed attributes
  globalXp: number;
  reputation: number;
  contractorReputation: number;
  
  // Authentication status
  isAuthenticated: boolean;
  isDiscordConnected: boolean;
  isXConnected: boolean;
  isAgwConnected: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// User authentication state
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// User actions
export interface UserActions {
  signIn: (credentials: any) => Promise<void>;
  signOut: () => Promise<void>;
  editProfile: (profile: Partial<UserProfile>) => Promise<void>;
  connectWallet: (wallet: Wallet) => Promise<void>;
  connectDiscord: () => Promise<void>;
  connectX: () => Promise<void>;
  activatePlayerMode: () => Promise<void>;
  activateContractorMode: () => Promise<void>;
  selectClass: (playerClass: PlayerClass, archetype: ClassArchetype) => Promise<void>;
  resetUser: () => void;
} 