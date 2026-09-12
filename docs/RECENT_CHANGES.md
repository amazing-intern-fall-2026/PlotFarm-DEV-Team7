# Tổng Hợp Toàn Bộ Thay Đổi (US-11 & Kiến Trúc Xử Lý Lỗi Toàn Diện)

> **Nhánh hiện tại:** `feat/us-11-system-error-auth-error-handling`  
> **Cập nhật mới nhất:** 11/09/2026  
> **Phạm vi hoàn thiện:** Phản hồi và khắc phục đầy đủ nhận xét review: **Đồng bộ toàn diện kiến trúc Xử lý Lỗi chuẩn hóa qua cả 3 tầng: `packages/shared`, `apps/server` và `apps/client`.**

---

## 1. Tóm Tắt Giải Pháp Đáp Ứng Yêu Cầu Review

Nhận xét review trước đó:
> *"Sao cái PR nó chỉ đổi trong server mà ko có làm trong client + package/shared dị"*

**Giải pháp đã triển khai:**
1. **`packages/shared`**: Định nghĩa tập trung danh mục hằng số `ERROR_CODES`, các Zod schemas và TypeScript types cho Envelope chuẩn (`ApiErrorResponse`, `ApiSuccessResponse`, `ApiErrorDetail`, `ErrorCode`).
2. **`apps/server`**: Tích hợp `@repo/shared` vào `errorHandler.ts`, `AppError.ts`, `authGuard.ts`, và `token.service.ts` để đảm bảo 100% response từ server đồng nhất với chuẩn chung.
3. **`apps/client`**: Xây dựng lớp client error handling độc lập và mạnh mẽ (`apps/client/src/api/errorHandler.ts` và export qua `apps/client/src/shared/api/index.ts`), cung cấp các hàm tiện ích:
   - `parseApiError()`: Phân tích mọi loại lỗi (Axios, mất mạng `ERR_NETWORK`, timeout `ERR_TIMEOUT`, server envelope) thành cấu trúc chuẩn.
   - `mapValidationErrors()`: Chuyển đổi danh sách lỗi chi tiết thành dictionary gắn vào Form validation trong React.
   - `getErrorMessage()`: Trích xuất thông điệp hiển thị Toast / Notification.

---

## 2. Danh Sách Chi Tiết Các File Thay Đổi Theo Từng Tầng

### 🌐 Tầng 1: `packages/shared`
- **`packages/shared/src/index.ts`**:
  - Thêm `ERROR_CODES` bao gồm các mã lỗi chuẩn: `VALIDATION`, `INVALID_JSON`, `BAD_REQUEST`, `DUPLICATE`, `NOT_FOUND`, `AUTH_REQUIRED`, `INVALID_TOKEN`, `TOKEN_EXPIRED`, `INVALID_REFRESH_TOKEN`, `ACCOUNT_DISABLED`, `USER_NOT_FOUND`, `INTERNAL_SERVER`.
  - Khai báo các Zod schemas & inferred types: `ApiErrorDetail`, `ApiErrorPayload`, `ApiErrorResponse`, `ApiSuccessResponse`, `ApiResponse`.
  - Re-export toàn bộ `zod` để client và server sử dụng chung phiên bản.

### 🖥️ Tầng 2: `apps/server`
- **`apps/server/src/errors/AppError.ts`**:
  - Nhận `ERROR_CODES` từ `@repo/shared`, chuẩn hóa các factory method `badRequest()`, `unauthorized()`, `forbidden()`, `notFound()`, `conflict()`, `internal()`.
- **`apps/server/src/middlewares/errorHandler.ts`**:
  - Trả về đúng định dạng `ApiErrorResponse` từ `@repo/shared`.
  - Mapping tự động các mã `ERROR_CODES.VALIDATION`, `ERROR_CODES.INVALID_JSON`, `ERROR_CODES.DUPLICATE`, `ERROR_CODES.INTERNAL_SERVER`.
- **`apps/server/src/middlewares/authGuard.ts`**:
  - Sử dụng `ERROR_CODES.AUTH_REQUIRED`, `ERROR_CODES.INVALID_TOKEN`, `ERROR_CODES.TOKEN_EXPIRED`, `ERROR_CODES.USER_NOT_FOUND`, `ERROR_CODES.ACCOUNT_DISABLED`.
- **`apps/server/src/modules/auth/token.service.ts`**:
  - Sử dụng `ERROR_CODES.INVALID_REFRESH_TOKEN`, `ERROR_CODES.TOKEN_EXPIRED`, `ERROR_CODES.USER_NOT_FOUND`, `ERROR_CODES.ACCOUNT_DISABLED`.

### 💻 Tầng 3: `apps/client`
- **`apps/client/src/api/errorHandler.ts`** *(Mới tạo)*:
  - Hàm `isApiErrorResponse()`: Type guard kiểm tra an toàn định dạng response.
  - Hàm `parseApiError()`: Bóc tách lỗi server hoặc chuyển hóa lỗi network / timeout.
  - Hàm `mapValidationErrors()`: Biến đổi mảng lỗi chi tiết thành object key-value cho Form React.
  - Hàm `getErrorMessage()`: Helper lấy nhanh nội dung lỗi dạng chuỗi cho Toast notification.
- **`apps/client/src/api/errorHandler.test.ts`** *(Mới tạo)*:
  - 6 unit test cases bao phủ toàn diện: type guard, parsing AxiosError có envelope, network error, timeout error, form mapping, fallback message.
- **`apps/client/src/shared/api/index.ts`**:
  - Export public API layer theo chuẩn FSD (Feature-Sliced Design), xuất cả `axiosClient`, `errorHandler`, và `@repo/shared`.
- **`apps/client/src/auth/authStorage.ts`**:
  - Cơ chế bọc try/catch chống sập ứng dụng khi localStorage bị lỗi cú pháp JSON.
- **`apps/client/src/api/axiosClient.ts`**:
  - Cơ chế Refresh Token Mutex Queue và chống vòng lặp vô hạn khi token hết hạn / tài khoản bị vô hiệu hóa.

### 📚 Tài Liệu Hướng Dẫn
- **`docs/ERROR_HANDLING_GUIDE.md`**: Cập nhật hướng dẫn chi tiết toàn bộ kiến trúc 3 lớp, bảng mã lỗi và ví dụ code mẫu cho cả Server và Client.
- **`docs/RECENT_CHANGES.md`**: Cập nhật bản tổng hợp tiến độ và giải pháp kỹ thuật.

---

## 3. Bảng Kiểm Tra Chất Lượng Toàn Bộ Monorepo

| Bước kiểm tra | Lệnh thực thi | Trạng thái |
| :--- | :--- | :---: |
| **Linting (ESLint - Strict 0 warning)** | `pnpm lint` | **100% PASSED** (0 warning, 0 error) |
| **Unit Tests Shared (`@repo/shared`)** | `pnpm --filter @repo/shared test` | **2/2 PASSED** (100%) |
| **Unit Tests Server (`apps/server`)** | `pnpm --filter server test` | **14/14 PASSED** (100%) |
| **Unit Tests Client (`apps/client`)** | `pnpm --filter client test` | **13/13 PASSED** (100%) |
| **Toàn bộ Test Suite Monorepo** | `pnpm test` | **29/29 PASSED** (100%) |
| **Typecheck & Production Build** | `pnpm build` | **FULL BUILD SUCCESS** |

---

> ⚠️ **Lưu ý theo yêu cầu của bạn:** Chưa thực hiện lệnh pull request hay push lên GitHub lúc này. Toàn bộ mã nguồn đã sẵn sàng và được kiểm thử toàn diện tại local branch.
