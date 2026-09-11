import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthUser, UserRole } from '@/shared/types/auth';
import { getCookie, setCookie, removeCookie } from '@/shared/lib/cookies';

export interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const COOKIE_KEY = 'plotfarm_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = getCookie(COOKIE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse stored auth user from cookie', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newUser: AuthUser) => {
    setUser(newUser);
    setCookie(COOKIE_KEY, JSON.stringify(newUser), 7);
  };

  const logout = () => {
    setUser(null);
    removeCookie(COOKIE_KEY);
  };

  const switchRole = (role: UserRole) => {
    const updatedUser: AuthUser = user
      ? { ...user, role }
      : {
          id: `usr_demo_${role.toLowerCase()}`,
          email: `${role.toLowerCase()}@plotfarm.vn`,
          fullName: `Người dùng ${role}`,
          role,
        };
    login(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
