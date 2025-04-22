import React from 'react';
import { useVaultItems } from '../../hooks/useVaultItems';
import { StatModule } from '../shared/StatModule';

export const VaultItemsPanel: React.FC = () => {
  const { items, stats, isLoading, error } = useVaultItems();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400">Loading vault items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Vault Items</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatModule
          title="Total Items"
          value={stats.totalItems}
          icon="📦"
        />
        <StatModule
          title="Secured Items"
          value={stats.securedItems}
          icon="🔒"
        />
        <StatModule
          title="Equipped Items"
          value={stats.equippedItems}
          icon="⚔️"
        />
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="text-white font-medium">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-medium">Level {item.level}</div>
              <div className="text-gray-400 text-sm">Rarity: {item.rarity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 