import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Camera,
  FileText,
  Droplets,
  Thermometer,
  ShieldCheck,
  Video,
  X,
} from "lucide-react";

export function FarmerTaskExecutePage() {
  const { id = "CARE-782" } = useParams();
  const navigate = useNavigate();

  // Step state
  const [currentStep, setCurrentStep] = React.useState<number>(2); // 1: Đã nhận, 2: Minh chứng, 3: Đóng phiếu

  // Form states
  const [proofImage, setProofImage] = React.useState<string>("/images/proof_care_782.jpg");
  const [resultNote, setResultNote] = React.useState<string>(
    "Đã bón phân trùn quế quanh rễ và xới tơi xốp, giữ ẩm tốt."
  );
  const [isDosageChecked, setIsDosageChecked] = React.useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState<boolean>(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = React.useState<boolean>(false);
  const [incidentText, setIncidentText] = React.useState<string>("");

  // Quick chips
  const [selectedChips, setSelectedChips] = React.useState<string[]>([
    "Tưới vi sinh",
    "Cây bung lá khỏe",
    "Đã xới thoáng đất",
  ]);

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleFinishTask = () => {
    if (!isDosageChecked) {
      alert("Vui lòng tích xác nhận liều lượng chuẩn trước khi đóng phiếu!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(3);
      setIsSuccessModalOpen(true);
    }, 800);
  };

  const handleReportIncident = () => {
    if (!incidentText.trim()) {
      alert("Vui lòng nhập mô tả sự cố!");
      return;
    }
    alert(`Đã gửi báo cáo sự cố cho ô đất B-205 tới Giám sát viên ca trực!`);
    setIsIncidentModalOpen(false);
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER WITH BREADCRUMB & COUNTDOWN
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/farmer")}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            aria-label="Quay lại"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Phiếu chăm sóc #{id}
              </h1>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5">
                Bón phân vi sinh
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ô đất B-205 (15m²) • Luống 5 (Khu B) • KTV: Bác Bảy (Lê Hoàng Ân)
            </p>
          </div>
        </div>

        {/* Countdown Badge */}
        <div className="flex items-center gap-2 rounded-2xl bg-orange-50 border border-orange-200 px-4 py-2 text-xs font-bold text-orange-900 self-start sm:self-auto">
          <Clock className="h-4 w-4 text-orange-600 animate-spin" />
          <span>Hạn hoàn thành: Trước 09:30 (Còn 35 phút)</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STEPPER PROGRESS BAR (Horizontal Web Stepper)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 shadow-xs text-xs sm:text-sm">
        {/* Step 1 */}
        <div className="flex items-center gap-2 sm:gap-3 text-emerald-700 font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs shrink-0">
            ✓
          </div>
          <div>
            <p className="font-bold">1. Đã tiếp nhận</p>
            <p className="text-[11px] text-slate-400 font-normal hidden md:block">
              08:30 sáng nay
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-2 sm:gap-3 text-emerald-900 dark:text-emerald-300 font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-extrabold text-xs shrink-0 shadow-xs">
            2
          </div>
          <div>
            <p className="font-bold">2. Minh chứng (Đang làm)</p>
            <p className="text-[11px] text-emerald-600 font-normal hidden md:block">
              Tải ảnh & Ghi chú
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div
          className={`flex items-center gap-2 sm:gap-3 ${
            currentStep === 3 ? "text-emerald-700 font-bold" : "text-slate-400 font-medium"
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold shrink-0 ${
              currentStep === 3
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            3
          </div>
          <div>
            <p className="font-bold">3. Đóng phiếu & Đồng bộ</p>
            <p className="text-[11px] text-slate-400 font-normal hidden md:block">
              Gửi SMS/Zalo cho khách
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN 2-COLUMN DESKTOP WORKSPACE
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT COLUMN: PROOF OF WORK & FORM (7 COLS) ── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Minh chứng hiện trường bắt buộc */}
          <div className="rounded-3xl border border-slate-200/90 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Minh chứng hiện trường bắt buộc
                </h3>
                <p className="text-xs text-slate-500">
                  Ảnh chụp luống thực tế để gửi kèm vào nhật ký canh tác của khách
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5">
                1/1 ảnh đã tải
              </span>
            </div>

            {/* Proof Image Preview with Watermark */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group">
              <img
                src={proofImage}
                alt="Minh chứng hiện trường"
                className="w-full h-full object-cover"
              />

              {/* Top Watermark & Valid Status Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white font-medium border border-white/20">
                  📍 Lô B-205 • 09:12 AM
                </span>
                <span className="rounded-full bg-emerald-600 text-white px-2.5 py-1 text-xs font-bold flex items-center gap-1 shadow-xs">
                  ✓ Ảnh hợp lệ
                </span>
              </div>

              {/* Change photo button */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <label className="cursor-pointer rounded-xl bg-white/90 hover:bg-white text-slate-900 px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all">
                  <Camera className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Chụp lại góc khác / Đổi ảnh</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        setProofImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Result Note Field */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Ghi chú kết quả xử lý kỹ thuật
              </label>
              <textarea
                rows={3}
                value={resultNote}
                onChange={(e) => setResultNote(e.target.value)}
                placeholder="Nhập chi tiết quá trình bón phân, tưới nước hoặc chăm sóc..."
                className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-slate-900 leading-relaxed"
              />
            </div>

            {/* Quick Action Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Gắn thẻ nhanh vào nhật ký:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Tưới vi sinh",
                  "Cây bung lá khỏe",
                  "Đã xới thoáng đất",
                  "Đã diệt sâu sinh học",
                  "Nắng ấm",
                ].map((chip) => {
                  const isSelected = selectedChips.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(chip)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-700 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {isSelected ? `✓ ${chip}` : `+ ${chip}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dosage Confirmation Checkbox */}
            <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isDosageChecked}
                onChange={(e) => setIsDosageChecked(e.target.checked)}
                className="h-4 w-4 mt-0.5 accent-emerald-700 rounded"
              />
              <div className="text-xs text-emerald-950">
                <strong className="font-bold block">
                  Xác nhận định lượng chuẩn VietGAP:
                </strong>
                Liều lượng: 200g phân trùn quế đã được cân và bón đúng bán kính quanh gốc theo chỉ dẫn của chuyên gia.
              </div>
            </label>

            {/* Bottom Form Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsIncidentModalOpen(true)}
                className="w-full rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Báo sự cố</span>
              </button>

              <button
                type="button"
                onClick={handleFinishTask}
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-[#1b4332] hover:bg-[#143427] text-white py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isSubmitting ? "Đang đồng bộ..." : "Hoàn tất & Đóng phiếu"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: TASK DETAILS & BED TELEMETRY (5 COLS) ── */}
        <div className="lg:col-span-5 space-y-6">
          {/* Task Info & Customer Instruction */}
          <div className="rounded-3xl border border-slate-200/90 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Chi tiết chỉ định kỹ thuật
              </span>
              <span className="rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 border border-emerald-200">
                Gói sinh thái
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Bón phân hữu cơ vi sinh
              </h3>
              <p className="text-xs text-slate-500">
                Vị trí: <strong>Ô đất B-205 (15m²) • Luống 5</strong>
              </p>
              <p className="text-xs text-slate-500">
                Chủ vườn: <strong>Anh Trần Quang</strong> (HĐ #CF-9023)
              </p>
            </div>

            {/* Customer Special Note Box */}
            <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50/80 p-3.5 text-xs text-amber-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <FileText className="h-4 w-4 text-amber-600" />
                <span>Dặn dò từ khách:</span>
              </div>
              <p className="leading-relaxed">
                Khách yêu cầu bón 200g phân trùn quế quanh rễ và xới nhẹ đất thoáng, không làm đứt rễ non.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" /> Lần chăm sóc miễn phí 2/2 trong tháng
              </span>
            </div>
          </div>

          {/* IoT Telemetry of Bed B-205 */}
          <div className="rounded-3xl border border-slate-200/90 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Chỉ số vi khí hậu luống 5 (Hiện thời)
              </h4>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-cyan-50/70 border border-cyan-100">
                <div className="flex items-center gap-1.5 text-xs text-cyan-800 font-medium mb-1">
                  <Droplets className="h-3.5 w-3.5 text-cyan-600" />
                  <span>Độ ẩm đất</span>
                </div>
                <p className="text-lg font-extrabold text-slate-900">58%</p>
                <span className="text-[10px] text-amber-600 font-semibold">
                  Hơi khô (Cần tưới bù)
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium mb-1">
                  <Thermometer className="h-3.5 w-3.5 text-amber-600" />
                  <span>Nhiệt độ luống</span>
                </div>
                <p className="text-lg font-extrabold text-slate-900">24.0°C</p>
                <span className="text-[10px] text-emerald-600 font-semibold">Lý tưởng</span>
              </div>
            </div>
          </div>

          {/* Live Camera Feed of Bed */}
          <div className="rounded-3xl border border-slate-200/90 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Video className="h-3.5 w-3.5 text-emerald-600" /> Camera giám sát Luống 5
              </span>
              <span className="text-slate-400">Trực tiếp</span>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
              <img
                src="/images/greenhouse_camera_live.jpg"
                alt="Camera Luống 5"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
                Cam góc 01 • Luống 5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SUCCESS REPORT & CLOSE
      ───────────────────────────────────────────────────────────── */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 text-center shadow-2xl border border-slate-200 space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Hoàn tất phiếu chăm sóc #{id}!
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              Minh chứng hiện trường đã được đồng bộ an toàn lên Cloudinary. Hệ thống vừa gửi thông báo xác nhận kèm ảnh tới Zalo/SMS của khách hàng <strong>Anh Trần Quang</strong>.
            </p>

            <button
              type="button"
              onClick={() => navigate("/farmer")}
              className="w-full rounded-2xl bg-[#1b4332] hover:bg-[#143427] text-white py-3 text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              Về danh sách nhiệm vụ hôm nay
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: REPORT INCIDENT
      ───────────────────────────────────────────────────────────── */}
      {isIncidentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-rose-700 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Báo cáo sự cố tại Ô đất B-205</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsIncidentModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Mô tả tình trạng bất thường (sâu bọ, rệp, rò rỉ ống nhỏ giọt, v.v.) để Kỹ sư trưởng hỗ trợ xử lý.
            </p>

            <textarea
              rows={4}
              value={incidentText}
              onChange={(e) => setIncidentText(e.target.value)}
              placeholder="Nhập mô tả sự cố thực tế..."
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/40"
            />

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsIncidentModalOpen(false)}
                className="rounded-xl bg-slate-100 text-slate-700 py-2.5 text-xs font-bold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleReportIncident}
                className="rounded-xl bg-rose-600 text-white py-2.5 text-xs font-bold hover:bg-rose-500"
              >
                Gửi cảnh báo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
