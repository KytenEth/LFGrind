import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AbstractAppProvider } from './providers/AbstractProvider';
import { UserProvider, useUser } from './contexts/UserContext';
import { UserRole } from './types/user';
import LandingPage from './pages/landing/LandingPage';
import { PlayerDashboard } from './pages/player/PlayerDashboard';
import { ContractorDashboard } from './pages/contractor/ContractorDashboard';
import { STORAGE_KEYS } from './constants/storage';
import './App.css';
import { useLoginWithAbstract, useGlobalWalletSignerClient } from '@abstract-foundation/agw-react';
import { disconnectAbstractWallet } from './utils/walletUtils';

const AppContent = () => {
  const { state, actions } = useUser();
  const { user } = state;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout } = useLoginWithAbstract();
  const { data: client } = useGlobalWalletSignerClient();

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const handleRoleToggle = () => {
    if (!state.user) return;
    
    if (state.user.roles.includes(UserRole.PLAYER)) {
      actions.activateContractorMode();
    } else {
      actions.activatePlayerMode();
    }
  };

  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      setLogoutError(null);
      
      // First disconnect the Abstract wallet using the utility function
      await disconnectAbstractWallet(logout as () => Promise<void>, client);
      
      // Then handle app-specific cleanup separately
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_CLASS);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_ARCHETYPE);
      localStorage.removeItem(STORAGE_KEYS.NICKNAME);
      localStorage.removeItem(STORAGE_KEYS.WALLET_ADDRESS);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATE);
      
      // Reset user state
      actions.resetUser();
      
      // Close profile modal if open
      setIsProfileModalOpen(false);
      
      // Redirect to landing page
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      setLogoutError('Failed to disconnect wallet. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout, client, actions, navigate]);

  const RoleToggle = ({ isContractor, onToggle }: { isContractor: boolean; onToggle: () => void }) => (
    <div className="role-toggle">
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={isContractor}
          onChange={onToggle}
        />
        <span className="toggle-slider">
          <span className="toggle-label">{isContractor ? 'Contractor' : 'Player'}</span>
        </span>
      </label>
    </div>
  );

  return (
    <div className="app">
      {location.pathname !== '/' && (
        <header className="header">
          <nav className="nav">
            <div className="logo" data-text="LFG">LFG</div>
            <div className="nav-links">
              <a href="#bounties">Bounties</a>
              <a href="#leaderboard">Leaderboard</a>
              <a href="#about">About</a>
              {user ? (
                <div className="user-menu">
                  <div className="user-info" onClick={toggleProfileModal}>
                    <div className="user-avatar-placeholder">
                      <span className="avatar-icon">👤</span>
                    </div>
                    <span className="username">{user?.profile.username || 'User'}</span>
                  </div>
                  <RoleToggle 
                    isContractor={user?.roles.includes(UserRole.CONTRACTOR)} 
                    onToggle={handleRoleToggle} 
                  />
                  <button className="logout-button" onClick={handleLogout}>
                    <span className="logout-icon">🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              ) : null}
            </div>
          </nav>
        </header>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<PlayerDashboard />} />
        <Route path="/contractor-dashboard" element={<ContractorDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {isProfileModalOpen && user && (
        <div className="modal-overlay visible" onClick={toggleProfileModal}>
          <div className="profile-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Profile</h2>
              <button className="modal-close" onClick={toggleProfileModal}>×</button>
            </div>
            <div className="modal-content">
              <div className="profile-section">
                <div className="profile-header">
                  <div className="profile-info">
                    <div className="profile-avatar-placeholder">
                      <span className="avatar-icon">👤</span>
                    </div>
                    <div className="profile-details">
                      <h3>{user?.profile.username || 'User'}</h3>
                      <RoleToggle 
                        isContractor={user?.roles.includes(UserRole.CONTRACTOR)} 
                        onToggle={handleRoleToggle} 
                      />
                    </div>
                  </div>
                </div>
                <div className="profile-actions">
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
                    {isLoggingOut ? (
                      <>
                        <span className="loading-spinner"></span>
                        <span>Disconnecting...</span>
                      </>
                    ) : (
                      <>
                        <span className="logout-icon">🚪</span>
                        <span>Logout</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AbstractAppProvider>
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </AbstractAppProvider>
  );
}

export default App;
