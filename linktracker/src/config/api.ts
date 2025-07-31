// API Configuration
export const API_CONFIG = {
  // Change this to your backend server IP when running on different machines
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    AUTH: {
      TOKEN: '/auth/token',
      REGISTER: '/auth/register',
      UPDATE: '/auth/update',
    },
    USERS: {
      ME: '/users/me',
    },
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Network error detection helper
export const isNetworkError = (error: any): boolean => {
  return (
    error instanceof TypeError ||
    error.message?.includes('Failed to fetch') ||
    error.message?.includes('Network request failed') ||
    error.message?.includes('ERR_NETWORK') ||
    error.name === 'NetworkError'
  );
};

// CORS error detection helper
export const isCorsError = (error: any): boolean => {
  return (
    error.message?.includes('CORS') ||
    error.message?.includes('Cross-Origin') ||
    (error instanceof TypeError && error.message === 'Failed to fetch')
  );
};