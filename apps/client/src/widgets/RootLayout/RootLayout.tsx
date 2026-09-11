import * as React from "react";
import {
  Home,
  Search,
  Camera,
  BookOpen,
  ShoppingBag,
  User,
  LayoutDashboard,
  MapPin,
  Wrench,
  Leaf,
  ClipboardList,
  Truck,
  ShieldCheck,
  CheckSquare,
  QrCode,
  FileText,
  Bell,
} from "lucide-react";

import { useT } from "@/shared/lib/i18n";
import { BottomNavigation } from "@/shared/ui/BottomNavigation";
import { SidebarNav, type SidebarSection } from "@/shared/ui/SidebarNav";
import { TopBar, type AppRole, type BreadcrumbItem } from "@/shared/ui/TopBar";
import {
  Header,
  type HeaderNavItem,
} from "@/shared/ui/Header";
import { Footer } from "@/shared/ui/Footer";
import { cn } from "@/shared/lib/utils";

// ─── User shape ─────────────────────────────────────────────────────────────
export interface RootLayoutUser {
  name: string;
  avatarSrc?: string;
}

export type AppShellUser = RootLayoutUser;

// ─── Props ───────────────────────────────────────────────────────────────────
export interface RootLayoutProps {
  role: AppRole;
  user?: RootLayoutUser;
  activeNavId?: string;
  breadcrumbs?: BreadcrumbItem[];
  notificationCount?: number;
  onNavChange?: (id: string) => void;
  onNotificationsClick?: () => void;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export type AppShellProps = RootLayoutProps;

// ─── Build nav configs ───────────────────────────────────────────────────────

function useCustomerNavItems(
  t: (key: string) => string,
  activeNavId: string,
  onNavChange: (id: string) => void,
): HeaderNavItem[] {
  return [
    {
      id: "home",
      label: t("nav.home"),
      isActive: activeNavId === "home",
      onClick: () => onNavChange("home"),
    },
    {
      id: "explore",
      label: t("nav.explore"),
      isActive: activeNavId === "explore",
      onClick: () => onNavChange("explore"),
    },
    {
      id: "journal",
      label: t("nav.journal"),
      isActive: activeNavId === "journal",
      onClick: () => onNavChange("journal"),
    },
    {
      id: "about",
      label: t("nav.about"),
      isActive: activeNavId === "about",
      onClick: () => onNavChange("about"),
    },
  ];
}

function useCustomerBottomItems(t: (key: string) => string) {
  return [
    { id: "home", icon: <Home className="h-5 w-5" />, label: t("nav.home") },
    {
      id: "explore",
      icon: <Search className="h-5 w-5" />,
      label: t("nav.explore"),
    },
    {
      id: "camera",
      icon: <Camera className="h-5 w-5" />,
      label: t("nav.camera"),
    },
    {
      id: "orders",
      icon: <ShoppingBag className="h-5 w-5" />,
      label: t("nav.orders"),
    },
    {
      id: "profile",
      icon: <User className="h-5 w-5" />,
      label: t("nav.profile"),
    },
  ];
}

function useAdminSections(
  t: (key: string) => string,
  onNavChange?: (id: string) => void,
): SidebarSection[] {
  return [
    {
      items: [
        {
          id: "overview",
          icon: <LayoutDashboard className="h-4 w-4" />,
          label: t("admin.overview"),
          onClick: () => onNavChange?.("overview"),
        },
        {
          id: "plots",
          icon: <MapPin className="h-4 w-4" />,
          label: t("admin.plots"),
          onClick: () => onNavChange?.("plots"),
        },
        {
          id: "tech_config",
          icon: <Wrench className="h-4 w-4" />,
          label: t("admin.tech_config"),
          onClick: () => onNavChange?.("tech_config"),
        },
        {
          id: "seeds_supply",
          icon: <Leaf className="h-4 w-4" />,
          label: t("admin.seeds_supply"),
          onClick: () => onNavChange?.("seeds_supply"),
        },
      ],
    },
    {
      title: "Vận hành",
      items: [
        {
          id: "work_orders",
          icon: <ClipboardList className="h-4 w-4" />,
          label: t("admin.work_orders"),
          onClick: () => onNavChange?.("work_orders"),
        },
        {
          id: "harvest",
          icon: <Truck className="h-4 w-4" />,
          label: t("admin.harvest"),
          onClick: () => onNavChange?.("harvest"),
        },
        {
          id: "rbac",
          icon: <ShieldCheck className="h-4 w-4" />,
          label: t("admin.rbac"),
          onClick: () => onNavChange?.("rbac"),
        },
      ],
    },
  ];
}

function useAdminBottomItems(t: (key: string) => string) {
  return [
    {
      id: "overview",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: t("admin.overview"),
    },
    {
      id: "plots",
      icon: <MapPin className="h-5 w-5" />,
      label: t("admin.plots"),
    },
    {
      id: "work_orders",
      icon: <ClipboardList className="h-5 w-5" />,
      label: t("admin.work_orders"),
    },
    {
      id: "alerts",
      icon: <Bell className="h-5 w-5" />,
      label: t("admin.alerts"),
    },
    {
      id: "settings",
      icon: <ShieldCheck className="h-5 w-5" />,
      label: t("admin.settings"),
    },
  ];
}

function useFarmerSections(
  t: (key: string) => string,
  onNavChange?: (id: string) => void,
): SidebarSection[] {
  return [
    {
      items: [
        {
          id: "tasks_today",
          icon: <CheckSquare className="h-4 w-4" />,
          label: t("farmer.tasks_today"),
          onClick: () => onNavChange?.("tasks_today"),
        },
        {
          id: "my_plots",
          icon: <MapPin className="h-4 w-4" />,
          label: t("farmer.my_plots"),
          onClick: () => onNavChange?.("my_plots"),
        },
        {
          id: "iot_camera",
          icon: <Camera className="h-4 w-4" />,
          label: t("farmer.iot_camera"),
          onClick: () => onNavChange?.("iot_camera"),
        },
        {
          id: "task_journal",
          icon: <FileText className="h-4 w-4" />,
          label: t("farmer.task_journal"),
          onClick: () => onNavChange?.("task_journal"),
        },
      ],
    },
  ];
}

function useFarmerBottomItems(t: (key: string) => string) {
  return [
    {
      id: "tasks_today",
      icon: <CheckSquare className="h-5 w-5" />,
      label: t("farmer.tasks_today"),
    },
    {
      id: "my_plots",
      icon: <MapPin className="h-5 w-5" />,
      label: t("farmer.my_plots"),
    },
    {
      id: "scan_qr",
      icon: <QrCode className="h-5 w-5" />,
      label: t("farmer.scan_qr"),
    },
    {
      id: "task_journal",
      icon: <BookOpen className="h-5 w-5" />,
      label: t("farmer.task_journal"),
    },
    {
      id: "profile",
      icon: <User className="h-5 w-5" />,
      label: t("farmer.my_profile"),
    },
  ];
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * RootLayout — Root layout shell nhận `role` và render đúng layout theo role × breakpoint.
 *
 * | Role     | Desktop (≥1024px)                      | Mobile (<1024px)               |
 * |----------|----------------------------------------|-------------------------------|
 * | customer | CustomerHeader + full-width main        | CustomerHeader + BottomNav     |
 * | admin    | SidebarNav (collapsible) + TopBar + main | TopBar (hamburger) + BottomNav |
 * | farmer   | SidebarNav (collapsible) + TopBar + main | TopBar (hamburger) + BottomNav |
 */
export function RootLayout({
  role,
  user,
  activeNavId = "home",
  breadcrumbs = [],
  notificationCount = 0,
  onNavChange,
  onNotificationsClick,
  onLoginClick,
  onLogoutClick,
  children,
  className,
}: RootLayoutProps) {
  const { t } = useT();
  const [activeId, setActiveId] = React.useState(activeNavId);

  const handleNavChange = React.useCallback(
    (id: string) => {
      setActiveId(id);
      onNavChange?.(id);
    },
    [onNavChange],
  );

  const handleMobileTabChange = React.useCallback(
    (index: number, items: { id: string }[]) => {
      const item = items[index];
      if (item) handleNavChange(item.id);
    },
    [handleNavChange],
  );

  // ─── CUSTOMER ─────────────────────────────────────────────────────────────
  if (role === "customer") {
    const customerNavItems = useCustomerNavItems(t, activeId, handleNavChange);
    const customerBottomItems = useCustomerBottomItems(t);
    const bottomIndex = customerBottomItems.findIndex((i) => i.id === activeId);

    return (
      <div className={cn("flex min-h-screen flex-col", className)}>
        <Header
          role="customer"
          navItems={customerNavItems}
          user={user ?? null}
          notificationCount={notificationCount}
          notificationsLabel={t("nav.notifications")}
          loginLabel={t("nav.login")}
          menuLabel={t("shell.menu")}
          onNotificationsClick={onNotificationsClick}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />

        {/* Main content — pb-20 hides content behind BottomNav on mobile */}
        <main
          className={cn(
            "flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 py-6",
            "lg:pb-6 pb-20",
          )}
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Bottom Nav — mobile only */}
        <div className="lg:hidden">
          <BottomNavigation
            items={customerBottomItems}
            activeIndex={bottomIndex >= 0 ? bottomIndex : 0}
            onTabChange={(i) => handleMobileTabChange(i, customerBottomItems)}
          />
        </div>
      </div>
    );
  }

  // ─── ADMIN / FARMER ───────────────────────────────────────────────────────
  const isAdmin = role === "admin";
  const sidebarSections = isAdmin
    ? useAdminSections(t, handleNavChange)
    : useFarmerSections(t, handleNavChange);
  const bottomItems = isAdmin
    ? useAdminBottomItems(t)
    : useFarmerBottomItems(t);
  const bottomIndex = bottomItems.findIndex((i) => i.id === activeId);

  const roleBadgeLabel = isAdmin
    ? t("shell.role_badge_admin")
    : t("shell.role_badge_farmer");

  const defaultBreadcrumbs: BreadcrumbItem[] =
    breadcrumbs.length > 0
      ? breadcrumbs
      : [{ label: t("shell.breadcrumb_home") }];

  return (
    <div className={cn("flex h-screen overflow-hidden bg-muted/30", className)}>
      {/* ── Sidebar (desktop only) ─────────────────────────────────── */}
      <SidebarNav
        sections={sidebarSections}
        activeItemId={activeId}
        collapseLabel={t("shell.collapse")}
        expandLabel={t("shell.expand")}
      />

      {/* ── Right column: TopBar + main ─────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          user={user ? { ...user, role } : undefined}
          breadcrumbs={defaultBreadcrumbs}
          notificationCount={notificationCount}
          searchPlaceholder={t("shell.search_placeholder")}
          notificationsLabel={t("nav.notifications")}
          menuLabel={t("shell.menu")}
          roleBadgeLabel={roleBadgeLabel}
          onNotificationsClick={onNotificationsClick}
        />

        {/* Scrollable main — pb-20 for mobile bottom nav */}
        <main
          className={cn(
            "flex-1 overflow-y-auto px-4 py-4 sm:px-6",
            "lg:pb-4 pb-20",
          )}
        >
          {children}
        </main>

        {/* Bottom Nav — mobile only */}
        <div className="lg:hidden">
          <BottomNavigation
            items={bottomItems}
            activeIndex={bottomIndex >= 0 ? bottomIndex : 0}
            onTabChange={(i) => handleMobileTabChange(i, bottomItems)}
          />
        </div>
      </div>
    </div>
  );
}

RootLayout.displayName = "RootLayout";

export { RootLayout as AppShell };
