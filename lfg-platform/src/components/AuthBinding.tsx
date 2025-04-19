import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginWithAbstract, useGlobalWalletSignerClient } from '@abstract-foundation/agw-react';

interface AuthBindingProps {
  isLoggedOut: boolean;
  onAuthStateChange: (isAuthenticated: boolean) => void;
  children?: React.ReactNode;
}

export const AuthBinding: React.FC<AuthBindingProps> = ({ 
  isLoggedOut,
  onAuthStateChange,
  children 
}) => {
  const navigate = useNavigate();
  const { login } = useLoginWithAbstract();
  const { data: client } = useGlobalWalletSignerClient();
  const [authState, setAuthState] = useState<'checking' | 'authenticated' | 'unauthenticated' | 'error'>('checking');
  const bindingAttempted = useRef(false);

  useEffect(() => {
    // Skip if logged out
    if (isLoggedOut) {
      console.log('[Auth Binding] User is logged out, skipping authentication check');
      setAuthState('unauthenticated');
      onAuthStateChange(false);
      return;
    }

    const checkAuthAndBindSession = async () => {
      try {
        // Check for any privy-caw connection key
        const hasPrivySession = Object.keys(localStorage).some(key => 
          key.startsWith('privy-caw:') && key.endsWith(':connection')
        );
        
        console.log('[Auth Binding] Has Privy connection:', hasPrivySession);

        // If no Privy session, redirect immediately
        if (!hasPrivySession) {
          console.log('[Auth Binding] No Privy connection found, redirecting to landing');
          setAuthState('unauthenticated');
          onAuthStateChange(false);
          navigate('/');
          return;
        }

        // Skip if binding already attempted
        if (bindingAttempted.current) {
          console.log('[Auth Binding] Binding already attempted, skipping');
          return;
        }

        bindingAttempted.current = true;

        // If we have a Privy session but no client, try to bind
        if (!client) {
          console.log('[Auth Binding] Privy connection found but no client, attempting to bind session');
          await login();
          console.log('[Auth Binding] Session binding completed');
        }

        console.log('[Auth Binding] Authentication successful');
        setAuthState('authenticated');
        onAuthStateChange(true);

      } catch (error) {
        console.error('[Auth Binding] Authentication error:', error);
        setAuthState('error');
        onAuthStateChange(false);
        setTimeout(() => navigate('/'), 1000);
      }
    };

    checkAuthAndBindSession();
  }, [client, login, navigate, isLoggedOut, onAuthStateChange]);

  // Show appropriate UI based on auth state
  switch (authState) {
    case 'checking':
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Verifying authentication...</p>
        </div>
      );
    case 'error':
      return (
        <div className="error-container">
          <p>Authentication error. Redirecting...</p>
        </div>
      );
    case 'authenticated':
      return <>{children}</>;
    default:
      return null;
  }
}; 