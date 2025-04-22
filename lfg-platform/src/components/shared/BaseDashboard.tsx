import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet, Routes, Route } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useLoginWithAbstract, useGlobalWalletSignerClient } from '@abstract-foundation/agw-react';
import { disconnectAbstractWallet } from '../../utils/walletUtils';
import { STORAGE_KEYS } from '../../constants/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaTrophy, FaUsers, FaBox, FaCog, FaSignOutAlt, FaGamepad } from 'react-icons/fa';
import '../../styles/dashboard.css';
import { XPBar } from './XPBar';

interface BaseDashboardProps {
  userType: 'player' | 'contractor';
}

type TaskType = 'quest' | 'bounty';

interface BaseTask {
  id: string;
  type: 'quest' | 'bounty';
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

interface TaskPreviewProps {
  task: Quest | Bounty;
  onSelect: (taskId: string) => void;
}

const TaskPreview: React.FC<TaskPreviewProps> = ({ task, onSelect }) => {
  const getStatusColor = (status: BaseTask['status']): string => {
    switch (status) {
      case 'not_started': return 'var(--cyber-gray)';
      case 'in_progress': return 'var(--cyber-cyan)';
      case 'complete': return 'var(--cyber-success)';
      case 'claimed': return 'var(--cyber-magenta)';
      default: return 'var(--cyber-gray)';
    }
  };

  const getTaskIcon = (task: Quest | Bounty): string => {
    if (task.type === 'bounty') {
      return '💎';
    }
    if (task.type === 'quest') {
      switch (task.category) {
        case 'onboarding': return '🎯';
        case 'usage': return '⚡';
        case 'exploration': return '🔍';
        default: return '📋';
      }
    }
    return '📋';
  };

  return (
    <motion.div
      className={`task-preview-card ${task.type}`}
      onClick={() => onSelect(task.id)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 20px var(--cyber-cyan-glow)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="task-header">
        <span className="task-icon">{getTaskIcon(task)}</span>
        <h3 className="task-title">{task.title}</h3>
        {task.type === 'bounty' && (
          <span className="bounty-badge">🏆 Bounty</span>
        )}
      </div>
      
      <div className="task-rewards">
        <span className="xp-reward">⚡ {task.xpReward} XP</span>
        <span className="gc-reward">
          💎 {task.type === 'bounty' ? `${task.rewardPool} GC Pool` : `${task.gcReward} GC`}
        </span>
      </div>

      <div className="task-meta">
        {task.dueDate && (
          <span className="due-date">⏳ {task.dueDate}</span>
        )}
        <div className="status-indicator" style={{ backgroundColor: getStatusColor(task.status) }}>
          {task.status.replace('_', ' ')}
        </div>
      </div>
    </motion.div>
  );
};

// Player HUD Component
export const PlayerHUD: React.FC = (): JSX.Element => {
  const { state } = useUser();
  const { user } = state;
  const playerClass = user?.playerClasses?.[0];
  const level = playerClass?.level || 1;
  const xpValue = playerClass?.xp || 7854;
  const totalXp = 15000;

  // Get user data from local storage
  const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  const storedData = userData ? JSON.parse(userData) : null;
  const nickname = storedData?.nickname || user?.profile?.username || 'Player';
  const selectedClass = storedData?.class || playerClass?.class || 'CYBER-MERC';
  const selectedArchetype = storedData?.archetype || playerClass?.archetype || 'WARRIOR';

  // Get the correct avatar image based on class and archetype
  const getAvatarImage = (classType: string): string => {
    // Class to archetype and image mapping
    const classMap: { [key: string]: { archetype: string; image: string } } = {
      'CODER': {
        archetype: 'NINJA',
        image: '/images/hamster-pfp/circular_neon_pfp_pfp_hamster_ninja.svg'
      },
      'UX_UI_DESIGNER': {
        archetype: 'MAGE',
        image: '/images/hamster-pfp/circular_neon_pfp_pfp_hamster_mage.svg'
      },
      'TESTER': {
        archetype: 'MONK',
        image: '/images/hamster-pfp/circular_neon_pfp_pfp_hamster_monk.svg'
      },
      'PROJECT_MANAGER': {
        archetype: 'COMMANDER',
        image: '/images/hamster-pfp/circular_neon_pfp_pfp_hamster_commander.svg'
      },
      'PRODUCT_MANAGER': {
        archetype: 'ARCHITECT',
        image: '/images/hamster-pfp/circular_neon_pfp_pfp_hamster_architect.svg'
      },
      'CONTRACTOR': {
        archetype: 'CONTRACTOR',
        image: '/images/hamster-pfp/circular_neon_pfp_pfp_hamster_contractor.svg'
      }
    };

    return classMap[classType]?.image || '/images/hamster-pfp/circular_neon_pfp_pfp_cyberpunk_hamster.svg';
  };

  return (
    <motion.div 
      className="player-hud"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="player-profile">
        <div className="player-avatar">
          <img 
            src={getAvatarImage(selectedClass)}
            alt={`${formatDisplayName(selectedClass)} Avatar`}
            className="avatar-image"
          />
        </div>
        <div className="player-info">
          <h3 className="player-name">{nickname}</h3>
          <span className="player-tier">Level {level} - {formatDisplayName(selectedClass)}</span>
        </div>
      </div>
      
      <XPBar
        currentXP={xpValue}
        maxXP={totalXp}
        level={level}
        role={selectedClass}
      />
      
      <div className="player-stats">
        <div className="stat-item">
          <span>🔥</span> <span>7</span> Daily Uplink
        </div>
        <div className="stat-item">
          <span>💰</span> <span>1,250</span> Vault Credit
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to format display names
const formatDisplayName = (name: string): string => {
  return name.replace(/_/g, ' ');
};

// Quest Wheel Component
export const QuestWheel: React.FC = (): JSX.Element => {
  const [activeQuests, setActiveQuests] = useState<number>(16);
  const [hoveredQuest, setHoveredQuest] = useState<number | null>(null);
  
  const questTypes = [
    { id: 1, type: 'Hack', reward: '500 XP', status: 'In Progress' },
    { id: 2, type: 'Infiltration', reward: '750 XP', status: 'Available' },
    { id: 3, type: 'Combat', reward: '1000 XP', status: 'Completed' },
    { id: 4, type: 'Data Recovery', reward: '600 XP', status: 'Available' },
    { id: 5, type: 'Sabotage', reward: '800 XP', status: 'In Progress' },
    { id: 6, type: 'Extraction', reward: '900 XP', status: 'Available' }
  ];
  
  return (
    <motion.div 
      className="quest-wheel-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="quest-wheel">
        <div className="quest-count">
          <motion.div 
            className="quest-number"
            key={activeQuests}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {activeQuests}
          </motion.div>
          <div className="quest-label">Active Bounties</div>
        </div>
        
        <div className="quest-segments">
          {questTypes.map((quest, index) => (
            <motion.div 
              key={quest.id}
              className={`quest-segment quest-segment-${index + 1}`}
              onHoverStart={() => setHoveredQuest(quest.id)}
              onHoverEnd={() => setHoveredQuest(null)}
              whileHover={{ scale: 1.05 }}
            >
              {hoveredQuest === quest.id && (
                <motion.div 
                  className="quest-tooltip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="quest-tooltip-title">{quest.type}</div>
                  <div className="quest-tooltip-reward">{quest.reward}</div>
                  <div className="quest-tooltip-status">{quest.status}</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Stat Module Component
export const StatModule: React.FC<{ 
  title: string; 
  value: string; 
  icon: string; 
  subtitle?: string;
}> = ({ 
  title, 
  value, 
  icon, 
  subtitle 
}): JSX.Element => {
  return (
    <motion.div 
      className="stat-module"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 0 15px rgba(0, 255, 194, 0.5), 0 0 30px rgba(0, 255, 194, 0.2)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="module-header">
        <div className="module-icon">{icon}</div>
        <div className="module-title">{title}</div>
      </div>
      <motion.div 
        className="module-value"
        key={value}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.div>
      {subtitle && <div className="module-subtitle">{subtitle}</div>}
    </motion.div>
  );
};

// Mascot Component
export const MascotPanel: React.FC = (): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  
  return (
    <motion.div 
      className="mascot-panel"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
    >
      <div className="mascot-frame">
        <div className="mascot-avatar">
          <img 
            src="/images/ai-hamster.png" 
            alt="AI Hamster" 
            className="mascot-image"
          />
        </div>
        <div className="mascot-name">AI Hamster</div>
      </div>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            className="mascot-tooltip"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="tooltip-content">
              <div className="tooltip-title">Mission Update</div>
              <div className="tooltip-message">
                New high-priority bounty available! Check the Quest Wheel for details.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DashboardHome: React.FC<{ userType: string; activeTasks: (Quest | Bounty)[]; handleTaskSelect: (taskId: string) => void }> = ({ 
  userType, 
  activeTasks, 
  handleTaskSelect 
}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <MascotPanel />
      <PlayerHUD />
      <div className="quest-section">
        <div className="active-tasks">
          {activeTasks.map(task => (
            <TaskPreview 
              key={task.id}
              task={task}
              onSelect={handleTaskSelect}
            />
          ))}
          <motion.div 
            className="more-tasks-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate(`/${userType}/quests`)}
          >
            View All Available Tasks
          </motion.div>
        </div>
        <QuestWheel />
      </div>
      <div className="stat-modules">
        <StatModule 
          title="Echo Logs" 
          value="24" 
          icon="✅" 
          subtitle="+3 this week"
        />
        <StatModule 
          title="Squad Members" 
          value="5" 
          icon="👥" 
          subtitle="2 online"
        />
        <StatModule 
          title="Vault Items" 
          value="12" 
          icon="🎒" 
          subtitle="3 new"
        />
        <StatModule 
          title="Grind Core XP" 
          value="85" 
          icon="⭐" 
          subtitle="Elite"
        />
      </div>
    </>
  );
};

const BaseDashboard: React.FC<BaseDashboardProps> = ({ userType }): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, actions } = useUser();
  const { logout } = useLoginWithAbstract();
  const { data: client } = useGlobalWalletSignerClient();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoggingOut(true);
      console.log('[Dashboard] Logout initiated');
      
      // Disconnect wallet
      console.log('[Dashboard] Disconnecting wallet');
      await disconnectAbstractWallet(logout as () => Promise<void>, client);
      console.log('[Dashboard] Wallet disconnected successfully');
      
      // Clean up Privy data
      console.log('[Dashboard] Cleaning up Privy data');
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_CLASS);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_ARCHETYPE);
      localStorage.removeItem(STORAGE_KEYS.NICKNAME);
      localStorage.removeItem(STORAGE_KEYS.WALLET_ADDRESS);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATE);
      
      // Reset user state
      console.log('[Dashboard] Resetting user context');
      actions.resetUser();
      
      // Navigate to landing page
      console.log('[Dashboard] Navigating to landing page');
      navigate('/');
    } catch (error) {
      console.error('[Dashboard] Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const isActive = (path: string): boolean => {
    return location.pathname === `/${userType}${path}`;
  };

  const [activeTasks] = useState<(Quest | Bounty)[]>([
    {
      id: '1',
      type: 'quest',
      title: 'DECRYPT NEURAL NETWORK',
      description: 'Master the basics of neural network architecture and implement a basic classification model',
      xpReward: 500,
      gcReward: 250,
      createdBy: 'system',
      dueDate: '2h 30m',
      status: 'in_progress',
      category: 'onboarding'
    },
    {
      id: '2',
      type: 'bounty',
      title: 'HACK MAINFRAME ACCESS',
      description: 'Complete the high-stakes mainframe security challenge with a team',
      xpReward: 750,
      gcReward: 400,
      createdBy: 'contractor',
      dueDate: '45m',
      status: 'not_started',
      category: 'contractor',
      rewardPool: 1000,
      participants: []
    }
  ]);

  const handleTaskSelect = (taskId: string) => {
    console.log('Selected task:', taskId);
  };

  return (
    <div className="dashboard">
      <div className="command-dock">
        <nav className="dock-nav">
          <motion.button 
            className={`dock-item ${isActive('') ? 'active' : ''}`}
            onClick={() => navigate(`/${userType}`)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/home-icon.png" alt="Home" className="icon" />
          </motion.button>

          <motion.button 
            className={`dock-item ${isActive('/quests') ? 'active' : ''}`}
            onClick={() => {
              navigate(`/${userType}/quests`, {
                state: { 
                  defaultTab: userType === 'contractor' ? 'bounties' : 'all',
                  showActiveTasks: true,
                  activeTasks: activeTasks
                }
              });
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 20px var(--cyber-cyan-glow)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/bounty-icon.png" alt="Quests & Bounties" className="icon" />
            {activeTasks.length > 0 && (
              <motion.div 
                className="task-notification"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 17 }}
              >
                {activeTasks.length}
              </motion.div>
            )}
          </motion.button>

          <motion.button 
            className={`dock-item ${isActive('/squad') ? 'active' : ''}`}
            onClick={() => navigate(`/${userType}/squad`)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/squads-icon.png" alt="Squad" className="icon" />
          </motion.button>

          <motion.button 
            className={`dock-item ${isActive('/inventory') ? 'active' : ''}`}
            onClick={() => navigate(`/${userType}/inventory`)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/inventory-icon.png" alt="Inventory" className="icon" />
          </motion.button>

          <motion.button 
            className={`dock-item ${isActive('/settings') ? 'active' : ''}`}
            onClick={() => navigate(`/${userType}/settings`)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/settings-icon.png" alt="Settings" className="icon" />
          </motion.button>

          <motion.button 
            className="dock-item logout" 
            onClick={handleLogout}
            disabled={isLoggingOut}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/log-out-icon.png" alt="Logout" className="icon" />
          </motion.button>
        </nav>
      </div>
      <div className="dashboard-content">
        {location.pathname === `/${userType}` ? (
          <DashboardHome 
            userType={userType} 
            activeTasks={activeTasks} 
            handleTaskSelect={handleTaskSelect} 
          />
        ) : (
          <Outlet context={{ activeTasks }} />
        )}
      </div>
    </div>
  );
};

export default BaseDashboard;