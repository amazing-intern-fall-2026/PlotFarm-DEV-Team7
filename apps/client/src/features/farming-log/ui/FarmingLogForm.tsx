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
  Box,
  Text,
} from "@/shared/ui";
import { useFarmingLogForm } from "../model/useFarmingLogForm";
import { GrowthStageSelector } from "./GrowthStageSelector";
import { ImageDropzoneUploader } from "./ImageDropzoneUploader";
import { EnvironmentalInputs } from "./EnvironmentalInputs";
import {
  FileText,
  Send,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  User,
} from "lucide-react";

interface FarmingLogFormProps {
  contractId?: string;
  plotCode?: string;
  cropName?: string;
  customerName?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function FarmingLogForm({
  contractId = "CONTRACT-A104",
  plotCode = "Ô đất A-104",
  cropName = "Cải cầu vồng Thụy Sĩ",
  customerName = "Chị Thu Hà",
  onSuccess,
  onCancel,
}: FarmingLogFormProps) {
  const navigate = useNavigate();

  const {
    form,
    currentStage,
    uploadedImages,
    isCompressing,
    isUploading,
    uploadProgress,
    submitError,
    isSubmitting,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    handleSelectStage,
    handleAddFiles,
    handleRemoveImage,
    handleSyncSensors,
    handleSubmitForm,
  } = useFarmingLogForm({
    contractId,
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const { register, watch, setValue, formState: { errors } } = form;
  const notesValue = watch("notes") || "";
  const temperature = watch("temperature");
  const airHumidity = watch("airHumidity");
  const soilMoisture = watch("soilMoisture");

  // Quick note suggestions
  const quickNotes = [
    "Cây bung lá thật đều và màu sắc tươi sáng",
    "Đã tưới dung dịch vi sinh kích thích bộ rễ",
    "Tiến hành tỉa thưa định hình khoảng cách luống",
    "Đất tơi xốp, giữ ẩm lý tưởng không có sâu bọ",
  ];

  const handleApplyQuickNote = (note: string) => {
    const current = notesValue.trim();
    const separator = current.length > 0 ? " • " : "";
    setValue("notes", `${current}${separator}${note}`, { shouldValidate: true });
  };

  return (
    <Box className="w-full max-w-4xl mx-auto space-y-6 pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SUMMARY CARD
      ───────────────────────────────────────────────────────────── */}
      <Card className="p-0 overflow-hidden shadow-xs border-border">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 bg-gradient-to-r from-emerald-50/40 via-background to-background dark:from-emerald-950/20">
          <Box className="flex items-center gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onCancel}
                className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <Box>
              <Box className="flex items-center gap-2">
                <CardTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
                  Đăng Nhật Ký Sinh Trưởng
                </CardTitle>
                <Badge variant="success">Hợp đồng ACTIVE</Badge>
              </Box>
              <CardDescription className="text-xs text-muted-foreground mt-0.5 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <MapPin className="h-3 w-3 text-emerald-600" /> {plotCode}
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {cropName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3 text-muted-foreground" /> Khách hàng: <strong>{customerName}</strong>
                </span>
              </CardDescription>
            </Box>
          </Box>

          <Badge variant="secondary" className="font-mono text-xs self-start sm:self-auto py-1 px-3">
            Mã HĐ: {contractId}
          </Badge>
        </CardHeader>
      </Card>

      {/* Global Error Banner */}
      {submitError && (
        <Card className="p-4 bg-destructive/10 border-destructive/40 text-destructive flex items-center gap-3 rounded-2xl animate-in fade-in">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <Text as="span" className="text-xs font-semibold leading-relaxed">
            {submitError}
          </Text>
        </Card>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN FORM FIELDS
      ───────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmitForm} className="space-y-6">
        <Card className="p-0 shadow-xs border-border overflow-hidden">
          <CardContent className="p-5 sm:p-7 space-y-6">
            {/* STEP 1: Growth Stage Selector (AC2: Mandatory) */}
            <GrowthStageSelector
              selectedStage={currentStage}
              onSelectStage={handleSelectStage}
              hasError={Boolean(errors.selectedStage)}
            />

            {/* STEP 2: Notes & Quick Tags */}
            <Box className="space-y-2.5">
              <Box className="flex items-center justify-between">
                <Text as="label" className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <span>Ghi chú hiện trạng cây trồng <Text as="span" className="text-destructive">*</Text></span>
                </Text>
                <Text variant="muted" className="text-[11px]">
                  {notesValue.length}/1000 ký tự
                </Text>
              </Box>

              <textarea
                rows={4}
                {...register("notes")}
                placeholder="Mô tả chi tiết tình trạng lá, độ ẩm đất, các biện pháp chăm sóc vừa thực hiện..."
                className={`w-full p-4 rounded-2xl bg-muted/30 border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 transition-all ${
                  errors.notes
                    ? "border-destructive focus:ring-destructive/40"
                    : "border-border focus:ring-emerald-500/40"
                }`}
              />
              {errors.notes && (
                <Text as="p" className="text-xs text-destructive font-semibold">
                  {errors.notes.message}
                </Text>
              )}

              {/* Quick chips suggestions */}
              <Box className="flex flex-wrap items-center gap-1.5 pt-1">
                <Text variant="muted" className="text-[11px] flex items-center gap-1 mr-1">
                  <Sparkles className="h-3 w-3 text-amber-500" /> Gợi ý nhanh:
                </Text>
                {quickNotes.map((note) => (
                  <Button
                    key={note}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleApplyQuickNote(note)}
                    className="text-[11px] h-7 rounded-xl bg-muted/60 hover:bg-muted text-foreground px-2.5"
                  >
                    + {note}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* STEP 3: Photo Upload Dropzone & Thumbnails (AC2 & AC3) */}
            <ImageDropzoneUploader
              images={uploadedImages}
              onAddFiles={handleAddFiles}
              onRemoveImage={handleRemoveImage}
              isCompressing={isCompressing}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              hasError={Boolean(errors.photoUrls)}
            />

            {/* STEP 4: IoT Environmental Readings */}
            <EnvironmentalInputs
              temperature={temperature}
              airHumidity={airHumidity}
              soilMoisture={soilMoisture}
              onChangeTemperature={(val) => setValue("temperature", val, { shouldValidate: true })}
              onChangeAirHumidity={(val) => setValue("airHumidity", val, { shouldValidate: true })}
              onChangeSoilMoisture={(val) => setValue("soilMoisture", val, { shouldValidate: true })}
              onSyncSensors={() => handleSyncSensors(24.5, 72, 68)}
            />
          </CardContent>

          {/* Action footer */}
          <CardFooter className="p-4 sm:p-5 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-between gap-3 bg-muted/20">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel || (() => navigate("/farmer/plots"))}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Hủy bỏ
            </Button>

            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting || isUploading}
              leftIcon={<Send className="h-4 w-4" />}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Đăng nhật ký tiến độ
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* ─────────────────────────────────────────────────────────────
          4. SUCCESS MODAL (AC1)
      ───────────────────────────────────────────────────────────── */}
      {isSuccessModalOpen && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <Card className="w-full max-w-md p-6 text-center shadow-2xl border border-border space-y-4">
            <Box className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto">
              <CheckCircle2 className="h-9 w-9" />
            </Box>

            <CardTitle className="text-lg font-bold text-foreground">
              Đăng bài viết nhật ký thành công!
            </CardTitle>

            <CardDescription className="text-xs text-muted-foreground leading-relaxed">
              Bài viết cùng {uploadedImages.length} ảnh thực địa đã được lưu và đồng bộ lên tài khoản của khách hàng <strong>{customerName}</strong> để theo dõi quá trình sinh trưởng của cây.
            </CardDescription>

            <Box className="pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  navigate("/farmer/plots");
                }}
                className="w-full"
              >
                Về danh sách ô đất
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
}
