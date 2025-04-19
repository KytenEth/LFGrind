/**
 * This file contains utility functions for wallet operations.
 * Note: We can't use React hooks directly in utility functions.
 * Instead, we'll provide a function that takes the logout function as a parameter.
 */

/**
 * Disconnects the Abstract wallet and cleans up all wallet-related states
 * This matches the behavior of the disconnect button in the onboarding modal
 * 
 * @param logoutFunction - The logout function from useLoginWithAbstract hook
 * @param client - The wallet client from useGlobalWalletSignerClient
 */
export const disconnectAbstractWallet = async (
  logoutFunction: () => Promise<void>,
  client: any | null
): Promise<void> => {
  try {
    console.log('[Wallet Utils] Starting wallet disconnect process');
    console.log('[Wallet Utils] Current client state:', client ? 'Connected' : 'Not connected');

    // First, clear any wallet-related local storage
    console.log('[Wallet Utils] Clearing wallet-related storage');
    localStorage.removeItem('wagmi.wallet');
    localStorage.removeItem('wagmi.connected');
    localStorage.removeItem('wagmi.account');
    localStorage.removeItem('abstract-wallet');
    localStorage.removeItem('abstract-wallet-connected');
    localStorage.removeItem('abstract-wallet-address');

    // Only attempt to disconnect if we have a connected client
    if (client) {
      console.log('[Wallet Utils] Calling Abstract wallet logout function');
      // Let the Abstract wallet handle its own cleanup
      await logoutFunction();
      console.log('[Wallet Utils] Abstract wallet logout completed');
    } else {
      console.log('[Wallet Utils] No active client, skipping wallet logout');
    }

    // Give the wallet a moment to clean up its state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('[Wallet Utils] Wallet disconnect process completed');
  } catch (error) {
    console.error('[Wallet Utils] Abstract wallet disconnect error:', error);
    throw error;
  }
}; 