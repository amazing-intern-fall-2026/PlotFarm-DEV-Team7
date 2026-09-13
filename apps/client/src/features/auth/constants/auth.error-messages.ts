/**
 * Thông báo lỗi xác thực — ánh xạ từ errorCode (server) sang chuỗi hiển thị người dùng.
 * Tập trung tại đây để dễ dàng đổi ngôn ngữ hoặc kết nối i18n sau này.
 */
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  ERR_EMAIL_NOT_VERIFIED:
    "Email chưa được xác thực. Vui lòng kiểm tra hộp thư và xác nhận email.",
  ERR_INVALID_CREDENTIALS: "Email hoặc mật khẩu không chính xác.",
  ERR_ACCOUNT_LOCKED:
    "Tài khoản tạm thời bị khóa do đăng nhập sai nhiều lần. Vui lòng thử lại sau.",
  ERR_ACCOUNT_DISABLED: "Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ hỗ trợ.",
  ERR_NETWORK: "Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng.",
  ERR_PARSE: "Phản hồi từ máy chủ không hợp lệ. Vui lòng thử lại.",
  ERR_UNKNOWN: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",

  // Register
  ERR_EMAIL_ALREADY_EXISTS: "Email này đã được đăng ký. Vui lòng đăng nhập.",
  ERR_WEAK_PASSWORD:
    "Mật khẩu quá yếu. Hãy dùng ít nhất 8 ký tự, bao gồm chữ hoa và số.",

  // OTP
  ERR_OTP_INVALID: "Mã OTP không hợp lệ.",
  ERR_OTP_EXPIRED: "Mã OTP đã hết hạn. Vui lòng yêu cầu gửi lại.",
  ERR_OTP_MAX_ATTEMPTS:
    "Nhập sai OTP quá nhiều lần. Mã đã bị hủy, vui lòng gửi lại sau 15 phút.",

  // Token
  ERR_TOKEN_EXPIRED: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  ERR_UNAUTHORIZED: "Bạn cần đăng nhập để thực hiện thao tác này.",
};

/** Lấy thông báo lỗi theo errorCode, fallback về ERR_UNKNOWN */
export function getAuthErrorMessage(code: string): string {
  return AUTH_ERROR_MESSAGES[code] ?? AUTH_ERROR_MESSAGES["ERR_UNKNOWN"];
}
