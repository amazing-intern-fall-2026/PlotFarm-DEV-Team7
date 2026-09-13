import type { LoginRequest, LoginResponseData } from "@repo/shared";
import { dispatchAction } from "@/shared/api/gateway";

export const authApi = {
  /**
   * Đăng nhập thủ công (email + password).
   * Payload: `LoginRequest` — Response: `LoginResponseData` — từ @repo/shared.
   * LoginResponseData = { accessToken, refreshToken, user: { userCode, email, fullName, role, preferredLocale, avatarUrl } }
   */
  login: (email: string, password: string) =>
    dispatchAction<LoginRequest, LoginResponseData>("auth.login", {
      email,
      password,
    }),

  /**
   * Đăng nhập bằng Google (nhận ID Token từ Google Identity Services).
   */
  loginGoogle: (idToken: string) =>
    dispatchAction<{ idToken: string }, LoginResponseData>("auth.google", {
      idToken,
    }),
};
