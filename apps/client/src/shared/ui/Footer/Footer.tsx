import * as React from "react";
import { Sprout, MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { State } from "../State";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string;
  /** Trạng thái skeleton loading khi đang tải cấu hình hoặc dữ liệu trang trại */
  isLoading?: boolean;
}

/**
 * Footer component — Chuẩn giao diện BioCloud Farming
 * Tuân thủ nghiêm ngặt Design Tokens và Theme của Global CSS (font Plus Jakarta Sans, màu Bio Green & Harvest Amber):
 * 1. BioCloud Farming (Logo tròn mầm cây Bio Green, mô tả kết nối cư dân đô thị đồng canh tác)
 * 2. 3 huy hiệu tiêu chuẩn: VietGAP Certified, GlobalGAP 100%, Organic Bio
 * 3. Cột "Phân Hệ Canh Tác"
 * 4. Cột "Tài Khoản & Pháp Lý"
 * 5. Cột "Trang Trại Đà Lạt" (Địa chỉ, Hotline kỹ sư nông học, Email kỹ thuật)
 * 6. Bottom bar: Bản quyền © 2025 BioCloud Farming & liên kết Bảo mật dữ liệu IoT, Tiêu chuẩn nông sản sạch
 * 7. Tích hợp Skeleton Loading State có tính tái sử dụng cao thông qua component State
 */
export function Footer({
  className,
  brandName = "BioCloud Farming",
  isLoading = false,
  ...props
}: FooterProps) {
  if (isLoading) {
    return (
      <footer
        aria-label="Đang tải chân trang"
        className={cn(
          "border-t border-border bg-muted/40 text-foreground font-sans mt-auto py-10 px-4 sm:px-6",
          className,
        )}
      >
        <div className="mx-auto max-w-7xl">
          <State variant="skeleton" skeletonPreset="grid" skeletonCount={4} />
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={cn(
        "border-t border-border bg-muted/40 text-foreground font-sans mt-auto",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Cột 1: BioCloud Farming & Tiêu chuẩn */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0 shadow-xs">
                <Sprout className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                {brandName}
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Nền tảng nông nghiệp số thông minh kết nối cư dân đô thị sở hữu và đồng canh tác vườn rau củ hữu cơ công nghệ cao tại Đà Lạt.
            </p>

            {/* Badges: Row 1 & Row 2 */}
            <div className="space-y-1.5 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-background border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-2xs hover:border-primary/40 hover:text-foreground transition-colors">
                  VietGAP Certified
                </span>
                <span className="rounded-full bg-background border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-2xs hover:border-primary/40 hover:text-foreground transition-colors">
                  GlobalGAP 100%
                </span>
              </div>
              <div>
                <span className="inline-block rounded-full bg-background border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-2xs hover:border-primary/40 hover:text-foreground transition-colors">
                  Organic Bio
                </span>
              </div>
            </div>
          </div>

          {/* Cột 2: Phân Hệ Canh Tác */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Phân Hệ Canh Tác
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a
                  href="/plots"
                  className="hover:text-primary transition-colors"
                >
                  Khám phá & Chọn ô đất
                </a>
              </li>
              <li>
                <a
                  href="/my-farm"
                  className="hover:text-primary transition-colors"
                >
                  Quản lý vườn của tôi
                </a>
              </li>
              <li>
                <a
                  href="/journal"
                  className="hover:text-primary transition-colors"
                >
                  Nhật ký nông vụ thông minh
                </a>
              </li>
              <li>
                <a
                  href="/journal"
                  className="hover:text-primary transition-colors"
                >
                  Thư viện ảnh & Time-lapse
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Tài Khoản & Pháp Lý */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Tài Khoản & Pháp Lý
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a
                  href="/my-farm"
                  className="hover:text-primary transition-colors"
                >
                  Hồ sơ & Cài đặt tài khoản
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Hợp đồng thuê đất số
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Cam kết tiêu chuẩn hữu cơ
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Chính sách bảo hiểm rủi ro mùa vụ
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Trang Trại Đà Lạt */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Trang Trại Đà Lạt
            </h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed text-muted-foreground">
                  Tiểu khu 158, Đạ Sar, Huyện Lạc Dương, TP. Đà Lạt, Lâm Đồng
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <span>
                  Hotline kỹ sư nông học:{" "}
                  <a
                    href="tel:19006868"
                    className="font-bold text-foreground hover:text-secondary transition-colors"
                  >
                    1900 6868
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:kythuat@biocloud.dalat.vn"
                  className="hover:text-primary transition-colors"
                >
                  kythuat@biocloud.dalat.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Thanh bản quyền & pháp lý dưới đáy */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="text-center sm:text-left">
            © 2025 BioCloud Farming Đà Lạt. Bản quyền thuộc Công ty CP Nông nghiệp Công nghệ cao Đà Lạt.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <a
              href="/about"
              className="hover:text-primary transition-colors"
            >
              Bảo mật dữ liệu IoT
            </a>
            <a
              href="/about"
              className="hover:text-primary transition-colors"
            >
              Tiêu chuẩn nông sản sạch
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
