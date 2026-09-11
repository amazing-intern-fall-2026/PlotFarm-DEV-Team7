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

export function AdminPlotsPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quản lý Ô đất (/admin/plots)</CardTitle>
            <Badge variant="warning">Cảnh báo</Badge>
          </div>
          <CardDescription className="text-destructive font-medium">
            ⚠️ Ô A-104 & B-108 đang có cảnh báo nhiệt độ lớn hơn 32°C
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Danh sách các ô đất thử nghiệm đang vận hành hệ sinh thái IoT BioCloud.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/admin/plots/A-104/config")}>
            Cấu hình Kỹ thuật ô A-104 →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
