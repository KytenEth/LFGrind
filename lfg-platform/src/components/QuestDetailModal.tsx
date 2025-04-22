import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../types/task';
import { formatDate } from '../utils/dateUtils';

interface QuestDetailModalProps {
  task: Task;
  onClose: () => void;
}

export const QuestDetailModal: React.FC<QuestDetailModalProps> = ({ task, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="quest-detail-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{task.title}</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>

          <div className="modal-content">
            <div className="task-info">
              <p className="task-description">{task.description}</p>
              
              <div className="task-details">
                <div className="detail-item">
                  <span className="label">Status:</span>
                  <span className="value">{task.status.replace('_', ' ')}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Due Date:</span>
                  <span className="value">{formatDate(task.dueDate)}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">XP Reward:</span>
                  <span className="value">{task.xpReward} XP</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">GC Reward:</span>
                  <span className="value">{task.gcReward} GC</span>
                </div>

                {task.type === 'bounty' && (
                  <>
                    <div className="detail-item">
                      <span className="label">Priority:</span>
                      <span className="value">{task.priority}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Budget:</span>
                      <span className="value">${task.budget}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Requirements:</span>
                      <ul className="requirements-list">
                        {task.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {task.type === 'quest' && (
                  <>
                    <div className="detail-item">
                      <span className="label">Category:</span>
                      <span className="value">{task.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Difficulty:</span>
                      <span className="value">{task.difficulty}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Estimated Time:</span>
                      <span className="value">{task.estimatedHours} hours</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button className="accept-button">Accept Task</button>
              <button className="cancel-button" onClick={onClose}>Cancel</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 