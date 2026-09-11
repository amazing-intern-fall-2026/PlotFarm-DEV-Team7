import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function PlotDetailPage() {
  const { plotId = "A-104" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Chi tiết Ô đất #{plotId}</h1>
      <p className="text-sm text-muted-foreground">20m² • Cải cầu vồng • HLS Camera 1080p</p>
      <Button onClick={() => navigate(`/checkout/${plotId}`)}>Thuê ô đất này ngay →</Button>
    </div>
  );
}
