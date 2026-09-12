# Hướng dẫn Hệ thống Xử lý Lỗi Tập trung (Centralized Error Handling)

> **Feature Branch:** `feat/us-07-global-error-handling`  
> **Module:** API Error Management (Backend Core Infrastructure)  
> **Áp dụng:** Toàn bộ ứng dụng Express Server (`apps/server`)

---

## 1. Tổng quan & Mục tiêu

Tài liệu này ghi lại kiến trúc và cách sử dụng middleware xử lý lỗi tập trung (`errorHandler`) cho toàn bộ ứng dụng Express.

**Mục tiêu chính:**
- **Chuẩn hóa JSON Response**: Tất cả phản hồi lỗi từ server đều tuân theo cấu trúc JSON Envelope đồng nhất.
- **Bảo mật tuyệt đối**: Không để lộ stack trace, SQL query, database credentials hay file path trong môi trường production.
- **Tự động bắt & phân loại lỗi**: Tự động nhận diện lỗi cú pháp JSON, Zod validation, Prisma database, AppError nghiệp vụ, và lỗi hệ thống không xác định.

---

## 2. Cấu trúc Response chuẩn hóa (Envelope Pattern)

Mọi endpoint API trong hệ thống đều tuân thủ định dạng response sau:

### Phản hồi thành công (HTTP 2xx)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Khu vườn thông minh A"
  }
}
```

### Phản hồi thất bại (HTTP 4xx / 5xx)
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mô tả lỗi dễ hiểu cho client",
    "details": []
  }
}
```

---

## 3. Danh mục Mã lỗi & Bảng đối chiếu (Error Mapping)

| Loại lỗi (Error Type) | Nguyên nhân / Kích hoạt | HTTP Status | Error Code (`code`) | Cấu trúc `details` |
| :--- | :--- | :---: | :--- | :--- |
| **Invalid JSON Body** | Client gửi JSON sai cú pháp lên server (`express.json()`) | `400` | `ERR_INVALID_JSON` | `[]` |
| **Zod Validation** | Dữ liệu request không khớp với schema Zod đã khai báo | `400` | `ERR_VALIDATION` | `[{"field": "email", "message": "..."}]` |
| **Prisma Duplicate** | Vi phạm unique constraint CSDL (Prisma mã `P2002`) | `409` | `ERR_DUPLICATE` | `[{"field": "email"}]` (trích từ meta.target) |
| **Prisma Not Found** | Record không tồn tại khi update/delete (Prisma mã `P2025`) | `404` | `ERR_NOT_FOUND` | `[]` |
| **Prisma Foreign Key**| Vi phạm khóa ngoại CSDL (Prisma mã `P2003`) | `400` | `ERR_FOREIGN_KEY_CONSTRAINT` | `[]` |
| **AppError (Nghiệp vụ)**| Developer chủ động `throw new AppError(...)` | Tùy biến (`400`-`409`) | Tùy biến (`FORBIDDEN`, `ERR_NOT_FOUND`...) | Tùy biến mảng thông tin bổ sung |
| **Unknown System Error**| Exception không bắt được (crash, null pointer, disconnect) | `500` | `ERR_INTERNAL_SERVER` | `[]` (Client không thấy stack trace) |

---

## 4. Các file đã tạo & Chức năng

```
apps/server/src/
├── errors/
│   └── AppError.ts              # Class custom error cho lỗi nghiệp vụ (operational errors)
├── middlewares/
│   ├── errorHandler.ts          # Middleware 4 tham số xử lý lỗi tập trung
│   └── errorHandler.test.ts     # Bộ test suite kiểm thử toàn diện 7 test cases
└── server.ts                    # Tích hợp middleware vào pipeline Express
```

### 1. `apps/server/src/errors/AppError.ts`
- Kế thừa từ class `Error` chuẩn của JavaScript/TypeScript.
- Chứa các thuộc tính: `statusCode`, `errorCode`, `details`, `isOperational`.
- Cung cấp sẵn các helper methods:
  - `AppError.badRequest(message, errorCode, details)`
  - `AppError.unauthorized(message, errorCode, details)`
  - `AppError.forbidden(message, errorCode, details)`
  - `AppError.notFound(message, errorCode, details)`
  - `AppError.conflict(message, errorCode, details)`
  - `AppError.internal(message, errorCode, details)`

