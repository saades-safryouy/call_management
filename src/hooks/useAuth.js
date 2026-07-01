import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * useAuth Hook
 * Custom hook to access authentication context
 * Usage: const { user, isAuthenticated, login, logout } = useAuth();
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuth;
