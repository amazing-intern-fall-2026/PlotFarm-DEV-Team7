import { z } from "zod";

export const RateLimitSchema = z.object({
  limit: z.number(),
  remaining: z.number(),
  resetInSeconds: z.number(),
  isSpamWarning: z.boolean(),
});
export type RateLimit = z.infer<typeof RateLimitSchema>;

export const MetaSchema = z.object({
  correlationId: z.string(),
  traceId: z.string(),
  userCode: z.string(),
  timestamp: z.string(),
  rateLimit: RateLimitSchema,
});
export type Meta = z.infer<typeof MetaSchema>;

export const PaginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});
export type Pagination = z.infer<typeof PaginationSchema>;

export const ErrorDetailSchema = z.object({
  code: z.string(),
  message: z.string(),
  field: z.string().optional(),
});
export type ErrorDetail = z.infer<typeof ErrorDetailSchema>;

export const ApiErrorResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  meta: MetaSchema,
  error: ErrorDetailSchema,
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export interface ApiSuccessResponse<T> {
  code: number;
  message: string;
  meta: Meta;
  data: T;
  pagination?: Pagination;
}
