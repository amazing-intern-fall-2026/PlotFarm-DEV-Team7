import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Trang chủ (Marketplace)</h1>
      <p className="text-sm text-muted-foreground">Sở hữu vườn rau hữu cơ riêng của bạn - Giám sát 24/7</p>
      <Button onClick={() => navigate("/plots")}>Khám phá ô đất ngay →</Button>
    </div>
  );
}
