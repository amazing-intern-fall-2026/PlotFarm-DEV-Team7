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

export function PlotsPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách Ô đất (/plots)</CardTitle>
            <Badge variant="outline">Đà Lạt Prime</Badge>
          </div>
          <CardDescription>
            Bộ lọc phân khu: Khu A (Rau ăn lá) • Khu B (Củ quả hữu cơ)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Lựa chọn ô đất phù hợp để bắt đầu hành trình canh tác nông nghiệp số cùng kỹ sư BioCloud.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate("/plots/A-104")}>
            Chọn ô đất A-104 (Cải cầu vồng) →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
