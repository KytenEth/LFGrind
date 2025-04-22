import React from 'react';
import { StatModule } from '../shared/StatModule';
import { useVaultItems } from '../../hooks/useVaultItems';

export const VaultItemsPanel: React.FC = () => {
  const { items, stats, isLoading, error } = useVaultItems();

  if (isLoading) {
    return <div className="panel-loading">Loading vault items...</div>;
  }

  if (error) {
    return <div className="panel-error">{error}</div>;
  }

  return (
    <div className="vault-items-panel">
      <div className="panel-header">
        <h2>Vault Items</h2>
      </div>
      
      <div className="stats-grid">
        <StatModule
          icon="💎"
          title="Total Items"
          value={stats.totalItems}
          subtitle="In your vault"
        />
        
        <StatModule
          icon="🔒"
          title="Secured"
          value={stats.securedItems}
          subtitle="Protected items"
        />
        
        <StatModule
          icon="⚔️"
          title="Equipped"
          value={stats.equippedItems}
          subtitle="Currently in use"
        />
        
        <StatModule
          icon="📦"
          title="Storage"
          value={`${stats.usedSpace}/${stats.totalSpace}`}
          subtitle="Space utilized"
        />
      </div>

      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-icon">{item.icon}</div>
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-stats">
                <span className="item-rarity">{item.rarity}</span>
                <span className="item-level">Level {item.level}</span>
              </div>
            </div>
            <div className="item-actions">
              <button className="btn-equip">Equip</button>
              <button className="btn-secure">Secure</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 