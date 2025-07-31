import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthState, AuthContextType, LoginCredentials, RegisterCredentials } from '../types/auth';
import { buildApiUrl, isNetworkError, isCorsError, API_CONFIG } from '../config/api';

interface AuthAction {
  type: 'SET_LOADING' | 'SET_USER' | 'LOGOUT';
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // In a real app, validate token with backend
          const userData = localStorage.getItem('user');
            if (userData) {
              const user = JSON.parse(userData);
              dispatch({ type: 'SET_USER', payload: user });
            } else {
            localStorage.removeItem('token');
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
          localStorage.removeItem('user');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // API call to backend - FastAPI expects form data for OAuth2
      const formData = new FormData();
      formData.append('username', credentials.email); // Backend uses username field for email
      formData.append('password', credentials.password);

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.TOKEN), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      const token = data.access_token;
      
      // Get user info with the token
      const userResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USERS.ME), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      let user = null;
      if (userResponse.ok) {
        const backendUser = await userResponse.json();
        // Convert backend response to frontend User format
        user = {
          id: backendUser.id,
          email: backendUser.email,
          firstName: backendUser.first_name,
          lastName: backendUser.last_name,
          role: backendUser.role
        };
      } else {
        // Fallback user object if user endpoint doesn't exist
        user = {
          id: 1,
          email: credentials.email,
          firstName: 'User',
          lastName: 'Name',
          role: 'user'
        };
      }

      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      
      // Handle specific error types
      if (isNetworkError(error)) {
        if (isCorsError(error)) {
          throw new Error('Unable to connect to server. Please check if the backend server is running and CORS is properly configured.');
        }
        throw new Error('Network connection failed. Please check your internet connection and server availability.');
      }
      
      // Handle HTTP errors
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Login failed. Please try again.');
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // API call to backend
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.email, // Use email as username
          email: credentials.email,
          first_name: credentials.firstName,
          last_name: credentials.lastName,
          password: credentials.password,
          role: 'user' // Default role
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const userData = await response.json();
      
      // After successful registration, log the user in
      await login({ email: credentials.email, password: credentials.password });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      
      // Handle specific error types
      if (isNetworkError(error)) {
        if (isCorsError(error)) {
          throw new Error('Unable to connect to server. Please check if the backend server is running and CORS is properly configured.');
        }
        throw new Error('Network connection failed. Please check your internet connection and server availability.');
      }
      
      // Handle HTTP errors
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token');

      // API call to backend
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.UPDATE), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: data.email || state.user?.email,
          email: data.email || state.user?.email,
          first_name: data.firstName || state.user?.firstName,
          last_name: data.lastName || state.user?.lastName,
          role: data.role || state.user?.role || 'user'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Profile update failed');
      }

      const updatedUser = await response.json();
      
      // Convert backend response to frontend User format
      const formattedUser: User = {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        role: updatedUser.role
      };
      
      localStorage.setItem('user', JSON.stringify(formattedUser));
      dispatch({ type: 'SET_USER', payload: formattedUser });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const value: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};