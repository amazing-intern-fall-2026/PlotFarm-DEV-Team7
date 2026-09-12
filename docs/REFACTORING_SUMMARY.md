# Báo Cáo Tổng Hợp Công Việc Đã Thực Hiện

Tài liệu ghi chú lại toàn bộ nguyên nhân, các bước khắc phục lỗi báo đỏ trong IDE và quá trình chuẩn hóa codebase theo nguyên tắc Clean Code & TypeScript.

---

## 1. Nguyên Nhân Các File Bị Báo Đỏ (ESLint / TypeScript Errors)

1. **Lỗi `@typescript-eslint/no-explicit-any`**:
   - `apps/client/src/api/axiosClient.test.ts`: 7 vị trí sử dụng `as any` (mock `localStorage`, mock `headers`, truy cập interceptor handlers).
   - `apps/client/src/api/axiosClient.ts`: Ép kiểu `(import.meta as any)`.
   - `apps/server/src/middlewares/authGuard.test.ts`: Ép kiểu `as any` khi mock dữ liệu trả về của Prisma `db.user.findUnique`.
2. **Lỗi `Unused eslint-disable directive`**:
   - `apps/server/src/middlewares/errorHandler.ts`: Comment `// eslint-disable-next-line @typescript-eslint/no-unused-vars` bị thừa do ESLint đã có cấu hình `argsIgnorePattern: "^_"`.
3. **Cảnh báo biến/import không sử dụng**:
   - `apps/server/src/modules/auth/token.service.ts`: Import `JsonWebTokenError` nhưng không dùng.
4. **Quét nhầm thư mục build**:
   - ESLint chưa bỏ qua các thư mục `dist/`, `build/`, `.turbo/` dẫn đến quét nhầm file output build.

---

## 2. Chi Tiết Các Thay Đổi Đã Thực Hiện

### A. Strict Typing (Tuyệt đối không dùng `any`)

- **`packages/shared/src/index.ts`**:
  - Bổ sung các Zod Schemas và TypeScript types chuẩn cho Authentication:
    - `AuthUserSchema` & `type AuthUser`
    - `AuthTokensSchema` & `type AuthTokens`
    - `AuthPayloadSchema` & `type AuthPayload`
  - Re-build gói `@repo/shared` bằng `pnpm --filter @repo/shared build`.

- **`apps/client/src/api/axiosClient.ts`**:
  - Loại bỏ `(import.meta as any)`, chuyển thành:
    ```ts
    (typeof import.meta !== "undefined" &&
      (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_API_URL)
    ```

- **`apps/client/src/api/axiosClient.test.ts`**:
  - Định nghĩa interface `InterceptorHandler<T>` và `InterceptorManagerInternal<T>`.
  - Viết các hàm helper định kiểu rõ ràng: `getRequestInterceptor()`, `getResponseErrorHandler()`.
  - Thay `headers: {} as any` bằng `headers: new axios.AxiosHeaders()`.
  - Thay `(globalThis as any).localStorage` bằng `Object.defineProperty(globalThis, "localStorage", ...)`.

- **`apps/server/src/middlewares/authGuard.test.ts`**:
  - Định nghĩa type alias `type UserQueryResult = Awaited<ReturnType<typeof db.user.findUnique>>;`.
  - Mock Prisma trả về chuẩn kiểu `null as UserQueryResult` và `{ ... } as unknown as UserQueryResult`.

---

### B. Early Return (Hạn chế `if/else` lồng nhau)

- **`apps/client/src/api/axiosClient.ts`**:
  - Thay vì bọc toàn bộ khối refresh trong `if (status === 401) { ... }`, đã sử dụng early return:
    ```ts
    if (status !== 401) {
      return Promise.reject(error);
    }
    ```
  - Kiểm tra `if (!currentRefreshToken)` và return ngay lập tức trước khi chạy Mutex Promise.
  - Làm phẳng cấu trúc code, tăng tính dễ đọc.

- **`apps/server/src/modules/auth/token.service.ts`**:
  - Giữ vững cấu trúc Guard Clauses tuần tự, loại bỏ `JsonWebTokenError` dư thừa.

---

### C. Self-Documenting & Clean Code

- Loại bỏ toàn bộ các comment đánh số thứ tự dư thừa (`// 1. Kiểm tra...`, `// 2. Verify...`, `// 3. AC-3...`) trong `authGuard.ts`, `authGuard.test.ts`, `token.service.ts`, `axiosClient.ts`, và `axiosClient.test.ts`.
- Loại bỏ comment `// eslint-disable-next-line` thừa trong `errorHandler.ts`.

---

### D. Cấu Hình & Tối Ưu Quy Trình Kiểm Thử

- **`.eslintignore`**:
  - Tạo file `.eslintignore` ở thư mục gốc chứa: `node_modules`, `dist`, `build`, `.turbo`, `coverage`.
- **`apps/server/package.json`**:
  - Bổ sung script `"lint": "eslint src --ext ts --report-unused-disable-directives --max-warnings 0"`.

---

## 3. Kết Quả Kiểm Tra (Verification Results)

| Lệnh thực hiện | Phạm vi | Trạng thái | Ghi chú |
| :--- | :--- | :---: | :--- |
| `pnpm lint` | Monorepo (Client, Server) | **PASSED (0 errors, 0 warnings)** | Không còn bất kỳ vi phạm ESLint nào |
| `pnpm test` | Monorepo (Shared, Client, Server) | **PASSED (100%)** | Toàn bộ các test suite hoạt động hoàn hảo |
| `pnpm build` | Monorepo (Full Turbo) | **PASSED (100%)** | Compile TypeScript & bundle Vite thành công |
