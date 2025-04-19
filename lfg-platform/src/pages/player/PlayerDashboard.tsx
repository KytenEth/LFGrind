import React, { useState, useCallback } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../../constants/storage';
import { useLoginWithAbstract } from '@abstract-foundation/agw-react';
import { FaPowerOff } from 'react-icons/fa';
import { AuthBinding } from '../../components/AuthBinding';

export const PlayerDashboard: React.FC = () => {
  const { state, actions } = useUser();
  const { user } = state;
  const navigate = useNavigate();
  const { logout } = useLoginWithAbstract();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthStateChange = useCallback((authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  }, []);

  const handleLogout = useCallback(async () => {
    console.log('[Player Dashboard] Logout initiated');
    try {
      setError(null);
      setIsLoggingOut(true);
      setIsLoggedOut(true);
      setIsAuthenticated(false);

      console.log('[Player Dashboard] Disconnecting wallet');
      await logout();
      console.log('[Player Dashboard] Wallet disconnected successfully');

      // Give Abstract a moment to clean up its state
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('[Player Dashboard] Cleaning up Privy data');
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('privy')) {
          localStorage.removeItem(key);
        }
      });

      console.log('[Player Dashboard] Cleaning up session data');
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_CLASS);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_ARCHETYPE);
      localStorage.removeItem(STORAGE_KEYS.NICKNAME);
      localStorage.removeItem(STORAGE_KEYS.WALLET_ADDRESS);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATE);

      console.log('[Player Dashboard] Resetting user state');
      actions.resetUser();

      console.log('[Player Dashboard] Navigating to landing page');
      navigate('/');

    } catch (err) {
      console.error('[Player Dashboard] Logout error:', err);
      setError('Failed to disconnect wallet. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout, actions, navigate]);

  // Show logged out state with fade effect
  if (isLoggedOut) {
    return (
      <div className="logged-out-container fade-out">
        <div className="logged-out-content">
          <h2>You have been logged out</h2>
          <p>Your wallet has been disconnected and all session data has been cleared.</p>
          <button 
            className="go-to-landing-button"
            onClick={() => navigate('/')}
          >
            Go to Landing Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthBinding 
      isLoggedOut={isLoggedOut} 
      onAuthStateChange={handleAuthStateChange}
    >
      <section className="dashboard">
        <div className="dashboard-header">
          <h2 className="player-section-title">Player Dashboard</h2>
          <div className="dashboard-actions">
            {error && (
              <div className="wallet-error">
                <span className="error-icon">⚠️</span>
                {error}
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
                  <FaPowerOff className="logout-icon" />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="player-stats">
          <div className="player-stat-card">
            <div className="stat-header">
              <div className="stat-icon">⚔️</div>
              <div className="stat-info">
                <h3 className="stat-title">Global Level</h3>
                <div className="stat-value">{user?.globalXp || 0}</div>
                <div className="stat-change positive">
                  <span>↑</span> +125 XP this week
                </div>
              </div>
            </div>
          </div>

          <div className="player-stat-card">
            <div className="stat-header">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <h3 className="stat-title">Reputation</h3>
                <div className="stat-value">{user?.reputation || 0}</div>
                <div className="stat-change positive">
                  <span>↑</span> Top 15% of players
                </div>
              </div>
            </div>
          </div>

          <div className="player-stat-card">
            <div className="stat-header">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <h3 className="stat-title">Bounties Completed</h3>
                <div className="stat-value">16</div>
                <div className="stat-change">
                  3 in progress
                </div>
              </div>
            </div>
          </div>

          <div className="player-stat-card">
            <div className="stat-header">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3 className="stat-title">Total Earnings</h3>
                <div className="stat-value">45,750 GC</div>
                <div className="stat-change positive">
                  <span>↑</span> +12,500 GC this month
                </div>
              </div>
            </div>
          </div>

          <div className="player-stat-card">
            <div className="stat-header">
              <div className="stat-icon">🌟</div>
              <div className="stat-info">
                <h3 className="stat-title">Achievements</h3>
                <div className="stat-value">12/30</div>
                <div className="stat-change">
                  2 near completion
                </div>
              </div>
            </div>
          </div>

          <div className="player-stat-card">
            <div className="stat-header">
              <div className="stat-icon">⚡</div>
              <div className="stat-info">
                <h3 className="stat-title">Activity Streak</h3>
                <div className="stat-value">15 Days</div>
                <div className="stat-change positive">
                  <span>🔥</span> Personal Best!
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="active-bounties" className="bounties">
          <div className="section-header">
            <div className="section-title">
              <h2>Active Bounties</h2>
              <p className="section-subtitle">Your current bounty participation</p>
            </div>
          </div>
          <div className="bounty-grid">
            <div className="bounty-card">
              <div className="bounty-header">
                <h3>DeFi Dashboard Development</h3>
                <div className="bounty-reward">
                  <span className="reward-amount">5,000 GC</span>
                  <span className="reward-xp">+250 XP</span>
                </div>
              </div>
              <div className="bounty-meta">
                <div className="bounty-date">
                  <span>Start Date: March 1, 2024</span>
                </div>
                <div className="bounty-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '60%' }}></div>
                  </div>
                  <div className="progress-text">
                    <span>3/5 Teams</span>
                    <span>2 spots left</span>
                  </div>
                </div>
              </div>
              <p className="bounty-description">
                Build a modern DeFi dashboard with real-time data visualization and portfolio tracking.
              </p>
              <div className="bounty-footer">
                <span className="bounty-difficulty difficulty-medium">Medium</span>
              </div>
              <button className="join-button">View Details</button>
            </div>

            <div className="bounty-card">
              <div className="bounty-header">
                <h3>Smart Contract Audit</h3>
                <div className="bounty-reward">
                  <span className="reward-amount">4,000 GC</span>
                  <span className="reward-xp">+200 XP</span>
                </div>
              </div>
              <div className="bounty-meta">
                <div className="bounty-date">
                  <span>Start Date: March 10, 2024</span>
                </div>
                <div className="bounty-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '80%' }}></div>
                  </div>
                  <div className="progress-text">
                    <span>4/5 Teams</span>
                    <span>1 spot left</span>
                  </div>
                </div>
              </div>
              <p className="bounty-description">
                Perform comprehensive security audit of DeFi protocol smart contracts and provide detailed report.
              </p>
              <div className="bounty-footer">
                <span className="bounty-difficulty difficulty-medium">Medium</span>
              </div>
              <button className="join-button">View Details</button>
            </div>
          </div>
        </section>
      </section>
    </AuthBinding>
  );
}; 