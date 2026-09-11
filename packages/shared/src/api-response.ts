import { z } from "zod";

export const RateLimitMetaSchema = z.object({
  limit: z.number(),
  remaining: z.number(),
  resetInSeconds: z.number(),
  isSpamWarning: z.boolean()
});
export type RateLimitMeta = z.infer<typeof RateLimitMetaSchema>;

export const ResponseMetaSchema = z.object({
  correlationId: z.string().optional(),
  traceId: z.string().optional(),
  userCode: z.string().optional(),
  timestamp: z.string(),
  rateLimit: RateLimitMetaSchema.optional()
});
export type ResponseMeta = z.infer<typeof ResponseMetaSchema>;

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean()
});
export type Pagination = z.infer<typeof PaginationSchema>;

export const ApiErrorDetailSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
  field: z.string().optional(),
  details: z.unknown().optional()
});
export type ApiErrorDetail = z.infer<typeof ApiErrorDetailSchema>;

export interface ApiResponseEnvelope<T = unknown> {
  code: number;
  message: string;
  meta: ResponseMeta;
  data?: T;
  pagination?: Pagination;
  error?: ApiErrorDetail;
}
