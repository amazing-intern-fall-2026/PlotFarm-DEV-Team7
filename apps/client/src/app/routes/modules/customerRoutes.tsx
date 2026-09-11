import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from '../paths';
import { RoleGuard } from '../RoleGuard';
import { CustomerDashboardPage } from '../../../pages/customer/CustomerDashboardPage';

const CustomerContainerLayout: React.FC = () => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 font-sans">
    <Outlet />
  </div>
);

export const customerRoutes: RouteObject = {
  element: <RoleGuard allowedRoles={['CUSTOMER']} />,
  children: [
    {
      path: PATHS.CUSTOMER.ROOT,
      element: <CustomerContainerLayout />,
      children: [
        { index: true, element: <Navigate to={PATHS.CUSTOMER.MY_PLOTS} replace /> },
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
