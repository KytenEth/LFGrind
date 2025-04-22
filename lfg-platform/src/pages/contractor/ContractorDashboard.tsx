import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuests } from '../../contexts/QuestContext';
import { QuestList } from '../../components/quests/QuestList';
import { StatModule } from '../../components/shared/StatModule';
import { BaseDashboard } from '../../components/shared/BaseDashboard';
import './ContractorDashboard.css';

export const ContractorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { stats } = useQuests();

  return (
    <BaseDashboard>
      <div className="contractor-dashboard">
        <div className="contractor-header">
          <div className="contractor-info">
            <h1>{user?.nickname || 'Contractor'}</h1>
            <div className="contractor-stats">
              <StatModule
                label="Active Quests"
                value={stats?.activeQuests || 0}
              />
              <StatModule
                label="Completed Quests"
                value={stats?.completedQuests || 0}
              />
              <StatModule
                label="Total CR Earned"
                value={`${stats?.totalEarned || 0} CR`}
              />
            </div>
          </div>
        </div>
        
        <div className="quests-container">
          <QuestList />
        </div>
      </div>
    </BaseDashboard>
  );
}; 