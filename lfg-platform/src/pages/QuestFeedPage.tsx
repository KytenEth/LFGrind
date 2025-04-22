import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useOutletContext } from 'react-router-dom';
import { TabSelector } from '../components/shared/TabSelector';
import '../styles/quest-hub.css';

type TaskType = 'quest' | 'bounty';

interface BaseTask {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  xpReward: number;
  gcReward: number;
  createdBy: string;
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'complete' | 'claimed';
}

interface Quest extends BaseTask {
  type: 'quest';
  category: 'coding' | 'design' | 'testing' | 'management' | 'onboarding';
  sponsor?: string;
}

interface Bounty extends BaseTask {
  type: 'bounty';
  category: 'contractor';
  rewardPool: number;
  participants: string[];
}

type Task = Quest | Bounty;

interface LocationState {
  defaultTab?: 'all' | 'quests' | 'bounties';
  showActiveTasks?: boolean;
  activeTasks?: Task[];
}

interface QuestCardProps {
  task: Task;
  onClick: () => void;
  isActive: boolean;
}

const QuestCard: React.FC<QuestCardProps> = ({ task, onClick, isActive }) => {
  const getStatusColor = (status: Task['status']): string => {
    switch (status) {
      case 'not_started': return 'var(--cyber-gray)';
      case 'in_progress': return 'var(--cyber-cyan)';
      case 'complete': return 'var(--cyber-success)';
      case 'claimed': return 'var(--cyber-magenta)';
      default: return 'var(--cyber-gray)';
    }
  };

  return (
    <motion.div
      className={`quest-card ${isActive ? 'active' : ''}`}
      data-type={task.type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={false}
    >
      <div className="quest-card-header">
        <span className="task-type-icon">
          {task.type === 'quest' ? '⚡' : '💎'}
        </span>
        <h3 className="task-title">{task.title}</h3>
        {task.type === 'bounty' && (
          <span className="bounty-badge">🏆</span>
        )}
      </div>
      
      <div className="quest-card-rewards">
        <span className="reward xp">
          <span className="icon">⚡</span>
          {task.xpReward} XP
        </span>
        <span className="reward gc">
          <span className="icon">💎</span>
          {task.type === 'bounty' ? `${(task as Bounty).rewardPool} GC Pool` : `${task.gcReward} GC`}
        </span>
      </div>

      <div className="quest-card-meta">
        <span className="due-date">
          <span className="icon">⏳</span>
          {task.dueDate}
        </span>
        <span 
          className="status"
          data-status={task.status}
        >
          {task.status.replace('_', ' ')}
        </span>
      </div>
    </motion.div>
  );
};

interface QuestDetailViewProps {
  task: Task;
  onComplete?: () => void;
  onClaim?: () => void;
}

const QuestDetailView: React.FC<QuestDetailViewProps> = ({ task, onComplete, onClaim }) => {
  const getEstimatedTime = () => {
    return '30-45 min';
  };

  const getParticipantCount = () => {
    if (task.type === 'bounty') {
      return (task as Bounty).participants.length;
    }
    return 0;
  };

  const requirements = [
    { id: 'level', text: 'Level 5+', complete: true },
    { id: 'tutorial', text: 'Complete Tutorial Quest', complete: false }
  ];

  return (
    <motion.div
      className="quest-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="quest-detail-content">
        <div className="quest-detail-header">
          <div className="quest-detail-title-group">
            <div className="quest-detail-title">
              <h1>{task.title}</h1>
              <div className="quest-status-cluster">
                <div className={`quest-type-badge ${task.type}`}>
                  {task.type === 'quest' ? '⚡ Quest' : '🏆 Bounty'}
                </div>
              </div>
            </div>
            <div className="quest-meta-info">
              <div className="quest-meta-item">
                <span className="icon">⏳</span>
                <span>{task.dueDate}</span>
              </div>
              <div className="quest-meta-item">
                <span className="icon">👤</span>
                <span>Created by {task.createdBy}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quest-description">
          {task.description}
        </div>

        <div className="quest-panels">
          <div className="quest-panel">
            <div className="quest-panel-header">
              <span className="icon">💎</span>
              <h3>Rewards</h3>
            </div>
            <div className="rewards-grid">
              <div className="reward-item xp">
                <span className="icon">⚡</span>
                <div className="value">{task.xpReward}</div>
                <div className="label">XP</div>
              </div>
              <div className="reward-item gc">
                <span className="icon">💎</span>
                <div className="value">
                  {task.type === 'bounty' ? (task as Bounty).rewardPool : task.gcReward}
                </div>
                <div className="label">
                  {task.type === 'bounty' ? 'GC Pool' : 'GC'}
                </div>
              </div>
            </div>
          </div>

          <div className="quest-panel">
            <div className="quest-panel-header">
              <span className="icon">📋</span>
              <h3>Requirements</h3>
            </div>
            <ul className="requirements-list">
              {requirements.map(req => (
                <li 
                  key={req.id}
                  className={`requirement-item ${req.complete ? 'complete' : 'incomplete'}`}
                >
                  <span className="status-icon">
                    {req.complete ? '✓' : '!'}
                  </span>
                  {req.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="quest-detail-footer">
        <div className="quest-stats">
          <div className="quest-stat">
            <span className="icon">⏱️</span>
            <span>Est. Time: </span>
            <span className="value">{getEstimatedTime()}</span>
          </div>
          {task.type === 'bounty' && (
            <div className="quest-stat">
              <span className="icon">👥</span>
              <span>Participants: </span>
              <span className="value">{getParticipantCount()}</span>
            </div>
          )}
        </div>

        {task.status === 'not_started' && (
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="icon">⚡</span>
            Accept Task
          </motion.button>
        )}
        {task.status === 'in_progress' && (
          <motion.button
            className="action-button complete"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
          >
            <span className="icon">✓</span>
            Complete Task
          </motion.button>
        )}
        {task.status === 'complete' && (
          <motion.button
            className="action-button claim"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClaim}
          >
            <span className="icon">💎</span>
            Claim Rewards
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const QuestFeedPage: React.FC = () => {
  const location = useLocation();
  const { activeTasks: contextTasks, updateActiveTasks } = useOutletContext<{ 
    activeTasks: Task[],
    updateActiveTasks: (tasks: Task[]) => void 
  }>();
  const state = location.state as LocationState;
  const [selectedTab, setSelectedTab] = useState<'all' | 'quests' | 'bounties'>(state?.defaultTab || 'all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Generate 15 unique test tasks
    const testTasks: Task[] = [
      {
        id: 'quest_1',
        type: 'quest',
        title: 'Neural Network Basics',
        description: 'Learn and implement basic neural network architectures',
        xpReward: 300,
        gcReward: 150,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'not_started',
        category: 'coding'
      },
      {
        id: 'quest_2',
        type: 'quest',
        title: 'Smart Contract Security',
        description: 'Review and audit smart contract implementations',
        xpReward: 400,
        gcReward: 200,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'in_progress',
        category: 'coding'
      },
      {
        id: 'quest_3',
        type: 'quest',
        title: 'UI Component Library',
        description: 'Create reusable cyberpunk-themed UI components',
        xpReward: 250,
        gcReward: 125,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'not_started',
        category: 'design'
      },
      {
        id: 'quest_4',
        type: 'quest',
        title: 'API Integration',
        description: 'Implement blockchain data fetching and caching',
        xpReward: 350,
        gcReward: 175,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'not_started',
        category: 'coding'
      },
      {
        id: 'quest_5',
        type: 'quest',
        title: 'Performance Optimization',
        description: 'Optimize application performance and loading times',
        xpReward: 450,
        gcReward: 225,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'not_started',
        category: 'coding'
      },
      {
        id: 'quest_6',
        type: 'quest',
        title: 'Testing Framework',
        description: 'Set up and implement automated testing suite',
        xpReward: 300,
        gcReward: 150,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'not_started',
        category: 'testing'
      },
      {
        id: 'quest_7',
        type: 'quest',
        title: 'Documentation Update',
        description: 'Update and improve project documentation',
        xpReward: 200,
        gcReward: 100,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'not_started',
        category: 'management'
      },
      {
        id: 'quest_8',
        type: 'quest',
        title: 'Onboarding Flow',
        description: 'Design and implement new user onboarding',
        xpReward: 350,
        gcReward: 175,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'not_started',
        category: 'onboarding'
      },
      {
        id: 'bounty_1',
        type: 'bounty',
        title: 'DeFi Integration',
        description: 'Integrate multiple DeFi protocols',
        xpReward: 1000,
        gcReward: 500,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'not_started',
        category: 'contractor',
        rewardPool: 2000,
        participants: []
      },
      {
        id: 'bounty_2',
        type: 'bounty',
        title: 'Security Audit',
        description: 'Perform comprehensive security audit',
        xpReward: 800,
        gcReward: 400,
        createdBy: 'system',
        dueDate: '2024-12-31',
        status: 'in_progress',
        category: 'contractor',
        rewardPool: 1600,
        participants: []
      }
    ];

    // Combine tasks and remove duplicates based on id
    const allTasks = [
      ...(contextTasks || []),
      ...(state?.activeTasks || []),
      ...testTasks
    ];

    const uniqueTasks = Array.from(new Map(allTasks.map(task => [task.id, task])).values());
    setTasks(uniqueTasks);

    // Update active tasks in the dashboard
    const activeTasks = uniqueTasks.filter(task => 
      task.status === 'in_progress' || task.status === 'complete'
    );

    // Only update if we have active tasks
    if (updateActiveTasks) {
      updateActiveTasks(activeTasks);
    }
  }, [state?.activeTasks, contextTasks, updateActiveTasks]);

  // Filter tasks based on type and tab
  const filteredTasks = tasks.filter(task => {
    switch (selectedTab) {
      case 'quests':
        return task.type === 'quest';
      case 'bounties':
        return task.type === 'bounty';
      default:
        return true;
    }
  });

  // Filter active tasks
  const activeTasks = filteredTasks.filter(task => 
    task.status === 'in_progress' || task.status === 'complete'
  );

  // Filter open tasks
  const openTasks = filteredTasks.filter(task => 
    task.status === 'not_started'
  );

  const getParticipantCount = (task: Bounty) => {
    return task.participants.length;
  };

  return (
    <div className="quest-hub">
      <div className="quest-hub-sidebar">
        <div className="sidebar-header">
          <h2>Quest Hub</h2>
          <TabSelector
            options={[
              { id: 'all', label: 'All Tasks' },
              { id: 'quests', label: 'Quests' },
              { id: 'bounties', label: 'Bounties' }
            ]}
            selectedId={selectedTab}
            onChange={(id: string) => setSelectedTab(id as typeof selectedTab)}
          />
        </div>
        <div className="task-list">
          {activeTasks.length > 0 && (
            <div className="task-list-section">
              <div className="section-header">Active Tasks</div>
              {activeTasks.map((task) => (
                <QuestCard
                  key={task.id}
                  task={task}
                  onClick={() => setSelectedTask(task)}
                  isActive={selectedTask?.id === task.id}
                />
              ))}
            </div>
          )}
          
          {openTasks.length > 0 && (
            <div className="task-list-section">
              <div className="section-header">Available Tasks</div>
              {openTasks.map((task) => (
                <QuestCard
                  key={task.id}
                  task={task}
                  onClick={() => setSelectedTask(task)}
                  isActive={selectedTask?.id === task.id}
                />
              ))}
            </div>
          )}
          
          {filteredTasks.length === 0 && (
            <div className="empty-state">
              <div className="icon">📋</div>
              <p>No tasks available</p>
            </div>
          )}
        </div>
      </div>
      <div className="quest-hub-main">
        <AnimatePresence mode="wait">
          {selectedTask ? (
            <QuestDetailView
              key={selectedTask.id}
              task={selectedTask}
              onComplete={() => {
                const updatedTasks = tasks.map(t => 
                  t.id === selectedTask.id 
                    ? { ...t, status: 'complete' as const } 
                    : t
                );
                setTasks(updatedTasks);
                const newActiveTasks = updatedTasks.filter(task => 
                  task.status === 'in_progress' || task.status === 'complete'
                );
                if (updateActiveTasks) {
                  updateActiveTasks(newActiveTasks);
                }
                setSelectedTask(null);
              }}
              onClaim={() => {
                const updatedTasks = tasks.map(t => 
                  t.id === selectedTask.id 
                    ? { ...t, status: 'claimed' as const } 
                    : t
                );
                setTasks(updatedTasks);
                const newActiveTasks = updatedTasks.filter(task => 
                  task.status === 'in_progress' || task.status === 'complete'
                );
                if (updateActiveTasks) {
                  updateActiveTasks(newActiveTasks);
                }
                setSelectedTask(null);
              }}
            />
          ) : (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="icon">🎯</div>
              <p>Select a task to view details</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuestFeedPage; 