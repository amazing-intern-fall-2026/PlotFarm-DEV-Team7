import { LoginResponseDataSchema, type LoginResponseData } from "@repo/shared";

export function getMockLoginResponse(email: string): LoginResponseData {
  let role: "CUSTOMER" | "STAFF" | "ADMIN" = "CUSTOMER";
  let fullName = "Nguyễn Văn An";
  let userCode = "USR-CUST-2026-0001";

  if (email.includes("staff") || email.includes("farmer")) {
    role = "STAFF";
    fullName = "Kỹ thuật viên Trồng trọt";
    userCode = "USR-STAFF-2026-0002";
  } else if (email.includes("admin")) {
    role = "ADMIN";
    fullName = "Quản trị viên Hệ thống";
    userCode = "USR-ADMIN-2026-0003";
  }

  const mockResponse: LoginResponseData = {
    accessToken: `mock-access-token.${Buffer.from(email).toString("base64")}`,
    refreshToken: `mock-refresh-token.${Buffer.from(email).toString("base64")}`,
    user: {
      userCode,
      email,
      fullName,
      role,
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
