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

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Trang chủ (Marketplace)</CardTitle>
            <Badge variant="success">VietGAP 100%</Badge>
          </div>
          <CardDescription>
            Sở hữu vườn rau hữu cơ riêng của bạn - Giám sát 24/7
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Kết nối trực tiếp cư dân thành thị với nông trại công nghệ cao tại Đạ Sar, Lạc Dương, Đà Lạt.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/plots")}>
            Khám phá ô đất ngay →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
