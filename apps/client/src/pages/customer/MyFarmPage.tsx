import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function MyFarmPage() {
  const { plotId = "A-104" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Vườn của tôi — Ô #{plotId}</h1>
      <p className="text-sm text-muted-foreground">Camera Livestream 24/7 • Độ ẩm đất: 68% • Nhiệt độ: 24.5°C</p>
      <Button variant="outline" onClick={() => navigate("/")}>← Về Trang chủ</Button>
    </div>
  );
}
