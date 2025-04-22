import React from 'react';
import { motion } from 'framer-motion';

interface TabOption {
  id: string;
  label: string;
}

interface TabSelectorProps {
  options: TabOption[];
  selectedId: string;
  onChange: (id: string) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  options,
  selectedId,
  onChange,
}) => {
  return (
    <div className="tab-selector">
      {options.map((option) => (
        <motion.button
          key={option.id}
          className={`tab-option ${option.id === selectedId ? 'selected' : ''}`}
          onClick={() => onChange(option.id)}
          whileTap={{ scale: 0.95 }}
        >
          {option.label}
        </motion.button>
      ))}
    </div>
  );
}; 