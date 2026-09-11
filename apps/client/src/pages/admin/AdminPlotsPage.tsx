import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function AdminPlotsPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Quản lý Ô đất (/admin/plots)</h1>
      <p className="text-sm text-rose-500 font-medium">⚠️ Ô A-104 & B-108 đang có cảnh báo nhiệt độ lớn hơn 32°C</p>
      <Button onClick={() => navigate("/admin/plots/A-104/config")}>Cấu hình Kỹ thuật ô A-104 →</Button>
    </div>
  );
}

