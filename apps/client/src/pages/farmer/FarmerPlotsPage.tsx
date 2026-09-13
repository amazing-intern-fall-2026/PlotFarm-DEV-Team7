import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  QrCode,
  Droplets,
  Thermometer,
  Video,
  BookOpen,
  User,
  Sprout,
  CheckCircle2,
  X,
  Camera,
  Send,
  Cloud,
  Sun,
} from "lucide-react";

interface PlotData {
  id: string;
  code: string;
  area: string;
  bed: string;
  zone: "Khu A" | "Khu B";
  cropName: string;
  customerName: string;
  customerPhone: string;
  currentDay: number;
  totalDays: number;
  progressPercent: number;
  soilMoisture: number;
  soilStatus: "Đạt" | "Cần tưới" | "Tối ưu";
  temperature: number;
  airHumidity: number;
  harvestDate: string;
  status: "growing" | "need_water" | "ready_harvest";
  readyForHarvest?: boolean;
  image: string;
  lastWatered: string;
}

const ALL_PLOTS: PlotData[] = [
  {
    id: "A-104",
    code: "Ô đất A-104",
    area: "20m²",
    bed: "Luống 2",
    zone: "Khu A",
    cropName: "Cải cầu vồng Thụy Sĩ",
    customerName: "Chị Thu Hà",
    customerPhone: "0918.342.421",
    currentDay: 32,
    totalDays: 60,
    progressPercent: 53,
    soilMoisture: 68,
    soilStatus: "Đạt",
    temperature: 24.5,
    airHumidity: 72,
    harvestDate: "24/12/2026",
    status: "growing",
    image: "/images/rainbow_chard.jpg",
    lastWatered: "06:00 sáng nay (Đạt chuẩn)",
  },
  {
    id: "B-205",
    code: "Ô đất B-205",
    area: "15m²",
    bed: "Luống 5",
    zone: "Khu B",
    cropName: "Cải bó xôi Nhật",
    customerName: "Anh Trần Quang",
    customerPhone: "0909.112.334",
    currentDay: 18,
    totalDays: 60,
    progressPercent: 30,
    soilMoisture: 72,
    soilStatus: "Đạt",
    temperature: 23.0,
    airHumidity: 75,
    harvestDate: "08/01/2027",
    status: "growing",
    image: "/images/spinach.jpg",
    lastWatered: "06:30 sáng nay (Đạt chuẩn)",
  },
  {
    id: "A-101",
    code: "Ô đất A-101",
    area: "25m²",
    bed: "Luống 1",
    zone: "Khu A",
    cropName: "Xà lách búp mỡ",
    customerName: "Bác Hoàng Nam",
    customerPhone: "0934.556.778",
    currentDay: 60,
    totalDays: 60,
    progressPercent: 100,
    soilMoisture: 65,
    soilStatus: "Đạt",
    temperature: 22.8,
    airHumidity: 70,
    harvestDate: "Hôm nay (Đã đến hạn)",
    status: "ready_harvest",
    readyForHarvest: true,
    image: "/images/butterhead_lettuce.jpg",
    lastWatered: "Hôm qua • 17:00",
  },
  {
    id: "B-206",
    code: "Ô đất B-206",
    area: "18m²",
    bed: "Luống 6",
    zone: "Khu B",
    cropName: "Xà lách lolo tím",
    customerName: "Chị Mai Lan",
    customerPhone: "0988.776.554",
    currentDay: 27,
    totalDays: 60,
    progressPercent: 45,
    soilMoisture: 45,
    soilStatus: "Cần tưới",
    temperature: 25.0,
    airHumidity: 64,
    harvestDate: "15/01/2027",
    status: "need_water",
    image: "/images/seedlings_growth.jpg",
    lastWatered: "Hôm qua • 16:00 (Đất hơi khô)",
  },
  {
    id: "A-102",
    code: "Ô đất A-102",
    area: "20m²",
    bed: "Luống 3",
    zone: "Khu A",
    cropName: "Cà chua cherry",
    customerName: "Anh Đức Thắng",
    customerPhone: "0912.889.900",
    currentDay: 18,
    totalDays: 75,
    progressPercent: 24,
    soilMoisture: 62,
    soilStatus: "Đạt",
    temperature: 25.5,
    airHumidity: 68,
    harvestDate: "28/01/2027",
    status: "growing",
    image: "/images/proof_care_782.jpg",
    lastWatered: "07:00 sáng nay (Đạt chuẩn)",
  },
];

