import { useNavigate } from "react-router-dom";
import { Sprout, Video, ShieldCheck } from "lucide-react";
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
  Metric,
} from "@/shared/ui";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Box className="w-full space-y-6">
      {/* Banner chính trải rộng toàn bộ chiều ngang Container */}
      <Card className="w-full overflow-hidden border-border bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader>
          <Box className="flex flex-wrap items-center justify-between gap-3">
            <Box className="flex items-center gap-2.5">
              <CardTitle className="text-xl sm:text-2xl font-bold">
                Trang chủ (Marketplace)
              </CardTitle>
            </Box>
            <Box className="flex items-center gap-2">
              <Badge variant="success">VietGAP 100%</Badge>
              <Badge variant="outline">Đà Lạt Prime</Badge>
            </Box>
          </Box>
          <CardDescription className="text-sm sm:text-base font-medium text-foreground/80">
            Sở hữu vườn rau hữu cơ riêng của bạn — Giám sát IoT trực tiếp 24/7
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Text
            variant="muted"
            className="text-sm sm:text-base leading-relaxed"
          >
            Kết nối trực tiếp cư dân thành thị với nông trại công nghệ cao tại
            Đạ Sar, Lạc Dương, Đà Lạt. Theo dõi quá trình sinh trưởng từng luống
            rau qua hệ thống camera và cảm biến vi khí hậu, nhận nông sản hữu cơ
            chuẩn VietGAP giao tận cửa nhà bạn hàng tuần.
          </Text>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={() => navigate("/plots")}>
            Khám phá ô đất ngay →
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/about")}
          >
            Tìm hiểu quy trình canh tác
          </Button>
        </CardFooter>
      </Card>

      {/* 3 Metric Cards cân bằng layout chiều ngang sang lề phải */}
      <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Metric
          title="Thửa đất sẵn sàng"
          value="35+ ô"
          subtitle="Đất sạch hữu cơ Đạ Sar"
          variant="success"
          icon={<Sprout className="h-5 w-5" />}
          actionText="Xem danh sách"
          onActionClick={() => navigate("/plots")}
        />
        <Metric
          title="Giám sát trực tuyến"
          value="24/7"
          subtitle="Camera HLS & Cảm biến vi khí hậu"
          variant="info"
          icon={<Video className="h-5 w-5" />}
        />
        <Metric
          title="Tiêu chuẩn canh tác"
          value="100%"
          subtitle="Chứng nhận VietGAP & Bio Organic"
          variant="default"
          icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
        />
      </Box>
    </Box>
  );
}
