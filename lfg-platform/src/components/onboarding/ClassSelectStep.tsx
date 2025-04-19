import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayerClass, ClassArchetype } from '../../types/user';
import { useUser } from '../../contexts/UserContext';
import '../../styles/components/ClassSelectStep.css';

interface ClassData {
  id: PlayerClass;
  archetype: ClassArchetype;
  name: string;
  tagline: string;
  backstory: string;
  traits: string[];
  mascotImage: string;
}

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
    name: 'UX_UI_DESIGNER',
    tagline: 'Cast clarity. Enchant interfaces.',
    backstory: 'UX Sorcerers don\'t draw wireframes — they conjure experiences from the void with runes of flow and light.',
    traits: ['Creative', 'User-Focused', 'Visual Magic'],
    mascotImage: '/images/hamster-mage.png'
  },
  {
    id: PlayerClass.TESTER,
    archetype: ClassArchetype.MONK,
    name: 'TESTER',
    tagline: 'Break nothing. Enlighten everything.',
    backstory: 'Monks meditate on logic. They see what others miss, finding bugs before they\'re born.',
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
    id: PlayerClass.GUILD_LEADER,
    archetype: ClassArchetype.HIVEMIND,
    name: 'GUILD_LEADER',
    tagline: 'One vision. Many minds.',
    backstory: 'Hiveminds pulse with collective intelligence, fusing community into unified growth.',
    traits: ['Community Builder', 'Strategic', 'Growth Driver'],
    mascotImage: '/images/hamster-hivemind.png'
  }
];

interface ClassSelectStepProps {
  onClassConfirmed: (classId: PlayerClass, archetypeId: ClassArchetype) => void;
}

const ClassSelectStep: React.FC<ClassSelectStepProps> = ({ onClassConfirmed }) => {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const { actions } = useUser();

  const handleClassSelect = (classData: ClassData) => {
    setSelectedClass(classData);
  };

  const handleConfirmClass = async () => {
    if (!selectedClass) return;
    await actions.selectClass(selectedClass.id, selectedClass.archetype);
    onClassConfirmed(selectedClass.id, selectedClass.archetype);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-800 rounded-full mb-12">
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: '66%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Class Grid */}
        <motion.div 
          className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {CLASSES.map((classData) => (
            <motion.div
              key={classData.id}
              className={`relative overflow-hidden rounded-xl bg-gray-800 border-2 transition-all cursor-pointer
                ${selectedClass?.id === classData.id ? 'border-blue-500 shadow-neon-blue' : 'border-gray-700'}
              `}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleClassSelect(classData)}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-cyber">{classData.name}</h3>
                <p className="text-blue-400 text-sm mb-4">{classData.archetype}</p>
                <p className="text-gray-300 italic">{classData.tagline}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 opacity-50">
                <img 
                  src={classData.mascotImage} 
                  alt={classData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Side - Detail Panel */}
        <AnimatePresence mode="wait">
          {selectedClass && (
            <motion.div
              key={selectedClass.id}
              className="lg:w-1/3 bg-gray-800 rounded-xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <img 
                  src={selectedClass.mascotImage} 
                  alt={selectedClass.name}
                  className="w-48 h-48 mx-auto rounded-xl mb-6"
                />
                <h2 className="text-2xl font-bold mb-2 font-cyber">{selectedClass.name}</h2>
                <p className="text-blue-400 mb-4">{selectedClass.archetype}</p>
                <p className="text-gray-300 mb-6">{selectedClass.backstory}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedClass.traits.map((trait) => (
                    <span 
                      key={trait}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <motion.button
                  className="w-full py-4 bg-blue-600 rounded-lg font-bold text-lg hover:bg-blue-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmClass}
                >
                  LOCK IN MY CLASS
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClassSelectStep; 