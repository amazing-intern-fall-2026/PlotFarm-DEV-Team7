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
  Box,
  Text,
} from "@/shared/ui";

export function FarmerTasksPage() {
  const navigate = useNavigate();
  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Tác vụ hôm nay (/farmer)</CardTitle>
            <Badge variant="warning">03 việc chờ</Badge>
          </Box>
          <CardDescription className="text-secondary font-medium">
            ⚡ 3 việc chờ xử lý • 1 ô đến hạn thu hoạch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-sm">
            Danh sách công việc kỹ thuật cần hoàn thành trong ca làm việc buổi sáng.
          </Text>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/farmer/tasks/TASK-01/execute")}>
            Bắt đầu xử lý task TASK-01 (Bón phân vi sinh A-104) →
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
