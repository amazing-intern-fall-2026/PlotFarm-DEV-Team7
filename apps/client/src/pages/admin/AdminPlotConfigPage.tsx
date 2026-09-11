import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function AdminPlotConfigPage() {
  const { plotId = "A-104" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Cấu hình Kỹ thuật Ô đất #{plotId}</h1>
      <p className="text-sm text-muted-foreground">RTSP / HLS Stream • Cài đặt ngưỡng cảm biến • Gán Kỹ thuật viên (Bác Bảy)</p>
      <Button onClick={() => navigate("/admin/plots")}>Lưu cấu hình ô đất & Quay lại →</Button>
    </div>
  );
}
