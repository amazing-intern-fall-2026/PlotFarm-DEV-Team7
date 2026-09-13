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

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Trang chủ (Marketplace)</CardTitle>
            <Badge variant="success">VietGAP 100%</Badge>
          </Box>
          <CardDescription>
            Sở hữu vườn rau hữu cơ riêng của bạn - Giám sát 24/7
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Text variant="muted" className="text-sm leading-relaxed">
            Kết nối trực tiếp cư dân thành thị với nông trại công nghệ cao tại Đạ Sar, Lạc Dương, Đà Lạt.
          </Text>
        </CardContent>

        <CardFooter>
          <Button onClick={() => navigate("/plots")}>
            Khám phá ô đất ngay →
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
