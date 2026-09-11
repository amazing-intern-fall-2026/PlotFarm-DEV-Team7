import * as React from "react";
import { I18nProvider } from "@/shared/lib/i18n";
import { AppShell } from "@/widgets/AppShell";
import type { AppRole } from "@/shared/ui/TopBar";

/**
 * Root Application Component
 *
 * Hướng dẫn:
 * - Thay đổi `demoRole` để xem layout theo từng role.
 * - Khi tích hợp Router, bọc RouterProvider bên trong I18nProvider.
 * - Khi tích hợp Auth, đọc role từ AuthContext và truyền vào AppShell.
 */

const DEMO_ROLE: AppRole = "customer"; // ← đổi thành "admin" | "farmer" để test

const DEMO_USER = {
  name: "Nguyễn Văn An",
  avatarSrc: undefined
};

export function App() {
  const [activeNavId, setActiveNavId] = React.useState("home");

  return (
    <I18nProvider defaultLocale="vi">
      <AppShell
        role={DEMO_ROLE}
        user={DEMO_USER}
        activeNavId={activeNavId}
        notificationCount={3}
        cartCount={2}
        hotlineNumber="1800 1234"
        breadcrumbs={[
          { label: "Hệ thống" },
          { label: "Tổng quan" }
        ]}
        onNavChange={setActiveNavId}
      >
        {/* Placeholder nội dung — sẽ được thay bằng router <Outlet /> */}
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="text-4xl mb-3">🌱</div>
          <h1 className="text-xl font-bold text-foreground mb-2">
            PlotFarm Shell Ready
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Layout Shell đã hoàn thành. Role hiện tại:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-primary">
              {DEMO_ROLE}
            </code>
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Đổi <code className="font-mono">DEMO_ROLE</code> trong{" "}
            <code className="font-mono">App.tsx</code> để kiểm tra layout của từng role.
          </p>
        </div>
      </AppShell>
    </I18nProvider>
  );
}

export default App;
