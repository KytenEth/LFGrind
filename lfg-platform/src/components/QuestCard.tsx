import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types/task';
import { formatDate } from '../utils/dateUtils';

interface QuestCardProps {
  task: Task;
  onClick: () => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ task, onClick }) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'open':
        return 'var(--cyber-success)';
      case 'in_progress':
        return 'var(--cyber-cyan)';
      case 'completed':
        return 'var(--cyber-blue)';
      case 'cancelled':
        return 'var(--cyber-red)';
      default:
        return 'var(--cyber-gray)';
    }
  };

  const getTaskIcon = (task: Task) => {
    if (task.type === 'quest') {
      switch (task.category) {
        case 'coding':
          return '💻';
        case 'design':
          return '🎨';
        case 'testing':
          return '🔍';
        case 'management':
          return '📊';
        default:
          return '❓';
      }
    } else {
      switch (task.priority) {
        case 'urgent':
          return '🔥';
        case 'high':
          return '⚡';
        case 'medium':
          return '⚪';
        case 'low':
          return '🔵';
        default:
          return '❓';
      }
    }
  };

  return (
    <motion.div
      className="quest-card"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="quest-card-header">
        <span className="task-icon">{getTaskIcon(task)}</span>
        <h3 className="task-title">{task.title}</h3>
        <div 
          className="status-indicator" 
          style={{ backgroundColor: getStatusColor(task.status) }}
        >
          {task.status.replace('_', ' ')}
        </div>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-rewards">
        <span className="xp-reward">⚡ {task.xpReward} XP</span>
        <span className="gc-reward">💎 {task.gcReward} GC</span>
      </div>

      <div className="task-meta">
        <span className="due-date">Due: {formatDate(task.dueDate)}</span>
        {task.type === 'bounty' && (
          <span className="budget">Budget: ${task.budget}</span>
        )}
        {task.type === 'quest' && (
          <span className="estimated-time">
            Est. {task.estimatedHours}h
          </span>
        )}
      </div>
    </motion.div>
  );
}; 