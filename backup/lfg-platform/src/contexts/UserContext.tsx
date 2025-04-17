import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, UserActions, UserProfile, Wallet, UserRole, PlayerClass, ClassArchetype } from '../types/user';

// Create context with default values
const UserContext = createContext<{
  state: AuthState;
  actions: UserActions;
}>({
  state: {
    user: null,
    isLoading: true,
    error: null,
  },
  actions: {
    signIn: async () => {},
    signOut: async () => {},
    editProfile: async () => {},
    connectWallet: async () => {},
    connectDiscord: async () => {},
    connectX: async () => {},
    activatePlayerMode: async () => {},
    activateContractorMode: async () => {},
    selectClass: async () => {},
  },
});

// Mock user data for development
const mockUser: User = {
  id: '1',
  profile: {
    username: 'CyberBuilder',
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    discordId: '123456789',
    xHandle: '@cyberbuilder',
    agwAddress: '0x1234567890abcdef',
    otherWallets: [
      {
        address: '0xabcdef1234567890',
        chain: 'Ethereum',
        isConnected: true,
      },
    ],
    yearOfBirth: 1990,
    country: 'United States',
    languages: ['English', 'Spanish'],
  },
  roles: [UserRole.PLAYER],
  playerClasses: [
    {
      class: PlayerClass.CODER,
      archetype: ClassArchetype.WARRIOR,
      xp: 1000,
      level: 5,
    },
  ],
  globalXp: 1500,
  reputation: 85,
  contractorReputation: 75,
  isAuthenticated: true,
  isDiscordConnected: true,
  isXConnected: true,
  isAgwConnected: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Simulate loading user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use the mock user
        setTimeout(() => {
          setState({
            user: mockUser,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setState({
          user: null,
          isLoading: false,
          error: 'Failed to load user data',
        });
      }
    };

    loadUser();
  }, []);

  // User actions
  const actions: UserActions = {
    signIn: async (credentials) => {
      setState({ ...state, isLoading: true });
      try {
        // In a real app, this would be an API call
        // For now, we'll just set the mock user
        setTimeout(() => {
          setState({
            user: mockUser,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to sign in',
        });
      }
    },
    signOut: async () => {
      setState({ ...state, isLoading: true });
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setState({
            user: null,
            isLoading: false,
            error: null,
          });
        }, 500);
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to sign out',
        });
      }
    },
    editProfile: async (profile) => {
      if (!state.user) return;
      
      setState({ ...state, isLoading: true });
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const updatedUser: User = {
            ...state.user!,
            id: state.user!.id,
            profile: {
              ...state.user!.profile,
              ...profile,
            },
            roles: state.user!.roles || [],
            globalXp: state.user!.globalXp || 0,
            reputation: state.user!.reputation || 0,
            contractorReputation: state.user!.contractorReputation || 0,
            isAuthenticated: state.user!.isAuthenticated,
            isDiscordConnected: state.user!.isDiscordConnected,
            isXConnected: state.user!.isXConnected,
            isAgwConnected: state.user!.isAgwConnected,
            createdAt: state.user!.createdAt,
            updatedAt: new Date(),
          };
          
          setState({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to update profile',
        });
      }
    },
    connectWallet: async (wallet) => {
      if (!state.user) return;
      
      setState({ ...state, isLoading: true });
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const updatedWallets = [...(state.user!.profile.otherWallets || [])];
          const existingWalletIndex = updatedWallets.findIndex(w => w.chain === wallet.chain);
          
          if (existingWalletIndex >= 0) {
            updatedWallets[existingWalletIndex] = wallet;
          } else {
            updatedWallets.push(wallet);
          }
          
          const updatedUser: User = {
            ...state.user!,
            id: state.user!.id,
            profile: {
              ...state.user!.profile,
              otherWallets: updatedWallets,
            },
            roles: state.user!.roles || [],
            globalXp: state.user!.globalXp || 0,
            reputation: state.user!.reputation || 0,
            contractorReputation: state.user!.contractorReputation || 0,
            isAuthenticated: state.user!.isAuthenticated,
            isDiscordConnected: state.user!.isDiscordConnected,
            isXConnected: state.user!.isXConnected,
            isAgwConnected: state.user!.isAgwConnected,
            createdAt: state.user!.createdAt,
            updatedAt: new Date(),
          };
          
          setState({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to connect wallet',
        });
      }
    },
    connectDiscord: async () => {
      if (!state.user) return;
      
      setState({ ...state, isLoading: true });
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const updatedUser: User = {
            ...state.user!,
            id: state.user!.id,
            profile: state.user!.profile,
            roles: state.user!.roles || [],
            globalXp: state.user!.globalXp || 0,
            reputation: state.user!.reputation || 0,
            contractorReputation: state.user!.contractorReputation || 0,
            isAuthenticated: state.user!.isAuthenticated,
            isDiscordConnected: true,
            isXConnected: state.user!.isXConnected,
            isAgwConnected: state.user!.isAgwConnected,
            createdAt: state.user!.createdAt,
            updatedAt: new Date(),
          };
          
          setState({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to connect Discord',
        });
      }
    },
    connectX: async () => {
      if (!state.user) return;
      
      setState({ ...state, isLoading: true });
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const updatedUser: User = {
            ...state.user!,
            id: state.user!.id,
            profile: state.user!.profile,
            roles: state.user!.roles || [],
            globalXp: state.user!.globalXp || 0,
            reputation: state.user!.reputation || 0,
            contractorReputation: state.user!.contractorReputation || 0,
            isAuthenticated: state.user!.isAuthenticated,
            isDiscordConnected: state.user!.isDiscordConnected,
            isXConnected: true,
            isAgwConnected: state.user!.isAgwConnected,
            createdAt: state.user!.createdAt,
            updatedAt: new Date(),
          };
          
          setState({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to connect X',
        });
      }
    },
    activatePlayerMode: async () => {
      if (!state.user) return;
      
      setState({ ...state, isLoading: true });
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          // Remove CONTRACTOR role and ensure PLAYER role is present
          const updatedRoles = state.user!.roles.filter(role => role !== UserRole.CONTRACTOR);
          if (!updatedRoles.includes(UserRole.PLAYER)) {
            updatedRoles.push(UserRole.PLAYER);
          }
          
          const updatedUser: User = {
            ...state.user!,
            id: state.user!.id,
            profile: state.user!.profile,
            roles: updatedRoles,
            globalXp: state.user!.globalXp || 0,
            reputation: state.user!.reputation || 0,
            contractorReputation: state.user!.contractorReputation || 0,
            isAuthenticated: state.user!.isAuthenticated,
            isDiscordConnected: state.user!.isDiscordConnected,
            isXConnected: state.user!.isXConnected,
            isAgwConnected: state.user!.isAgwConnected,
            createdAt: state.user!.createdAt,
            updatedAt: new Date(),
          };
          
          setState({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to activate player mode',
        });
      }
    },
    activateContractorMode: async () => {
      if (!state.user) return;
      
      setState({ ...state, isLoading: true });
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          // Remove PLAYER role and ensure CONTRACTOR role is present
          const updatedRoles = state.user!.roles.filter(role => role !== UserRole.PLAYER);
          if (!updatedRoles.includes(UserRole.CONTRACTOR)) {
            updatedRoles.push(UserRole.CONTRACTOR);
          }
          
          const updatedUser: User = {
            ...state.user!,
            id: state.user!.id,
            profile: state.user!.profile,
            roles: updatedRoles,
            globalXp: state.user!.globalXp || 0,
            reputation: state.user!.reputation || 0,
            contractorReputation: state.user!.contractorReputation || 0,
            isAuthenticated: state.user!.isAuthenticated,
            isDiscordConnected: state.user!.isDiscordConnected,
            isXConnected: state.user!.isXConnected,
            isAgwConnected: state.user!.isAgwConnected,
            createdAt: state.user!.createdAt,
            updatedAt: new Date(),
          };
          
          setState({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to activate contractor mode',
        });
      }
    },
    selectClass: async (playerClass, archetype) => {
      if (!state.user) return;
      
      setState({ ...state, isLoading: true });
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const existingClassIndex = state.user!.playerClasses?.findIndex(
            pc => pc.class === playerClass
          ) ?? -1;
          
          let updatedClasses = [...(state.user!.playerClasses || [])];
          
          if (existingClassIndex >= 0) {
            updatedClasses[existingClassIndex] = {
              ...updatedClasses[existingClassIndex],
              archetype,
            };
          } else {
            updatedClasses.push({
              class: playerClass,
              archetype,
              xp: 0,
              level: 1,
            });
          }
          
          const updatedUser: User = {
            ...state.user!,
            id: state.user!.id,
            profile: state.user!.profile,
            roles: state.user!.roles || [],
            globalXp: state.user!.globalXp || 0,
            reputation: state.user!.reputation || 0,
            contractorReputation: state.user!.contractorReputation || 0,
            isAuthenticated: state.user!.isAuthenticated,
            isDiscordConnected: state.user!.isDiscordConnected,
            isXConnected: state.user!.isXConnected,
            isAgwConnected: state.user!.isAgwConnected,
            playerClasses: updatedClasses,
            createdAt: state.user!.createdAt,
            updatedAt: new Date(),
          };
          
          setState({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
        }, 1000);
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: 'Failed to select class',
        });
      }
    },
  };

  return (
    <UserContext.Provider value={{ state, actions }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext); 