import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Droplets,
  Thermometer,
  Video,
  ChevronRight,
  Play,
  QrCode,
  AlertTriangle,
  ArrowRight,
  Sprout,
  X,
  FileText,
} from "lucide-react";

interface PriorityTask {
  id: string;
  type: string;
  zone: string;
  bed: string;
  deadline: string;
  plotCode: string;
  cropName: string;
  customerName: string;
  contractCode: string;
  soilMoisture: string;
  temperature: string;
  customerNote: string;
}

const ACTIVE_TASK: PriorityTask = {
  id: "CARE-782",
  type: "Bón phân vi sinh",
  zone: "Khu A",
  bed: "Luống 2",
  deadline: "Trước 09:30",
  plotCode: "Ô đất A-104",
  cropName: "Cải cầu vồng",
  customerName: "Thu Hà",
  contractCode: "#CF-8921",
  soilMoisture: "58%",
  temperature: "24°C",
  customerNote: "Bón 150g phân trùn quế quanh rễ, tỉa bớt lá già sát đất",
};

interface SecondaryTask {
  id: string;
  type: string;
  plotCode: string;
  bed: string;
  deadline: string;
  customerName: string;
  status: "pending" | "in_progress" | "done";
}

const UPCOMING_TASKS: SecondaryTask[] = [
  {
    id: "CARE-783",
    type: "Kiểm tra bẫy pheromone bướm trắng",
    plotCode: "Ô đất B-205",
    bed: "Luống 5",
    deadline: "Trước 10:30",
    customerName: "Trần Quang",
    status: "pending",
  },
  {
    id: "CARE-784",
    type: "Đo nồng độ EC và xới thoáng đất",
    plotCode: "Ô đất A-102",
    bed: "Luống 3",
    deadline: "Trước 11:15",
    customerName: "Đức Thắng",
    status: "pending",
  },
];

interface ManagedPlot {
  id: string;
  code: string;
  cropName: string;
  currentDay: number;
  totalDays: number;
  progressPercent: number;
  readyForHarvest?: boolean;
  image: string;
}

const MANAGED_PLOTS: ManagedPlot[] = [
  {
    id: "A-104",
    code: "Ô đất A-104",
    cropName: "Cải cầu vồng",
    currentDay: 32,
    totalDays: 60,
    progressPercent: 53,
    image: "/images/rainbow_chard.jpg",
  },
  {
    id: "A-101",
    code: "Ô đất A-101",
    cropName: "Xà lách búp",
    currentDay: 60,
    totalDays: 60,
    progressPercent: 100,
    readyForHarvest: true,
    image: "/images/butterhead_lettuce.jpg",
  },
  {
    id: "A-102",
    code: "Ô đất A-102",
    cropName: "Cà chua cherry",
    currentDay: 18,
    totalDays: 75,
    progressPercent: 24,
    image: "/images/spinach.jpg",
  },
];

