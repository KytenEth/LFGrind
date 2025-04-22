import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import '../styles/teams.css';

// Types
interface Team {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
  maxMembers: number;
  description: string;
  tags: string[];
  status: 'open' | 'invite_only' | 'full';
  level: number;
  activity: 'high' | 'medium' | 'low';
}

// Mock Data
const MOCK_TEAMS: Team[] = [
  {
    id: '1',
    name: 'Cyber Sentinels',
    icon: '🛡️',
    memberCount: 4,
    maxMembers: 6,
    description: 'Elite squad specializing in high-stakes bounties and cyber operations',
    tags: ['Bounty Hunters', 'Hackers'],
    status: 'open',
    level: 15,
    activity: 'high'
  },
  {
    id: '2',
    name: 'Neural Networks',
    icon: '🧠',
    memberCount: 3,
    maxMembers: 4,
    description: 'AI enthusiasts and blockchain developers pushing the boundaries',
    tags: ['Builders', 'AI'],
    status: 'invite_only',
    level: 12,
    activity: 'medium'
  },
  {
    id: '3',
    name: 'Quantum Raiders',
    icon: '⚛️',
    memberCount: 5,
    maxMembers: 5,
    description: 'Full-stack development team with a focus on quantum computing',
    tags: ['Builders', 'Hackers'],
    status: 'full',
    level: 20,
    activity: 'high'
  },
  {
    id: '4',
    name: 'Data Drifters',
    icon: '💾',
    memberCount: 2,
    maxMembers: 6,
    description: 'Specializing in data analysis and pattern recognition',
    tags: ['Data Science', 'AI'],
    status: 'open',
    level: 8,
    activity: 'medium'
  },
  {
    id: '5',
    name: 'Chain Breakers',
    icon: '⛓️',
    memberCount: 3,
    maxMembers: 4,
    description: 'Blockchain security experts and smart contract auditors',
    tags: ['Security', 'Blockchain'],
    status: 'invite_only',
    level: 18,
    activity: 'high'
  }
];

const TeamCard: React.FC<{
  team: Team;
  isCurrentTeam: boolean;
  onJoin: (teamId: string) => void;
  onRequestInvite: (teamId: string) => void;
}> = ({ team, isCurrentTeam, onJoin, onRequestInvite }) => {
  const getStatusColor = (status: Team['status']) => {
    switch (status) {
      case 'open': return 'var(--neon-green)';
      case 'invite_only': return 'var(--neon-yellow)';
      case 'full': return 'var(--neon-red)';
      default: return 'var(--neon-blue)';
    }
  };

  return (
    <motion.div
      className={`team-card ${isCurrentTeam ? 'current-team' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="team-header">
        <div className="team-icon">{team.icon}</div>
        <div className="team-info">
          <h3>{team.name}</h3>
          <div className="team-stats">
            <span className="member-count">
              {team.memberCount}/{team.maxMembers} members
            </span>
            <span className="team-level">Level {team.level}</span>
          </div>
        </div>
        <div 
          className="team-status"
          style={{ '--status-color': getStatusColor(team.status) } as any}
        >
          {team.status.replace('_', ' ')}
        </div>
      </div>
      
      <p className="team-description">{team.description}</p>
      
      <div className="team-tags">
        {team.tags.map(tag => (
          <span key={tag} className="team-tag">{tag}</span>
        ))}
      </div>

      <div className="team-actions">
        {isCurrentTeam ? (
          <button className="team-button member">Current Team</button>
        ) : team.status === 'open' ? (
          <button 
            className="team-button join"
            onClick={() => onJoin(team.id)}
          >
            Join Team
          </button>
        ) : team.status === 'invite_only' ? (
          <button 
            className="team-button request"
            onClick={() => onRequestInvite(team.id)}
          >
            Request Invite
          </button>
        ) : (
          <button className="team-button full" disabled>
            Team Full
          </button>
        )}
      </div>
    </motion.div>
  );
};

const TeamsPage: React.FC = () => {
  const { state } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activityFilter, setActivityFilter] = useState<string>('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Mock current team (replace with actual user state later)
  const currentTeamId = '1';

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MOCK_TEAMS.forEach(team => {
      team.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const filteredTeams = useMemo(() => {
    return MOCK_TEAMS.filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          team.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => team.tags.includes(tag));
      const matchesActivity = activityFilter === 'all' || team.activity === activityFilter;
      
      return matchesSearch && matchesTags && matchesActivity;
    });
  }, [searchTerm, selectedTags, activityFilter]);

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleJoinTeam = (teamId: string) => {
    // Add actual join team logic here
    showNotification('Successfully joined team!');
  };

  const handleRequestInvite = (teamId: string) => {
    // Add actual request invite logic here
    showNotification('Invite request sent!');
  };

  return (
    <div className="teams-page">
      <div className="teams-header">
        <h1>Squad Terminal</h1>
        <div className="search-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-section">
            <div className="tag-filters">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            <select
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="activity-filter"
            >
              <option value="all">All Activity Levels</option>
              <option value="high">High Activity</option>
              <option value="medium">Medium Activity</option>
              <option value="low">Low Activity</option>
            </select>
          </div>
        </div>
      </div>

      <div className="teams-grid">
        {filteredTeams.map(team => (
          <TeamCard
            key={team.id}
            team={team}
            isCurrentTeam={team.id === currentTeamId}
            onJoin={handleJoinTeam}
            onRequestInvite={handleRequestInvite}
          />
        ))}
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            className="toast-notification"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamsPage; 