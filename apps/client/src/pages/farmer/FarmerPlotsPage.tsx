import { Button } from "@/shared/ui/Button";

export function FarmerPlotsPage() {
  return (
    <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
      <h1 className="text-2xl font-bold text-foreground">Ô đất của tôi — 5 ô (/farmer/plots)</h1>
      <p className="text-sm text-muted-foreground">Khu A Đà Lạt (3 ô) • Khu B (2 ô)</p>
      <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => alert("Đã tạo lệnh thu hoạch thành công!")}>
        Tạo lệnh thu hoạch ngay (Ô A-101) →
      </Button>
    </div>
  );
}
