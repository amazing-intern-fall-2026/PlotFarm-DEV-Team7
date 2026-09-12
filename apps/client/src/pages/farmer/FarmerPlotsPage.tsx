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

export function FarmerPlotsPage() {
  return (
    <Box className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <Box className="flex items-center justify-between">
            <CardTitle>Ô đất của tôi — 5 ô (/farmer/plots)</CardTitle>
            <Badge variant="secondary">Kỹ thuật viên</Badge>
          </Box>
          <CardDescription>
            Phân khu phụ trách: Khu A Đà Lạt (3 ô) • Khu B (2 ô)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-sm">
            Theo dõi tình trạng đất, độ ẩm và sinh trưởng của các ô đất được phân công phụ trách.
          </Text>
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            onClick={() => alert("Đã tạo lệnh thu hoạch thành công!")}
          >
            Tạo lệnh thu hoạch ngay (Ô A-101) →
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
