import { z } from "zod";

export const SensorSnapshotSchema = z.object({
  temperature: z.number(),
  humidity: z.number(),
  soilMoisture: z.number(),
});
export type SensorSnapshot = z.infer<typeof SensorSnapshotSchema>;

export const FarmingLogSchema = z.object({
  logCode: z.string(),
  contractCode: z.string(),
  authorStaff: z.object({
    userCode: z.string(),
    fullName: z.string(),
  }),
  actionType: z.string(),
  title: z.string(),
  description: z.string(),
  photoUrls: z.array(z.string().url()),
  sensorSnapshot: SensorSnapshotSchema,
  isAmended: z.boolean(),
  createdAt: z.string(),
});
export type FarmingLog = z.infer<typeof FarmingLogSchema>;

export const CreateFarmingLogRequestSchema = z.object({
  actionType: z.string(),
  title: z.string(),
  description: z.string(),
  photoUrls: z.array(z.string().url()).optional(),
  sensorSnapshot: SensorSnapshotSchema.optional(),
});
export type CreateFarmingLogRequest = z.infer<
  typeof CreateFarmingLogRequestSchema
>;

export const AmendFarmingLogRequestSchema = z.object({
  replacesLogCode: z.string(),
  amendmentReason: z.string(),
  actionType: z.string(),
  title: z.string(),
  description: z.string(),
  photoUrls: z.array(z.string().url()).optional(),
});
export type AmendFarmingLogRequest = z.infer<
  typeof AmendFarmingLogRequestSchema
>;

export const FarmingLogReviewRequestSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string(),
  isFraudSuspected: z.boolean(),
  fraudReason: z.string().optional(),
});
export type FarmingLogReviewRequest = z.infer<
  typeof FarmingLogReviewRequestSchema
>;

export const CARE_REQUEST_STATUSES = [
  "PENDING",
  "ASSIGNED",
  "IN_PROGRESS",
  "VERIFIED",
  "REJECTED",
] as const;
export type CareRequestStatus = (typeof CARE_REQUEST_STATUSES)[number];

export const CreateCareRequestSchema = z.object({
  serviceType: z.string(),
  customerNote: z.string().optional(),
});
export type CreateCareRequest = z.infer<typeof CreateCareRequestSchema>;

export const CareRequestSchema = z.object({
  requestCode: z.string(),
  contractCode: z.string(),
  serviceType: z.string(),
  status: z.enum(CARE_REQUEST_STATUSES),
  extraFee: z.number(),
  staffResponse: z.string().nullable().optional(),
  proofImages: z.array(z.string().url()).optional(),
  completedAt: z.string().nullable().optional(),
});
export type CareRequest = z.infer<typeof CareRequestSchema>;

export const UpdateCareRequestStatusSchema = z.object({
  status: z.enum(CARE_REQUEST_STATUSES),
  staffResponse: z.string().optional(),
  proofImages: z.array(z.string().url()).optional(),
});
export type UpdateCareRequestStatus = z.infer<
  typeof UpdateCareRequestStatusSchema
>;
