import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
} from "@/shared/ui";

export function FarmerTasksPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tác vụ hôm nay (/farmer)</CardTitle>
            <Badge variant="warning">03 việc chờ</Badge>
          </div>
          <CardDescription className="text-secondary font-medium">
            ⚡ 3 việc chờ xử lý • 1 ô đến hạn thu hoạch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Danh sách công việc kỹ thuật cần hoàn thành trong ca làm việc buổi sáng.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/farmer/tasks/TASK-01/execute")}>
            Bắt đầu xử lý task TASK-01 (Bón phân vi sinh A-104) →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
