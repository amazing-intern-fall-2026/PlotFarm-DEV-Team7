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
} from "@/shared/ui";

export function FarmerTaskExecutePage() {
  const { taskId = "TASK-01" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Thực thi Tác vụ #{taskId}</CardTitle>
            <Badge variant="warning">Đang tiến hành</Badge>
          </div>
          <CardDescription>
            Tác vụ: Bón 150g phân trùn quế quanh rễ • Chụp ảnh nghiệm thu tại Ô A-104
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Sau khi hoàn thành, ảnh chụp thực tế sẽ được tự động đồng bộ vào nhật ký canh tác của khách hàng.
          </p>
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
    </div>
  );
}
