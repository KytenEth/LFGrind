// Bounty Types

// Bounty Status
export enum BountyStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Bounty Difficulty
export enum BountyDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EXPERT = 'EXPERT'
}

// Bounty Participation Type
export enum BountyParticipationType {
  SOLO = 'SOLO',
  PARTY = 'PARTY',
  BOTH = 'BOTH'
}

// Bounty Reward
export interface BountyReward {
  amount: number;
  currency: string;
  tokens?: {
    amount: number;
    symbol: string;
  }[];
}

// Bounty Submission
export interface BountySubmission {
  id: string;
  bountyId: string;
  userId: string;
  squadId?: string;
  submissionUrl: string;
  description: string;
  submittedAt: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'WINNER';
}

// Main Bounty interface
export interface Bounty {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  reward: BountyReward;
  minParticipants: number;
  maxParticipants: number;
  
  // Manager defined attributes
  entryCost: number;
  difficultyLevel: BountyDifficulty;
  revisedReward?: BountyReward;
  participationType: BountyParticipationType;
  
  // System attributes
  status: BountyStatus;
  contractorId: string;
  submissions: BountySubmission[];
  winnerId?: string;
  
  // Blockchain attributes
  contractAddress?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Bounty actions
export interface BountyActions {
  createBounty: (bounty: Omit<Bounty, 'id' | 'status' | 'submissions' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateBounty: (id: string, bounty: Partial<Bounty>) => Promise<void>;
  deleteBounty: (id: string) => Promise<void>;
  submitBounty: (bountyId: string, submission: Omit<BountySubmission, 'id' | 'bountyId' | 'submittedAt' | 'status'>) => Promise<string>;
  selectWinner: (bountyId: string, submissionId: string) => Promise<void>;
  enrollInBounty: (bountyId: string, squadId?: string) => Promise<void>;
  claimBounty: (bountyId: string) => Promise<void>;
}

// Squad Types

// Squad Status
export enum SquadStatus {
  FORMING = 'FORMING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DISBANDED = 'DISBANDED'
}

// Squad Member
export interface SquadMember {
  userId: string;
  role: string;
  joinedAt: Date;
  isLeader: boolean;
}

// Squad Request
export interface SquadRequest {
  id: string;
  squadId: string;
  userId: string;
  message?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

// Main Squad interface
export interface Squad {
  id: string;
  name: string;
  description: string;
  bountyId?: string;
  members: SquadMember[];
  requests: SquadRequest[];
  status: SquadStatus;
  leaderId: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Squad actions
export interface SquadActions {
  createSquad: (squad: Omit<Squad, 'id' | 'members' | 'requests' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateSquad: (id: string, squad: Partial<Squad>) => Promise<void>;
  deleteSquad: (id: string) => Promise<void>;
  joinSquad: (squadId: string, userId: string, role: string) => Promise<void>;
  leaveSquad: (squadId: string, userId: string) => Promise<void>;
  requestJoinSquad: (squadId: string, userId: string, message?: string) => Promise<string>;
  respondToRequest: (requestId: string, status: 'APPROVED' | 'REJECTED') => Promise<void>;
  promoteToLeader: (squadId: string, userId: string) => Promise<void>;
} 