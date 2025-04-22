import React from 'react';

interface GrindCoinProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const GrindCoin: React.FC<GrindCoinProps> = ({ className = '', size = 'small' }) => {
  const sizeMap = {
    small: '16px',
    medium: '24px',
    large: '32px'
  };

  // Use the full path from the public directory root
  const imagePath = `${import.meta.env.BASE_URL}icons/grindcoin.gif`;

  return (
    <img 
      src={imagePath}
      alt="GC"
      className={`grind-coin ${className}`}
      style={{ 
        width: sizeMap[size], 
        height: sizeMap[size],
        verticalAlign: 'middle',
        display: 'inline-block'
      }}
    />
  );
}; 