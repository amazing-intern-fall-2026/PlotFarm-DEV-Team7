import { useParams, useNavigate } from "react-router-dom";
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

export function CheckoutPage() {
  const { plotId = "A-104" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Thanh toán VietQR — Ô #{plotId}</CardTitle>
            <Badge variant="secondary">Napas247</Badge>
          </div>
          <CardDescription>
            Quét mã QR chuyển khoản tự động • Số tiền: 1.500.000 đ/tháng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hợp đồng điện tử và quyền truy cập camera giám sát sẽ được kích hoạt ngay khi giao dịch thành công.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => navigate(`/my-farm/${plotId}`)}>
            Xác nhận đã thanh toán →
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
