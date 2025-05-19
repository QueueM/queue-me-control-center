
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '@/services/authService';

// Define types
type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
  permissions: string[];
} | null;

type AppState = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: any[];
};

type Action = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'ADD_NOTIFICATION'; payload: any }
  | { type: 'REMOVE_NOTIFICATION'; payload: number }
  | { type: 'CLEAR_NOTIFICATIONS' };

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  sidebarCollapsed: false,
  theme: 'system',
  notifications: [],
};

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Reducer function
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'REMOVE_NOTIFICATION':
      return { 
        ...state, 
        notifications: state.notifications.filter((_, i) => i !== action.payload) 
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    default:
      return state;
  }
}

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        if (authService.isAuthenticated()) {
          const user = authService.getCurrentUser();
          dispatch({ type: 'SET_USER', payload: user });
          dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        } else {
          dispatch({ type: 'SET_USER', payload: null });
          dispatch({ type: 'SET_AUTHENTICATED', payload: false });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        dispatch({ type: 'SET_USER', payload: null });
        dispatch({ type: 'SET_AUTHENTICATED', payload: false });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    // Set theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
      document.documentElement.classList.toggle('dark', 
        savedTheme === 'dark' || 
        (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    
    checkAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await authService.login({ username, password });
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  // Set theme
  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    localStorage.setItem('theme', theme);
    dispatch({ type: 'SET_THEME', payload: theme });
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', 
      theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  };

  // Context value
  const value = {
    state,
    dispatch,
    login,
    logout,
    toggleSidebar,
    setTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
