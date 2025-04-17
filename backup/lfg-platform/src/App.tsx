import React from 'react';
import { AbstractAppProvider } from './providers/AbstractProvider';
import { WalletConnect } from './components/WalletConnect';
import { useState, useEffect } from 'react'
import { useUser } from './contexts/UserContext'
import { UserRole } from './types/user'
import './App.css'

function App() {
  const { state, actions } = useUser();
  const { user, isLoading, error } = state;
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const showDifficultyToast = (difficulty: string) => {
    setToast({ message: `Difficulty: ${difficulty}`, type: `toast-${difficulty.toLowerCase()}` });
    setTimeout(() => setToast(null), 3000);
  };

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
    <AbstractAppProvider>
      <div className="app">
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
                  <WalletConnect />
                </div>
              ) : (
                <WalletConnect />
              )}
            </div>
          </nav>
        </header>

        <main className="app-main">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner">Loading...</div>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="error-message">{error}</div>
            </div>
          ) : !user ? (
            <>
              <section className="hero">
                <h1 data-text="Let's Freaking Grind">Let's Freaking Grind</h1>
                <p>Join the most exciting bounties in Web3 development</p>
                <button className="cta-button" onClick={() => actions.signIn({})}>
                  Start Your Journey
                </button>
              </section>

              <section id="features" className="features">
                <h2>Platform Features</h2>
                <div className="feature-grid">
                  <div className="feature-card">
                    <h3>Bounty Board</h3>
                    <p>Find and claim exciting projects from top builders</p>
                  </div>
                  <div className="feature-card">
                    <h3>Reputation System</h3>
                    <p>Build your reputation through successful collaborations</p>
                  </div>
                  <div className="feature-card">
                    <h3>Skill Classes</h3>
                    <p>Choose your path: Coder, Designer, or Project Manager</p>
                  </div>
                  <div className="feature-card">
                    <h3>Decentralized Payments</h3>
                    <p>Secure and transparent payment system</p>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="dashboard">
                {user.roles.includes(UserRole.CONTRACTOR) ? (
                  // Contractor Dashboard
                  <>
                    <h2 className="contractor-section-title">Contractor Dashboard</h2>
                    <div className="contractor-stats">
                      <div className="contractor-stat-card">
                        <div className="stat-header">
                          <div className="stat-icon">💰</div>
                          <div className="stat-info">
                            <h3 className="stat-title">Available Funds</h3>
                            <div className="stat-value">125,000 GC</div>
                            <div className="stat-change positive">
                              <span>↑</span> +15,000 GC this month
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="contractor-stat-card">
                        <div className="stat-header">
                          <div className="stat-icon">🎯</div>
                          <div className="stat-info">
                            <h3 className="stat-title">Active Bounties</h3>
                            <div className="stat-value">8</div>
                            <div className="stat-change positive">
                              <span>↑</span> 3 new this week
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="contractor-stat-card">
                        <div className="stat-header">
                          <div className="stat-icon">✨</div>
                          <div className="stat-info">
                            <h3 className="stat-title">Total Bounties</h3>
                            <div className="stat-value">42</div>
                            <div className="stat-change">
                              12 completed
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="contractor-stat-card">
                        <div className="stat-header">
                          <div className="stat-icon">🏆</div>
                          <div className="stat-info">
                            <h3 className="stat-title">Rewards Given</h3>
                            <div className="stat-value">89,500 GC</div>
                            <div className="stat-change">
                              Average: 7,458 GC per bounty
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="contractor-stat-card">
                        <div className="stat-header">
                          <div className="stat-icon">⭐</div>
                          <div className="stat-info">
                            <h3 className="stat-title">Reputation</h3>
                            <div className="stat-value">{user.contractorReputation}</div>
                            <div className="stat-change positive">
                              <span>↑</span> Level {Math.floor(user.contractorReputation / 100)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="contractor-stat-card">
                        <div className="stat-header">
                          <div className="stat-icon">👥</div>
                          <div className="stat-info">
                            <h3 className="stat-title">Active Players</h3>
                            <div className="stat-value">24</div>
                            <div className="stat-change">
                              Across all bounties
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="contractor-actions">
                      <button className="create-bounty-button">
                        <span className="button-icon">✨</span>
                        Create New Bounty
                      </button>
                    </div>

                    <section id="active-bounties" className="bounties">
                      <div className="section-header">
                        <div className="section-title">
                          <h2>Active Bounties</h2>
                          <p className="section-subtitle">Manage your active bounties</p>
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
                          <div className="tech-stack">
                            <span className="tech-tag">React</span>
                            <span className="tech-tag">TypeScript</span>
                            <span className="tech-tag">Web3.js</span>
                            <span className="tech-tag">D3.js</span>
                          </div>
                          <div className="bounty-footer">
                            <span 
                              className="bounty-difficulty difficulty-hard"
                              onClick={() => showDifficultyToast('Hard')}
                            >
                              Hard
                            </span>
                          </div>
                          <button className="join-button">Join Bounty</button>
                        </div>

                        <div className="bounty-card">
                          <div className="bounty-header">
                            <h3>NFT Marketplace UI</h3>
                            <div className="bounty-reward">
                              <span className="reward-amount">3,500 GC</span>
                              <span className="reward-xp">+175 XP</span>
                            </div>
                          </div>
                          <div className="bounty-meta">
                            <div className="bounty-date">
                              <span>Start Date: March 15, 2024</span>
                            </div>
                            <div className="bounty-progress">
                              <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '40%' }}></div>
                              </div>
                              <div className="progress-text">
                                <span>2/5 Teams</span>
                                <span>3 spots left</span>
                              </div>
                            </div>
                          </div>
                          <p className="bounty-description">
                            Design and implement a user-friendly NFT marketplace interface with advanced filtering and search.
                          </p>
                          <div className="tech-stack">
                            <span className="tech-tag">Next.js</span>
                            <span className="tech-tag">TailwindCSS</span>
                            <span className="tech-tag">Ethers.js</span>
                            <span className="tech-tag">IPFS</span>
                          </div>
                          <div className="bounty-footer">
                            <span 
                              className="bounty-difficulty difficulty-medium"
                              onClick={() => showDifficultyToast('Medium')}
                            >
                              Medium
                            </span>
                          </div>
                          <button className="join-button">Join Bounty</button>
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
                          <div className="tech-stack">
                            <span className="tech-tag">Solidity</span>
                            <span className="tech-tag">Hardhat</span>
                            <span className="tech-tag">Slither</span>
                            <span className="tech-tag">Mythril</span>
                          </div>
                          <div className="bounty-footer">
                            <span 
                              className="bounty-difficulty difficulty-expert"
                              onClick={() => showDifficultyToast('Expert')}
                            >
                              Expert
                            </span>
                          </div>
                          <button className="join-button">Join Bounty</button>
                        </div>
                      </div>
                    </section>
                  </>
                ) : (
                  // Player Dashboard
                  <>
                    <h2 className="player-section-title">Player Dashboard</h2>
                    <div className="player-stats">
                      <div className="player-stat-card">
                        <div className="stat-header">
                          <div className="stat-icon">⚔️</div>
                          <div className="stat-info">
                            <h3 className="stat-title">Global Level</h3>
                            <div className="stat-value">{user.globalXp}</div>
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
                            <div className="stat-value">{user.reputation}</div>
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

                    {/* Active Classes Preview */}
                    <div className="active-classes-preview">
                      <div className="preview-header">
                        <h3>Active Classes</h3>
                        <button className="see-more-button" onClick={toggleProfileModal}>
                          See All Classes
        </button>
                      </div>
                      <div className="active-classes-grid">
                        <div className="class-preview-card">
                          <div className="preview-header">
                            <div className="class-icon">⚔️</div>
                            <div className="class-info">
                              <h4>Battle Engineer</h4>
                              <div className="level-badge">Level 12</div>
                            </div>
                          </div>
                          <div className="preview-progress">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{ width: '82%' }}></div>
                            </div>
                            <span className="xp-info">2,450 / 3,000 XP</span>
                          </div>
                        </div>

                        <div className="class-preview-card">
                          <div className="preview-header">
                            <div className="class-icon">🌟</div>
                            <div className="class-info">
                              <h4>Shadow Artist</h4>
                              <div className="level-badge">Level 8</div>
                            </div>
                          </div>
                          <div className="preview-progress">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{ width: '60%' }}></div>
                            </div>
                            <span className="xp-info">1,200 / 2,000 XP</span>
                          </div>
                        </div>

                        <div className="class-preview-card">
                          <div className="preview-header">
                            <div className="class-icon">🔮</div>
                            <div className="class-info">
                              <h4>Tech Oracle</h4>
                              <div className="level-badge">Level 5</div>
                            </div>
                          </div>
                          <div className="preview-progress">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{ width: '50%' }}></div>
                            </div>
                            <span className="xp-info">750 / 1,500 XP</span>
                          </div>
                        </div>

                        <div className="class-preview-card">
                          <div className="preview-header">
                            <div className="class-icon">🧠</div>
                            <div className="class-info">
                              <h4>Vision Weaver</h4>
                              <div className="level-badge">Level 6</div>
                            </div>
                          </div>
                          <div className="preview-progress">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{ width: '60%' }}></div>
                            </div>
                            <span className="xp-info">900 / 1,500 XP</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <section id="active-bounties" className="bounties">
                      <div className="section-header">
                        <div className="section-title">
                          <h2>Active Bounties</h2>
                          <p className="section-subtitle">
                            {user.roles.includes(UserRole.CONTRACTOR) 
                              ? 'Bounties you have created'
                              : 'Your current bounty participation'
                            }
                          </p>
                        </div>
                      </div>
                      <div className="empty-state">
                        <div className="empty-state-icon">🎯</div>
                        <h3>No Active Bounties</h3>
                        <p>You are not currently participating in any bounties. Join one to start earning rewards!</p>
                        <a href="#available-bounties" className="empty-state-action">Browse Available Bounties</a>
                      </div>
                    </section>

                    <section id="available-bounties" className="bounties">
                      <div className="section-header">
                        <div className="section-title">
                          <h2>Available Bounties</h2>
                          <p className="section-subtitle">
                            {user.roles.includes(UserRole.CONTRACTOR)
                              ? 'Manage and track bounties'
                              : 'Find your next challenge'
                            }
        </p>
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
                          <div className="tech-stack">
                            <span className="tech-tag">React</span>
                            <span className="tech-tag">TypeScript</span>
                            <span className="tech-tag">Web3.js</span>
                            <span className="tech-tag">D3.js</span>
                          </div>
                          <div className="bounty-footer">
                            <span 
                              className="bounty-difficulty difficulty-hard"
                              onClick={() => showDifficultyToast('Hard')}
                            >
                              Hard
                            </span>
                          </div>
                          <button className="join-button">Join Bounty</button>
                        </div>

                        <div className="bounty-card">
                          <div className="bounty-header">
                            <h3>NFT Marketplace UI</h3>
                            <div className="bounty-reward">
                              <span className="reward-amount">3,500 GC</span>
                              <span className="reward-xp">+175 XP</span>
                            </div>
                          </div>
                          <div className="bounty-meta">
                            <div className="bounty-date">
                              <span>Start Date: March 15, 2024</span>
                            </div>
                            <div className="bounty-progress">
                              <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '40%' }}></div>
                              </div>
                              <div className="progress-text">
                                <span>2/5 Teams</span>
                                <span>3 spots left</span>
                              </div>
                            </div>
                          </div>
                          <p className="bounty-description">
                            Design and implement a user-friendly NFT marketplace interface with advanced filtering and search.
                          </p>
                          <div className="tech-stack">
                            <span className="tech-tag">Next.js</span>
                            <span className="tech-tag">TailwindCSS</span>
                            <span className="tech-tag">Ethers.js</span>
                            <span className="tech-tag">IPFS</span>
                          </div>
                          <div className="bounty-footer">
                            <span 
                              className="bounty-difficulty difficulty-medium"
                              onClick={() => showDifficultyToast('Medium')}
                            >
                              Medium
                            </span>
                          </div>
                          <button className="join-button">Join Bounty</button>
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
                          <div className="tech-stack">
                            <span className="tech-tag">Solidity</span>
                            <span className="tech-tag">Hardhat</span>
                            <span className="tech-tag">Slither</span>
                            <span className="tech-tag">Mythril</span>
                          </div>
                          <div className="bounty-footer">
                            <span 
                              className="bounty-difficulty difficulty-expert"
                              onClick={() => showDifficultyToast('Expert')}
                            >
                              Expert
                            </span>
                          </div>
                          <button className="join-button">Join Bounty</button>
                        </div>
                      </div>
                    </section>
                  </>
                )}
              </section>
            </>
          )}
        </main>
        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        )}
        
        {/* Profile Modal */}
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
                </div>
                
                {/* Stats Section */}
                <div className="profile-section">
                  <div className="profile-stats">
                    <div className="profile-stat">
                      <span className="stat-label">Level</span>
                      <span className="stat-value">{user.globalXp}</span>
                    </div>
                    <div className="profile-stat">
                      <span className="stat-label">Reputation</span>
                      <span className="stat-value">{user.reputation}</span>
                    </div>
                    {user.roles.includes(UserRole.CONTRACTOR) && (
                      <div className="profile-stat">
                        <span className="stat-label">Contractor Rep</span>
                        <span className="stat-value">{user.contractorReputation}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connections Section */}
                <div className="profile-section">
                  <div className="connection-list">
                    <div className="connection-item">
                      <div className="connection-icon">🔗</div>
                      <div className="connection-info">
                        <p className="connection-name">AGW Wallet</p>
                        <p className="connection-status">{user.isAgwConnected ? 'Connected' : 'Not Connected'}</p>
                      </div>
                      <button 
                        className={`connection-button ${user.isAgwConnected ? 'connected' : 'disconnected'}`}
                        onClick={() => actions.connectWallet({ address: '', chain: '', isConnected: false })}
                      >
                        {user.isAgwConnected ? 'Connected' : 'Connect'}
                      </button>
                    </div>

                    <div className="connection-item">
                      <div className="connection-icon">🎮</div>
                      <div className="connection-info">
                        <p className="connection-name">Discord</p>
                        <p className="connection-status">{user.isDiscordConnected ? 'Connected' : 'Not Connected'}</p>
                      </div>
                      <button 
                        className={`connection-button ${user.isDiscordConnected ? 'connected' : 'disconnected'}`}
                        onClick={() => actions.connectDiscord()}
                      >
                        {user.isDiscordConnected ? 'Connected' : 'Connect'}
                      </button>
                    </div>

                    <div className="connection-item">
                      <div className="connection-icon">𝕏</div>
                      <div className="connection-info">
                        <p className="connection-name">X (Twitter)</p>
                        <p className="connection-status">{user.isXConnected ? 'Connected' : 'Not Connected'}</p>
                      </div>
                      <button 
                        className={`connection-button ${user.isXConnected ? 'connected' : 'disconnected'}`}
                        onClick={() => actions.connectX()}
                      >
                        {user.isXConnected ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Details Section */}
                <div className="profile-section">
                  <div className="detail-list">
                    <div className="detail-item">
                      <span className="detail-label">Join Date</span>
                      <span className="detail-value">{new Date(user?.createdAt || '').toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Country</span>
                      <span className="detail-value">{user?.profile?.country || 'Not set'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Languages</span>
                      <span className="detail-value">{user?.profile?.languages?.join(', ') || 'Not set'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions Section */}
                <div className="profile-section">
                  <div className="profile-actions">
                    <button className="profile-action-button">Edit Profile</button>
                    <button className="profile-action-button">View History</button>
                  </div>
                </div>

                {/* Classes Section */}
                <div className="modal-section">
                  <h3 className="section-title">Classes</h3>
                  <div className="classes-grid">
                    <div className="class-card">
                      <div className="class-header">
                        <div className="class-icon">⚔️</div>
                        <div className="class-info">
                          <h4 className="class-name">Battle Engineer</h4>
                          <p className="class-archetype">Code Warrior</p>
                        </div>
                      </div>
                      <div className="class-progress">
                        <div className="progress-info">
                          <span className="level-info">Level 12</span>
                          <span className="xp-info">2,450 / 3,000 XP</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="class-card">
                      <div className="class-header">
                        <div className="class-icon">🌟</div>
                        <div className="class-info">
                          <h4 className="class-name">Shadow Artist</h4>
                          <p className="class-archetype">Design Sharpshooter</p>
                        </div>
                      </div>
                      <div className="class-progress">
                        <div className="progress-info">
                          <span className="level-info">Level 8</span>
                          <span className="xp-info">1,200 / 2,000 XP</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="class-card">
                      <div className="class-header">
                        <div className="class-icon">🔮</div>
                        <div className="class-info">
                          <h4 className="class-name">Tech Oracle</h4>
                          <p className="class-archetype">Quality Healer</p>
                        </div>
                      </div>
                      <div className="class-progress">
                        <div className="progress-info">
                          <span className="level-info">Level 5</span>
                          <span className="xp-info">750 / 1,500 XP</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="manage-classes-button">
                    <span>⚙️</span> Manage Classes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AbstractAppProvider>
  )
}

export default App
