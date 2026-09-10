# Tổng Hợp Toàn Bộ Thay Đổi Vừa Thực Hiện (US-11 & Refactoring)

> **Nhánh hiện tại:** `feat/us-11-system-error-auth-error-handling`  
> **Thời gian:** 10/09/2026  
> **Nội dung:** Hoàn thành trọn vẹn User Story **US-11: Authentication Exception Handling & Resilient Token Refresh** và tối ưu hóa Codebase (Clean Code & 0 Warning).

---

## 1. Danh Sách File Đã Thêm Mới & Chỉnh Sửa

### 📂 File Tạo Mới (New Files)
1. **`.eslintignore`**: Bỏ qua các thư mục build (`dist`, `build`, `.turbo`, `coverage`) để linter không quét nhầm file output.
2. **`apps/server/src/middlewares/authGuard.ts`**: Middleware bảo vệ route, xác thực JWT và kiểm tra trạng thái active trong CSDL.
3. **`apps/server/src/middlewares/authGuard.test.ts`**: Unit test suite cho `authGuard` (6 test cases).
4. **`apps/server/src/modules/auth/token.service.ts`**: Service xử lý sinh và xác thực Access Token / Refresh Token.
5. **`apps/server/src/types/express.d.ts`**: Mở rộng type cho Express `Request` (`req.user`, `req.userId`, `req.userRole`).
6. **`apps/client/src/auth/authStorage.ts`**: Module quản lý LocalStorage an toàn (bắt lỗi JSON hỏng, chống crash React - EH-1).
7. **`apps/client/src/api/axiosClient.ts`**: Axios instance với cơ chế Mutex Queue Refresh Token (AC-1) & chống lặp vô hạn.
8. **`apps/client/src/api/axiosClient.test.ts`**: Unit test suite cho `axiosClient` (6 test cases, kiểm thử 5 request đồng thời).
9. **`docs/REFACTORING_SUMMARY.md`**: Báo cáo chi tiết tối ưu hóa linter và code sạch.

---

### 📝 File Chỉnh Sửa (Modified Files)
1. **`packages/database/prisma/schema.prisma`**:
   - Thêm model **`User`** (các trường: `id`, `email`, `password`, `role`, **`active: Boolean`**).
   - Thêm model **`RefreshToken`** (các trường: `token`, `userId`, `expiresAt`).
2. **`packages/shared/src/index.ts`**:
   - Bổ sung các Zod Schemas & TypeScript types: `AuthUserSchema`, `AuthTokensSchema`, `AuthPayloadSchema`.
3. **`apps/server/package.json`**:
   - Cài đặt thêm: `jsonwebtoken`, `bcryptjs` và `@types/jsonwebtoken`, `@types/bcryptjs`.
   - Bổ sung script `"lint": "eslint src --ext ts --report-unused-disable-directives --max-warnings 0"`.
4. **`apps/server/src/modules/auth/auth.controller.ts`**:
   - Thêm endpoint `POST /api/auth/refresh` (nhận refreshToken, trả về accessToken mới).
   - Thêm endpoint `GET /api/auth/profile` (chạy qua `authGuard`).
5. **`apps/server/src/modules/auth/auth.routes.ts`**:
   - Khai báo routes cho `/refresh` và `/profile`.
6. **`apps/server/src/server.ts`**:
   - Mount router `app.use("/api/auth", authRoutes)`.
7. **`apps/server/src/middlewares/errorHandler.ts`**:
   - Dọn dẹp comment `// eslint-disable-next-line` thừa để đạt chuẩn ESLint strict.
8. **`apps/client/package.json`**:
   - Cài đặt thêm: `axios`.
9. **`apps/client/src/app/providers/AuthContext.tsx`**:
   - Tích hợp `safeGetAuth()`, `safeSetAuth()`, `safeClearAuth()`.
   - Lắng nghe sự kiện `auth:logout` phát ra từ `axiosClient` để tự động reset state về Guest mà không reload trang.
10. **`pnpm-lock.yaml`**:
   - Cập nhật lockfile cho toàn bộ monorepo sau khi thêm các dependencies cần thiết.

---

## 2. Chi Tiết Các Tính Năng Đã Hoàn Thiện

### A. Backend (`apps/server`)
- **AC-2 (Tampered JWT)**:
  - Bắt `JsonWebTokenError`, ném `AppError("Mã xác thực không hợp lệ", 401, "ERR_INVALID_TOKEN")`.
  - Phân biệt với `TokenExpiredError` (trả `ERR_TOKEN_EXPIRED`).
- **AC-3 (Account Active Status)**:
  - Khi token hợp lệ, vẫn bắt buộc query CSDL kiểm tra user:
  - Nếu `!user`: Trả `401 ERR_USER_NOT_FOUND`.
  - Nếu `user.active === false`: Trả `403 ERR_ACCOUNT_DISABLED` ("Tài khoản đã bị khóa").
- **Refresh Token Endpoint**:
  - `POST /api/auth/refresh`: Validate bằng Zod, kiểm tra token trong bảng `RefreshToken`, cấp phát `accessToken` mới.

### B. Frontend (`apps/client`)
- **AC-1 (Token Refresh Mutex / Queue)**:
  - Biến cờ chia sẻ: `let refreshPromise: Promise<string> | null = null`.
  - Khi 5 request đồng thời bị `401`, request đầu tiên khởi tạo lệnh gọi `/auth/refresh`, 4 request còn lại xếp hàng await chung promise đó.
  - **Đảm bảo chỉ có DUY NHẤT 1 request refresh được gửi lên server**, sau khi có token mới thì cả 5 request tự động retry.
- **Infinite Loop Protection**:
  - Request có cờ `_isRetry` hoặc URL chứa `/auth/refresh` nếu bị 401 sẽ dừng ngay, xóa auth và chuyển về Guest.
- **Account Disabled / Tampered Protection**:
  - Nếu nhận `ERR_ACCOUNT_DISABLED` (403) hoặc `ERR_INVALID_TOKEN`, client lập tức `safeClearAuth()` và không cố gắng refresh token.
- **EH-1 (Corrupted LocalStorage)**:
  - Hàm `safeGetAuth()` bọc `JSON.parse` trong `try/catch`. Nếu dữ liệu bị lỗi cú pháp, tự động xóa key bị hỏng, trả về `null` (Guest state) mà KHÔNG làm crash hay trắng màn hình React.

---

## 3. Kết Quả Kiểm Tra Tự Động (Verification)

| Quy trình kiểm tra | Lệnh chạy | Kết quả |
| :--- | :--- | :---: |
| **ESLint Toàn Bộ Monorepo** | `pnpm lint` | **PASSED (0 errors, 0 warnings)** |
| **Unit Tests Client (Axios & Storage)** | `pnpm --filter client test` | **7/7 PASSED (100%)** |
| **Unit Tests Server (AuthGuard & ErrorHandler)** | `pnpm --filter server test` | **14/14 PASSED (100%)** |
| **Build Toàn Bộ Dự Án** | `pnpm build` | **FULL TURBO PASSED** |
