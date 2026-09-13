import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardTitle, Button } from "@/shared/ui";
import { FarmingLogForm } from "@/features/farming-log";
import { ArrowLeft } from "lucide-react";

export function FarmerNewLogPage() {
  const { id = "CONTRACT-A104" } = useParams();
  const navigate = useNavigate();

  // Determine plot code and crop from id
  const plotCode = id.startsWith("A-") || id.startsWith("B-") ? `Ô đất ${id}` : "Ô đất A-104";
  const cropName = id.includes("205")
    ? "Cải bó xôi Nhật"
    : id.includes("101")
    ? "Xà lách búp mỡ"
    : "Cải cầu vồng Thụy Sĩ";
  const customerName = id.includes("205")
    ? "Anh Trần Quang"
    : id.includes("101")
    ? "Bác Hoàng Nam"
    : "Chị Thu Hà";

  return (
    <Box className="w-full space-y-6 pb-12">
      {/* Top Breadcrumb Bar */}
      <Card className="p-4 rounded-2xl border-border flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => navigate("/farmer/plots")}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          className="text-xs font-bold"
        >
          Quay lại danh sách ô đất
        </Button>

        <CardTitle className="text-xs text-muted-foreground font-normal">
          Kỹ thuật viên Lô A • Cập nhật tiến độ sinh trưởng
        </CardTitle>
      </Card>

      {/* Main Form */}
      <FarmingLogForm
        contractId={id}
        plotCode={plotCode}
        cropName={cropName}
        customerName={customerName}
        onCancel={() => navigate("/farmer/plots")}
        onSuccess={() => navigate("/farmer/plots")}
      />
    </Box>
  );
}
