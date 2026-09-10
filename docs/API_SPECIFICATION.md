# 🚀 ĐẶC TẢ GIAO DIỆN LẬP TRÌNH ỨNG DỤNG (API SPECIFICATION - PLOTFARM v2.0)

> **Tiêu chuẩn thiết kế:** RESTful Architecture, Chuẩn Envelope Quốc Tế (`meta + data` / `meta + error` loại trừ lẫn nhau), Phân quyền 3 Role (`CUSTOMER`, `STAFF`, `ADMIN`), Hỗ trợ đa ngôn ngữ (`Accept-Language`), Xử lý Webhook Idempotent và Nhật ký chăm sóc bất biến.  
> **Phiên bản gốc:** `v1`  
> **Base URL:** `https://api.plotfarm.vn/api/v1` (Production) | `http://localhost:5000/api/v1` (Development)  
> **Tài liệu Database liên kết:** [`docs/DATABASE_SCHEMA.dbml`](./DATABASE_SCHEMA.dbml) | [`docs/DATABASE_ARCHITECTURE.md`](./DATABASE_ARCHITECTURE.md)

---

## MỤC LỤC

1. [QUY TẮC THIẾT KẾ & CHUẨN ENVELOPE (API ENVELOPE STANDARD)](#1-quy-tắc-thiết-kế--chuẩn-envelope-api-envelope-standard)
2. [MA TRẬN PHÂN QUYỀN 3 ROLE (RBAC MATRIX)](#2-ma-trận-phân-quyền-3-role-rbac-matrix)
3. [MODULE 1: XÁC THỰC, HỒ SƠ & TÀI KHOẢN NGÂN HÀNG HOÀN TIỀN](#3-module-1-xác-thực-hồ-sơ--tài-khoản-ngân-hàng-hoàn-tiền)
4. [MODULE 2: DANH MỤC TRANG TRẠI, CÂY TRỒNG & ĐẤT (ĐA NGÔN NGỮ i18n)](#4-module-2-danh-mục-trang-trại-cây-trồng--đất-đa-ngôn-ngữ-i18n)
5. [MODULE 3: GIỮ CHỖ LÔ ĐẤT & TẠO HỢP ĐỒNG (PLOT LOCKING & CONTRACTS)](#5-module-3-giữ-chỗ-lô-đất--tạo-hợp-đồng-plot-locking--contracts)
6. [MODULE 4: THANH TOÁN VIETQR, SỔ CÁI & WEBHOOK ĐỐI SOÁT NGUỒN TIỀN](#6-module-4-thanh-toán-vietqr-sổ-cái--webhook-đối-soát-nguồn-tiền)
7. [MODULE 5: QUY TRÌNH THẨM DUYỆT & CHI TRẢ ĐỀN BÙ (COMPENSATIONS)](#7-module-5-quy-trình-thẩm-duyệt--chi-trả-đền-bù-compensations)
8. [MODULE 6: NHẬT KÝ BẤT BIẾN (IMMUTABLE LOGS) & PHẢN HỒI CỦA KHÁCH](#8-module-6-nhật-ký-bất-biến-immutable-logs--phản-hồi-của-khách)
9. [MODULE 7: DỊCH VỤ CHĂM SÓC, THU HOẠCH & VẬN CHUYỂN NÔNG SẢN](#9-module-7-dịch-vụ-chăm-sóc-thu-hoạch--vận-chuyển-nông-sản)
10. [MODULE 8: KIỂM TOÁN HỆ THỐNG DÀNH CHO ADMIN (AUDIT LOGS)](#10-module-8-kiểm-toán-hệ-thống-dành-cho-admin-audit-logs)
11. [BẢNG MÃ LỖI & HTTP STATUS CODES](#11-bảng-mã-lỗi--http-status-codes)

---

## 1. QUY TẮC THIẾT KẾ & CHUẨN ENVELOPE (API ENVELOPE STANDARD)

Toàn bộ các phản hồi API bắt buộc tuân thủ nguyên tắc **Bất khả tương thích đồng thời (Mutually Exclusive)**: 
* Nếu thành công: chỉ trả về `meta` + `data` (không có trường `error`).
* Nếu thất bại: chỉ trả về `meta` + `error` (không có trường `data`).

### 1.1. Chuẩn Request Headers
* `Authorization: Bearer <jwt_access_token>`: Bắt buộc với các API được bảo vệ.
* `Accept-Language: vi | en | ja`: Thiết lập ngôn ngữ ưu tiên trả về (Mặc định: `vi`).
* `X-Correlation-ID: <uuid>`: Mã định danh chuỗi cuộc gọi để theo dõi phân tán (Distributed Tracing).

---

### 1.2. Mẫu phản hồi Thành công (Single Object - `200 OK` / `201 Created`)
```json
{
  "meta": {
    "correlationId": "a98b1234-56cc-4772-a567-0e02b2c3d479",
    "traceId": "7d2b8b9c-6e4f-4d3a-8b1a-5f9c8d7e6a5b",
    "userId": "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "timestamp": "2026-09-10T03:30:00.125Z"
  },
  "data": {
    "id": "plt_0191eb7a-8d5b-76f8-a739-17a46973e8fa",
    "plotNumber": "Plot A-01",
    "status": "AVAILABLE"
  }
}
```

### 1.3. Mẫu phản hồi Thành công (Danh sách có Phân trang - `Array Data`)
```json
{
  "meta": {
    "correlationId": "a98b1234-56cc-4772-a567-0e02b2c3d479",
    "traceId": "7d2b8b9c-6e4f-4d3a-8b1a-5f9c8d7e6a5b",
    "userId": "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "timestamp": "2026-09-10T03:30:00.125Z",
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 45,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  },
  "data": [
    {
      "id": "crp_ca_chua_cherry",
      "slug": "ca-chua-cherry",
      "name": "Cà chua Cherry Đà Lạt"
    }
  ]
}
```

### 1.4. Mẫu phản hồi Thất bại (Error Standard - `4xx` / `5xx`)
```json
{
  "meta": {
    "correlationId": "a98b1234-56cc-4772-a567-0e02b2c3d479",
    "traceId": "7d2b8b9c-6e4f-4d3a-8b1a-5f9c8d7e6a5b",
    "userId": "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "timestamp": "2026-09-10T03:30:00.125Z"
  },
  "error": {
    "code": "PLOT_CURRENTLY_RESERVED",
    "category": "BUSINESS_LOGIC_ERROR",
    "message": "Lô đất này hiện đang được giữ chỗ trong 10 phút bởi khách hàng khác.",
    "details": [
      {
        "field": "plotId",
        "value": "plt_0191eb7a-8d5b-76f8-a739-17a46973e8fa",
        "issue": "Plot is reserved until 2026-09-10T03:40:00.000Z"
      }
    ]
  }
}
```

---

## 2. MA TRẬN PHÂN QUYỀN 3 ROLE (RBAC MATRIX)

| Chức năng API | Public | CUSTOMER | STAFF | ADMIN |
| :--- | :---: | :---: | :---: | :---: |
| **Xem danh mục Cây, Lô đất, Trang trại** | ✅ | ✅ | ✅ | ✅ |
| **Đăng ký & Cập nhật STK nhận tiền hoàn** | ❌ | ✅ Của mình | ❌ | ✅ Quản lý |
| **Khóa lô đất tạm thời (10 phút)** | ❌ | ✅ | ❌ | ✅ |
| **Tạo hợp đồng thuê & Đặt cọc** | ❌ | ✅ Của mình | ❌ | ✅ |
| **Lấy mã thanh toán VietQR & Tra cứu trạng thái** | ❌ | ✅ Đơn của mình | ❌ | ✅ |
| **Ghi nhật ký chăm sóc nông vụ** | ❌ | ❌ Chỉ xem & phản hồi | ✅ Đất được gán | ✅ Giám sát |
| **Đính chính nhật ký nông vụ (Append-Only)** | ❌ | ❌ | ✅ Bản ghi của mình | ✅ Toàn quyền |
| **Đánh giá nhật ký & Báo cờ nghi vấn** | ❌ | ✅ Đất của mình | ❌ | ✅ Nhận cờ xử lý |
| **Yêu cầu đền bù tổn thất** | ❌ | ✅ Hợp đồng của mình | ✅ Lập biên bản | ❌ |
| **Thẩm duyệt & Chi trả tiền đền bù** | ❌ | ❌ | ❌ | ✅ Độc quyền Admin |
| **Truy vấn Audit Logs** | ❌ | ❌ | ❌ | ✅ Độc quyền Admin |

---

## 3. MODULE 1: XÁC THỰC, HỒ SƠ & TÀI KHOẢN NGÂN HÀNG HOÀN TIỀN

### 3.1. Đăng nhập hệ thống
* **Endpoint:** `POST /api/v1/auth/login`
* **Quyền:** `Public`
* **Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "SecurePassword123@"
}
```
* **Response 200 OK:**
```json
{
  "meta": {
    "correlationId": "c98b8e0a-0f8a-4c28-98e3-82ff3b3e2181",
    "traceId": "9a38f712-8e12-4212-9c12-321456789abc",
    "userId": "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "timestamp": "2026-09-10T03:32:00.000Z"
  },
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4...",
    "user": {
      "id": "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "email": "customer@example.com",
      "fullName": "Nguyễn Văn An",
      "role": "CUSTOMER",
      "preferredLocale": "vi",
      "avatarUrl": "https://img.plotfarm.vn/avatars/an.jpg"
    }
  }
}
```

---

### 3.2. Quản lý tài khoản ngân hàng nhận tiền đền bù (Khách hàng)
* **Endpoint:** `GET /api/v1/users/me/bank-accounts`
* **Quyền:** `CUSTOMER`
* **Response 200 OK:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": "usr_123", "timestamp": "..." },
  "data": [
    {
      "id": "bnk_99182a7b-3b8c-4f12-8172-62738291a823",
      "bankCode": "970422",
      "bankName": "MBBank",
      "accountNumber": "0987654321",
      "accountHolderName": "NGUYEN VAN AN",
      "isDefault": true,
      "isVerified": true
    }
  ]
}
```

* **Endpoint:** `POST /api/v1/users/me/bank-accounts`
* **Quyền:** `CUSTOMER`
* **Request Body:**
```json
{
  "bankCode": "970407",
  "bankName": "Techcombank",
  "accountNumber": "19038291823901",
  "accountHolderName": "NGUYEN VAN AN",
  "isDefault": true
}
```

---

## 4. MODULE 2: DANH MỤC TRANG TRẠI, CÂY TRỒNG & ĐẤT (ĐA NGÔN NGỮ i18n)

### 4.1. Lấy danh sách cây trồng (Tự động localize theo `Accept-Language`)
* **Endpoint:** `GET /api/v1/crops`
* **Quyền:** `Public`
* **Headers:** `Accept-Language: vi` (hoặc `en`)
* **Query Params:** `page=1&pageSize=10&search=ca-chua`
* **Response 200 OK:**
```json
{
  "meta": {
    "correlationId": "...",
    "traceId": "...",
    "userId": null,
    "timestamp": "2026-09-10T03:35:00.000Z",
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 15,
      "totalPages": 2,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  },
  "data": [
    {
      "id": "crp_ca_chua_cherry",
      "slug": "ca-chua-cherry",
      "name": "Cà chua Cherry Đà Lạt",
      "description": "Giống cà chua bi đỏ mọng ngọt thanh, giàu vitamin, canh tác chuẩn hữu cơ.",
      "durationDays": 75,
      "basePrice": 350000.00,
      "expectedYieldKgPerSqm": 2.5,
      "iconUrl": "https://img.plotfarm.vn/crops/cherry-tomato.png",
      "coverImageUrl": "https://img.plotfarm.vn/crops/cherry-tomato-cover.jpg",
      "idealTemp": { "min": 18.0, "max": 25.0 },
      "idealMoisture": { "min": 65.0, "max": 80.0 }
    }
  ]
}
```

---

### 4.2. Lấy danh sách lô đất kèm Camera & IoT
* **Endpoint:** `GET /api/v1/farms/:farmSlug/plots`
* **Quyền:** `Public`
* **Query Params:** `status=AVAILABLE`
* **Response 200 OK:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": null, "timestamp": "..." },
  "data": [
    {
      "id": "plt_a01",
      "plotNumber": "Plot A-01",
      "areaSqm": 50.0,
      "soilType": "Đất đỏ bazan hữu cơ",
      "pricePerMonth": 1200000.00,
      "status": "AVAILABLE",
      "streamUrl": "https://live.plotfarm.vn/hls/farm1_a01.m3u8",
      "assignedStaff": {
        "id": "usr_staff_01",
        "fullName": "Trần Văn Bình (Kỹ sư Nông nghiệp)"
      }
    }
  ]
}
```

---

## 5. MODULE 3: GIỮ CHỖ LÔ ĐẤT & TẠO HỢP ĐỒNG (PLOT LOCKING & CONTRACTS)

### 5.1. Khóa giữ chỗ lô đất tạm thời (10 phút)
* **Endpoint:** `POST /api/v1/plots/:plotId/lock`
* **Quyền:** `CUSTOMER`
* **Quy tắc:** Đổi `plots.status = 'RESERVED'` và gán `locked_until = now() + 10 phút`.
* **Response 200 OK:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": "usr_customer_1", "timestamp": "..." },
  "data": {
    "plotId": "plt_a01",
    "status": "RESERVED",
    "lockedUntil": "2026-09-10T03:45:00.000Z",
    "remainingSeconds": 600
  }
}
```

---

### 5.2. Tạo hợp đồng thuê đất
* **Endpoint:** `POST /api/v1/contracts`
* **Quyền:** `CUSTOMER`
* **Request Body:**
```json
{
  "plotId": "plt_a01",
  "cropId": "crp_ca_chua_cherry",
  "voucherCode": "CHAOBANMOI50K",
  "startDate": "2026-09-15"
}
```
* **Response 201 Created:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": "usr_customer_1", "timestamp": "..." },
  "data": {
    "id": "ctr_0191eb8f-0112-70b1-8b01-123456789abc",
    "contractCode": "PF-2026-0915-A01",
    "status": "PENDING_PAYMENT",
    "pricing": {
      "cropPriceSnapshot": 350000.00,
      "plotPriceSnapshot": 1200000.00,
      "subtotal": 1550000.00,
      "discountAmount": 50000.00,
      "extraFee": 0.00,
      "totalPrice": 1500000.00
    },
    "timeline": {
      "startDate": "2026-09-15",
      "expectedHarvestDate": "2026-11-29",
      "progressPercent": 0
    }
  }
}
```

---

## 6. MODULE 4: THANH TOÁN VIETQR, SỔ CÁI & WEBHOOK ĐỐI SOÁT NGUỒN TIỀN

### 6.1. Tạo lệnh thanh toán QR Code (VietQR / VNPay)
* **Endpoint:** `POST /api/v1/payments/create-order`
* **Quyền:** `CUSTOMER`
* **Request Body:**
```json
{
  "contractId": "ctr_0191eb8f-0112-70b1-8b01-123456789abc",
  "paymentMethod": "VIETQR"
}
```
* **Response 200 OK:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": "usr_customer_1", "timestamp": "..." },
  "data": {
    "orderCode": "PAY-PF2026-0915-A01",
    "amount": 1500000.00,
    "paymentMethod": "VIETQR",
    "status": "PENDING",
    "vietQr": {
      "bankId": "970422",
      "accountNo": "0987654321",
      "accountName": "CTY CP CONG NGHE PLOTFARM",
      "qrContent": "00020101021238540010A00000072701240006970422011009876543210208QRIBFTTA5303704540715000005802VN62230819PAY-PF2026-0915-A016304E8A2",
      "qrImageUrl": "https://img.vietqr.io/image/970422-0987654321-compact2.png?amount=1500000&addInfo=PAY-PF2026-0915-A01"
    },
    "expiresAt": "2026-09-10T03:50:00.000Z"
  }
}
```

---

### 6.2. Webhook ngân hàng bắn về (Lưu trọn vẹn thông tin người chuyển & Chống lặp)
* **Endpoint:** `POST /api/v1/payments/webhook/vietqr`
* **Quyền:** `Gateway / Bank` (Xác thực chữ ký HMAC qua `X-Signature`)
* **Request Body (Ngân hàng bắn về):**
```json
{
  "gatewayReference": "MB_FT2625391823901",
  "orderCode": "PAY-PF2026-0915-A01",
  "transferAmount": 1500000,
  "transferContent": "PAY-PF2026-0915-A01 NGUYEN VAN AN chuyen tien",
  "senderBankCode": "970422",
  "senderAccountNo": "0987654321",
  "senderAccountName": "NGUYEN VAN AN",
  "transactionDate": "2026-09-10T03:36:12.000Z"
}
```
* **Quy trình xử lý tại Backend:**
  1. Kiểm tra chữ ký bảo mật `X-Signature`.
  2. Tạo `idempotencyKey = "VIETQR_MB_FT2625391823901"`. Nếu key đã tồn tại trong bảng `payment_transactions` ➔ Trả ngay `200 OK` (chống xử lý 2 lần).
  3. Ghi vào `payment_transactions` thông tin tài khoản người gửi để phục vụ công tác đền bù sau này.
  4. Chuyển `payment_orders.status = 'SUCCESS'`, kích hoạt hợp đồng `contracts.status = 'ACTIVE'` và lô đất `plots.status = 'OCCUPIED'`.
* **Response 200 OK:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": null, "timestamp": "..." },
  "data": { "received": true, "orderStatus": "SUCCESS" }
}
```

---

## 7. MODULE 5: QUY TRÌNH THẨM DUYỆT & CHI TRẢ ĐỀN BÙ (COMPENSATIONS)

### 7.1. Tạo phiếu yêu cầu đền bù tổn thất (Khách hàng hoặc Kỹ thuật viên)
* **Endpoint:** `POST /api/v1/compensations`
* **Quyền:** `CUSTOMER`, `STAFF`
* **Request Body:**
```json
{
  "contractId": "ctr_0191eb8f-0112-70b1-8b01-123456789abc",
  "reasonCategory": "CROP_DISEASE_OUTBREAK",
  "reasonDetail": "Cây cà chua bị nhiễm rầy phấn trắng sau đợt mưa bão, héo úa toàn bộ.",
  "damageEvidenceUrls": [
    "https://img.plotfarm.vn/evidence/leaf_disease_01.jpg",
    "https://img.plotfarm.vn/evidence/leaf_disease_02.jpg"
  ],
  "payoutType": "BANK_REFUND",
  "amount": 750000.00,
  "beneficiaryBankCode": "970422",
  "beneficiaryAccountNo": "0987654321",
  "beneficiaryAccountName": "NGUYEN VAN AN"
}
```
* **Response 201 Created:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": "usr_customer_1", "timestamp": "..." },
  "data": {
    "compensationCode": "CMP-2026-0015",
    "status": "REQUESTED",
    "amount": 750000.00,
    "payoutType": "BANK_REFUND",
    "beneficiary": {
      "bankCode": "970422",
      "accountNo": "0987654321",
      "accountName": "NGUYEN VAN AN"
    }
  }
}
```

---

### 7.2. Thẩm duyệt và giải ngân đền bù (Độc quyền ADMIN)
* **Endpoint:** `PATCH /api/v1/admin/compensations/:id/approve`
* **Quyền:** `ADMIN`
* **Request Body:**
```json
{
  "decision": "APPROVED",
  "adminNotes": "Đã đối chiếu cảm biến độ ẩm và camera. Xác nhận lỗi do thời tiết bão. Đồng ý duyệt chi trả 50%.",
  "payoutReference": "UNC_MB_883921893"
}
```
* **Response 200 OK:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": "usr_admin_master", "timestamp": "..." },
  "data": {
    "compensationCode": "CMP-2026-0015",
    "status": "COMPLETED",
    "approvedBy": "usr_admin_master",
    "payoutCompletedAt": "2026-09-10T04:15:00.000Z"
  }
}
```

---

## 8. MODULE 6: NHẬT KÝ BẤT BIẾN (IMMUTABLE LOGS) & PHẢN HỒI CỦA KHÁCH

### 8.1. Ghi nhật ký chăm sóc (Kỹ thuật viên gán trên Lô)
* **Endpoint:** `POST /api/v1/contracts/:contractId/farming-logs`
* **Quyền:** `STAFF` (Chỉ nhân viên được gán `plots.assigned_staff_id`)
* **Nguyên tắc chống gian lận:** Backend tự động đọc snapshot từ IoT Gateway tại đúng thời điểm gọi API để lưu `temperature`, `humidity`, `soilMoisture`.
* **Request Body:**
```json
{
  "stageName": "Tưới nước nhỏ giọt & Tỉa nhánh phụ đợt 2",
  "actionType": "WATERING",
  "notes": "Cây phân nhánh đều, lá xanh đậm, đất đủ ẩm, không có dấu hiệu sâu bệnh.",
  "imageUrls": [
    "https://img.plotfarm.vn/logs/tomato_day30_01.jpg"
  ]
}
```
* **Response 201 Created:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": "usr_staff_01", "timestamp": "..." },
  "data": {
    "id": "log_0191eb9c-8821-7112-9988-123456789abc",
    "stageName": "Tưới nước nhỏ giọt & Tỉa nhánh phụ đợt 2",
    "actionType": "WATERING",
    "loggedAt": "2026-09-10T08:30:00.000Z",
    "sensorSnapshot": {
      "temperature": 23.2,
      "humidity": 76.5,
      "soilMoisture": 71.0
    }
  }
}
```

---

### 8.2. Đính chính nhật ký nông vụ (Append-Only - Cấm sửa đè)
* **Endpoint:** `POST /api/v1/contracts/:contractId/farming-logs/amend`
* **Quyền:** `STAFF`
* **Request Body:**
```json
{
  "replacesLogId": "log_0191eb9c-8821-7112-9988-123456789abc",
  "amendmentReason": "Đính chính lưu lượng nước tưới thực tế từ 10L lên 15L sau khi cân chỉnh van",
  "stageName": "Tưới nước nhỏ giọt (Bản đính chính)",
  "actionType": "CORRECTION",
  "notes": "Đã kiểm tra đồng hồ đo lưu lượng, ghi nhận 15L nước bổ sung."
}
```

---

### 8.3. Khách hàng đánh giá & Bật cờ nghi vấn gian lận
* **Endpoint:** `POST /api/v1/farming-logs/:logId/reviews`
* **Quyền:** `CUSTOMER` (Chủ hợp đồng)
* **Request Body:**
```json
{
  "rating": 1,
  "customerFeedback": "Camera lúc 9h sáng thấy lá bị rũ nhưng nhật ký báo độ ẩm đất 80%. Yêu cầu thanh tra kiểm tra lại van tưới!",
  "isFlaggedAbnormal": true
}
```
* **Response 201 Created:** Kích hoạt cảnh báo đỏ chuyển thẳng về Ban Quản Trị **ADMIN/MANAGER**.

---

## 9. MODULE 7: DỊCH VỤ CHĂM SÓC, THU HOẠCH & VẬN CHUYỂN NÔNG SẢN

### 9.1. Đặt dịch vụ chăm sóc nâng cao (Bón phân vi sinh, phun thảo mộc)
* **Endpoint:** `POST /api/v1/contracts/:contractId/care-requests`
* **Quyền:** `CUSTOMER`
* **Request Body:**
```json
{
  "serviceType": "ORGANIC_FERTILIZER",
  "customerNote": "Bón bổ sung phân trùn quế đợt cây bắt đầu đậu trái"
}
```

---

### 9.2. Cập nhật thu hoạch & Vận chuyển nông sản
* **Endpoint:** `POST /api/v1/contracts/:contractId/harvest`
* **Quyền:** `STAFF`
* **Request Body:**
```json
{
  "harvestDate": "2026-11-29",
  "actualYieldKg": 21.5,
  "qualityGrade": "GRADE_A",
  "proofPhotos": [ "https://img.plotfarm.vn/harvests/tomato_harvest_a01.jpg" ],
  "notes": "Nông sản chín đều, quả căng mọng, đóng thùng xốp lót rơm."
}
```

* **Endpoint:** `POST /api/v1/contracts/:contractId/shipment`
* **Quyền:** `STAFF`, `ADMIN`
* **Request Body:**
```json
{
  "carrierCode": "GHN",
  "trackingCode": "GHN-PF2026-881923",
  "receiverName": "Nguyễn Văn An",
  "receiverPhone": "0987654321",
  "receiverAddress": "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
  "totalWeightKg": 21.5
}
```

---

## 10. MODULE 8: KIỂM TOÁN HỆ THỐNG DÀNH CHO ADMIN (AUDIT LOGS)

### 10.1. Truy vấn lịch sử thay đổi (Audit Trail)
* **Endpoint:** `GET /api/v1/admin/audit-logs`
* **Quyền:** `ADMIN`
* **Query Params:** `entityTable=compensations&entityId=cmp_0015&page=1&pageSize=20`
* **Response 200 OK:**
```json
{
  "meta": { "correlationId": "...", "traceId": "...", "userId": "usr_admin_master", "timestamp": "..." },
  "data": [
    {
      "id": "aud_0191eb9f-8172-7a12-8812-987654321fed",
      "actor": {
        "id": "usr_admin_master",
        "fullName": "Lê Quản Trị"
      },
      "action": "COMPENSATION_APPROVED",
      "entityTable": "compensations",
      "entityId": "cmp_0015",
      "oldState": { "status": "REQUESTED" },
      "newState": { "status": "COMPLETED", "payoutReference": "UNC_MB_883921893" },
      "ipAddress": "14.232.18.99",
      "createdAt": "2026-09-10T04:15:00.000Z"
    }
  ]
}
```

---

## 11. BẢNG MÃ LỖI & HTTP STATUS CODES

| HTTP Code | Error Code | Category | Diễn giải |
| :---: | :--- | :--- | :--- |
| `400` | `VALIDATION_FAILED` | `VALIDATION_ERROR` | Thiếu trường dữ liệu bắt buộc hoặc sai định dạng UUID/Email. |
| `401` | `UNAUTHENTICATED` | `AUTHENTICATION_ERROR` | Thiếu Header Authorization hoặc Access Token đã hết hạn. |
| `403` | `FORBIDDEN_ROLE` | `AUTHORIZATION_ERROR` | Customer cố duyệt bồi thường; Staff cố xem sổ cái ngân hàng. |
| `404` | `RESOURCE_NOT_FOUND` | `BUSINESS_LOGIC_ERROR` | Không tìm thấy Lô đất, Cây trồng hoặc Hợp đồng theo ID/Slug. |
| `409` | `PLOT_ALREADY_RESERVED` | `BUSINESS_LOGIC_ERROR` | Lô đất đang được giữ chỗ trong 10 phút bởi khách khác. |
| `409` | `TRANSACTION_DUPLICATED`| `PAYMENT_GATEWAY_ERROR`| Webhook trùng lặp (Idempotency Key đã được xử lý trước đó). |
| `422` | `CANNOT_OVERWRITE_LOG` | `BUSINESS_LOGIC_ERROR` | Cố ý gửi lệnh UPDATE lên nhật ký chăm sóc thay vì tạo bản đính chính. |
| `500` | `INTERNAL_SERVER_ERROR`| `SYSTEM_ERROR` | Lỗi cơ sở dữ liệu nội bộ hoặc cổng trung gian thứ 3 timeout. |
