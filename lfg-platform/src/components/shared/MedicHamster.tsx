import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/dashboard.css';

interface AIHamsterProps {
  className?: string;
}

const AIHamster: React.FC<AIHamsterProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isIdle, setIsIdle] = useState(true);
  
  // Cycling messages for the AI hamster
  const messages = [
    "Processing data streams...",
    "AI algorithms optimized and ready!",
    "Neural networks at peak efficiency",
    "Analyzing performance metrics...",
    "Quantum calculations complete",
    "Machine learning models updated",
    "AI assistance at your service",
    "Predictive systems engaged",
    "Deep learning protocols active",
    "Digital enhancement ready"
  ];
  
  // Change message every 10 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
      setIsIdle(false);
      
      // Return to idle state after 3 seconds
      setTimeout(() => {
        setIsIdle(true);
      }, 3000);
    }, 10000);
    
    // Set initial message
    setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    
    return () => clearInterval(messageInterval);
  }, []);
  
  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  return (
    <div className={`mascot-panel ${className}`}>
      <motion.div 
        className="mascot-frame"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="mascot-avatar"
          animate={isIdle ? { y: [0, -5, 0] } : { scale: [1, 1.1, 1] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          onClick={toggleVisibility}
          style={{
            background: 'var(--cyber-dark)',
            border: '2px solid var(--cyber-magenta)',
            borderRadius: '50%',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          <img 
            src="/images/ai-hamster.png" 
            alt="AI Hamster"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%'
            }}
          />
        </motion.div>
        <div className="mascot-name">AI Hamster</div>
        
        <AnimatePresence>
          {isVisible && (
            <motion.div 
              className="mascot-tooltip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="tooltip-content">
                <div className="tooltip-title">AI Assistant</div>
                <div className="tooltip-message">{currentMessage}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AIHamster; 