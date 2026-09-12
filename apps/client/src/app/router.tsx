import * as React from "react";
import {
  createBrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { RootLayout } from "@/widgets/RootLayout";
import type { AppRole, TopbarBreadcrumbItem } from "@/shared/ui";
import { LoginPage, ProtectedRoute } from "@/features/auth";
import { AUTH_ROUTES, SESSION_KEYS } from "@/features/auth/constants";
import {
  HomePage,
  PlotsPage,
  PlotDetailPage,
  CheckoutPage,
  MyFarmPage,
  JournalPage,
  AboutPage,
  FarmerTasksPage,
  FarmerTaskExecutePage,
  FarmerPlotsPage,
  AdminDashboardPage,
  AdminPlotsPage,
  AdminPlotConfigPage,
} from "@/pages";

/**
 * ShellRouteLayout — Wrapper tích hợp RootLayout với React Router
 * Tự động đồng bộ role, activeNavId, breadcrumbs theo pathname.
 */
export function ShellRouteLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // 0. Xác định trạng thái đăng nhập từ sessionStorage
  const user = React.useMemo(() => {
    try {
      const rawUser = sessionStorage.getItem(SESSION_KEYS.USER);
      if (!rawUser) return undefined;
      const parsed = JSON.parse(rawUser);
      return {
        name: parsed.fullName || parsed.name || "Người dùng",
        avatarSrc: parsed.avatarUrl || undefined,
      };
    } catch {
      return undefined;
    }
  }, [location.pathname]);

  const handleLogout = React.useCallback(() => {
    sessionStorage.removeItem(SESSION_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(SESSION_KEYS.REFRESH_TOKEN);
    sessionStorage.removeItem(SESSION_KEYS.USER);
    navigate(AUTH_ROUTES.LOGIN);
  }, [navigate]);

  // 1. Xác định vai trò từ URL
  let role: AppRole = "customer";
  if (pathname.startsWith("/admin")) {
    role = "admin";
  } else if (pathname.startsWith("/farmer")) {
    role = "farmer";
  }

  // 2. Xác định activeNavId
  let activeNavId = "home";
  if (role === "customer") {
    if (pathname === "/") activeNavId = "home";
    else if (pathname.startsWith("/plots")) activeNavId = "explore";
    else if (pathname.startsWith("/journal")) activeNavId = "journal";
    else if (pathname.startsWith("/about")) activeNavId = "about";
    else if (pathname.startsWith("/my-farm") || pathname.startsWith("/checkout"))
      activeNavId = "orders";
  } else if (role === "farmer") {
    if (pathname === "/farmer" || pathname.startsWith("/farmer/tasks"))
      activeNavId = "tasks_today";
    else if (pathname.startsWith("/farmer/plots")) activeNavId = "my_plots";
  } else if (role === "admin") {
    if (pathname === "/admin" || pathname === "/admin/dashboard")
      activeNavId = "overview";
    else if (pathname.includes("/config")) activeNavId = "tech_config";
    else if (pathname.startsWith("/admin/plots")) activeNavId = "plots";
  }

  // 3. Xác định Breadcrumbs linh hoạt
  const breadcrumbs: TopbarBreadcrumbItem[] = React.useMemo(() => {
    if (role === "admin") {
      if (pathname.includes("/config")) {
        return [
          { label: "Tổng quan điều hành", href: "/admin" },
          { label: "Danh mục ô đất", href: "/admin/plots" },
          { label: "Cấu hình IoT & Cây trồng" },
        ];
      }
      if (pathname.startsWith("/admin/plots")) {
        return [
          { label: "Tổng quan điều hành", href: "/admin" },
          { label: "Danh sách ô đất" },
        ];
      }
      return [];
    }

    if (role === "farmer") {
      if (pathname.match(/\/farmer\/tasks\/.+/)) {
        return [
          { label: "Nhiệm vụ hôm nay", href: "/farmer" },
          { label: "Thực hiện nhiệm vụ" },
        ];
      }
      if (pathname.startsWith("/farmer/plots")) {
        return [
          { label: "Nhiệm vụ hôm nay", href: "/farmer" },
          { label: "Quản lý ô đất" },
        ];
      }
      return [];
    }

    // Customer
    if (pathname.startsWith("/checkout")) {
      return [
        { label: "Khám phá ô đất", href: "/plots" },
        { label: "Thanh toán & Hợp đồng" },
      ];
    }
    if (pathname.match(/\/plots\/.+/)) {
      return [
        { label: "Khám phá ô đất", href: "/plots" },
        { label: "Chi tiết ô đất" },
      ];
    }
    if (pathname.startsWith("/plots")) {
      return [{ label: "Trang chủ", href: "/" }, { label: "Khám phá ô đất" }];
    }
    if (pathname.startsWith("/my-farm")) {
      return [{ label: "Trang chủ", href: "/" }, { label: "Vườn của tôi" }];
    }
    if (pathname.startsWith("/journal")) {
      return [{ label: "Trang chủ", href: "/" }, { label: "Nhật ký nông vụ" }];
    }
    if (pathname.startsWith("/about")) {
      return [{ label: "Trang chủ", href: "/" }, { label: "Về chúng tôi" }];
    }
    return [{ label: "PlotFarm" }, { label: "Trang chủ" }];
  }, [pathname, role]);

  // 4. Xử lý điều hướng khi bấm icon / nav
  const handleNavChange = (id: string) => {
    if (role === "customer") {
      switch (id) {
        case "home":
          navigate("/");
          break;
        case "explore":
          navigate("/plots");
          break;
        case "journal":
        case "camera":
          navigate("/journal");
          break;
        case "about":
          navigate("/about");
          break;
        case "orders":
          navigate("/my-farm");
          break;
        case "profile":
          if (!user) {
            navigate(AUTH_ROUTES.LOGIN);
          } else {
            navigate("/my-farm");
          }
          break;
      }
    } else if (role === "farmer") {
      switch (id) {
        case "tasks_today":
        case "task_journal":
          navigate("/farmer");
          break;
        case "profile":
          if (!user) {
            navigate(AUTH_ROUTES.LOGIN);
          } else {
            navigate("/farmer");
          }
          break;
        case "my_plots":
        case "iot_camera":
          navigate("/farmer/plots");
          break;
        case "scan_qr":
          navigate("/farmer/tasks/TASK-01/execute");
          break;
      }
    } else if (role === "admin") {
      switch (id) {
        case "overview":
        case "work_orders":
        case "harvest":
        case "rbac":
        case "alerts":
        case "settings":
          navigate("/admin");
          break;
        case "plots":
        case "seeds_supply":
          navigate("/admin/plots");
          break;
        case "tech_config":
          navigate("/admin/plots/p-01/config");
          break;
      }
    }
  };

  return (
    <RootLayout
      role={role}
      user={user}
      activeNavId={activeNavId}
      breadcrumbs={breadcrumbs}
      onNavChange={handleNavChange}
      onLoginClick={() => navigate(AUTH_ROUTES.LOGIN)}
      onLogoutClick={handleLogout}
    >
      <Outlet />
    </RootLayout>
  );
}

export const router = createBrowserRouter([
  // Auth routes — full-screen, NO shell layout
  { path: AUTH_ROUTES.LOGIN.slice(1), element: <LoginPage /> },
  { path: AUTH_ROUTES.FORGOT_PASSWORD.slice(1), element: <Navigate to={AUTH_ROUTES.LOGIN} replace /> },

  {
    path: "/",
    element: <ShellRouteLayout />,
    children: [
      // Public routes — Khách vãng lai xem được
      { index: true, element: <HomePage /> },
      { path: "plots", element: <PlotsPage /> },
      { path: "plots/:id", element: <PlotDetailPage /> },
      { path: "about", element: <AboutPage /> },

      // Protected Customer routes — Chưa login thì không có nhật ký nông vụ & thuê đất
      {
        element: <ProtectedRoute />,
        children: [
          { path: "journal", element: <JournalPage /> },
          { path: "checkout", element: <CheckoutPage /> },
          { path: "checkout/:id", element: <CheckoutPage /> },
          { path: "my-farm", element: <MyFarmPage /> },
          { path: "my-farm/:id", element: <MyFarmPage /> },
        ],
      },

      // Protected Farmer routes — Chỉ dành cho STAFF hoặc ADMIN
      {
        element: <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]} />,
        children: [
          { path: "farmer", element: <FarmerTasksPage /> },
          { path: "farmer/tasks", element: <Navigate to="/farmer" replace /> },
          { path: "farmer/tasks/:id", element: <FarmerTaskExecutePage /> },
          { path: "farmer/tasks/:id/execute", element: <FarmerTaskExecutePage /> },
          { path: "farmer/plots", element: <FarmerPlotsPage /> },
        ],
      },

      // Protected Admin routes — Chỉ dành cho ADMIN
      {
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        children: [
          { path: "admin", element: <AdminDashboardPage /> },
          { path: "admin/dashboard", element: <Navigate to="/admin" replace /> },
          { path: "admin/plots", element: <AdminPlotsPage /> },
          { path: "admin/plots/:id/config", element: <AdminPlotConfigPage /> },
        ],
      },

      // Fallback
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
