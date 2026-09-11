import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function FarmerTasksPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Tác vụ hôm nay (/farmer)</h1>
      <p className="text-sm text-amber-600 font-medium">⚡ 3 việc chờ xử lý • 1 ô đến hạn thu hoạch</p>
      <Button onClick={() => navigate("/farmer/tasks/TASK-01/execute")}>Bắt đầu xử lý task TASK-01 (Bón phân vi sinh A-104) →</Button>
    </div>
  );
}
