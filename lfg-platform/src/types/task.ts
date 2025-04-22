export type TaskType = 'quest' | 'bounty';

export interface BaseTask {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  xpReward: number;
  gcReward: number;
  createdBy: string;
  dueDate: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
}

export interface Quest extends BaseTask {
  type: 'quest';
  category: 'coding' | 'design' | 'testing' | 'management';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedHours: number;
}

export interface Bounty extends BaseTask {
  type: 'bounty';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  requirements: string[];
}

export type Task = Quest | Bounty; 