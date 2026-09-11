import type { RouteObject } from "react-router-dom";
import { PATHS } from "../paths";
import { HomePage } from "../../../pages/public/HomePage";
import { LoginPage } from "../../../pages/auth/LoginPage";
import { PublicOnlyGuard } from "../PublicOnlyGuard";

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: PATHS.PUBLIC.CROPS,
    element: <HomePage />,
  },
  {
    path: PATHS.PUBLIC.FARMS,
    element: <HomePage />,
  },
  {
    path: PATHS.PUBLIC.PLOTS,
    element: <HomePage />,
  },
  {
    path: PATHS.PUBLIC.ABOUT,
    element: <HomePage />,
  },
  {
    element: <PublicOnlyGuard />,
    children: [
      {
        path: PATHS.AUTH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATHS.AUTH.REGISTER,
        element: <LoginPage />,
      },
    ],
  },
];
