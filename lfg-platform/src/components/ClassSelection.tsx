import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClassData {
  id: string;
  name: string;
  archetype: string;
  tagline: string;
  mascotImage: string;
}

interface ClassSelectionProps {
  classes: ClassData[];
  onClassSelect: (classId: string | null) => void;
}

const formatDisplayName = (name: string) => {
  return name.replace(/_/g, ' ');
};

export const ClassSelection: React.FC<ClassSelectionProps> = ({ classes, onClassSelect }) => {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const handleClassSelect = (classId: string) => {
    setSelectedClassId(classId);
    onClassSelect(classId);
  };

  const handleViewAll = () => {
    setSelectedClassId(null);
    onClassSelect(null);
  };

  const containerVariants = {
    grid: { 
      transition: { staggerChildren: 0.05 }
    },
    single: { 
      transition: { staggerChildren: 0 }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="class-selection">
      <motion.div 
        className={`classes-grid ${selectedClassId ? 'has-selected' : ''}`}
        variants={containerVariants}
        initial="grid"
        animate={selectedClassId ? "single" : "grid"}
      >
        <AnimatePresence mode="wait">
          {classes.map((classData) => (
            <motion.div
              key={classData.id}
              className={`class-card ${selectedClassId === classData.id ? 'selected' : ''}`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onClick={() => !selectedClassId && handleClassSelect(classData.id)}
            >
              <div className="class-mascot">
                <img 
                  src={classData.mascotImage} 
                  alt={`${formatDisplayName(classData.name)} mascot`}
                  loading="lazy"
                />
              </div>
              <div className="class-content">
                <h3 className="class-name">{formatDisplayName(classData.name)}</h3>
                <div className="class-archetype">{formatDisplayName(classData.archetype)}</div>
                <p className="class-tagline">{classData.tagline}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedClassId && (
          <motion.button
            className="view-all-classes"
            onClick={handleViewAll}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M2 6h12M2 10h12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
            View All Classes
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}; 