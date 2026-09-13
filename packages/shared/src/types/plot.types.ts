import { z } from "zod";

export const PLOT_STATUSES = [
  "AVAILABLE",
  "RESERVED",
  "OCCUPIED",
  "HARVESTING",
  "MAINTENANCE",
  "INACTIVE",
] as const;
export type PlotStatus = (typeof PLOT_STATUSES)[number];

export const PlotSchema = z.object({
  plotCode: z.string(),
  plotNumber: z.string(),
  areaSquareMeters: z.number(),
  status: z.enum(PLOT_STATUSES),
  pricePerMonth: z.number(),
  soilType: z.string().nullable().optional(),
  iotSensorInstalled: z.boolean(),
  cameraSupported: z.boolean(),
});
export type Plot = z.infer<typeof PlotSchema>;

export const LockPlotResponseDataSchema = z.object({
  plotCode: z.string(),
  status: z.enum(PLOT_STATUSES),
  reservedUntil: z.string(),
  remainingSeconds: z.number(),
});
export type LockPlotResponseData = z.infer<typeof LockPlotResponseDataSchema>;

export const AssignStaffRequestSchema = z.object({
  staffUserCode: z.string(),
  notes: z.string().optional(),
});
export type AssignStaffRequest = z.infer<typeof AssignStaffRequestSchema>;
