import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../../types/task';
import { formatDate } from '../../utils/dateUtils';

interface TaskPreviewProps {
  task: Task;
  onClick?: () => void;
}

const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'open':
      return 'text-green-500';
    case 'in_progress':
      return 'text-yellow-500';
    case 'completed':
      return 'text-blue-500';
    case 'cancelled':
      return 'text-red-500';
    default:
      return 'text-gray-500';
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

export const TaskPreview: React.FC<TaskPreviewProps> = ({ task, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl" role="img" aria-label="task icon">
          {getTaskIcon(task)}
        </span>
        <span className={`text-sm font-medium ${getStatusColor(task.status)}`}>
          {task.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">{task.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">{task.xpReward} XP</span>
          <span className="text-green-500">{task.gcReward} GC</span>
        </div>
        <span className="text-gray-500">Due: {formatDate(task.dueDate)}</span>
      </div>

      {task.type === 'bounty' && (
        <div className="mt-2 text-sm">
          <span className="text-purple-500">Budget: ${task.budget}</span>
        </div>
      )}
      
      {task.type === 'quest' && (
        <div className="mt-2 text-sm">
          <span className="text-blue-500">
            Est. {task.estimatedHours} hour{task.estimatedHours !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </motion.div>
  );
}; 