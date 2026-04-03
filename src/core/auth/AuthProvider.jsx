import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, logout, isAuthenticated } from './auth.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação inicial
    setUser(getUser());
    setIsLoading(false);

    // Escutar mudanças de autenticação
    const handleLogin = () => setUser(getUser());
    const handleLogout = () => setUser(null);

    window.addEventListener('auth:login', handleLogin);
    window.addEventListener('auth:logout', handleLogout);

    return () => {
      window.removeEventListener('auth:login', handleLogin);
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, []); // Array de dependências vazio para executar apenas na montagem

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: (token) => {
      console.log('🔐 AuthProvider: Fazendo login com token');
      localStorage.setItem("token", token);
      setUser(getUser());
      window.dispatchEvent(new CustomEvent('auth:login'));
    },
    logout: () => {
      console.log('🚪 AuthProvider: Fazendo logout');
      logout();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}