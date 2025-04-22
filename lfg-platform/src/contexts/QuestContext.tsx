import React, { createContext, useContext, useState, useEffect } from 'react';
import { Quest } from '../types';
import { useAuth } from './AuthContext';

interface QuestContextType {
  quests: Quest[];
  activeQuests: Quest[];
  loading: boolean;
  error: string | null;
  acceptQuest: (questId: string) => Promise<void>;
  completeQuest: (questId: string) => Promise<void>;
  refreshQuests: () => Promise<void>;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

// Mock quest data for demonstration
const mockQuests: Quest[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first quest to earn rewards!',
    reward: 100,
    difficulty: 'easy',
    status: 'available',
    requirements: {
      level: 1
    }
  },
  {
    id: '2',
    title: 'Gather Resources',
    description: 'Collect 10 wood and 5 stone',
    reward: 200,
    difficulty: 'medium',
    status: 'available',
    requirements: {
      level: 2,
      items: ['wood', 'stone']
    }
  },
  {
    id: '3',
    title: 'Defeat the Boss',
    description: 'Defeat the level 5 boss monster',
    reward: 500,
    difficulty: 'hard',
    status: 'available',
    requirements: {
      level: 5
    }
  }
];

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchQuests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      // For now, using mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      setQuests(mockQuests);
      
      // Filter active quests
      const active = mockQuests.filter(quest => quest.status === 'in_progress');
      setActiveQuests(active);
    } catch (err) {
      setError('Failed to fetch quests');
      console.error('Error fetching quests:', err);
    } finally {
      setLoading(false);
    }
  };

  const acceptQuest = async (questId: string) => {
    try {
      setError(null);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      setQuests(prevQuests => 
        prevQuests.map(quest => 
          quest.id === questId 
            ? { ...quest, status: 'in_progress' as const }
            : quest
        )
      );
      
      // Update active quests
      const updatedQuests = quests.map(quest => 
        quest.id === questId 
          ? { ...quest, status: 'in_progress' as const }
          : quest
      );
      setActiveQuests(updatedQuests.filter(quest => quest.status === 'in_progress'));
    } catch (err) {
      setError('Failed to accept quest');
      console.error('Error accepting quest:', err);
    }
  };

  const completeQuest = async (questId: string) => {
    try {
      setError(null);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      setQuests(prevQuests => 
        prevQuests.map(quest => 
          quest.id === questId 
            ? { ...quest, status: 'completed' as const }
            : quest
        )
      );
      
      // Update active quests
      setActiveQuests(prevActiveQuests => 
        prevActiveQuests.filter(quest => quest.id !== questId)
      );
    } catch (err) {
      setError('Failed to complete quest');
      console.error('Error completing quest:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchQuests();
    }
  }, [user]);

  const value = {
    quests,
    activeQuests,
    loading,
    error,
    acceptQuest,
    completeQuest,
    refreshQuests: fetchQuests
  };

  return (
    <QuestContext.Provider value={value}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuests = () => {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error('useQuests must be used within a QuestProvider');
  }
  return context;
}; 