import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPowerOff, FaArrowLeft, FaCheck, FaTimes as FaError } from 'react-icons/fa';
import { useLoginWithAbstract, useGlobalWalletSignerClient } from '@abstract-foundation/agw-react';
import { useNavigate } from 'react-router-dom';
import { PlayerClass, ClassArchetype, UserRole } from '../../types/user';
import { useUser } from '../../contexts/UserContext';
import './OnboardingModal.css';
import { ClassSelection } from '../ClassSelection';
import OnboardingConfirmationStep from '../OnboardingConfirmationStep';

// Local storage keys
const STORAGE_KEYS = {
  ONBOARDING_STATE: 'lfg_onboarding_state',
  WALLET_ADDRESS: 'lfg_wallet_address',
  NICKNAME: 'lfg_nickname',
  USER_DATA: 'lfg_user_data',
};

type OnboardingStep = 'wallet' | 'nickname' | 'class' | 'confirmation';

interface OnboardingState {
  currentStep: OnboardingStep;
  walletAddress?: string;
  nickname?: string;
  isCompleted: boolean;
  completedAt?: string;
}

interface ClassData {
  id: PlayerClass;
  archetype: ClassArchetype;
  name: string;
  tagline: string;
  backstory: string;
  traits: string[];
  mascotImage: string;
}

const formatDisplayName = (name: string) => {
  return name.replace(/_/g, ' ');
};

const CLASSES: ClassData[] = [
  {
    id: PlayerClass.CODER,
    archetype: ClassArchetype.NINJA,
    name: 'CODER',
    tagline: 'Code in silence. Ship in shadows.',
    backstory: 'Trained in the low-code underground, Ninjas strike quietly but deploy with deadly precision.',
    traits: ['Strategic', 'Fast Builder', 'Silent Deploy'],
    mascotImage: '/images/hamster-ninja.png'
  },
  {
    id: PlayerClass.UX_UI_DESIGNER,
    archetype: ClassArchetype.SORCERER,
    name: 'UX UI DESIGNER',
    tagline: 'Cast clarity. Enchant interfaces.',
    backstory: "UX Sorcerers don't draw wireframes — they conjure experiences from the void with runes of flow and light.",
    traits: ['Creative', 'User-Focused', 'Visual Magic'],
    mascotImage: '/images/hamster-mage.png'
  },
  {
    id: PlayerClass.TESTER,
    archetype: ClassArchetype.MONK,
    name: 'TESTER',
    tagline: 'Break nothing. Enlighten everything.',
    backstory: "Monks meditate on logic. They see what others miss, finding bugs before they're born.",
    traits: ['Analytical', 'Thorough', 'Quality Guardian'],
    mascotImage: '/images/hamster-monk.png'
  },
  {
    id: PlayerClass.PRODUCT_MANAGER,
    archetype: ClassArchetype.ARCHITECT,
    name: 'PRODUCT_MANAGER',
    tagline: 'Vision is structure.',
    backstory: 'Architects speak in roadmaps and dream in flows. They sketch the grid others build upon.',
    traits: ['Visionary', 'Strategic', 'Leadership'],
    mascotImage: '/images/hamster-architect.png'
  },
  {
    id: PlayerClass.PROJECT_MANAGER,
    archetype: ClassArchetype.ROYAL_COMMANDER,
    name: 'PROJECT_MANAGER',
    tagline: 'The plan is law.',
    backstory: 'Battle-tested and process-bound, Commanders rally the guild and carry the weight of execution.',
    traits: ['Organized', 'Leadership', 'Execution'],
    mascotImage: '/images/hamster-commander.png'
  },
  {
    id: PlayerClass.CONTRACTOR,
    archetype: ClassArchetype.CROWNFORGER,
    name: 'CONTRACTOR',
    tagline: "They don't grind. They ignite the grind.",
    backstory: 'Crownforgers forge destiny with capital. Every quest, every reward, every coin minted — begins with them.',
    traits: ['Capitalist', 'Resourceful', 'Power Broker'],
    mascotImage: '/images/hamster-contractor.png'
  }
];

