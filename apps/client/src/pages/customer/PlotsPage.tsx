import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function PlotsPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Danh sách Ô đất (/plots)</h1>
      <p className="text-sm text-muted-foreground">Bộ lọc: Đà Lạt Prime • Khu A • Khu B</p>
      <Button onClick={() => navigate("/plots/A-104")}>Chọn ô đất A-104 (Cải cầu vồng) →</Button>
    </div>
  );
}
