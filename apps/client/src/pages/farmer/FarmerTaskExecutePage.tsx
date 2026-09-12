import { useParams, useNavigate } from "react-router-dom";
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

export function FarmerTaskExecutePage() {
  const { taskId = "TASK-01" } = useParams();
  const navigate = useNavigate();
  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Thực thi Tác vụ #{taskId}</CardTitle>
            <Badge variant="warning">Đang tiến hành</Badge>
          </Box>
          <CardDescription>
            Tác vụ: Bón 150g phân trùn quế quanh rễ • Chụp ảnh nghiệm thu tại Ô A-104
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-sm">
            Sau khi hoàn thành, ảnh chụp thực tế sẽ được tự động đồng bộ vào nhật ký canh tác của khách hàng.
          </Text>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/farmer")}>
            ← Quay lại danh sách
          </Button>
          <Button onClick={() => navigate("/farmer/plots")}>
            Hoàn thành tác vụ & Chuyển sang Ô đất →
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
