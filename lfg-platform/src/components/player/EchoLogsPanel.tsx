import React from 'react';
import { StatModule } from '../shared/StatModule';
import { useEchoLogs } from '../../hooks/useEchoLogs';

export const EchoLogsPanel: React.FC = () => {
  const { logs, stats, isLoading, error } = useEchoLogs();

  if (isLoading) {
    return <div className="panel-loading">Loading echo logs...</div>;
  }

  if (error) {
    return <div className="panel-error">{error}</div>;
  }

  return (
    <div className="echo-logs-panel">
      <div className="panel-header">
        <h2>Echo Logs</h2>
      </div>
      
      <div className="stats-grid">
        <StatModule
          icon="📊"
          title="Total Logs"
          value={stats.totalLogs}
          subtitle="All time collected"
        />
        
        <StatModule
          icon="🔍"
          title="Active Scans"
          value={stats.activeScans}
          subtitle="Currently monitoring"
        />
        
        <StatModule
          icon="⚡"
          title="Scan Rate"
          value={`${stats.scanRate}/min`}
          subtitle="Average processing speed"
        />
        
        <StatModule
          icon="🎯"
          title="Accuracy"
          value={`${stats.accuracy}%`}
          subtitle="Detection precision"
        />
      </div>

      <div className="logs-list">
        {logs.map((log) => (
          <div key={log.id} className="log-entry">
            <div className="log-header">
              <span className="log-timestamp">{log.timestamp}</span>
              <span className={`log-type ${log.type.toLowerCase()}`}>{log.type}</span>
            </div>
            <div className="log-content">{log.content}</div>
            <div className="log-meta">
              <span className="log-source">Source: {log.source}</span>
              <span className="log-confidence">Confidence: {log.confidence}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 