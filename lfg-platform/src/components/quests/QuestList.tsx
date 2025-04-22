import React from 'react';
import { useQuests } from '../../contexts/QuestContext';
import './QuestList.css';

interface QuestRequirements {
  level: number;
  items?: string[];
}

export const QuestList: React.FC = () => {
  const { quests, activeQuests, loading, error, acceptQuest, completeQuest } = useQuests();

  if (loading) {
    return <div className="quest-list-loading">Loading quests...</div>;
  }

  if (error) {
    return <div className="quest-list-error">{error}</div>;
  }

  const availableQuests = quests.filter(quest => quest.status === 'available');

  const renderRequirements = (requirements: QuestRequirements) => (
    <div className="quest-requirements">
      <h4>Requirements</h4>
      <ul>
        <li>Level {requirements.level}</li>
        {requirements.items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="quest-list-container">
      {activeQuests.length > 0 && (
        <section className="quest-list-section">
          <h2>Active Quests</h2>
          <div className="quest-list">
            {activeQuests.map(quest => (
              <div key={quest.id} className="quest-card active">
                <div className="quest-header">
                  <h3>{quest.title}</h3>
                  <span className={`quest-difficulty ${quest.difficulty.toLowerCase()}`}>
                    {quest.difficulty}
                  </span>
                </div>
                <p className="quest-description">{quest.description}</p>
                <div className="quest-footer">
                  <span className="quest-reward">Reward: {quest.reward} CR</span>
                  <button 
                    className="quest-button complete"
                    onClick={() => completeQuest(quest.id)}
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {availableQuests.length > 0 && (
        <section className="quest-list-section">
          <h2>Available Quests</h2>
          <div className="quest-list">
            {availableQuests.map(quest => (
              <div key={quest.id} className="quest-card">
                <div className="quest-header">
                  <h3>{quest.title}</h3>
                  <span className={`quest-difficulty ${quest.difficulty.toLowerCase()}`}>
                    {quest.difficulty}
                  </span>
                </div>
                <p className="quest-description">{quest.description}</p>
                {quest.requirements && renderRequirements(quest.requirements)}
                <div className="quest-footer">
                  <span className="quest-reward">Reward: {quest.reward} CR</span>
                  <button 
                    className="quest-button accept"
                    onClick={() => acceptQuest(quest.id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeQuests.length === 0 && availableQuests.length === 0 && (
        <div className="quest-list-empty">No quests available at the moment.</div>
      )}
    </div>
  );
}; 