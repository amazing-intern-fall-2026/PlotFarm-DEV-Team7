import { z } from "zod";

// Example shared Zod schemas and TypeScript types placeholder
export const PlotSchema = z.object({
  id: z.string(),
  name: z.string(),
  area: z.number(),
  status: z.enum(["AVAILABLE", "RENTED", "MAINTENANCE"])
});

export type Plot = z.infer<typeof PlotSchema>;
