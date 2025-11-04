"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Identity } from '@dfinity/agent';

interface AuthContextType {
  authClient: AuthClient | undefined;
  isAuthenticated: boolean;
  identity: Identity | undefined;
  principal: string | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authClient, setAuthClient] = useState<AuthClient>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState<Identity>();
  const [principal, setPrincipal] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  // Determine the identity provider based on environment
  const getIdentityProvider = () => {
    // Check if we're on mainnet (production)
    if (process.env.NEXT_PUBLIC_DFX_NETWORK === 'ic') {
      return 'https://id.ai/'; // Mainnet
    }
    // Local development
    return 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';
  };

  // Initialize auth client
  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      const client = await AuthClient.create();
      setAuthClient(client);
      
      const authenticated = await client.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const identity = client.getIdentity();
        setIdentity(identity);
        setPrincipal(identity.getPrincipal().toString());
      }
    } catch (error) {
      console.error('Failed to initialize auth client:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    if (!authClient) {
      console.error('Auth client not initialized');
      return;
    }

    try {
      await authClient.login({
        identityProvider: getIdentityProvider(),
        onSuccess: async () => {
          const authenticated = await authClient.isAuthenticated();
          setIsAuthenticated(authenticated);

          if (authenticated) {
            const identity = authClient.getIdentity();
            setIdentity(identity);
            setPrincipal(identity.getPrincipal().toString());
          }
        },
        onError: (error) => {
          console.error('Login failed:', error);
        },
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    if (!authClient) {
      console.error('Auth client not initialized');
      return;
    }

    try {
      await authClient.logout();
      setIsAuthenticated(false);
      setIdentity(undefined);
      setPrincipal(undefined);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    authClient,
    isAuthenticated,
    identity,
    principal,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

