import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button";

export function CheckoutPage() {
  const { plotId = "A-104" } = useParams();
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Thanh toán VietQR — Ô #{plotId}</h1>
      <p className="text-sm text-muted-foreground">Quét mã Napas247 • Số tiền: 1.500.000 đ</p>
      <Button onClick={() => navigate(`/my-farm/${plotId}`)}>Xác nhận đã thanh toán →</Button>
    </div>
  );
}
