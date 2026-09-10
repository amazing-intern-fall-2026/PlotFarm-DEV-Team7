import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { publicRoutes } from './modules/publicRoutes';
import { customerRoutes } from './modules/customerRoutes';
import { staffRoutes } from './modules/staffRoutes';
import { adminRoutes } from './modules/adminRoutes';
import { UnauthorizedPage } from '../../pages/error/UnauthorizedPage';
import { NotFoundPage } from '../../pages/error/NotFoundPage';
import { PATHS } from './paths';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // 1. Public & Auth Domain Routes
      ...publicRoutes,

      // 2. Protected Role-Based Portals
      customerRoutes,
      staffRoutes,
      adminRoutes,

      // 3. Error Fallbacks
      {
        path: PATHS.ERROR.UNAUTHORIZED,
        element: <UnauthorizedPage />,
      },
      {
        path: PATHS.ERROR.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
