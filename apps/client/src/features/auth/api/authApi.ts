import type { LoginRequest, LoginResponseData } from "@repo/shared";
import { dispatchAction } from "@/shared/api/gateway";

export interface RegisterRequestPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role?: "CUSTOMER" | "STAFF" | "ADMIN";
}

export interface RegisterResponsePayload {
  accessToken: string;
  refreshToken: string;
  user: {
    userCode: string;
    email: string;
    fullName: string;
    role: "CUSTOMER" | "STAFF" | "ADMIN";
    preferredLocale?: string;
    avatarUrl?: string | null;
  };
}

export const authApi = {
  /**
   * Đăng nhập thủ công (email + password).
   */
  login: (email: string, password: string) =>
    dispatchAction<LoginRequest, LoginResponseData>("auth.login", {
      email,
      password,
    }),

  /**
   * Đăng ký tài khoản người dùng mới.
   */
  register: (payload: RegisterRequestPayload) =>
    dispatchAction<RegisterRequestPayload, RegisterResponsePayload>(
      "auth.register",
      payload
    ),
};

