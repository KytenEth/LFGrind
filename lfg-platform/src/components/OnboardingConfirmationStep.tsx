import React from 'react';
import { motion } from 'framer-motion';

interface OnboardingConfirmationStepProps {
  className: string;
  archetype: string;
  nickname: string;
  onBeginGrind: () => void;
}

const OnboardingConfirmationStep: React.FC<OnboardingConfirmationStepProps> = ({
  className,
  archetype,
  nickname,
  onBeginGrind
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="circuit-background" />
      
      <motion.div
        className="flex flex-col items-center gap-4 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-[2rem] font-orbitron text-white mb-1">
          Welcome, {nickname}
        </h2>
        <div className="text-center">
          <p className="text-xl font-orbitron text-cyan-400">
            {className}
          </p>
          <p className="text-lg font-orbitron text-cyan-400 mt-2">
            {archetype}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-2 mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-lg font-orbitron text-cyan-400">LEVEL 1</p>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: '30%' }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </div>
        <p className="text-sm font-orbitron text-cyan-400">200 XP</p>
      </motion.div>

      <motion.button
        className="begin-grind-button"
        onClick={onBeginGrind}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        BEGIN THE GRIND
      </motion.button>
    </motion.div>
  );
};

export default OnboardingConfirmationStep; 