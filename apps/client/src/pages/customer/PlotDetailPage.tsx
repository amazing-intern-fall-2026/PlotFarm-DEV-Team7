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

export function PlotDetailPage() {
  const { plotId = "A-104" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Chi tiết Ô đất #{plotId}</CardTitle>
            <Badge variant="default">Có sẵn để thuê</Badge>
          </div>
          <CardDescription>
            Diện tích: 20m² • Cây trồng: Cải cầu vồng • Chuẩn VietGAP • HLS Camera 1080p
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ô đất bao gồm hệ thống tưới nhỏ giọt tự động, cảm biến độ ẩm đất và kết nối trực tiếp với ứng dụng di động của bạn.
          </p>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/plots")}>
            ← Quay lại danh sách
          </Button>
          <Button onClick={() => navigate(`/checkout/${plotId}`)}>
            Thuê ô đất này ngay →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
