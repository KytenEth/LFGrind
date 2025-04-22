import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useQuests } from '../../contexts/QuestContext';
import { Quest } from '../../types';
import '../../styles/dashboard.css';

interface QuestWheelProps {
  onQuestSelect?: (quest: Quest) => void;
}

const QuestWheel: React.FC<QuestWheelProps> = ({ onQuestSelect }) => {
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [hoveredQuest, setHoveredQuest] = useState<Quest | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const { user } = useAuth();
  const { quests, loading } = useQuests();
  const navigate = useNavigate();

  useEffect(() => {
    if (quests) {
      const availableQuests = quests.filter(quest => 
        quest.status === 'available' && 
        (!quest.requirements || quest.requirements.level <= (user?.level || 1))
      );
      setActiveQuests(availableQuests.slice(0, 6));
    }
  }, [quests, user?.level]);

  const handleQuestClick = (quest: Quest) => {
    if (onQuestSelect) {
      onQuestSelect(quest);
    } else {
      navigate(`/quests/${quest.id}`);
    }
  };

  const getSegmentRotation = (index: number) => {
    return `${index * 60}deg`;
  };

  const getQuestStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'var(--cyber-neon)';
      case 'in_progress':
        return 'var(--cyber-blue)';
      case 'completed':
        return 'var(--cyber-lime)';
      default:
        return 'var(--cyber-light)';
    }
  };

  return (
    <div className="quest-wheel-container">
      <motion.div 
        className="quest-wheel"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotate: isScanning ? 360 : 0 
        }}
        transition={{ 
          duration: 0.5,
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <div className="quest-segments">
          {activeQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              className="quest-segment"
              style={{ 
                transform: `rotate(${getSegmentRotation(index)}) skewY(30deg)`,
                borderColor: getQuestStatusColor(quest.status)
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'rgba(0, 255, 194, 0.3)',
                boxShadow: '0 0 30px rgba(0, 255, 194, 0.4)'
              }}
              onHoverStart={() => setHoveredQuest(quest)}
              onHoverEnd={() => setHoveredQuest(null)}
              onClick={() => handleQuestClick(quest)}
            >
              <motion.div
                className="quest-segment-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>

        <div className="quest-count">
          <motion.div 
            className="quest-number"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {activeQuests.length}
          </motion.div>
          <div className="quest-label">Active Bounties</div>
        </div>
      </motion.div>

      <AnimatePresence>
        {hoveredQuest && (
          <motion.div
            className="quest-tooltip"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="quest-tooltip-title">{hoveredQuest.title}</div>
            <div className="quest-tooltip-reward">
              Reward: {hoveredQuest.reward}
            </div>
            <div className="quest-tooltip-status">
              Status: {hoveredQuest.status.replace('_', ' ')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestWheel; 