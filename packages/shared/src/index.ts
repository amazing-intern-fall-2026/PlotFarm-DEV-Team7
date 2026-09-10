import { z } from "zod";

// Example shared Zod schemas and TypeScript types placeholder
export const PlotSchema = z.object({
  id: z.string(),
  name: z.string(),
  area: z.number(),
  status: z.enum(["AVAILABLE", "RENTED", "MAINTENANCE"])
});

export type Plot = z.infer<typeof PlotSchema>;

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.string(),
  fullName: z.string().optional(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;

export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});

export type AuthTokens = z.infer<typeof AuthTokensSchema>;

export const AuthPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export type AuthPayload = z.infer<typeof AuthPayloadSchema>;

