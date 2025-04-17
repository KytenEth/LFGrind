import React from 'react';
import { useGlobalWalletSignerClient, useLoginWithAbstract } from '@abstract-foundation/agw-react';
import '../styles/WalletConnect.css';

export function WalletConnect() {
  const { data: client, isLoading } = useGlobalWalletSignerClient();
  const { login, logout } = useLoginWithAbstract();
  const [error, setError] = React.useState<string | null>(null);

  const handleConnect = React.useCallback(async () => {
    try {
      setError(null);
      await login();
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect wallet. Please try again.');
    }
  }, [login]);

  const handleDisconnect = React.useCallback(async () => {
    try {
      setError(null);
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to disconnect wallet. Please try again.');
    }
  }, [logout]);

  if (isLoading) {
    return (
      <button className="wallet-button loading" disabled>
        <span className="loading-spinner"></span>
        INITIALIZING...
      </button>
    );
  }

  const isConnected = !!client;
  const address = client?.account?.address;
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div className="wallet-nav-container">
      {error && (
        <div className="wallet-error">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}
      
      {!isConnected ? (
        <button 
          onClick={handleConnect}
          className="wallet-button connect-button"
        >
          <span className="wallet-icon">⚡</span>
          CONNECT_WALLET
        </button>
      ) : (
        <div className="wallet-connected">
          <div className="wallet-info">
            <span className="wallet-icon">💠</span>
            <span 
              className="wallet-address" 
              data-text={shortAddress}
            >
              {shortAddress}
            </span>
          </div>
          <button 
            onClick={handleDisconnect}
            className="wallet-button disconnect-button"
            title="Disconnect wallet"
          >
            <span className="disconnect-icon">⏏️</span>
          </button>
        </div>
      )}
    </div>
  );
} 