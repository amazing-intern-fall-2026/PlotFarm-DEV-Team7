import { z } from "zod";

// Re-export Zod core types and utilities so workspace packages don't need redundant installs
export { z, ZodError, type AnyZodObject, type ZodTypeAny } from "zod";

// Plot schemas
export const PlotSchema = z.object({
  id: z.string(),
  name: z.string(),
  area: z.number(),
  status: z.enum(["AVAILABLE", "RENTED", "MAINTENANCE"])
});

export type Plot = z.infer<typeof PlotSchema>;

// Auth & Identity schemas & types
export * from "./auth";

// API Envelope & Pagination schemas & types
export * from "./api-response";
