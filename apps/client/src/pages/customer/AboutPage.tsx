import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from "@/shared/ui";

export function AboutPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Về chúng tôi (/about)</CardTitle>
            <Badge variant="outline">BioCloud</Badge>
          </div>
          <CardDescription>
            Giải pháp số hoá nông trại thông minh chuẩn VietGAP & GlobalGAP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            BioCloud Farming là nền tảng tiên phong kết nối mô hình nông nghiệp số với hệ thống cảm biến IoT, camera HLS truyền phát thời gian thực và nhật ký canh tác minh bạch.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
