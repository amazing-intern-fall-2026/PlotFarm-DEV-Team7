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

export function AdminPlotConfigPage() {
  const { plotId = "A-104" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cấu hình Kỹ thuật Ô đất #{plotId}</CardTitle>
            <Badge variant="outline">Khu A Đà Lạt</Badge>
          </div>
          <CardDescription>
            RTSP / HLS Stream • Cài đặt ngưỡng cảm biến • Gán Kỹ thuật viên (Bác Bảy)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Thiết lập luồng video giám sát 24/7 và thông số vi khí hậu an toàn cho vụ rau hữu cơ.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/admin/plots")}>
            Lưu cấu hình ô đất & Quay lại →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
