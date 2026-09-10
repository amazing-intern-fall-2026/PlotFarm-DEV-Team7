import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import { PATHS } from './paths';

export const PublicOnlyGuard: React.FC = () => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated && role) {
    if (role === 'CUSTOMER') {
      return <Navigate to={PATHS.CUSTOMER.DASHBOARD} replace />;
    }
    if (role === 'STAFF') {
      return <Navigate to={PATHS.STAFF.DASHBOARD} replace />;
    }
    if (role === 'ADMIN') {
      return <Navigate to={PATHS.ADMIN.DASHBOARD} replace />;
    }
  }

  return <Outlet />;
};
