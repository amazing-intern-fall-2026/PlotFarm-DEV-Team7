import { LoginResponseDataSchema, type LoginResponseData } from "@repo/shared";

export function getMockLoginResponse(email: string): LoginResponseData {
  const mockResponse: LoginResponseData = {
    accessToken: `mock-access-token.${Buffer.from(email).toString("base64")}`,
    refreshToken: `mock-refresh-token.${Buffer.from(email).toString("base64")}`,
    user: {
      userCode: "USR-CUST-2026-0001",
      email,
      fullName: "Nguyễn Văn An",
      role: "CUSTOMER",
      preferredLocale: "vi",
      avatarUrl: null,
    },
  };

  const result = LoginResponseDataSchema.safeParse(mockResponse);
  if (!result.success) {
    throw new Error(
      `Mock login response does not match LoginResponseDataSchema: ${result.error.message}`,
    );
  }
  return result.data;
}
