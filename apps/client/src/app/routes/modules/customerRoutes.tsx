import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../paths';
import { RoleGuard } from '../RoleGuard';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { CustomerDashboardPage } from '../../../pages/customer/CustomerDashboardPage';

export const customerRoutes: RouteObject = {
  element: <RoleGuard allowedRoles={['CUSTOMER']} />,
  children: [
    {
      path: PATHS.CUSTOMER.ROOT,
      element: <DashboardLayout portalRole="CUSTOMER" />,
      children: [
        { index: true, element: <Navigate to={PATHS.CUSTOMER.DASHBOARD} replace /> },
        { path: PATHS.CUSTOMER.DASHBOARD, element: <CustomerDashboardPage /> },
        { path: PATHS.CUSTOMER.MY_PLOTS, element: <CustomerDashboardPage /> },
        { path: PATHS.CUSTOMER.CONTRACTS, element: <CustomerDashboardPage /> },
        { path: PATHS.CUSTOMER.CARE_REQUESTS, element: <CustomerDashboardPage /> },
        { path: PATHS.CUSTOMER.COMPENSATIONS, element: <CustomerDashboardPage /> },
        { path: PATHS.CUSTOMER.BANK_ACCOUNTS, element: <CustomerDashboardPage /> },
      ],
    },
  ],
};
