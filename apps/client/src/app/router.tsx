import * as React from "react";
import {
  createBrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { RootLayout } from "@/widgets/RootLayout";
import type { AppRole, BreadcrumbItem } from "@/shared/ui";
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
  const breadcrumbs: BreadcrumbItem[] = React.useMemo(() => {
    if (role === "admin") {
      if (pathname.includes("/config")) {
        return [
          { label: "Quản trị hệ thống", href: "/admin" },
          { label: "Danh mục ô đất", href: "/admin/plots" },
          { label: "Cấu hình IoT & Cây trồng" },
        ];
      }
      if (pathname.startsWith("/admin/plots")) {
        return [
          { label: "Quản trị hệ thống", href: "/admin" },
          { label: "Danh sách ô đất" },
        ];
      }
      return [
        { label: "Quản trị hệ thống" },
        { label: "Tổng quan điều hành" },
      ];
    }

    if (role === "farmer") {
      if (pathname.match(/\/farmer\/tasks\/.+/)) {
        return [
          { label: "Nhiệm vụ hôm nay", href: "/farmer/tasks" },
          { label: "Thực hiện nhiệm vụ" },
        ];
      }
      if (pathname.startsWith("/farmer/plots")) {
        return [
          { label: "Nông dân thực địa" },
          { label: "Quản lý ô đất" },
        ];
      }
      return [
        { label: "Nông dân thực địa" },
        { label: "Nhiệm vụ hôm nay" },
      ];
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
        case "profile":
          navigate("/my-farm");
          break;
      }
    } else if (role === "farmer") {
      switch (id) {
        case "tasks_today":
        case "task_journal":
        case "profile":
          navigate("/farmer");
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
      user={{ name: "Nguyễn Văn An" }}
      activeNavId={activeNavId}
      breadcrumbs={breadcrumbs}
      notificationCount={3}
      onNavChange={handleNavChange}
      onLoginClick={() => navigate("/my-farm")}
    >
      <Outlet />
    </RootLayout>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShellRouteLayout />,
    children: [
      // Customer routes
      { index: true, element: <HomePage /> },
      { path: "plots", element: <PlotsPage /> },
      { path: "plots/:id", element: <PlotDetailPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "checkout/:id", element: <CheckoutPage /> },
      { path: "my-farm", element: <MyFarmPage /> },
      { path: "my-farm/:id", element: <MyFarmPage /> },
      { path: "journal", element: <JournalPage /> },
      { path: "about", element: <AboutPage /> },

      // Farmer routes
      { path: "farmer", element: <FarmerTasksPage /> },
      { path: "farmer/tasks", element: <Navigate to="/farmer" replace /> },
      { path: "farmer/tasks/:id", element: <FarmerTaskExecutePage /> },
      { path: "farmer/tasks/:id/execute", element: <FarmerTaskExecutePage /> },
      { path: "farmer/plots", element: <FarmerPlotsPage /> },

      // Admin routes
      { path: "admin", element: <AdminDashboardPage /> },
      { path: "admin/dashboard", element: <Navigate to="/admin" replace /> },
      { path: "admin/plots", element: <AdminPlotsPage /> },
      { path: "admin/plots/:id/config", element: <AdminPlotConfigPage /> },

      // Fallback
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