export function FarmerTasksPage() {
  const navigate = useNavigate();
  const [selectedLiveCamPlot, setSelectedLiveCamPlot] = React.useState<string | null>(null);
  const [showHarvestAlert, setShowHarvestAlert] = React.useState(false);

  const handleHarvestClick = (_plotCode: string) => {
    setShowHarvestAlert(true);
    setTimeout(() => {
      setShowHarvestAlert(false);
      navigate("/farmer/plots");
    }, 1500);
  };

  return (
    <div className="w-full space-y-6 pb-10">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP STAFF HEADER & KPI METRICS (Web Desktop Header)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Left: Staff Profile Info */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Bác Bảy"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Bác Bảy
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Đang làm việc
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Đội 1 • Phân khu A (Đà Lạt) • Ca sáng: 07:00 – 15:30
            </p>
          </div>
        </div>

        {/* Right: Quick Stat Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 px-3.5 py-2 text-xs">
            <Clock className="h-4 w-4 text-amber-600" />
            <div>
              <span className="text-slate-500">Chờ xử lý:</span>{" "}
              <strong className="text-amber-800 dark:text-amber-300 font-bold">3 việc</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/70 px-3.5 py-2 text-xs">
            <CheckCircle2 className="h-4 w-4 text-orange-600" />
            <div>
              <span className="text-slate-500">Đến hạn thu hoạch:</span>{" "}
              <strong className="text-orange-800 dark:text-orange-300 font-bold">1 ô (A-101)</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/farmer/plots")}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 text-xs font-semibold transition-colors"
          >
            <span>Ô đất phụ trách (5 ô)</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. ALERT NOTIFICATION BANNER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-100/90 via-amber-50 to-orange-50 border border-orange-200/80 px-4 py-3 text-xs sm:text-sm text-orange-950 shadow-2xs">
        <div className="flex items-center gap-2.5 font-medium">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white font-bold text-xs shrink-0 shadow-xs">
            ⚡
          </span>
          <span>
            <strong>Hôm nay:</strong> 3 việc chờ xử lý • 1 ô đất đến hạn thu hoạch nông sản sạch
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate("/farmer/tasks/CARE-782/execute")}
          className="hidden sm:inline-flex items-center gap-1 font-bold text-orange-700 hover:text-orange-900 transition-colors text-xs"
        >
          <span>Xử lý ngay</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Success alert toast when harvesting */}
      {showHarvestAlert && (
        <div className="rounded-xl bg-emerald-600 text-white px-4 py-3 text-sm font-semibold flex items-center justify-between shadow-lg animate-in fade-in">
          <span>✓ Đã tạo lệnh xuất kho & thu hoạch cho Ô đất A-101 thành công! Đang chuyển hướng...</span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN 2-COLUMN DESKTOP WORKSPACE
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT COLUMN: PRIORITY TASK & UPCOMING SCHEDULE (7 COLS) ── */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Priority Task Card (#CARE-782) */}
          <div className="rounded-3xl border-2 border-emerald-500/40 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-md hover:shadow-lg transition-all relative overflow-hidden">
            {/* Top Accent Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

            {/* Task Type & Deadline Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 border border-emerald-200">
                  {ACTIVE_TASK.type}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {ACTIVE_TASK.zone} • {ACTIVE_TASK.bed}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 px-3 py-0.5 text-xs font-bold">
                <Clock className="h-3.5 w-3.5 text-orange-600" />
                <span>{ACTIVE_TASK.deadline}</span>
              </div>
            </div>

            {/* Plot & Customer Details */}
            <div className="space-y-1 mb-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{ACTIVE_TASK.plotCode}</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  {ACTIVE_TASK.cropName}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Chủ vườn: <strong>{ACTIVE_TASK.customerName}</strong> (Hợp đồng {ACTIVE_TASK.contractCode})
              </p>
            </div>

            {/* IoT Live Sensors Banner */}
            <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 shrink-0">
                  <Droplets className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Độ ẩm đất</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                    {ACTIVE_TASK.soilMoisture}{" "}
                    <span className="text-[10px] font-normal text-amber-600">(Cần bón ẩm)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shrink-0">
                  <Thermometer className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Nhiệt độ luống</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                    {ACTIVE_TASK.temperature}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Special Note Box */}
            <div className="mb-5 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 dark:text-emerald-200">
                    Khách dặn dò:
                  </strong>{" "}
                  {ACTIVE_TASK.customerNote}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => navigate(`/farmer/tasks/${ACTIVE_TASK.id}/execute`)}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1b4332] hover:bg-[#143427] text-white font-bold py-3.5 text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-98 group cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" />
              <span>Bắt đầu xử lý nhiệm vụ này</span>
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Secondary / Upcoming Tasks */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Nhiệm Vụ Kế Tiếp Trong Ca Làm Việc
            </h3>

            <div className="space-y-2.5">
              {UPCOMING_TASKS.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white dark:bg-slate-900 p-4 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {task.type}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-600 font-medium">
                        {task.plotCode} ({task.bed})
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Chủ hộ: {task.customerName} • Hạn chót:{" "}
                      <span className="text-orange-600 font-medium">{task.deadline}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/farmer/tasks/${task.id}/execute`)}
                    className="self-start sm:self-auto rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2 transition-colors cursor-pointer"
                  >
                    Mở phiếu
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: MANAGED PARCELS & TOOLS (5 COLS) ── */}
        <div className="lg:col-span-5 space-y-5">
          {/* Managed Plots Quick List */}
          <div className="rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ô đất đang phụ trách (3 ô)
              </h3>
              <button
                type="button"
                onClick={() => navigate("/farmer/plots")}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                Xem sơ đồ đầy đủ →
              </button>
            </div>

            <div className="space-y-3">
              {MANAGED_PLOTS.map((plot) => (
                <div
                  key={plot.id}
                  className="rounded-2xl border border-slate-200/70 p-3.5 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/50 transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {plot.code}
                        </h4>
                        {plot.readyForHarvest && (
                          <span className="rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5">
                            Sẵn sàng
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {plot.cropName} • Ngày {plot.currentDay}/{plot.totalDays}
                      </p>
                    </div>

                    {plot.readyForHarvest ? (
                      <button
                        type="button"
                        onClick={() => handleHarvestClick(plot.code)}
                        className="rounded-xl bg-[#8c4b14] hover:bg-[#733d10] text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <span>🚜 Thu hoạch</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {plot.progressPercent}%
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedLiveCamPlot(plot.code)}
                          aria-label={`Xem camera ${plot.code}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                        >
                          <Video className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        plot.readyForHarvest ? "bg-amber-600" : "bg-emerald-600"
                      }`}
                      style={{ width: `${plot.progressPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Field Quick Tools Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Tiện Ích Vận Hành Nhanh
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => navigate("/farmer/plots")}
                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                <QrCode className="h-5 w-5 text-emerald-600" />
                <span>Quét mã QR luống</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/farmer/plots")}
                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                <Sprout className="h-5 w-5 text-teal-600" />
                <span>Bản đồ phân khu</span>
              </button>

              <button
                type="button"
                onClick={() => alert("Chức năng báo cáo sự cố vi khí hậu đã được gửi đến Giám sát viên!")}
                className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Báo sự cố sâu bệnh hoặc thiếu nước khẩn cấp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: LIVE CAMERA PREVIEW OF PLOT
      ───────────────────────────────────────────────────────────── */}
      {selectedLiveCamPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-white/20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <h4 className="text-sm font-bold">Camera Trực Tiếp {selectedLiveCamPlot}</h4>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                  1080P • Góc 01
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

            {/* Video preview frame */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src="/images/greenhouse_camera_live.jpg"
                alt="Camera Live"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md">
                Luống RA - 102 (Đà Lạt)
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 bg-slate-900 text-xs text-slate-400">
              <span>💧 Độ ẩm: <strong>68%</strong> • 🌡 Nhiệt độ: <strong>24.5°C</strong></span>
              <button
                type="button"
                onClick={() => {
                  setSelectedLiveCamPlot(null);
                  navigate("/farmer/plots");
                }}
                className="rounded-xl bg-emerald-600 text-white px-3 py-1.5 font-bold hover:bg-emerald-500"
              >
                Xem chi tiết ô đất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
