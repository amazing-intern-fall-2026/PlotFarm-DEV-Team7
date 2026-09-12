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

/** UI text strings cho Auth pages — đúng chính tả, viết hoa chuẩn, không fix cứng msg trong code */
export const AUTH_UI_TEXT = {
  TAB_LOGIN: "Đăng nhập",
  TAB_REGISTER: "Đăng ký tài khoản mới",
  LOGIN_TITLE: "Chào mừng bạn trở lại vườn",
  LOGIN_SUBTITLE: "Đăng nhập để kiểm tra thửa đất, độ ẩm và thu hoạch rau củ hôm nay.",
  EMAIL_LABEL: "Email",
  EMAIL_PLACEHOLDER: "tenban@gmail.com",
  PASSWORD_LABEL: "Mật khẩu",
  PASSWORD_PLACEHOLDER: "Nhập mật khẩu an toàn",
  REMEMBER_ME: "Ghi nhớ đăng nhập",
  FORGOT_PASSWORD: "Quên mật khẩu?",
  SUBMIT_BUTTON: "Đăng nhập vào vườn của tôi",
  DIVIDER_OR: "Hoặc tiếp tục với",
  SOCIAL_GOOGLE: "Google",
  SOCIAL_APPLE: "Apple",
  TERMS_PREFIX: "Bằng việc tiếp tục, bạn đồng ý với",
  TERMS_CONTRACT: "Điều khoản thuê đất",
  TERMS_AND: "và",
  TERMS_PRIVACY: "Chính sách quyền riêng tư",
  TERMS_SUFFIX: "của nền tảng nông nghiệp số CloudFarm.",
  REGISTER_TITLE: "Tạo tài khoản mới",
  REGISTER_SUBTITLE: "Đăng ký để bắt đầu hành trình trồng rau sạch của bạn.",
  REGISTER_WIP_NOTICE: "Tính năng đăng ký đang được hoàn thiện.",
  REGISTER_BACK_TO_LOGIN: "Vui lòng quay lại tab",
  GOOGLE_SOON: "Google Sign-In: tính năng đang được tích hợp.",
  APPLE_SOON: "Apple Sign-In: tính năng đang được tích hợp.",
  HERO_BRAND_SUB: "Nông trại số hữu cơ",
  HERO_LIVE_BADGE: "Trực tiếp tại Đà Lạt • 19.4°C",
  HERO_MODEL_BADGE: "Mô hình nông trại thông minh 4.0",
  HERO_QUOTE:
    '"Trở thành chủ nhân vườn rau sạch công nghệ cao. Theo dõi cây lớn mỗi ngày qua camera trực tiếp và nhận nông sản hữu cơ tận nhà."',
  HERO_PROOF_PREFIX: "Hơn",
  HERO_PROOF_COUNT: "2.400+",
  HERO_PROOF_SUFFIX: "gia đình đô thị đã sở hữu thửa rau riêng",
  HERO_PILL_SOIL: "100% đất sạch hữu cơ",
  HERO_PILL_CAMERA: "Giám sát HLS 24/7",
  HERO_PILL_DELIVERY: "Giao rau tận cửa",
} as const;
