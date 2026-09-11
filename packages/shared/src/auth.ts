import { z } from "zod";

export const UserRoleSchema = z.enum(["CUSTOMER", "STAFF", "ADMIN"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự")
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const RegisterRequestSchema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^[0-9+]{9,15}$/, "Số điện thoại không hợp lệ").optional(),
  preferredLocale: z.enum(["vi", "en"]).default("vi").optional()
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token không được để trống")
});
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number().optional()
});
export type AuthTokens = z.infer<typeof AuthTokensSchema>;

export const AuthUserResponseSchema = z.object({
  id: z.string(),
  userCode: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  role: UserRoleSchema,
  avatarUrl: z.string().nullable().optional(),
  preferredLocale: z.string().optional()
});
export type AuthUserResponse = z.infer<typeof AuthUserResponseSchema>;

export const AuthResponseSchema = z.object({
  tokens: AuthTokensSchema,
  user: AuthUserResponseSchema
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
