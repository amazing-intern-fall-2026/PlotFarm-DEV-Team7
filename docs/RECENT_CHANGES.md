# 📝 Nhật Ký Cập Nhật & Tổng Hợp Thay Đổi (Recent Changes Note)

> **Dự án:** PlotFarm / CloudFarm Monorepo  
> **Nhánh phát triển:** `feat/us-11-system-error-auth-error-handling`  
> **Thời gian cập nhật:** Ngày 13 tháng 09, 2026  
> **Tác giả:** NghiaDPT & AI Assistant  

---

## 📑 Mục Lục Tổng Quan
1. [Hệ Thống Xác Thực (Auth & Registration Redesign)](#1-hệ-thống-xác-thực-auth--registration-redesign)
   - [Đồng bộ giao diện đăng nhập từ develop](#11-đồng-bộ-giao-diện-đăng-nhập-từ-develop)
   - [Cơ chế In-Memory Dev Fallback trong Auth Controller](#12-cơ-chế-in-memory-dev-fallback-trong-auth-controller)
   - [Bổ sung tính năng Đăng ký tài khoản (Register Flow)](#13-bổ-sung-tính-năng-đăng-ký-tài-khoản-register-flow)
   - [Tối ưu hóa UX Form Đăng ký & Đăng nhập](#14-tối-ưu-hóa-ux-form-đăng-ký--đăng-nhập)
   - [Quy trình chạy đồng thời Frontend & Backend](#15-quy-trình-chạy-đồng-thời-frontend--backend)
2. [Giao Diện Landing Page CloudFarm (Theo Thiết Kế Mockup)](#2-giao-diện-landing-page-cloudfarm-theo-thiết-kế-mockup)
   - [Kiến trúc Header & Logo thương hiệu](#21-kiến-trúc-header--logo-thương-hiệu)
   - [Hero Section & Camera Live 24/7 kèm Cảm biến IoT](#22-hero-section--camera-live-247-kèm-cảm-biến-iot)
   - [Mùa Vụ Thu Đông (Seasonal Crops Carousel)](#23-mùa-vụ-thu-đông-seasonal-crops-carousel)
   - [Mô Hình Minh Bạch Trong 4 Bước (Process Steps)](#24-mô-hình-minh-bạch-trong-4-bước-process-steps)
   - [Hình Ảnh Thực Tế & Đánh Giá Từ Gia Đình (Testimonials)](#25-hình-ảnh-thực-tế--đánh-giá-từ-gia-đình-testimonials)
   - [Banner Đợt Xuống Giống Giới Hạn (Urgent CTA Banner)](#26-banner-đợt-xuống-giống-giới-hạn-urgent-cta-banner)
   - [Footer Chuẩn Thương Hiệu & Pháp Lý](#27-footer-chuẩn-thương-hiệu--pháp-lý)
   - [Kho Tài Nguyên Hình Ảnh Thực Tế](#28-kho-tài-nguyên-hình-ảnh-thực-tế)
3. [Kiến Trúc Xử Lý Lỗi Toàn Diện (US-11 Error Handling Envelope)](#3-kiến-trúc-xử-lý-lỗi-toàn-diện-us-11-error-handling-envelope)
   - [Tầng 1: packages/shared](#31-tầng-1-packagesshared)
   - [Tầng 2: apps/server](#32-tầng-2-appsserver)
   - [Tầng 3: apps/client](#33-tầng-3-appsclient)
4. [Bảng Kiểm Tra Chất Lượng (Quality Gate & Test Suite)](#4-bảng-kiểm-tra-chất-lượng-quality-gate--test-suite)
5. [Lịch Sử Git Commits](#5-lịch-sử-git-commits)

---

## 1. Hệ Thống Xác Thực (Auth & Registration Redesign)

### 1.1. Đồng bộ giao diện đăng nhập từ develop
- **Mục tiêu**: Thay thế toàn bộ mã nguồn đăng nhập tự dựng cũ bằng chuẩn UI chính thức được nhóm phát triển hợp nhất trên nhánh `develop`.
- **Thực hiện**: Pull và merge `team7/develop` vào nhánh hiện tại (`feat/us-11-system-error-auth-error-handling`).
- **Files cập nhật**:
  - `apps/client/src/features/auth/ui/LoginPage.tsx`: Tích hợp các UI components từ `@/shared/ui` (`Card`, `Input`, `Button`, `Logo`, `Badge`).
  - `apps/client/src/features/auth/model/useLoginForm.ts`: Hook xử lý submit đăng nhập và quản lý form state.
  - `apps/client/src/features/auth/model/authSession.ts`: Quản lý lưu trữ phiên làm việc an toàn.

### 1.2. Cơ chế In-Memory Dev Fallback trong Auth Controller
- **File**: [`apps/server/src/modules/auth/auth.controller.ts`](file:///d:/Project/plot-farm/apps/server/src/modules/auth/auth.controller.ts)
- **Vấn đề giải quyết**: Khi lập trình viên chạy local mà cơ sở dữ liệu Cloud PostgreSQL chưa kịp cấu hình hoặc gặp gián đoạn đường truyền, việc đăng nhập và đăng ký không bị sập hay trả lỗi 500.
- **Giải pháp triển khai**:
  - Bổ sung bộ nhớ cache tạm thời `memoryUsers = new Map<string, User>()` độc lập trong controller.
  - Tự động fallback sang lưu trữ và xác thực trên memory khi Prisma kết nối DB thất bại.
  - Mã hóa mật khẩu bằng `bcryptjs` chuẩn, sinh token JWT hợp lệ bằng `tokenService.generateTokenPair()`.
  - Khởi tạo sẵn tài khoản mẫu: `customer@plotfarm.vn`, `staff@plotfarm.vn`, `admin@plotfarm.vn` (mật khẩu mặc định: `Password123@`).
  - Hỗ trợ cả API chuẩn RESTful `POST /api/auth/register`, `POST /api/auth/login` và kênh API Gateway `POST /api/gateway` (actions `auth.login`, `auth.register`).

### 1.3. Bổ sung tính năng Đăng ký tài khoản (Register Flow)
- **Files đã tạo & cập nhật**:
  - [`apps/client/src/features/auth/api/authApi.ts`](file:///d:/Project/plot-farm/apps/client/src/features/auth/api/authApi.ts): Thêm hàm `authApi.register({ fullName, email, password })`.
  - [`apps/client/src/features/auth/model/useRegisterForm.ts`](file:///d:/Project/plot-farm/apps/client/src/features/auth/model/useRegisterForm.ts): Hook quản lý trạng thái form, validation khớp mật khẩu, và gọi API đăng ký.
  - [`apps/client/src/features/auth/ui/RegisterFormPanel.tsx`](file:///d:/Project/plot-farm/apps/client/src/features/auth/ui/RegisterFormPanel.tsx): Component panel hiển thị form đăng ký.
  - [`apps/client/src/app/router.tsx`](file:///d:/Project/plot-farm/apps/client/src/app/router.tsx): Thêm các tuyến đường `/register` và `/signup` tự động hiển thị tab đăng ký.

### 1.4. Tối ưu hóa UX Form Đăng ký & Đăng nhập
Theo yêu cầu trải nghiệm người dùng thực tế:
1. **Loại bỏ khối chọn vai trò (Role Selector)**: Người dùng thông thường không cần chọn vai trò `CUSTOMER`/`STAFF`/`ADMIN` khi đăng ký. Hệ thống mặc định 100% tài khoản đăng ký mới có vai trò `CUSTOMER`.
2. **Căn chỉnh Form về 1 cột dọc duy nhất (Single-column layout)**: Thay vì chia 2 cột gây hẹp ô nhập liệu, tất cả các trường dữ liệu:
   - Họ và tên (`fullName`)
   - Địa chỉ Email (`email`)
   - Mật khẩu (`password`)
   - Xác nhận mật khẩu (`confirmPassword`)
   được xếp thành từng dòng riêng biệt, tăng tính thân thiện trên màn hình di động và desktop.
3. **Loại bỏ thanh chuyển Tab phía trên đầu (`TabSwitch`)**: 
   - Đưa tiêu đề trang (`Đăng nhập tài khoản` hoặc `Tạo tài khoản mới`) lên vị trí cao nhất.
   - Chuyển hướng giữa Đăng nhập và Đăng ký qua liên kết điều hướng mượt mà ở chân form:
     - Tại trang Đăng nhập: *"Chưa có tài khoản? Đăng ký ngay"*.
     - Tại trang Đăng ký: *"Đã có tài khoản? Đăng nhập ngay"*.

### 1.5. Quy trình chạy đồng thời Frontend & Backend
- **Lệnh chuẩn hóa**:
  ```bash
  pnpm turbo run dev --filter=client --filter=server
  # Hoặc ngắn gọn
  pnpm dev
  ```
- **Cổng dịch vụ**:
  - Frontend: `http://localhost:5173`
  - Backend API: `http://localhost:5000`

---

## 2. Giao Diện Landing Page CloudFarm (Theo Thiết Kế Mockup)

Xây dựng mới toàn diện giao diện trang chủ theo đúng 100% thiết kế hình ảnh (mockup) được người dùng cung cấp.

### 2.1. Kiến trúc Header & Logo thương hiệu
- **Files**: 
  - [`apps/client/src/shared/ui/Header/Header.tsx`](file:///d:/Project/plot-farm/apps/client/src/shared/ui/Header/Header.tsx)
  - [`apps/client/src/shared/ui/Logo/Logo.tsx`](file:///d:/Project/plot-farm/apps/client/src/shared/ui/Logo/Logo.tsx)
  - [`apps/client/src/widgets/RootLayout/RootLayout.tsx`](file:///d:/Project/plot-farm/apps/client/src/widgets/RootLayout/RootLayout.tsx)
- **Các chi tiết tích hợp**:
  - Logo: Mầm cây sinh học trong nền xanh `#23a54f` cùng chữ **CloudFarm** sắc nét.
  - Huy hiệu định vị: `📍 Đà Lạt Farm - Nhà xe` với hiệu ứng chấm xanh animate pulse.
  - Danh mục Menu điều hướng chuẩn xác:
    1. `Trang chủ` (`/`)
    2. `Khám phá ô đất` (`/plots`)
    3. `Camera 24/7` (`/journal`)
    4. `Nhật ký nông vụ` (`/journal`)
  - Hotline hỗ trợ: `1900 6068` (tích hợp phím tắt gọi `tel:19006068`).
  - Hộp thông báo và Avatar tài khoản người dùng.

### 2.2. Hero Section & Camera Live 24/7 kèm Cảm biến IoT
- **File**: [`apps/client/src/pages/customer/HomePage.tsx`](file:///d:/Project/plot-farm/apps/client/src/pages/customer/HomePage.tsx)
- **Nội dung hiển thị**:
  - Huy hiệu: `🌱 Nông nghiệp số tuần hoàn tại Đà Lạt`.
  - Tiêu đề: *“Sở hữu vườn rau hữu cơ riêng của bạn – Canh tác bởi chuyên gia, giám sát 24/7 từ xa”*.
  - Đoạn mô tả: Trải nghiệm làm chủ nông trại chuẩn sinh thái tại Đạ Sar – Đà Lạt, hệ thống camera & cảm biến IoT truyền trực tiếp về điện thoại gia đình mỗi ngày.
  - 2 Nút hành động:
    - `Khám phá ô đất trồng ngay →` (chuyển hướng sang `/plots`).
    - `▶ Xem Video Vườn & Camera Live` (mở Modal phát trực tiếp toàn màn hình).
  - Khối Social Proof: Cụm avatar gia đình, huy hiệu `+1.2k`, điểm đánh giá ⭐ **4.9/5** và thông điệp *“Từ 1.200+ gia đình thành thị tin dùng”*.
- **Khung Camera Live 24/7**:
  - Hình ảnh thực tế từ góc máy nhà kính Đạ Sar.
  - Huy hiệu `LIVE | 1080P` với hiệu ứng chớp đỏ thời gian thực.
  - Tên luống: `Luống RA - 102 (Đà Lạt)`.
  - Đồng hồ thời gian thực nhảy theo từng giây: `HH:mm:ss`.
  - 2 thẻ cảm biến vi khí hậu thông minh:
    - `💧 Độ ẩm đất: 68% (Chuẩn)`
    - `🌡 Nhiệt độ: 24.2 °C`

### 2.3. Mùa Vụ Thu Đông (Seasonal Crops Carousel)
- **Tiêu đề phân mục**: `MÙA VỤ THU ĐÔNG` – *“Giống rau mùa vụ chuẩn bị gieo trồng”*.
- **Điều khiển carousel**: Hai nút tròn điều hướng `<` `>` và thanh pagination dots tương tác chọn giống.
- **3 thẻ giống rau đặc sản**:
  1. **Cải bó xôi Nhật (Spinach)**:
     - Huy hiệu: `Bán chạy nhất`
     - Chu kỳ thu hoạch: `40 ngày`
     - Sản lượng dự kiến: `15 – 20 kg / vụ`
     - Thổ nhưỡng: `Bazan Organic 100%`
  2. **Cải cầu vồng Thụy Sĩ (Rainbow Chard)**:
     - Huy hiệu: `Dinh dưỡng cao`
     - Chu kỳ thu hoạch: `45 ngày`
     - Sản lượng dự kiến: `18 – 22 kg / vụ`
     - Thổ nhưỡng: `Bazan Phù Sa Mịn`
  3. **Xà lách búp mỡ Đà Lạt**:
     - Huy hiệu: `Dễ chăm sóc`
     - Chu kỳ thu hoạch: `45 ngày (Ngắn)`
     - Sản lượng dự kiến: `12 – 16 kg / vụ`
     - Thổ nhưỡng: `Giá thể xơ dừa sinh học`
  - Nút bấm trên mỗi thẻ: `Chọn gieo giống này ↗` (điều hướng đến đặt ô đất).

### 2.4. Mô Hình Minh Bạch Trong 4 Bước (Process Steps)
- **Tiêu đề**: `MÔ HÌNH MINH BẠCH` – *“Hành trình nông trại từ xa trong 4 bước”*.
- **4 Thẻ quy trình**:
  - `01` **Chọn ô đất & Giống rau**: Diện tích 15m²–20m² theo nhu cầu tiêu dùng và danh mục rau mùa vụ yêu thích.
  - `02` **Camera Live 24/7 & IoT**: Giám sát độ ẩm, nhiệt độ theo thời gian thực và xem trực tiếp qua camera Full HD.
  - `03` **Chăm sóc chuẩn hữu cơ**: Kỹ sư bản địa bón phân trùn quế, nhổ cỏ thủ công, bắt sâu và chụp ảnh định kỳ.
  - `04` **Thu hoạch & Giao tận nhà**: Thu hái lúc 5h sáng, đóng thùng sinh học và giao Agri Express trong 24 giờ.

### 2.5. Hình Ảnh Thực Tế & Đánh Giá Từ Gia Đình (Testimonials)
- **Tiêu đề**: `NIỀM VUI KHÁCH HÀNG` – *“Hình ảnh thực tế & Đánh giá từ gia đình”* kèm liên kết `Xem tất cả đánh giá →`.
- **3 Thẻ nhận xét thực tế kèm ảnh chụp đời sống**:
  1. **Chị Minh Anh** (Quận 7, TP. HCM) – Mã HĐ: `HĐ-1582 • Có camera riêng` – ⭐⭐⭐⭐⭐
  2. **Anh Toàn Nam** (Cầu Giấy, Hà Nội) – Mã HĐ: `HĐ-2041 • Gói 6 tháng` – ⭐⭐⭐⭐⭐
  3. **Bác Lê Thanh** (Hải Châu, Đà Nẵng) – Mã HĐ: `HĐ-0914 • Vụ sinh thái` – ⭐⭐⭐⭐⭐

### 2.6. Banner Đợt Xuống Giống Giới Hạn (Urgent CTA Banner)
- **Thiết kế**: Bo cong góc lớn (`rounded-3xl`), dải màu gradient xanh rừng thông đậm (`#0e391f` -> `#185c31`), điểm xuyết các vòng tròn phát sáng mờ.
- **Nội dung**:
  - Huy hiệu: `● Đợt mở bán vụ mùa giới hạn`.
  - Tiêu đề: *“Chỉ còn 8 ô đất trống trong đợt xuống giống tuần này tại thung lũng Đà Lạt”*.
  - Đoạn phụ: Đăng ký ngay hôm nay để nhận suất ưu tiên góc quan sát camera tốt nhất và miễn phí 100% công lắp đặt cảm biến thông minh.
  - Nút bấm cam nổi bật: `Đặt ô đất ngay hôm nay →`.

### 2.7. Footer Chuẩn Thương Hiệu & Pháp Lý
- **File**: [`apps/client/src/shared/ui/Footer/Footer.tsx`](file:///d:/Project/plot-farm/apps/client/src/shared/ui/Footer/Footer.tsx)
- **Nội dung 4 cột**:
  1. **CloudFarm & Tiêu chuẩn**: Mô tả nền tảng, 3 huy hiệu `VietGAP Certified`, `GlobalGAP 100%`, `Organic Bio`.
  2. **Quy Trình & Canh Tác**: Chọn đất & canh tác, Lập lịch gieo trồng, Giám sát IoT & Cam 24/7, Thu hoạch & Giao hàng.
  3. **Hỗ Trợ & Chính Sách**: Bảo hiểm mùa vụ, Kiểm nghiệm đất & nước, Trải nghiệm tham quan, Điều khoản thuê đất.
  4. **Trang Trại Đà Lạt**: Địa chỉ Tiểu khu 158, Đạ Sar, Lạc Dương, TP. Đà Lạt; Hotline `1900 6068`; Email `kythuat@cloudfarm.dalat.vn`.
  5. **Bản quyền & Pháp lý**: © 2026 CloudFarm Đà Lạt, liên kết Bảo mật thông tin, Cam kết hữu cơ, Quy chế hoạt động.

### 2.8. Kho Tài Nguyên Hình Ảnh Thực Tế
Lưu trữ tại `apps/client/public/images/`:
- `greenhouse_camera_live.jpg`: Ảnh góc nhìn trực tiếp nhà kính công nghệ cao Đạ Sar.
- `spinach.jpg`: Cận cảnh luống cải bó xôi Nhật trên đất đỏ bazan.
- `rainbow_chard.jpg`: Luống cải cầu vồng Thụy Sĩ đa sắc màu.
- `butterhead_lettuce.jpg`: Giàn xà lách búp mỡ Đà Lạt xanh mướt.
- `review_delivery.jpg`: Ảnh giao rau củ sạch tận cửa căn hộ gia đình.
- `review_dinner.jpg`: Gia đình sum vầy bên bàn ăn rau sạch hữu cơ.
- `review_produce.jpg`: Thùng gỗ đựng nông sản đóng gói tươi sạch tại vườn.

---

## 3. Giao Diện Web Dành Cho Staff / Kỹ Thuật Viên Nông Trại (Staff Web Redesign)

Thiết kế và nâng cấp từ các bản phác thảo di động sang giao diện Web Desktop / Tablet chuyên nghiệp cho đội ngũ Kỹ thuật viên thực địa (CloudFarm Ops / Field Tasks).

### 3.1. Trang Nhiệm Vụ Hôm Nay (`/farmer` - `FarmerTasksPage.tsx`)
- **Header Kỹ thuật viên**: Card thông tin Bác Bảy (KTV Trưởng • Đội 1 Khu A), trạng thái `● Đang làm việc`, giờ ca trực (07:00 – 15:30).
- **Bộ 3 Chỉ Số Nhanh (KPI Widgets)**:
  - 📋 `3 Việc chờ xử lý` (1 việc khẩn trước 09:30).
  - 🚜 `1 Ô đến hạn thu hoạch` (Ô A-101).
  - 🌿 `5 Ô đất phụ trách` (Độ ẩm TB 68%).
- **Banner Cảnh Báo Điều Hành**: `⚡ Hôm nay: 3 việc chờ xử lý • 1 ô đến hạn thu hoạch`.
- **Bố Cục 2 Cột Desktop**:
  - **Cột Trái (Hero Task & Lịch Trình Ca Trực)**:
    - Thẻ nhiệm vụ ưu tiên số 1 (`#CARE-782`): Bón phân vi sinh, Luống 2 (Khu A), Hạn chót `Trước 09:30`. Ô đất A-104 (Cải cầu vồng), khách hàng Thu Hà. Thẻ vi khí hậu: Độ ẩm 58%, Nhiệt độ 24°C. Hộp dặn dò từ khách: *"Bón 150g phân trùn quế quanh rễ, tỉa bớt lá già sát đất"*. Nút `▶ Bắt đầu xử lý nhiệm vụ này`.
    - Danh sách việc kế tiếp: Kiểm tra bẫy pheromone (Ô B-205), Đo EC & xới đất (Ô A-102).
  - **Cột Phải (Ô Đất Phụ Trách & Công Cụ Nhanh)**:
    - 3 ô đất thực địa với thanh tiến độ %, ngày sinh trưởng (32/60, 60/60, 18/75), nút xem Camera Live trực tiếp tại luống và nút thu hoạch nhanh.
    - Tiện ích: Quét mã QR luống, Bản đồ phân khu, Báo sự cố khẩn cấp.

### 3.2. Trang Quản Lý Ô Đất (`/farmer/plots` - `FarmerPlotsPage.tsx`)
- **Thanh Công Cụ Đa Năng**:
  - Ô tìm kiếm theo mã ô (A-104), tên giống rau, hoặc tên khách hàng.
  - Tab lọc phân khu: `Tất cả (5)`, `Khu A Đà Lạt (3)`, `Khu B (2)`.
  - Bộ lọc trạng thái: `Cần tưới nước (1)`, `Đang sinh trưởng (3)`, `Chuẩn bị thu hoạch (1)`.
- **Lưới Ô Đất 3 Cột (Responsive Grid)**:
  - Hiển thị đầy đủ 5 ô đất với chỉ số cảm biến vi khí hậu: Độ ẩm đất %, Nhiệt độ luống °C, tiến độ sinh trưởng, ngày thu hoạch dự kiến.
  - Thao tác nhanh trên từng ô: `[📹 Xem camera]` và `[📖 Nhật ký & Chi tiết]`.
  - Riêng ô A-101 (Đạt 60/60 ngày): Nút cam nổi bật `[🚜 Tạo lệnh thu hoạch ngay]`.
- **Modal Camera Trực Tiếp**: Mở stream Full HD của luống rau kèm chỉ số cảm biến tức thời và nút chụp ảnh lưu kho.
- **Modal Chi Tiết & Telemetry Cây Trồng (Screens 4 & 5)**:
  - Stepper vụ mùa: Gieo hạt > Nảy mầm > Bung lá > Thu hoạch.
  - Bộ 3 thẻ cảm biến: Độ ẩm đất, Nhiệt độ luống, Độ ẩm không khí.
  - Ảnh kiểm định thực tế và hệ thống thẻ ghi chú nhanh (`+ Tưới vi sinh`, `✓ Cây bung lá khỏe`, `+ Đã xới thoáng đất`, `+ Nắng ấm`).
  - Nút: `Lưu nhật ký & Gửi thông báo đến khách` (tự động đồng bộ Zalo/SMS).

### 3.3. Trang Thực Hiện Nhiệm Vụ (`/farmer/tasks/:id/execute` - `FarmerTaskExecutePage.tsx`)
- **Header & Đồng Hồ Đếm Ngược**: Mã phiếu `#CARE-782`, hạn hoàn thành `Trước 09:30`.
- **Stepper 3 Bước Ngang**: `✓ 1. Đã nhận` -> `● 2. Minh chứng (Đang làm)` -> `○ 3. Đóng phiếu`.
- **Bố Cục 2 Cột Chuyên Dụng**:
  - **Cột Trái (Minh Chứng Hiện Trường & Nghiệm Thu)**:
    - Ảnh chụp luống rau thực tế kèm vị trí & giờ watermark (`📍 Lô B-205 • 09:12 AM`) và badge `✓ Ảnh hợp lệ`.
    - Nút tải/đổi ảnh chụp.
    - Khung nhập ghi chú kỹ thuật kết quả xử lý.
    - Hộp xác nhận liều lượng chuẩn VietGAP: Cam kết đã bón đúng 200g phân trùn quế theo lời dặn của khách.
    - Nút `[🚫 Báo sự cố]` (mở Modal mô tả gửi đến Giám sát viên) và `[✓ Hoàn tất & Đóng phiếu]`.
  - **Cột Phải (Chỉ Định Kỹ Thuật & Cảm Biến)**:
    - Chi tiết tác vụ, vị trí luống, thông tin khách hàng.
    - Hộp lời dặn dò từ khách nổi bật.
    - Chỉ số vi khí hậu tức thời (Độ ẩm 58%, Nhiệt độ 24°C).
    - Camera trực tiếp luống B-205 để đối chiếu trước khi hoàn tất.

### 3.5. Biểu Mẫu Đăng Bài Viết Nhật Ký Tiến Độ Cây Trồng (US-23 & US-24)
- **Mục tiêu**: Cung cấp biểu mẫu tiện lợi trên mobile/desktop cho nông dân đăng bài viết nhật ký sinh trưởng thực địa cho hợp đồng ACTIVE, chọn mốc mùa vụ, nén ảnh client-side và tải ảnh Cloudinary (US-23), gửi bài viết qua API (US-24).
- **Quy chuẩn 4 mốc sinh trưởng chuẩn mực**:
  - `STAGE_1`: Gieo hạt & Nảy mầm (Tiến độ 25%)
  - `STAGE_2`: Phát triển thân lá & Tỉa thưa (Tiến độ 50%)
  - `STAGE_3`: Trưởng thành & Chăm sóc tăng cường (Tiến độ 75%)
  - `STAGE_4`: Chuẩn bị thu hoạch (Tiến độ 100%)
- **Hạ tầng Tải Ảnh (Cloudinary & Client Compression)**:
  - Hàm `compressImage` (Canvas API): Giảm độ phân giải tối đa 1600px, nén JPEG 0.8 xuống ~300KB-800KB để tiết kiệm 4G đồng ruộng.
  - Tích hợp API `POST /api/v1/media/upload` (US-23) kèm hiển thị thanh tiến trình (progress bar 0 - 100%).
  - Hỗ trợ xóa thumbnail tức thì bằng nút `(X)` theo tiêu chí chấp thuận AC3.
- **Biểu mẫu & Xác thực (React Hook Form + Zod)**:
  - Bắt buộc chọn 1 trong 4 mốc mùa vụ và có ít nhất 1 ảnh thực tế (AC2).
  - Tích hợp ghi chú hiện trạng kèm gợi ý tag nhanh.
  - Nhập và đồng bộ chỉ số vi khí hậu (nhiệt độ, độ ẩm đất, độ ẩm không khí) từ cảm biến IoT.
  - Gọi API `POST /api/v1/contracts/:id/farming-logs` (US-24) trả về mã 201 Created và thông báo thành công (AC1).
- **Hệ thống Component & Tuyến đường**:
  - Tuyến đường mới: `/farmer/contracts/:id/new-log` và `/farmer/new-log`.
  - Hộp thoại nhanh: `CreateFarmingLogModal` mở trực tiếp từ trang danh sách ô đất `/farmer/plots`.
  - Kế thừa 100% hệ thống `@/shared/ui`: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `Button`, `Badge`, `Box`, `Text`.

---

## 4. Kiến Trúc Xử Lý Lỗi Toàn Diện (US-11 Error Handling Envelope)

### 4.1. Tầng 1: `packages/shared`
- **`packages/shared/src/index.ts`**:
  - Định nghĩa tập trung danh mục `ERROR_CODES` (`VALIDATION`, `INVALID_JSON`, `BAD_REQUEST`, `DUPLICATE`, `NOT_FOUND`, `AUTH_REQUIRED`, `INVALID_TOKEN`, `TOKEN_EXPIRED`, `INVALID_REFRESH_TOKEN`, `ACCOUNT_DISABLED`, `USER_NOT_FOUND`, `INTERNAL_SERVER`).
  - Cung cấp Zod schemas và types cho Envelope chuẩn: `ApiErrorResponse`, `ApiSuccessResponse`, `ApiErrorDetail`, `ApiResponse`.

### 4.2. Tầng 2: `apps/server`
- **`apps/server/src/errors/AppError.ts`**: Chuẩn hóa lớp lỗi ứng dụng kế thừa `Error` và mã lỗi chuẩn.
- **`apps/server/src/middlewares/errorHandler.ts`**: Global middleware bọc 100% lỗi server trả về định dạng `ApiErrorResponse`.
- **`apps/server/src/middlewares/authGuard.ts`**: Kiểm tra token và quyền truy cập chặt chẽ.
- **`apps/server/src/modules/auth/token.service.ts`**: Tạo cặp Access Token và Refresh Token an toàn.

### 4.3. Tầng 3: `apps/client`
- **`apps/client/src/api/errorHandler.ts`**: Bộ helper client bóc tách lỗi:
  - `parseApiError()`: Xử lý AxiosError, lỗi mất mạng (`ERR_NETWORK`), lỗi timeout (`ERR_TIMEOUT`).
  - `mapValidationErrors()`: Chuyển đổi lỗi validation về React form field errors.
  - `getErrorMessage()`: Trích xuất nội dung thông báo cho Toast/Alert.
- **`apps/client/src/auth/authStorage.ts`**: Cơ chế bọc an toàn tránh sập ứng dụng khi localStorage bị lỗi dữ liệu.
- **`apps/client/src/api/axiosClient.ts`**: Cơ chế Mutex Queue tự động refresh token ngầm khi token hết hạn và chống lặp vô hạn.

---

## 5. Bảng Kiểm Tra Chất Lượng (Quality Gate & Test Suite)

| Hạng mục kiểm tra | Lệnh thực thi | Kết quả | Ghi chú |
| :--- | :--- | :---: | :--- |
| **ESLint Toàn Monorepo** | `pnpm lint` | **100% PASSED** | 0 lỗi, 0 cảnh báo trên cả 6 packages (strict mode) |
| **Shared Tests** | `pnpm --filter @repo/shared test` | **13/13 PASSED** | Mốc sinh trưởng, schema validation đạt 100% |
| **Server Tests** | `pnpm --filter server test` | **14/14 PASSED** | AuthGuard, ErrorHandler, Media & Diary routes |
| **Client Tests** | `pnpm --filter client test` | **27/27 PASSED** | 7/7 test cases mới cho AC1, AC2, AC3 & Compression |
| **Toàn Bộ Monorepo Tests** | `pnpm test` | **54/54 PASSED** | 100% pass toàn bộ test suites |
| **Production Build** | `pnpm build` | **SUCCESS** | TypeScript compilation & Vite bundle hoàn tất |
| **Backend API Live Check** | Node Fetch Script | **VERIFIED** | `201 Created` cho Media upload & Farming logs |

---

## 6. Lịch Sử Git Commits

| Hash Commit | Loại commit | Nội dung chi tiết |
| :--- | :--- | :--- |
| `1d7ef1d` | `feat(farmer)` | Chuyển đổi và thiết kế lại giao diện Staff Field Ops thành trải nghiệm Web Desktop chuẩn mực |
| `651ef79` | `docs(note)` | Cập nhật tài liệu tổng hợp thay đổi về auth và landing page |
| `60c7094` | `feat(client)` | Triển khai giao diện Landing Page CloudFarm hoàn chỉnh theo đúng thiết kế mockup |
| `537c5fc` | `style(auth)` | Bỏ thanh tab switch trên đầu trang login và register, đưa tiêu đề lên trên cùng |
| `e2c7203` | `style(auth)` | Căn chỉnh các ô nhập liệu của form đăng ký thành một cột dọc duy nhất |
| `b72cfc1` | `refactor(auth)` | Bỏ bộ chọn vai trò khi đăng ký, mặc định vai trò là CUSTOMER |
| `99771ea` | `feat(auth)` | Xây dựng interactive RegisterFormPanel và handler trên API Gateway |
| `01f5fb0` | `feat(auth)` | Tích hợp endpoint register, in-memory dev fallback trong auth.controller và tài liệu |
| `527768e` | `merge` | Merge nhánh `develop` vào nhánh `feat/us-11-system-error-auth-error-handling` |
| `4447251` | `feat(error-handling)` | Hợp nhất chuẩn API Error Envelope xuyên suốt shared, server và client |

---
*Tài liệu này được cập nhật tự động và đồng bộ với toàn bộ hiện trạng mã nguồn thực tế của dự án.*
