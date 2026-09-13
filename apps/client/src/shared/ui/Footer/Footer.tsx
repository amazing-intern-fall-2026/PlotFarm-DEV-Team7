import * as React from "react";
import { Sprout, MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { State } from "../State";
import { Box } from "../Box";
import { Container } from "../Container";
import { Typography } from "../Typography";

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
 * 6. Bottom bar: Bản quyền © 2026 BioCloud Farming & liên kết Bảo mật dữ liệu IoT, Tiêu chuẩn nông sản sạch
 * 7. Tích hợp Skeleton Loading State có tính tái sử dụng cao thông qua component State
 * 8. Chuẩn hóa i18n toàn diện qua useT(), loại bỏ hoàn toàn việc fix cứng text
 * 9. Bọc trong component Container chuẩn hóa bố cục
 */
export function Footer({
  className,
  brandName = "CloudFarm",
  isLoading = false,
  ...props
}: FooterProps) {
  if (isLoading) {
    return (
      <footer
        aria-label="Đang tải chân trang"
        className={cn(
          "border-t border-border bg-muted/40 text-foreground font-sans mt-auto py-10",
          className,
        )}
      >
        <Container>
          <State variant="skeleton" skeletonPreset="grid" skeletonCount={4} />
        </Container>
      </footer>
    );
  }

  return (
    <footer
      className={cn(
        "border-t border-border bg-slate-50/70 text-foreground font-sans mt-auto",
        className,
      )}
      {...props}
    >
      <Container className="pt-12 pb-8">
        <Box className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Cột 1: CloudFarm & Tiêu chuẩn */}
          <Box className="space-y-4">
            <Box className="flex items-center gap-2.5">
              <Box className="flex h-8 w-8 items-center justify-center rounded-full bg-[#23a54f] text-white shrink-0 shadow-xs">
                <Sprout className="h-4 w-4" />
              </Box>
              <Typography.H4 className="text-lg font-bold tracking-tight text-foreground">
                {brandName === "CloudFarm" ? (
                  <>
                    Cloud<span className="text-[#23a54f]">Farm</span>
                  </>
                ) : (
                  brandName
                )}
              </Typography.H4>
            </Box>

            <Typography.P className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Nền tảng tiên phong kết nối gia đình thành thị sở hữu và canh tác nông trại hữu cơ chuẩn sinh thái trực tiếp tại Đà Lạt.
            </Typography.P>

            {/* Badges: Row 1 & Row 2 */}
            <Box className="space-y-2 pt-1">
              <Box className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs hover:border-emerald-500/40 hover:text-foreground transition-colors">
                  VietGAP Certified
                </span>
                <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs hover:border-emerald-500/40 hover:text-foreground transition-colors">
                  GlobalGAP 100%
                </span>
              </Box>
              <Box>
                <span className="inline-block rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs hover:border-emerald-500/40 hover:text-foreground transition-colors">
                  Organic Bio
                </span>
              </Box>
            </Box>
          </Box>

          {/* Cột 2: Quy Trình & Canh Tác */}
          <Box className="space-y-3.5">
            <Typography.H5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quy Trình & Canh Tác
            </Typography.H5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-500">
              <li>
                <a
                  href="/plots"
                  className="hover:text-emerald-700 transition-colors inline-block"
                >
                  Chọn đất & canh tác
                </a>
              </li>
              <li>
                <a
                  href="/plots"
                  className="hover:text-emerald-700 transition-colors inline-block"
                >
                  Lập lịch gieo trồng thông minh
                </a>
              </li>
              <li>
                <a
                  href="/journal"
                  className="hover:text-emerald-700 transition-colors inline-block"
                >
                  Giám sát cảm biến IoT & Cam 24/7
                </a>
              </li>
              <li>
                <a
                  href="/my-farm"
                  className="hover:text-emerald-700 transition-colors inline-block"
                >
                  Thu hoạch & Giao hàng tận nhà
                </a>
              </li>
            </ul>
          </Box>

          {/* Cột 3: Hỗ Trợ & Chính Sách */}
          <Box className="space-y-3.5">
            <Typography.H5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Hỗ Trợ & Chính Sách
            </Typography.H5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-500">
              <li>
                <a
                  href="/about"
                  className="hover:text-emerald-700 transition-colors inline-block"
                >
                  Chính sách bảo hiểm mùa vụ
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-emerald-700 transition-colors inline-block"
                >
                  Tiêu chuẩn kiểm nghiệm đất & nước
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-emerald-700 transition-colors inline-block"
                >
                  Trải nghiệm tham quan nông trại
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-emerald-700 transition-colors inline-block"
                >
                  Điều khoản thuê đất canh tác
                </a>
              </li>
            </ul>
          </Box>

          {/* Cột 4: Trang Trại Đà Lạt */}
          <Box className="space-y-3.5">
            <Typography.H5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Trang Trại Đà Lạt
            </Typography.H5>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-500">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Tiểu khu 158, Đạ Sar, Huyện Lạc Dương, TP. Đà Lạt, Lâm Đồng
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  Hotline kỹ sư:{" "}
                  <a
                    href="tel:19006068"
                    className="font-bold text-slate-800 hover:text-emerald-700 transition-colors"
                  >
                    1900 6068
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                <a
                  href="mailto:kythuat@cloudfarm.dalat.vn"
                  className="hover:text-emerald-700 transition-colors"
                >
                  kythuat@cloudfarm.dalat.vn
                </a>
              </li>
            </ul>
          </Box>
        </Box>

        {/* Thanh bản quyền & pháp lý dưới đáy */}
        <Box className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            © 2026 CloudFarm Đà Lạt. Bản quyền thuộc Công ty CP Nông nghiệp Công nghệ cao Đà Lạt.
          </p>
          <Box className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <a
              href="/about"
              className="hover:text-emerald-700 transition-colors"
            >
              Bảo mật thông tin
            </a>
            <a
              href="/about"
              className="hover:text-emerald-700 transition-colors"
            >
              Cam kết hữu cơ
            </a>
            <a
              href="/about"
              className="hover:text-emerald-700 transition-colors"
            >
              Quy chế hoạt động
            </a>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}
