import { z } from "zod";
import { ApiErrorDetailSchema } from "./api-response";
import { UserRoleSchema } from "./auth";

// Re-export Zod core types and utilities so workspace packages don't need redundant installs
export { z, ZodError, type AnyZodObject, type ZodTypeAny } from "zod";

// Plot schemas
export const PlotSchema = z.object({
  id: z.string(),
  name: z.string(),
  area: z.number(),
  status: z.enum(["AVAILABLE", "RENTED", "MAINTENANCE"]),
});

export type Plot = z.infer<typeof PlotSchema>;

// Auth & Identity schemas & types
export * from "./auth";

// API Envelope & Pagination schemas & types
export * from "./api-response";

// ==========================================
// AUTH SCHEMAS & TYPES
// ==========================================
export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: UserRoleSchema,
  fullName: z.string().optional(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;

export const AuthPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export type AuthPayload = z.infer<typeof AuthPayloadSchema>;

// ==========================================
// STANDARDIZED API RESPONSE & ERROR TYPES
// ==========================================
export const ERROR_CODES = {
  // Validation & Request syntax
  VALIDATION: "ERR_VALIDATION",
  INVALID_JSON: "ERR_INVALID_JSON",
  BAD_REQUEST: "ERR_BAD_REQUEST",

  // Database & Resources
  DUPLICATE: "ERR_DUPLICATE",
  NOT_FOUND: "ERR_NOT_FOUND",
  FOREIGN_KEY_CONSTRAINT: "ERR_FOREIGN_KEY_CONSTRAINT",
  DATABASE: "ERR_DATABASE",

  // Authentication & Authorization
  AUTH_REQUIRED: "ERR_AUTH_REQUIRED",
  INVALID_TOKEN: "ERR_INVALID_TOKEN",
  TOKEN_EXPIRED: "ERR_TOKEN_EXPIRED",
  INVALID_REFRESH_TOKEN: "ERR_INVALID_REFRESH_TOKEN",
  ACCOUNT_DISABLED: "ERR_ACCOUNT_DISABLED",
  USER_NOT_FOUND: "ERR_USER_NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
  UNAUTHORIZED: "ERR_UNAUTHORIZED",
  CONFLICT: "ERR_CONFLICT",

  // System & Internal
  INTERNAL_SERVER: "ERR_INTERNAL_SERVER",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export const ApiErrorPayloadSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.array(ApiErrorDetailSchema),
});

export type ApiErrorPayload = z.infer<typeof ApiErrorPayloadSchema>;

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: ApiErrorPayloadSchema,
});

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

