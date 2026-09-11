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

export function FarmerPlotsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Ô đất của tôi — 5 ô (/farmer/plots)</CardTitle>
            <Badge variant="secondary">Kỹ thuật viên</Badge>
          </div>
          <CardDescription>
            Phân khu phụ trách: Khu A Đà Lạt (3 ô) • Khu B (2 ô)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Theo dõi tình trạng đất, độ ẩm và sinh trưởng của các ô đất được phân công phụ trách.
          </p>
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
    </div>
  );
}
