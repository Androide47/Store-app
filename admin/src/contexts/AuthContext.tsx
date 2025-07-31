import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  profile_picture?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: UpdateProfileData) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
  error: string | null;
  loading: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: string;
}

interface UpdateProfileData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    // Always check localStorage for persistent session
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      // TODO: Add token expiration check here if needed
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string, rememberMe: boolean = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await fetch('http://127.0.0.1:8000/auth/token', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }
      
      const data = await response.json();
      
      // Always store token in localStorage for persistent session
      setToken(data.access_token);
      localStorage.setItem('token', data.access_token);
      
      // Handle remember me for username saving (separate from session persistence)
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('savedUsername', username);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('savedUsername');
      }
      
      // Get user info using the token
      const userResponse = await fetch('http://127.0.0.1:8000/users/me', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to get user information');
      }
      
      const userData = await userResponse.json();
      setUser(userData);
      
      // Always store user data in localStorage for persistent session
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Redirect to dashboard
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }
      
      // After successful registration, log the user in
      await login(userData.username, userData.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Clear session data but preserve remember me settings if they exist
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Note: We keep 'rememberMe' and 'savedUsername' for login form convenience
    navigate('/');
  };

  const updateProfile = async (profileData: UpdateProfileData) => {
    if (!token) {
      setError('You must be logged in to update your profile');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Profile update failed');
      }
      
      const updatedUserData = await response.json();
      setUser(updatedUserData);
      
      // Always update user data in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      return updatedUserData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!token) {
      setError('You must be logged in to change your password');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/change_password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          password: currentPassword,
          new_password: newPassword
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Password change failed');
      }
      
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    if (!token) {
      setError('You must be logged in to upload a profile picture');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('http://127.0.0.1:8000/users/profile-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Profile picture upload failed');
      }
      
      const data = await response.json();
      
      // Update user with new profile picture
      if (user) {
        const updatedUser = { ...user, profile_picture: data.profile_picture };
        setUser(updatedUser);
        
        // Always update user data in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    uploadProfilePicture,
    error,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;