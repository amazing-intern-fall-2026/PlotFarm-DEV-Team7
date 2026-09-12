import type { LoginRequest, AuthResponse } from "@repo/shared";
import { dispatchAction } from "@/shared/api/gateway";

export const authApi = {
  /**
   * Đăng nhập thủ công (email + password).
   * Payload: `LoginRequest` — Response: `AuthResponse` — từ @repo/shared.
   * AuthResponse = { tokens: { accessToken, refreshToken }, user: AuthUserResponse }
   */
  login: (email: string, password: string) =>
    dispatchAction<LoginRequest, AuthResponse>("auth.login", {
      email,
      password,
    }),
};
