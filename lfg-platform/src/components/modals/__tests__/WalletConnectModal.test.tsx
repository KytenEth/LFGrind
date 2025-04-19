import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WalletConnectModal from '../WalletConnectModal';

// Mock the AGWWalletButton component
jest.mock('@agw/wallet', () => ({
  AGWWalletButton: ({ children, onConnect }: any) => (
    <button onClick={onConnect}>{children}</button>
  ),
}));

describe('WalletConnectModal', () => {
  const mockOnConnected = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<WalletConnectModal onConnected={mockOnConnected} />);
    
    expect(screen.getByText('LINK TO THE GRID')).toBeInTheDocument();
    expect(screen.getByText('Connect your wallet to begin your grind')).toBeInTheDocument();
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('shows all progress steps', () => {
    render(<WalletConnectModal onConnected={mockOnConnected} />);
    
    expect(screen.getByText('Wallet Connect')).toBeInTheDocument();
    expect(screen.getByText('Nickname')).toBeInTheDocument();
    expect(screen.getByText('Class')).toBeInTheDocument();
    expect(screen.getByText('Archetype')).toBeInTheDocument();
  });

  it('calls onConnected when wallet button is clicked', () => {
    render(<WalletConnectModal onConnected={mockOnConnected} />);
    
    fireEvent.click(screen.getByText('Connect Wallet'));
    expect(mockOnConnected).toHaveBeenCalledTimes(1);
  });

  it('shows close button when onClose is provided', () => {
    render(<WalletConnectModal onConnected={mockOnConnected} onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('Cancel Connection');
    expect(closeButton).toBeInTheDocument();
    
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not show close button when onClose is not provided', () => {
    render(<WalletConnectModal onConnected={mockOnConnected} />);
    
    expect(screen.queryByText('Cancel Connection')).not.toBeInTheDocument();
  });
}); 