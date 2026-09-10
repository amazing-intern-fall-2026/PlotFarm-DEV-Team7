import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../paths';
import { RoleGuard } from '../RoleGuard';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { AdminDashboardPage } from '../../../pages/admin/AdminDashboardPage';

export const adminRoutes: RouteObject = {
  element: <RoleGuard allowedRoles={['ADMIN']} />,
  children: [
    {
      path: PATHS.ADMIN.ROOT,
      element: <DashboardLayout portalRole="ADMIN" />,
      children: [
        { index: true, element: <Navigate to={PATHS.ADMIN.DASHBOARD} replace /> },
        { path: PATHS.ADMIN.DASHBOARD, element: <AdminDashboardPage /> },
        { path: PATHS.ADMIN.MANAGE_FARMS, element: <AdminDashboardPage /> },
        { path: PATHS.ADMIN.MANAGE_CROPS, element: <AdminDashboardPage /> },
        { path: PATHS.ADMIN.MANAGE_PLOTS, element: <AdminDashboardPage /> },
        { path: PATHS.ADMIN.COMPENSATIONS, element: <AdminDashboardPage /> },
        { path: PATHS.ADMIN.AUDIT_LOGS, element: <AdminDashboardPage /> },
        { path: PATHS.ADMIN.USERS, element: <AdminDashboardPage /> },
      ],
    },
  ],
};
