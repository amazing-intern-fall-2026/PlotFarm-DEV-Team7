import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthUser, UserRole } from '../../shared/types/auth';
import { safeGetAuth, safeSetAuth, safeClearAuth, StoredAuthData } from '../../auth/authStorage';

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser, accessToken?: string, refreshToken?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Khởi tạo an toàn: Bắt lỗi nếu LocalStorage bị can thiệp/hỏng (EH-1)
  useEffect(() => {
    try {
      const storedAuth = safeGetAuth();
      if (storedAuth && storedAuth.user) {
        setUser({
          id: storedAuth.user.id,
          email: storedAuth.user.email,
          fullName: storedAuth.user.fullName || storedAuth.user.email,
          role: storedAuth.user.role as UserRole,
        });
      } else {
        setUser(null);
      }
    } catch {
      safeClearAuth();
      setUser(null);
    } finally {
      setIsLoading(false);
    }

    // Lắng nghe sự kiện logout phát ra từ axiosClient khi session bị vô hiệu hóa
    const handleRemoteLogout = () => {
      setUser(null);
    };

    window.addEventListener('auth:logout', handleRemoteLogout);
    return () => {
      window.removeEventListener('auth:logout', handleRemoteLogout);
    };
  }, []);

  const login = (newUser: AuthUser, accessToken: string = "mock_access_token", refreshToken: string = "mock_refresh_token") => {
    setUser(newUser);
    const authData: StoredAuthData = {
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      },
      accessToken,
      refreshToken,
    };
    safeSetAuth(authData);
  };

  const logout = () => {
    setUser(null);
    safeClearAuth();
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
