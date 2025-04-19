import React, { useState } from 'react';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import './NicknameModal.css';

interface NicknameModalProps {
  onSubmit: (nickname: string) => void;
  onBack?: () => void;
}

const NicknameModal: React.FC<NicknameModalProps> = ({ onSubmit, onBack }) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setNickname(value);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!nickname) return;
    
    try {
      setIsChecking(true);
      setError(null);
      
      // TODO: Add API call to check nickname uniqueness
      // For now, simulating a check with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSubmit(nickname);
    } catch (err) {
      setError('This nickname is already taken. Try another one.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <div className="nickname-modal-backdrop" />
      <div className="nickname-modal fullscreen">
        <div className="nickname-modal-content">
          <div className="circuit-background" />
          
          <button className="modal-close" onClick={onBack}>
            <FaTimes />
          </button>

          {onBack && (
            <button className="back-button" onClick={onBack}>
              <FaArrowLeft />
              <span>Back</span>
            </button>
          )}

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '50%' }} />
          </div>

          <div className="nickname-modal-header">
            <h1>NAME YOUR GRIND</h1>
            <p className="subtitle">Pick your code name — this will be your identity on the Grid</p>
          </div>
          
          <div className="nickname-modal-body">
            {error && (
              <div className="nickname-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <div className="input-wrapper">
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="ex: bitblader99"
                className="nickname-input"
                maxLength={20}
                autoFocus
              />
              <div className="input-glow" />
            </div>

            <button 
              onClick={handleSubmit}
              className="continue-button neon-glow"
              disabled={!nickname || isChecking}
            >
              <span>
                {isChecking ? 'Checking availability...' : 'Continue to Class Selection'}
              </span>
            </button>
          </div>

          <div className="nickname-modal-footer">
            <p>
              Choose wisely — your code name will be your permanent identity
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NicknameModal; 