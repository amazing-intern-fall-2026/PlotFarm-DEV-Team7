import type { LoginRequest, LoginResponseData } from "@repo/shared";
import { dispatchAction } from "@/shared/api/gateway";

export const authApi = {
  login: (email: string, password: string) =>
    dispatchAction<LoginRequest, LoginResponseData>("auth.login", {
      email,
      password,
    }),
};
