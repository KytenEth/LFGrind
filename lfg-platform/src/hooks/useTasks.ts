import { useState, useEffect } from 'react';
import { Task } from '../types/task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      type: 'quest',
      title: 'DECRYPT NEURAL NETWORK',
      description: 'Learn the basics of neural network architecture',
      xpReward: 500,
      gcReward: 250,
      createdBy: 'system',
      dueDate: '2024-04-01',
      status: 'open',
      category: 'coding',
      difficulty: 'easy',
      estimatedHours: 2
    },
    {
      id: '2',
      type: 'bounty',
      title: 'HACK MAINFRAME ACCESS',
      description: 'Complete the mainframe security challenge',
      xpReward: 750,
      gcReward: 400,
      createdBy: 'contractor',
      dueDate: '2024-04-15',
      status: 'open',
      priority: 'high',
      budget: 1000,
      requirements: ['Security clearance', 'Advanced hacking skills']
    }
  ]);

  return { tasks, setTasks };
}; 