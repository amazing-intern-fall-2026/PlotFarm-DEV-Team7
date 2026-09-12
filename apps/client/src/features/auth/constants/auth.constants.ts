import type { UserRole } from "@repo/shared";

/** Session storage keys — tập trung để tránh typo giữa các module */
export const SESSION_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
} as const;

/** Routes liên quan auth */
export const AUTH_ROUTES = {
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",
  REGISTER: "/register",
} as const;

/** Redirect destination sau khi đăng nhập theo role */
export const ROLE_HOME_ROUTES: Record<UserRole, string> = {
  ADMIN: "/admin",
  STAFF: "/farmer",
  CUSTOMER: "/",
};

/** Validation rules — dùng chung giữa form và schema */
export const AUTH_VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

/** Social providers có thể login */
export const SOCIAL_PROVIDERS = {
  GOOGLE: "google",
  APPLE: "apple",
} as const;
