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

export function MyFarmPage() {
  const { plotId = "A-104" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Vườn của tôi — Ô #{plotId}</CardTitle>
            <Badge variant="success">Đang canh tác</Badge>
          </div>
          <CardDescription>
            Camera Livestream 24/7 • Độ ẩm đất: 68% • Nhiệt độ: 24.5°C
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Lô đất của bạn đang được kỹ thuật viên chăm sóc đạt chuẩn hữu cơ quốc tế.
          </p>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/")}>
            ← Về Trang chủ
          </Button>
          <Button onClick={() => navigate("/journal")}>
            Xem Nhật ký chăm sóc →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
