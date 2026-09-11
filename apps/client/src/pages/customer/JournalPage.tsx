import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from "@/shared/ui";

export function JournalPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Nhật ký nông vụ (/journal)</CardTitle>
            <Badge variant="outline">Minh bạch 100%</Badge>
          </div>
          <CardDescription>
            Theo dõi tiến trình bón phân, tưới tiêu, hình ảnh time-lapse từ kỹ thuật viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mọi thao tác chăm bón tại ô đất của bạn đều được kỹ sư ghi nhận qua ảnh chụp thực địa và dữ liệu cảm biến đo đạc tự động.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
