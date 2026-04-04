import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, logout as authLogout } from './auth.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [permissions, setPermissions] = useState(getUser()?.permissions || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inicializa estado
    setUser(getUser());
    setToken(localStorage.getItem('token'));
    setPermissions(getUser()?.permissions || []);
    setIsLoading(false);

    // Escuta eventos globais de login/logout
    const handleLogin = () => {
      setUser(getUser());
      setToken(localStorage.getItem('token'));
      setPermissions(getUser()?.permissions || []);
    };

    const handleLogout = () => {
      setUser(null);
      setToken(null);
      setPermissions([]);
    };

    window.addEventListener('auth:login', handleLogin);
    window.addEventListener('auth:logout', handleLogout);

    return () => {
      window.removeEventListener('auth:login', handleLogin);
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, []);

  const login = (token, userData) => {
    console.log('🔐 AuthProvider: Fazendo login');
    localStorage.setItem('token', token);
    if (userData) localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData || getUser());
    setToken(token);
    setPermissions(userData?.permissions || []);
    window.dispatchEvent(new CustomEvent('auth:login'));
  };

  const logout = () => {
    console.log('🚪 AuthProvider: Fazendo logout');
    authLogout();
    setUser(null);
    setToken(null);
    setPermissions([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new CustomEvent('auth:logout'));
  };

  const hasPermission = (required) => {
    if (!required) return true;
    return permissions.includes(required);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      permissions,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}