import React from 'react';
import '../../styles/dashboard.css';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  className?: string;
  role?: string;
}

export const XPBar: React.FC<XPBarProps> = ({
  currentXP,
  maxXP,
  level,
  className = '',
  role = 'CYBER-MERC'
}) => {
  const progress = (currentXP / maxXP) * 100;

  return (
    <div className={`xp-display ${className}`}>
      <div className="xp-container">
        <div className="xp-bar-frame">
          <div className="xp-progress-bar">
            <div 
              className="xp-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="xp-progress-glow"></div>
            </div>
          </div>
          <div className="xp-numbers">
            {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
          </div>
        </div>
        <div className="level-indicator">
          LEVEL {level} - {role}
        </div>
      </div>
    </div>
  );
}; 