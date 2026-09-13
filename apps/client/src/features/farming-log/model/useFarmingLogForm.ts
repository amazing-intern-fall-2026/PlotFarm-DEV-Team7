import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FarmingLogFormSchema,
  type FarmingLogFormData,
  type UploadedImageItem,
  type GrowthStageId,
  GROWTH_STAGES,
} from "./farmingLog.types";
import { compressImage } from "./compressImage";
import { farmingLogApi } from "../api/farmingLogApi";

interface UseFarmingLogFormProps {
  contractId?: string;
  initialStage?: GrowthStageId;
  initialTemperature?: number;
  initialAirHumidity?: number;
  initialSoilMoisture?: number;
  onSuccess?: (createdLog: unknown) => void;
}

export function useFarmingLogForm({
  contractId = "CONTRACT-A104",
  initialStage,
  initialTemperature = 24.5,
  initialAirHumidity = 72,
  initialSoilMoisture = 68,
  onSuccess,
}: UseFarmingLogFormProps = {}) {
  const [uploadedImages, setUploadedImages] = React.useState<UploadedImageItem[]>([]);
  const [isCompressing, setIsCompressing] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  const form = useForm<FarmingLogFormData>({
    resolver: zodResolver(FarmingLogFormSchema),
    defaultValues: {
      selectedStage: initialStage,
      notes: "",
      photoUrls: [],
      temperature: initialTemperature,
      airHumidity: initialAirHumidity,
      soilMoisture: initialSoilMoisture,
    },
    mode: "onTouched",
  });

  const { setValue, watch, trigger, formState } = form;
  const currentStage = watch("selectedStage");
  const currentPhotoUrls = watch("photoUrls");

  // Keep form's photoUrls in sync with uploadedImages
  React.useEffect(() => {
    const urls = uploadedImages.map((img) => img.url);
    setValue("photoUrls", urls, { shouldValidate: true });
  }, [uploadedImages, setValue]);

  // Stage selection handler
  const handleSelectStage = (stageId: GrowthStageId) => {
    setValue("selectedStage", stageId, { shouldValidate: true, shouldDirty: true });
  };

  // Image Upload handler with client-side compression (US-23)
  const handleAddFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (fileArray.length === 0) return;

    setSubmitError(null);
    setIsCompressing(true);
    setIsUploading(true);
    setUploadProgress(10);

    try {
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        
        // 1. Client-side compression
        const compression = await compressImage(file, 1600, 0.8);
        setIsCompressing(false);

        // 2. Upload to Cloudinary API
        const uploadResult = await farmingLogApi.uploadMedia(
          compression.file,
          (percent) => {
            const overallProgress = Math.round(
              ((i + percent / 100) / fileArray.length) * 100
            );
            setUploadProgress(overallProgress);
          }
        );

        const newImageItem: UploadedImageItem = {
          id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          url: uploadResult.url,
          originalName: file.name,
          originalSize: compression.originalSize,
          compressedSize: compression.compressedSize,
          previewUrl: uploadResult.url,
        };

        setUploadedImages((prev) => [...prev, newImageItem]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Tải ảnh thất bại. Vui lòng thử lại.";
      setSubmitError(msg);
    } finally {
      setIsCompressing(false);
      setIsUploading(false);
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1000);
      trigger("photoUrls");
    }
  };

  // Remove thumbnail handler (AC3)
  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  // IoT sync helper
  const handleSyncSensors = (temp: number, humidity: number, moisture: number) => {
    setValue("temperature", temp, { shouldValidate: true });
    setValue("airHumidity", humidity, { shouldValidate: true });
    setValue("soilMoisture", moisture, { shouldValidate: true });
  };

  // Submit handler (AC1 & AC2)
  const handleSubmitForm = form.handleSubmit(async (data) => {
    setSubmitError(null);

    const stageDef = GROWTH_STAGES.find((s) => s.id === data.selectedStage);
    const progress = stageDef?.progressPercent ?? 50;

    try {
      const result = await farmingLogApi.createFarmingLog(contractId, {
        actionType: "LOG_GROWTH",
        title: `Nhật ký sinh trưởng • ${stageDef?.label ?? "Phát triển thân lá"}`,
        description: data.notes,
        growthStage: data.selectedStage,
        progressPercent: progress,
        photoUrls: data.photoUrls,
        sensorSnapshot: {
          temperature: data.temperature,
          humidity: data.airHumidity,
          soilMoisture: data.soilMoisture,
        },
      });

      setIsSuccessModalOpen(true);
      onSuccess?.(result);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi lưu bài viết nhật ký. Vui lòng thử lại.";
      setSubmitError(msg);
    }
  });

  return {
    form,
    currentStage,
    currentPhotoUrls,
    uploadedImages,
    isCompressing,
    isUploading,
    uploadProgress,
    submitError,
    isSubmitting: formState.isSubmitting,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    handleSelectStage,
    handleAddFiles,
    handleRemoveImage,
    handleSyncSensors,
    handleSubmitForm,
  };
}
