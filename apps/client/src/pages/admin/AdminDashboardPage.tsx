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

export function AdminDashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bảng điều khiển Tổng quan (/admin/dashboard)</CardTitle>
            <Badge variant="default">Admin</Badge>
          </div>
          <CardDescription>
            Doanh thu: 285.4M • Lấp đầy: 84% • 02 ô đất cảnh báo vi khí hậu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hệ thống đang theo dõi 50 ô đất công nghệ cao tại Lạc Dương, Đà Lạt.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/admin/plots?filter=warning")}>
            Xem 02 ô đất cảnh báo (/admin/plots) →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
