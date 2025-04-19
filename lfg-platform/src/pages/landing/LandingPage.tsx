import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaCode, FaUsers, FaCoins, FaChartLine, FaShieldAlt, FaGamepad, FaTrophy } from 'react-icons/fa';
import OnboardingModal from '../../components/modals/OnboardingModal';
import '../../styles/landing.css';
import { STORAGE_KEYS } from '../../constants/storage';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.onboardingCompleted) {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData.onboardingCompleted) {
          navigate('/dashboard');
        } else {
          setShowOnboardingModal(true);
        }
      } else {
        setShowOnboardingModal(true);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = (nickname?: string) => {
    setShowOnboardingModal(false);
    // Navigate to dashboard after onboarding
    navigate('/dashboard');
  };

  const handleCloseModal = () => {
    setShowOnboardingModal(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="neon-text">Grind Your Way Into Web3</h1>
            <p className="hero-subtitle">Start your dev journey with bounties, quests, and team XP</p>
            <div className="hero-cta">
              <button 
                className={`neon-button ${isLoading ? 'loading' : ''}`} 
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? 'Logging you in...' : 'Enter the Grid'}
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-mascot-container">
              <img 
                src="/images/cyberpunk-hamster.png" 
                alt="Cyberpunk Hamster" 
                className="mascot-image" 
              />
              <div className="holographic-ui">
                <div className="hologram-card quest-card">
                  <div className="hologram-header">
                    <FaGamepad className="hologram-icon" />
                    <h3 className="hologram-title">Active Quests</h3>
                  </div>
                  <div className="hologram-content">
                    <div className="hologram-item">
                      <span className="hologram-item-title">Build Landing Page</span>
                      <div className="hologram-item-actions">
                        <span className="hologram-item-reward">+500 XP</span>
                        <button className="claim-button">Claim</button>
                      </div>
                    </div>
                    <div className="hologram-item">
                      <span className="hologram-item-title">Fix Bug in Dashboard</span>
                      <div className="hologram-item-actions">
                        <span className="hologram-item-reward">+300 XP</span>
                        <button className="claim-button">Claim</button>
                      </div>
                    </div>
                    <div className="hologram-item">
                      <span className="hologram-item-title">Code Review</span>
                      <div className="hologram-item-actions">
                        <span className="hologram-item-reward">+200 XP</span>
                        <button className="claim-button">Claim</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hologram-card bounty-card">
                  <div className="hologram-header">
                    <FaCoins className="hologram-icon" />
                    <h3 className="hologram-title">Active Bounties</h3>
                  </div>
                  <div className="hologram-content">
                    <div className="hologram-item">
                      <span className="hologram-item-title">Smart Contract Integration</span>
                      <div className="hologram-item-actions">
                        <span className="hologram-item-reward">2500 $GRIND</span>
                        <button className="claim-button">Claim</button>
                      </div>
                    </div>
                    <div className="hologram-item">
                      <span className="hologram-item-title">UI Component Library</span>
                      <div className="hologram-item-actions">
                        <span className="hologram-item-reward">1800 $GRIND</span>
                        <button className="claim-button">Claim</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Three simple steps to start your journey</p>
        <div className="steps-container">
          <div className="step-card glass-card">
            <FaRocket className="step-icon neon-text" />
            <h3>Create Your Profile</h3>
            <p>Choose your role as a developer or designer and customize your cyberpunk avatar.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step-card glass-card">
            <FaCode className="step-icon neon-text" />
            <h3>Complete Quests</h3>
            <p>Take on real-world projects and earn XP by completing tasks and challenges.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step-card glass-card">
            <FaCoins className="step-icon neon-text" />
            <h3>Earn Rewards</h3>
            <p>Convert your XP into Grind Coins and unlock exclusive perks and features.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Platform Features</h2>
        <p className="section-subtitle">Everything you need to level up your career</p>
        <div className="feature-grid">
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Skill Progression</h3>
            <p>Track your growth with detailed skill trees and level progression.</p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Community Hub</h3>
            <p>Connect with other developers and designers in our cyberpunk world.</p>
          </div>
          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Smart Contracts</h3>
            <p>Secure and transparent reward distribution through blockchain technology.</p>
          </div>
          <div className="feature-card">
            <FaTrophy className="feature-icon" />
            <h3>Achievements</h3>
            <p>Unlock badges and special rewards for completing milestones.</p>
          </div>
        </div>
      </section>

      {/* Avatar Showcase Section */}
      <section className="avatars">
        <h2 className="section-title">Choose Your Avatar</h2>
        <p className="section-subtitle">Express yourself in our cyberpunk world</p>
        <div className="avatar-carousel">
          <div className="avatar-card glass-card">
            <div className="avatar-image">
              <img src="/avatars/cyber-ninja.png" alt="Cyber Ninja" />
            </div>
            <h3>Cyber Ninja</h3>
            <p>Stealth and precision</p>
          </div>
          <div className="avatar-card glass-card">
            <div className="avatar-image">
              <img src="/avatars/tech-shaman.png" alt="Tech Shaman" />
            </div>
            <h3>Tech Shaman</h3>
            <p>Mystical and powerful</p>
          </div>
          <div className="avatar-card glass-card">
            <div className="avatar-image">
              <img src="/avatars/netrunner.png" alt="Netrunner" />
            </div>
            <h3>Netrunner</h3>
            <p>Speed and agility</p>
          </div>
        </div>
      </section>

      {/* Community Proof Section */}
      <section className="community">
        <h2 className="section-title">Community Voices</h2>
        <p className="section-subtitle">Hear from our community members</p>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"LFG has completely transformed how I approach my career. The gamification makes learning fun and rewarding!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/avatars/user1.png" alt="User 1" />
              </div>
              <div className="author-info">
                <h4>Sarah Chen</h4>
                <p>Senior Developer</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"The community here is amazing. I've learned so much and made great connections with other designers."</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/avatars/user2.png" alt="User 2" />
              </div>
              <div className="author-info">
                <h4>Marcus Rodriguez</h4>
                <p>UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-card glass-card">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of developers and designers in our cyberpunk world. Create your profile today and start earning rewards!</p>
          <button 
            className="neon-button" 
            onClick={handleSignUp}
          >
            Enter the Grid
          </button>
        </div>
      </section>

      {/* Modals */}
      {showOnboardingModal && (
        <OnboardingModal
          onConnected={handleOnboardingComplete}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default LandingPage; 