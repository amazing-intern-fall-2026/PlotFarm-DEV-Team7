import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Bảng điều khiển Tổng quan (/admin/dashboard)</h1>
      <p className="text-sm text-muted-foreground">Doanh thu: 285.4M • Lấp đầy: 84% • 02 ô đất cảnh báo vi khí hậu</p>
      <Button onClick={() => navigate("/admin/plots?filter=warning")}>Xem 02 ô đất cảnh báo (/admin/plots) →</Button>
    </div>
  );
}