export function FarmerPlotsPage() {
  const navigate = useNavigate();

  // Filters state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [zoneFilter, setZoneFilter] = React.useState<"ALL" | "Khu A" | "Khu B">("ALL");
  const [statusFilter, setStatusFilter] = React.useState<"ALL" | "need_water" | "growing" | "ready_harvest">("ALL");

  // Selected plot for Detail / Telemetry modal (Screens 4 & 5)
  const [selectedPlotForDetail, setSelectedPlotForDetail] = React.useState<PlotData | null>(null);
  const [selectedLiveCamPlot, setSelectedLiveCamPlot] = React.useState<PlotData | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Quick note chips state inside Telemetry modal
  const [activeTags, setActiveTags] = React.useState<string[]>([
    "Cây bung lá khỏe",
    "Nắng ấm",
  ]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered plots
  const filteredPlots = ALL_PLOTS.filter((plot) => {
    const matchesSearch =
      plot.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plot.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesZone = zoneFilter === "ALL" || plot.zone === zoneFilter;
    const matchesStatus = statusFilter === "ALL" || plot.status === statusFilter;

    return matchesSearch && matchesZone && matchesStatus;
  });

  return (
    <div className="w-full space-y-6 pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & ACTIONS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Ô đất của tôi ({ALL_PLOTS.length} ô)
            </h1>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5">
              Phân khu A & B
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Giám sát vi khí hậu, độ ẩm đất và tiến độ sinh trưởng nông sản theo thời gian thực
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => showToast("Đang kết nối đầu đọc mã QR máy ảnh...")}
            className="flex items-center gap-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 transition-colors cursor-pointer"
          >
            <QrCode className="h-4 w-4 text-emerald-600" />
            <span>Quét mã QR</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/farmer")}
            className="flex items-center gap-1.5 rounded-2xl bg-[#1b4332] hover:bg-[#143427] text-white text-xs font-bold px-4 py-2.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>← Nhiệm vụ hôm nay</span>
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div className="rounded-2xl bg-slate-900 text-white px-5 py-3 text-sm font-semibold flex items-center justify-between shadow-xl animate-in fade-in">
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. FILTER TOOLBAR
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        {/* Search and primary zone tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo mã ô (A-104), tên rau, hoặc tên khách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          {/* Zone tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl self-start md:self-auto">
            <button
              type="button"
              onClick={() => setZoneFilter("ALL")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                zoneFilter === "ALL"
                  ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tất cả (5)
            </button>
            <button
              type="button"
              onClick={() => setZoneFilter("Khu A")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                zoneFilter === "Khu A"
                  ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Khu A Đà Lạt (3)
            </button>
            <button
              type="button"
              onClick={() => setZoneFilter("Khu B")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                zoneFilter === "Khu B"
                  ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Khu B (2)
            </button>
          </div>
        </div>

        {/* Sub-filters by status */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Filter className="h-3 w-3" /> Lọc trạng thái:
          </span>

          <button
            type="button"
            onClick={() => setStatusFilter("ALL")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              statusFilter === "ALL"
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Tất cả
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("need_water")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              statusFilter === "need_water"
                ? "bg-amber-600 text-white font-bold"
                : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>Cần tưới nước (1)</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("growing")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              statusFilter === "growing"
                ? "bg-emerald-700 text-white font-bold"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Đang sinh trưởng (3)</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("ready_harvest")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              statusFilter === "ready_harvest"
                ? "bg-orange-600 text-white font-bold"
                : "bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span>Chuẩn bị thu hoạch (1)</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. PARCEL CARDS GRID (3 Columns on Desktop)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlots.map((plot) => (
          <div
            key={plot.id}
            className={`flex flex-col rounded-3xl border bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
              plot.readyForHarvest
                ? "border-orange-300 ring-2 ring-orange-400/20"
                : plot.status === "need_water"
                ? "border-amber-300"
                : "border-slate-200/90"
            }`}
          >
            {/* Top Row: Plot code & Progress Badge */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  {plot.code}
                </h3>
                <p className="text-xs text-slate-500">
                  {plot.area} • {plot.bed} ({plot.zone})
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  plot.readyForHarvest
                    ? "bg-orange-100 text-orange-800 border border-orange-200"
                    : plot.status === "need_water"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {plot.readyForHarvest ? "Đạt 60/60 ngày" : `Ngày ${plot.currentDay}/${plot.totalDays}`}
              </span>
            </div>

            {/* Crop name & Customer */}
            <div className="space-y-1 mb-4">
              <h4 className="text-sm sm:text-base font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                <Sprout className="h-4 w-4 shrink-0" />
                <span>{plot.cropName}</span>
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-slate-400" />
                <span>{plot.customerName}</span>
              </p>
            </div>

            {/* IoT Telemetry Stats Bar */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <Droplets
                  className={`h-4 w-4 ${
                    plot.soilMoisture < 50 ? "text-amber-500" : "text-cyan-600"
                  }`}
                />
                <div>
                  <span className="text-[11px] text-slate-400">Độ ẩm:</span>{" "}
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">
                    {plot.soilMoisture}%
                  </strong>{" "}
                  <span
                    className={`text-[10px] ${
                      plot.soilStatus === "Đạt" ? "text-emerald-600" : "text-amber-600 font-bold"
                    }`}
                  >
                    ({plot.soilStatus})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-amber-600" />
                <div>
                  <span className="text-[11px] text-slate-400">Luống:</span>{" "}
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">
                    {plot.temperature}°C
                  </strong>
                </div>
              </div>
            </div>

            {/* Growth Progress Bar */}
            <div className="space-y-1.5 mb-5 mt-auto">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Tiến độ vụ:</span>
                <strong className="text-slate-900 dark:text-white">{plot.progressPercent}%</strong>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    plot.readyForHarvest
                      ? "bg-orange-500"
                      : plot.status === "need_water"
                      ? "bg-amber-500"
                      : "bg-emerald-600"
                  }`}
                  style={{ width: `${plot.progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 pt-0.5">
                Thu hoạch dự kiến: <strong>{plot.harvestDate}</strong>
              </p>
            </div>

            {/* Actions */}
            {plot.readyForHarvest ? (
              <button
                type="button"
                onClick={() => showToast(`Đã xuất lệnh thu hoạch nông sản cho ${plot.code}!`)}
                className="w-full rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <span>🚜 Tạo lệnh thu hoạch ngay</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLiveCamPlot(plot)}
                  className="rounded-2xl bg-blue-50/80 hover:bg-blue-100 text-blue-700 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Video className="h-3.5 w-3.5" />
                  <span>Xem camera</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlotForDetail(plot)}
                  className="rounded-2xl bg-[#1b4332] hover:bg-[#143427] text-white py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Nhật ký</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: LIVE CAMERA VIEW (Screen 4 Camera Frame)
      ───────────────────────────────────────────────────────────── */}
      {selectedLiveCamPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-white/20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
                <h3 className="text-sm font-bold">
                  Camera Trực Tiếp {selectedLiveCamPlot.code} ({selectedLiveCamPlot.bed})
                </h3>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-mono">
                  1080P HD
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLiveCamPlot(null)}
                className="rounded-full p-1 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video representation */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={selectedLiveCamPlot.image}
                alt={selectedLiveCamPlot.code}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 font-mono text-xs backdrop-blur-md">
                Cam góc 01 • {selectedLiveCamPlot.bed} (Trực tiếp)
              </div>
            </div>

            {/* Footer Bar */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900 text-xs text-slate-300 gap-3">
              <div className="flex items-center gap-4">
                <span>🌱 Cây trồng: <strong>{selectedLiveCamPlot.cropName}</strong></span>
                <span>💧 Độ ẩm đất: <strong>{selectedLiveCamPlot.soilMoisture}%</strong></span>
                <span>🌡 Nhiệt độ: <strong>{selectedLiveCamPlot.temperature}°C</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast("Đã chụp và lưu ảnh vào kho minh chứng!")}
                  className="rounded-xl bg-white/10 hover:bg-white/20 text-white px-3 py-2 font-bold flex items-center gap-1.5"
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>Chụp ảnh lưu kho</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const current = selectedLiveCamPlot;
                    setSelectedLiveCamPlot(null);
                    setSelectedPlotForDetail(current);
                  }}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 font-bold"
                >
                  Mở nhật ký ô đất
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: PARCEL DETAIL & CROP TELEMETRY (Screens 4 & 5)
      ───────────────────────────────────────────────────────────── */}
      {selectedPlotForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlotForDetail(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
                >
                  <X className="h-5 w-5" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Chi tiết & Nhật ký • {selectedPlotForDetail.code}
                    </h2>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5">
                      Đang sinh trưởng
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {selectedPlotForDetail.cropName} • Chủ hộ: {selectedPlotForDetail.customerName} ({selectedPlotForDetail.customerPhone})
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-500 hidden sm:block">
                Lần tưới: <strong>{selectedPlotForDetail.lastWatered}</strong>
              </div>
            </div>

            {/* Modal Body: 2 Columns */}
            <div className="overflow-y-auto p-5 space-y-6 flex-1">
              {/* Stepper vụ mùa: Gieo hạt > Nảy mầm > Bung lá > Thu hoạch */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Gieo hạt</span>
                </div>
                <span className="text-slate-300">›</span>
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Nảy mầm</span>
                </div>
                <span className="text-slate-300">›</span>
                <div className="flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-800 px-2.5 py-1 font-bold">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>Bung lá</span>
                </div>
                <span className="text-slate-300">›</span>
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span>Thu hoạch</span>
                </div>
              </div>

              {/* 3 Telemetry Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200 p-3.5 text-center bg-slate-50/50">
                  <Droplets className="h-5 w-5 text-cyan-600 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-500">Độ ẩm đất</p>
                  <p className="text-base font-extrabold text-slate-900">
                    {selectedPlotForDetail.soilMoisture}%
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold">Chuẩn 60-75%</span>
                </div>

                <div className="rounded-2xl border border-slate-200 p-3.5 text-center bg-slate-50/50">
                  <Thermometer className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-500">Nhiệt độ luống</p>
                  <p className="text-base font-extrabold text-slate-900">
                    {selectedPlotForDetail.temperature}°C
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold">Chuẩn 18-26°C</span>
                </div>

                <div className="rounded-2xl border border-slate-200 p-3.5 text-center bg-slate-50/50">
                  <Cloud className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-500">Độ ẩm không khí</p>
                  <p className="text-base font-extrabold text-slate-900">
                    {selectedPlotForDetail.airHumidity}%
                  </p>
                  <span className="text-[10px] text-blue-600 font-semibold">Ổn định</span>
                </div>
              </div>

              {/* Real Crop Image & Growth update form (Screen 5) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left: Crop photo */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Ảnh chụp kiểm định luống thực tế
                  </h4>
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={selectedPlotForDetail.image}
                      alt={selectedPlotForDetail.code}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] text-emerald-300 backdrop-blur-md">
                      Cloudinary Synced (1.2 MB)
                    </span>
                    <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] text-white backdrop-blur-md">
                      📅 Hôm nay • 08:35
                    </span>
                  </div>
                </div>

                {/* Right: Quick tags & log submission */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Ghi chú nhanh nông vụ hôm nay
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Tưới vi sinh",
                      "Cây bung lá khỏe",
                      "Đã xới thoáng đất",
                      "Đã diệt sâu sinh học",
                      "Nắng ấm",
                    ].map((tag) => {
                      const isSelected = activeTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-emerald-700 text-white shadow-2xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                        </button>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900 space-y-1">
                    <div className="flex items-center gap-2 font-bold">
                      <Sun className="h-4 w-4 text-amber-500" />
                      <span>Vi khí hậu lý tưởng cho đợt bung lá</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Độ ẩm {selectedPlotForDetail.soilMoisture}% và quang năng đạt tiêu chuẩn VietGAP giúp rễ cây hút dinh dưỡng tối đa.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      showToast(
                        `Đã lưu nhật ký và tự động gửi thông báo SMS/Zalo cho khách hàng ${selectedPlotForDetail.customerName}!`
                      );
                      setSelectedPlotForDetail(null);
                    }}
                    className="w-full rounded-2xl bg-[#1b4332] hover:bg-[#143427] text-white py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Lưu nhật ký & Gửi thông báo đến khách</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
