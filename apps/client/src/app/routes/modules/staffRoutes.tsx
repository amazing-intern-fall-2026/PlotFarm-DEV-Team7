import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../paths';
import { RoleGuard } from '../RoleGuard';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { StaffDashboardPage } from '../../../pages/staff/StaffDashboardPage';

export const staffRoutes: RouteObject = {
  element: <RoleGuard allowedRoles={['STAFF']} />,
  children: [
    {
      path: PATHS.STAFF.ROOT,
      element: <DashboardLayout portalRole="STAFF" />,
      children: [
        { index: true, element: <Navigate to={PATHS.STAFF.DASHBOARD} replace /> },
        { path: PATHS.STAFF.DASHBOARD, element: <StaffDashboardPage /> },
        { path: PATHS.STAFF.ASSIGNED_PLOTS, element: <StaffDashboardPage /> },
        { path: PATHS.STAFF.CARE_TASKS, element: <StaffDashboardPage /> },
        { path: PATHS.STAFF.HARVESTS, element: <StaffDashboardPage /> },
        { path: PATHS.STAFF.SHIPMENTS, element: <StaffDashboardPage /> },
      ],
    },
  ],
};