### 2. `apps/server/src/middlewares/errorHandler.ts`
- Middleware nhận 4 tham số chuẩn của Express: `(err, req, res, _next)`.
- Xử lý ưu tiên theo thứ tự:
  1. `SyntaxError` (Invalid JSON)
  2. `AppError`
  3. `ZodError` (tự động gom path lồng nhau dạng `profile.age` hoặc `items.0.name`)
  4. `PrismaClientKnownRequestError` / `PrismaClientValidationError`
  5. `Unknown Error` (ghi log chi tiết ra server console kèm timestamp, method, url và stack trace, trả về thông điệp an toàn cho client).

### 3. `apps/server/src/server.ts`
- Đăng ký `errorHandler` ở **dòng cuối cùng** sau tất cả routes.

---

## 5. Hướng dẫn Code mẫu cho Developer

### A. Ném lỗi nghiệp vụ trong Controller hoặc Service
```typescript
import { AppError } from "../errors/AppError";

// Cách 1: Sử dụng helper method tiện lợi
if (user.role !== "ADMIN") {
  throw AppError.forbidden("Bạn không có quyền truy cập tài nguyên này", "FORBIDDEN");
}

// Cách 2: Khởi tạo trực tiếp bằng constructor
if (balance < price) {
  throw new AppError("Số dư tài khoản không đủ", 400, "INSUFFICIENT_FUNDS", [
    { balance, required: price }
  ]);
}
```

### B. Validate dữ liệu đầu vào với Zod
Khi dùng `schema.parse(req.body)`, nếu dữ liệu sai Zod sẽ tự động ném `ZodError` và `errorHandler` sẽ tự động bắt:
```typescript
import { z } from "zod";
import { Request, Response } from "express";

const CreatePlotSchema = z.object({
  name: z.string().min(3, "Tên vườn phải có ít nhất 3 ký tự"),
  area: z.number().positive("Diện tích phải lớn hơn 0"),
  owner: z.object({
    email: z.string().email("Email không đúng định dạng"),
  }),
});

export const createPlotController = async (req: Request, res: Response) => {
  // Nếu sai, middleware sẽ tự trả HTTP 400 ERR_VALIDATION
  const validatedData = CreatePlotSchema.parse(req.body);

  res.status(201).json({ success: true, data: validatedData });
};
```

### C. Tương tác với CSDL qua Prisma
Không cần bọc `try-catch` chỉ để trả lại lỗi duplicate hay not found. Hãy để Prisma tự ném lỗi, `errorHandler` sẽ tự format:
```typescript
import { db } from "@repo/database";

export const registerUser = async (email: string, name: string) => {
  // Nếu email đã tồn tại (unique field), Prisma tự ném P2002
  // errorHandler sẽ tự động trả HTTP 409 ERR_DUPLICATE
  return await db.user.create({
    data: { email, name }
  });
};
```

---

## 6. Lệnh kiểm thử (Testing)

Để chạy bộ kiểm thử tự động cho hệ thống xử lý lỗi:

```bash
# Chạy riêng test suite của errorHandler
pnpm --filter server test

# Chạy test toàn bộ monorepo
pnpm test

# Kiểm tra TypeScript typing
pnpm --filter server build
```

---

## 7. Các lưu ý quan trọng (Troubleshooting)

1. **Vị trí của `errorHandler` trong `server.ts`**:
   `app.use(errorHandler)` **bắt buộc** phải là middleware cuối cùng được gọi trong file server. Nếu đặt trước routes, Express sẽ không thể chuyển giao lỗi tới middleware này.

2. **Khi schema CSDL thay đổi (`schema.prisma`)**:
   Chạy lệnh sau để Prisma sinh lại types mới nhất:
   ```bash
   pnpm --filter @repo/database db:generate
   ```

3. **Nếu IDE hiển thị gạch đỏ cache cũ sau khi cài gói**:
   Nhấn tổ hợp phím `Ctrl + Shift + P` trong VS Code / Antigravity IDE, chọn:
   ```text
   TypeScript: Restart TS Server
   ```
