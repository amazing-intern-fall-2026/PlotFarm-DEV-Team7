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

export function AdminDashboardPage() {
  const navigate = useNavigate();
  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Bảng điều khiển Tổng quan (/admin/dashboard)</CardTitle>
            <Badge variant="default">Admin</Badge>
          </Box>
          <CardDescription>
            Doanh thu: 285.4M • Lấp đầy: 84% • 02 ô đất cảnh báo vi khí hậu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-sm">
            Hệ thống đang theo dõi 50 ô đất công nghệ cao tại Lạc Dương, Đà Lạt.
          </Text>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/admin/plots?filter=warning")}>
            Xem 02 ô đất cảnh báo (/admin/plots) →
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
