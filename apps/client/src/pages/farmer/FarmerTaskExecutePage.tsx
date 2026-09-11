import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function FarmerTaskExecutePage() {
  const { taskId = "TASK-01" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Thực thi Tác vụ #{taskId}</h1>
      <p className="text-sm text-muted-foreground">Bón 150g phân trùn quế quanh rễ • Chụp ảnh nghiệm thu</p>
      <Button onClick={() => navigate("/farmer/plots")}>Hoàn thành tác vụ & Chuyển sang Ô đất →</Button>
    </div>
  );
}
