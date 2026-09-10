import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import type { UserRole } from '../../shared/types/auth';
import { PATHS } from './paths';

interface RoleGuardProps {
  allowedRoles: UserRole[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Chưa đăng nhập -> Điều hướng về Login kèm redirect URL
  if (!isAuthenticated || !user || !role) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${PATHS.AUTH.LOGIN}?redirect=${redirectUrl}`} replace />;
  }

  // Đã đăng nhập nhưng không có vai trò phù hợp -> Điều hướng về 403 Unauthorized
  if (!allowedRoles.includes(role)) {
    return <Navigate to={PATHS.ERROR.UNAUTHORIZED} state={{ from: location.pathname, currentRole: role }} replace />;
  }

  return <Outlet />;
};
