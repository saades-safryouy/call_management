import React, { createContext, useState, useCallback, useEffect ,  useContext} from 'react';
import authService from '../services/authService';

/**
 * Auth Context
 * Provides authentication state and methods throughout the app.
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on mount: trust the cached user for a fast paint,
  // then validate/refresh against /auth/me. An invalid token is cleared.
  useEffect(() => {
    const init = async () => {
      const token = authService.getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      const stored = authService.getUser();
      if (stored) {
        setUser(stored);
        setIsAuthenticated(true);
      }

      try {
        const fresh = await authService.getCurrentUser();
        if (fresh) {
          setUser(fresh);
          setIsAuthenticated(true);
        }
      } catch {
        // Token invalid/expired -> clear the session.
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  /**
   * Handle user login. Enriches the session with the full profile from /auth/me.
   */
  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const { user: basicUser } = await authService.login(email, password);

      let fullUser = basicUser;
      try {
        const fresh = await authService.getCurrentUser();
        if (fresh) fullUser = fresh;
      } catch {
        // Non-fatal: fall back to the user derived from the login response.
      }

      setUser(fullUser);
      setIsAuthenticated(true);
      setError(null);

      return { success: true, user: fullUser };
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handle user logout.
   */
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  /**
   * Handle user registration.
   */
  const register = useCallback(async (registerData) => {
    try {
      setIsLoading(true);
      setError(null);

      const { user: userData } = await authService.register(registerData);

      setUser(userData);
      setIsAuthenticated(true);
      setError(null);

      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
