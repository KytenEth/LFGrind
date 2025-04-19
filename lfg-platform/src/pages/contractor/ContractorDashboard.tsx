import React, { useState, useCallback } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../../constants/storage';
import { useLoginWithAbstract } from '@abstract-foundation/agw-react';
import { AuthBinding } from '../../components/AuthBinding';
import { FaHome, FaCrosshairs, FaUsers, FaBox, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/dashboard.css';

// Empty state component for logged out state
const LoggedOutState: React.FC<{ onGoToLanding: () => void }> = ({ onGoToLanding }) => {
  return (
    <div className="logged-out-container">
      <div className="logged-out-content">
        <h2>You have been logged out</h2>
        <p>Your wallet has been disconnected and all session data has been cleared.</p>
        <button 
          className="go-to-landing-button"
          onClick={onGoToLanding}
        >
          Go to Landing Page
        </button>
      </div>
    </div>
  );
};

// Command Dock Navigation
const CommandDock: React.FC = () => (
  <nav className="command-dock">
    <div className="dock-icon active">
      <FaHome size={24} />
    </div>
    <div className="dock-icon">
      <FaCrosshairs size={24} />
    </div>
    <div className="dock-icon">
      <FaUsers size={24} />
    </div>
    <div className="dock-icon">
      <FaBox size={24} />
    </div>
    <div className="dock-icon">
      <FaCog size={24} />
    </div>
  </nav>
);

// Player HUD Component
const PlayerHUD: React.FC = () => (
  <div className="player-hud">
    <div className="player-profile">
      <img src="/assets/medic-hamster.png" alt="Medic Hamster" className="player-avatar" />
      <div className="player-info">
        <div className="player-name">Medic Hamster</div>
        <div className="player-tier">CYBER-MERC</div>
      </div>
    </div>
    <div className="xp-progress">
      <div className="xp-bar">
        <div className="xp-fill"></div>
      </div>
      <div className="xp-text">6,250 / 10,000 XP</div>
    </div>
    <div className="player-stats">
      <div className="stat-item">
        🔥 <span>195 Days</span>
      </div>
      <div className="stat-item">
        🪙 <span>45,750 GC</span>
      </div>
    </div>
  </div>
);

// Quest Wheel Component
const QuestWheel: React.FC = () => (
  <div className="quest-wheel-container">
    <div className="quest-wheel">
      <div className="quest-count">
        <div className="quest-number">16</div>
        <div className="quest-label">BOUNTIES</div>
      </div>
    </div>
  </div>
);

// Stat Module Component
const StatModule: React.FC<{
  icon: string;
  title: string;
  value: string;
  subtitle: string;
}> = ({ icon, title, value, subtitle }) => (
  <div className="stat-module">
    <div className="module-header">
      <div className="module-icon">{icon}</div>
      <div className="module-title">{title}</div>
    </div>
    <div className="module-value">{value}</div>
    <div className="module-subtitle">{subtitle}</div>
  </div>
);

export const ContractorDashboard: React.FC = () => {
  const { state, actions } = useUser();
  const { user } = state;
  const navigate = useNavigate();
  const { logout } = useLoginWithAbstract();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGoToLanding = useCallback(() => {
    console.log('[Contractor Dashboard] Navigating to landing page');
    navigate('/');
  }, [navigate]);

  const handleAuthStateChange = useCallback((authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  }, []);

  const handleLogout = useCallback(async () => {
    console.log('[Contractor Dashboard] Logout initiated');
    setIsLoggingOut(true);
    setLogoutError(null);
    
    try {
      setIsLoggedOut(true);
      setIsAuthenticated(false);
      
      console.log('[Contractor Dashboard] Disconnecting wallet');
      await logout();
      console.log('[Contractor Dashboard] Wallet disconnected successfully');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('[Contractor Dashboard] Cleaning up Privy data');
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('privy')) {
          localStorage.removeItem(key);
        }
      });
      
      console.log('[Contractor Dashboard] Cleaning up session data');
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_CLASS);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_ARCHETYPE);
      localStorage.removeItem(STORAGE_KEYS.NICKNAME);
      localStorage.removeItem(STORAGE_KEYS.WALLET_ADDRESS);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATE);
      
      console.log('[Contractor Dashboard] Resetting user context');
      actions.resetUser();
      
    } catch (error) {
      console.error('[Contractor Dashboard] Logout error:', error);
      setLogoutError('Failed to disconnect wallet. Please try again.');
      actions.resetUser();
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout, actions]);

  if (isLoggedOut) {
    return <LoggedOutState onGoToLanding={handleGoToLanding} />;
  }

  return (
    <AuthBinding 
      isLoggedOut={isLoggedOut} 
      onAuthStateChange={handleAuthStateChange}
    >
      <div className="dashboard">
        <CommandDock />
        <div className="dashboard-content">
          <PlayerHUD />
          <QuestWheel />
          
          <div className="stat-modules">
            <StatModule
              icon="⚡"
              title="Global Level"
              value="0"
              subtitle="+125 XP this week"
            />
            <StatModule
              icon="🏆"
              title="Reputation"
              value="Top 15%"
              subtitle="of all players"
            />
            <StatModule
              icon="🎯"
              title="Bounties"
              value="16"
              subtitle="3 in progress"
            />
            <StatModule
              icon="💰"
              title="Earnings"
              value="45,750 GC"
              subtitle="+1,250 GC this month"
            />
            <StatModule
              icon="✨"
              title="Achievements"
              value="12/30"
              subtitle="2 near completion"
            />
            <StatModule
              icon="🔥"
              title="Activity Streak"
              value="15 Days"
              subtitle="Personal Best!"
            />
          </div>

          {logoutError && (
            <div className="wallet-error">
              <span className="error-icon">⚠️</span>
              {logoutError}
            </div>
          )}
          
          <button 
            className="logout-button" 
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <FaSignOutAlt />
            {isLoggingOut ? 'Disconnecting...' : 'Logout'}
          </button>
        </div>
      </div>
    </AuthBinding>
  );
}; 