interface OnboardingModalProps {
  onConnected: (nickname?: string) => void;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onConnected, onClose }): JSX.Element => {
  const { login, logout } = useLoginWithAbstract();
  const { data: client, isLoading } = useGlobalWalletSignerClient();
  const { actions } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSuccessEffects, setShowSuccessEffects] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('wallet');
  const [nickname, setNickname] = useState('');
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [nicknameStatus, setNicknameStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevConnectedRef = useRef(false);
  const navigate = useNavigate();

  const walletAddress = client?.account?.address;
  const shortAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : '';
  const isConnected = !!client;

  useEffect(() => {
    // Load saved state
    const savedState = localStorage.getItem(STORAGE_KEYS.ONBOARDING_STATE);
    if (savedState) {
      const state: OnboardingState = JSON.parse(savedState);
      if (!state.isCompleted) {
        // Ensure we don't skip steps
        if (state.currentStep === 'class' && !state.nickname) {
          setCurrentStep('nickname');
        } else if (state.currentStep === 'nickname' && !state.walletAddress) {
          setCurrentStep('wallet');
        } else {
          setCurrentStep(state.currentStep);
          if (state.nickname) {
            setNickname(state.nickname);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isConnected && !prevConnectedRef.current) {
      setShowSuccessEffects(true);
      audioRef.current?.play();
      
      // Save wallet state
      const state: OnboardingState = {
        currentStep: 'nickname',
        walletAddress: walletAddress,
        isCompleted: false
      };
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_STATE, JSON.stringify(state));
      localStorage.setItem(STORAGE_KEYS.WALLET_ADDRESS, walletAddress || '');

      setTimeout(() => {
        setShowSuccessEffects(false);
        setCurrentStep('nickname');
      }, 3000);
    }
    prevConnectedRef.current = isConnected;
  }, [isConnected, walletAddress]);

  const handleAbstractConnect = async () => {
    try {
      setError(null);
      setIsConnecting(true);
      await login();
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setError(null);
      await logout();
      // Clear all user data from local storage
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATE);
      localStorage.removeItem(STORAGE_KEYS.WALLET_ADDRESS);
      localStorage.removeItem(STORAGE_KEYS.NICKNAME);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to disconnect wallet. Please try again.');
    }
  };

  const handleCheckNickname = async () => {
    if (!nickname) return;
    
    try {
      setIsCheckingNickname(true);
      setError(null);
      
      // Simulate API call to check nickname uniqueness
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo, let's consider nicknames with "taken" as already taken
      if (nickname.toLowerCase().includes('taken')) {
        throw new Error('This nickname is already taken');
      }

      setNicknameStatus('success');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check nickname');
      setNicknameStatus('error');
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleNicknameSubmit = async () => {
    if (!nickname || nicknameStatus !== 'success') return;
    
    // Save nickname state
    const state: OnboardingState = {
      currentStep: 'class',
      walletAddress: walletAddress,
      nickname: nickname,
      isCompleted: false
    };
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_STATE, JSON.stringify(state));
    localStorage.setItem(STORAGE_KEYS.NICKNAME, nickname);

    // Show success animation before proceeding
    setShowSuccessEffects(true);
    audioRef.current?.play();
    
    // Wait for animation to complete before proceeding
    setTimeout(() => {
      setShowSuccessEffects(false);
      setCurrentStep('class');
    }, 3000);
  };

  const handleClassSelect = (classData: ClassData) => {
    setSelectedClass(classData);
  };

  const handleConfirmClass = async (): Promise<void> => {
    if (!selectedClass) return;
    
    try {
      setError(null);
      
      // Show success animation first
      setShowSuccessEffects(true);
      audioRef.current?.play();
      
      // Save class selection and move to confirmation step
      await actions.selectClass(selectedClass.id, selectedClass.archetype);
      
      // Update onboarding state
      const state: OnboardingState = {
        currentStep: 'confirmation',
        walletAddress: walletAddress,
        nickname: nickname,
        isCompleted: false
      };
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_STATE, JSON.stringify(state));
      
      // Wait for animation to complete before proceeding
      setTimeout(() => {
        setShowSuccessEffects(false);
        setCurrentStep('confirmation');
      }, 3000);
      
    } catch (err) {
      setError('Failed to select class. Please try again.');
      setShowSuccessEffects(false);
    }
  };

  const handleBeginGrind = async () => {
    const cleanup = () => {
      setShowSuccessEffects(false);
      audioRef.current?.pause();
      audioRef.current?.currentTime && (audioRef.current.currentTime = 0);
    };

    try {
      // Validate required data
      if (!selectedClass) {
        throw new Error('Please select a class to continue');
      }
      if (!walletAddress) {
        throw new Error('Wallet connection required');
      }
      if (!nickname) {
        throw new Error('Nickname is required');
      }

      setError(null);
      setShowSuccessEffects(true);
      
      // Play success sound if available
      if (audioRef.current?.readyState === 4) {
        audioRef.current.play().catch(console.error);
      }

      // Determine user role based on class archetype
      const userRole = selectedClass.id === PlayerClass.CONTRACTOR 
        ? UserRole.CONTRACTOR 
        : UserRole.PLAYER;

      // Prepare user data
      const userData = {
        walletAddress,
        nickname,
        class: selectedClass.id,
        archetype: selectedClass.archetype,
        level: 1,
        xp: 200,
        isOnboarded: true,
        roles: [userRole],
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      // Save user data with error handling
      try {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      } catch (storageError) {
        console.error('Storage error:', storageError);
        throw new Error('Failed to save user data. Please check your browser storage settings.');
      }

      // Update onboarding state
      const state: OnboardingState = {
        currentStep: 'confirmation',
        walletAddress: walletAddress,
        nickname: nickname,
        isCompleted: true,
        completedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem(STORAGE_KEYS.ONBOARDING_STATE, JSON.stringify(state));
      } catch (storageError) {
        console.error('Storage error:', storageError);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        throw new Error('Failed to save onboarding state. Please try again.');
      }

      // Create cleanup timeout
      const timeoutId = setTimeout(() => {
        cleanup();
        
        // Call onConnected callback
        onConnected(nickname);
        
        // Navigate to appropriate dashboard using React Router
        const dashboardPath = userRole === UserRole.CONTRACTOR ? '/contractor/quests' : '/player/quests';
        navigate(dashboardPath, { replace: true });
      }, 2000);

      // Cleanup on unmount
      return () => {
        clearTimeout(timeoutId);
        cleanup();
      };

    } catch (err) {
      cleanup();
      console.error('Onboarding error:', err);
      setError(err instanceof Error ? err.message : 'Failed to complete onboarding. Please try again.');
      
      // Attempt to clean up any partial data
      try {
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        localStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATE);
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'nickname') {
      setCurrentStep('wallet');
    } else if (currentStep === 'class') {
      setCurrentStep('nickname');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('class');
    }
    setError(null);
    setNicknameStatus('idle');
  };

  const progressWidth = (() => {
    switch (currentStep) {
      case 'wallet': return '25%';
      case 'nickname': return '50%';
      case 'class': return '75%';
      case 'confirmation': return '100%';
      default: return '25%';
    }
  })();

  const getStepContent = () => {
    switch (currentStep) {
      case 'wallet':
        return (
          <div className="connect-button-wrapper">
            {!isConnected ? (
              <button 
                onClick={handleAbstractConnect}
                className="wallet-button connect-button neon-glow"
                disabled={isConnecting}
              >
                <img 
                  src="/abstract-logo.svg" 
                  alt="Abstract Wallet" 
                  className="wallet-logo"
                />
                <span>
                  {isConnecting ? 'Connecting...' : 'Connect Abstract Wallet'}
                </span>
              </button>
            ) : (
              <div className="wallet-connected-state">
                <div className="wallet-status">
                  <div className="wallet-info">
                    <img 
                      src="/abstract-logo.svg" 
                      alt="Abstract Wallet" 
                      className="wallet-logo"
                    />
                    <span className="wallet-address">{shortAddress}</span>
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="disconnect-button"
                    title="Disconnect wallet"
                  >
                    <FaPowerOff />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'nickname':
        return (
          <div className="nickname-section">
            <div className="input-wrapper">
              <input
                type="text"
                value={nickname}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  setNickname(value);
                  setError(null);
                  setNicknameStatus('idle');
                }}
                placeholder="ex: bitblader99"
                className={`nickname-input ${nicknameStatus !== 'idle' ? nicknameStatus : ''}`}
                maxLength={20}
                autoFocus
              />
              <button 
                onClick={handleCheckNickname}
                className="check-availability-button"
                disabled={!nickname || isCheckingNickname}
              >
                {isCheckingNickname ? (
                  <>
                    <div className="spinner" />
                    Checking...
                  </>
                ) : (
                  'Check Availability'
                )}
              </button>
            </div>

            {nicknameStatus !== 'idle' && (
              <div className={`nickname-feedback ${nicknameStatus}`}>
                {nicknameStatus === 'success' ? (
                  <>
                    <FaCheck /> Nickname available!
                  </>
                ) : (
                  <>
                    <FaError /> {error || 'Nickname unavailable'}
                  </>
                )}
              </div>
            )}

            <button 
              onClick={handleNicknameSubmit}
              className="continue-button neon-glow"
              disabled={!nickname || nicknameStatus !== 'success'}
            >
              <span>Continue to Class Selection</span>
            </button>
          </div>
        );
      case 'class':
        return (
          <div className="modal-section">
            <AnimatePresence mode="wait">
              {!selectedClass ? (
                <motion.div
                  key="class-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ClassSelection 
                    classes={CLASSES}
                    onClassSelect={(classId) => {
                      if (classId) {
                        const foundClass = CLASSES.find(c => c.id === classId);
                        if (foundClass) {
                          handleClassSelect(foundClass);
                        }
                      }
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="class-details"
                  className="class-details-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="class-details">
                    <div className="selected-class-header">
                      <div className="selected-class-mascot">
                        <motion.img 
                          src={selectedClass.mascotImage} 
                          alt={formatDisplayName(selectedClass.name)}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      </div>
                      <div className="selected-class-title">
                        <h2>{formatDisplayName(selectedClass.name)}</h2>
                        <p className="class-archetype">{formatDisplayName(selectedClass.archetype)}</p>
                      </div>
                    </div>

                    <p className="selected-class-backstory">{selectedClass.backstory}</p>
                    
                    <div className="class-traits">
                      {selectedClass.traits.map((trait) => (
                        <span key={trait} className="trait-tag">{trait}</span>
                      ))}
                    </div>

                    <div className="class-details-actions">
                      <motion.button
                        className="back-to-classes-button"
                        onClick={() => setSelectedClass(null)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back to Classes
                      </motion.button>

                      <motion.button
                        className="confirm-button"
                        onClick={handleConfirmClass}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Lock In {formatDisplayName(selectedClass.name)}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      case 'confirmation':
        return (
          <div className="modal-section">
            {selectedClass && (
              <OnboardingConfirmationStep
                className={selectedClass.name}
                archetype={selectedClass.archetype}
                nickname={nickname}
                onBeginGrind={handleBeginGrind}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const getStepTitle = (step: OnboardingStep) => {
    switch (step) {
      case 'wallet':
        return 'LINK TO THE GRID';
      case 'nickname':
        return 'NAME YOUR GRIND';
      case 'class':
        return 'CHOOSE YOUR CLASS';
      case 'confirmation':
        return 'YOU HAVE ENTERED THE GRID';
      default:
        return '';
    }
  };

  const getStepSubtitle = (step: OnboardingStep) => {
    switch (step) {
      case 'wallet':
        return 'Connect your wallet to begin your grind';
      case 'nickname':
        return 'Pick your code name — this will be your identity on the Grid';
      case 'class':
        return 'Select your role in the digital frontier';
      case 'confirmation':
        return 'Your journey in the digital frontier begins now';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="wallet-modal-backdrop" onClick={onClose} />
      <div className={`wallet-modal fullscreen ${showSuccessEffects ? 'success' : ''}`}>
        <div className="wallet-modal-content">
          <div className="circuit-background" />
          
          <div className="modal-header">
            <div className="modal-controls">
              {currentStep !== 'wallet' && (
                <button className="back-button" onClick={handleBack}>
                  <FaArrowLeft />
                  <span>Back</span>
                </button>
              )}
              <button className="modal-close" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-header-content">
              <div className="progress-bar" style={{ '--progress-width': progressWidth } as React.CSSProperties} />

              <h1>{getStepTitle(currentStep)}</h1>
              <p className="subtitle">{getStepSubtitle(currentStep)}</p>
            </div>
          </div>
          
          <div className="modal-body">
            <div className="modal-body-content">
              {error && (
                <div className="modal-error">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}
              
              {getStepContent()}

              {showSuccessEffects && (
                <div className="success-container">
                  <div className="success-hamster">
                    <img src="/images/success-hamster.png" alt="Success Hamster" />
                  </div>
                  <div className="success-text">SUCCESS!</div>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <p>
              {currentStep === 'wallet'
                ? 'By connecting a wallet, you agree to our Terms of Service and Privacy Policy'
                : currentStep === 'nickname'
                ? 'Choose wisely — your code name will be your permanent identity'
                : 'Your class defines your journey — but you can always master new ones'}
            </p>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="auto">
        <source src="/success.mp3" type="audio/mp3" />
      </audio>
    </>
  );
};

export default OnboardingModal;