import * as React from "react";
import { Sprout, MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/Skeleton";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string;
  /** Trạng thái skeleton loading khi đang tải cấu hình hoặc dữ liệu trang trại */
  isLoading?: boolean;
}

/**
 * FooterSkeleton — Trạng thái Skeleton Loading cho Footer
 * Áp dụng hiệu ứng pulse trên toàn bộ 4 cột và thanh bản quyền.
 */
export function FooterSkeleton({ className }: { className?: string }) {
  return (
    <footer
      aria-label="Đang tải chân trang"
      className={cn(
        "border-t border-slate-200/80 bg-[#f0f5fb] dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-200 mt-auto",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Cột 1: Brand & Badges Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-8 w-8 rounded-full bg-slate-300/80 dark:bg-slate-800" />
              <Skeleton className="h-6 w-36 bg-slate-300/80 dark:bg-slate-800" />
            </div>

            <div className="space-y-2 max-w-xs">
              <Skeleton className="h-3.5 w-full bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-3.5 w-4/5 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-3.5 w-2/3 bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
              <Skeleton className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Cột 2: Phân Hệ Canh Tác Skeleton */}
          <div className="space-y-3.5">
            <Skeleton className="h-5 w-36 bg-slate-300/80 dark:bg-slate-800" />
            <div className="space-y-3">
              <Skeleton className="h-3.5 w-36 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-3.5 w-32 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-3.5 w-40 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-3.5 w-36 bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Cột 3: Tài Khoản & Pháp Lý Skeleton */}
          <div className="space-y-3.5">
            <Skeleton className="h-5 w-40 bg-slate-300/80 dark:bg-slate-800" />
            <div className="space-y-3">
              <Skeleton className="h-3.5 w-40 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-3.5 w-32 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-3.5 w-36 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-3.5 w-44 bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Cột 4: Trang Trại Đà Lạt Skeleton */}
          <div className="space-y-3.5">
            <Skeleton className="h-5 w-36 bg-slate-300/80 dark:bg-slate-800" />
            <div className="space-y-3.5">
              <div className="flex items-start gap-2.5">
                <Skeleton className="h-4 w-4 rounded-full bg-slate-300/80 dark:bg-slate-800 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5 w-full bg-slate-200 dark:bg-slate-800" />
                  <Skeleton className="h-3.5 w-4/5 bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-4 w-4 rounded-full bg-slate-300/80 dark:bg-slate-800 shrink-0" />
                <Skeleton className="h-3.5 w-48 bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-4 w-4 rounded-full bg-slate-300/80 dark:bg-slate-800 shrink-0" />
                <Skeleton className="h-3.5 w-40 bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Thanh bản quyền Skeleton */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton className="h-3.5 w-80 bg-slate-200 dark:bg-slate-800" />
          <div className="flex gap-6">
            <Skeleton className="h-3.5 w-28 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-3.5 w-32 bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Footer component — Chuẩn giao diện BioCloud Farming
 * Tái hiện chính xác theo mẫu thiết kế thực tế:
 * 1. BioCloud Farming (Logo tròn xanh lá đậm, mô tả kết nối cư dân đô thị đồng canh tác)
 * 2. 3 huy hiệu tiêu chuẩn: VietGAP Certified, GlobalGAP 100%, Organic Bio
 * 3. Cột "Phân Hệ Canh Tác"
 * 4. Cột "Tài Khoản & Pháp Lý"
 * 5. Cột "Trang Trại Đà Lạt" (Địa chỉ, Hotline kỹ sư nông học, Email kỹ thuật)
 * 6. Bottom bar: Bản quyền © 2025 BioCloud Farming & liên kết Bảo mật dữ liệu IoT, Tiêu chuẩn nông sản sạch
 * 7. Tích hợp Skeleton Loading State khi isLoading = true
 */
export function Footer({
  className,
  brandName = "BioCloud Farming",
  isLoading = false,
  ...props
}: FooterProps) {
  if (isLoading) {
    return <FooterSkeleton className={className} />;
  }

  return (
    <footer
      className={cn(
        "border-t border-slate-200/80 bg-[#f0f5fb] dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-200 mt-auto",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Cột 1: BioCloud Farming & Tiêu chuẩn */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1b4d2e] text-white shrink-0 shadow-xs">
                <Sprout className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1b4d2e] dark:text-emerald-400">
                {brandName}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
              Nền tảng nông nghiệp số thông minh kết nối cư dân đô thị sở hữu và đồng canh tác vườn rau củ hữu cơ công nghệ cao tại Đà Lạt.
            </p>

            {/* Badges: Row 1 & Row 2 */}
            <div className="space-y-1.5 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 px-3 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
                  VietGAP Certified
                </span>
                <span className="rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 px-3 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
                  GlobalGAP 100%
                </span>
              </div>
              <div>
                <span className="inline-block rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 px-3 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
                  Organic Bio
                </span>
              </div>
            </div>
          </div>

          {/* Cột 2: Phân Hệ Canh Tác */}
          <div className="space-y-3.5">
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Phân Hệ Canh Tác
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/plots"
                  className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
                >
                  Khám phá & Chọn ô đất
                </a>
              </li>
              <li>
                <a
                  href="/my-farm"
                  className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
                >
                  Quản lý vườn của tôi
                </a>
              </li>
              <li>
                <a
                  href="/journal"
                  className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
                >
                  Nhật ký nông vụ thông minh
                </a>
              </li>
              <li>
                <a
                  href="/journal"
                  className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
                >
                  Thư viện ảnh & Time-lapse
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Tài Khoản & Pháp Lý */}
          <div className="space-y-3.5">
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Tài Khoản & Pháp Lý
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/my-farm"
                  className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
                >
                  Hồ sơ & Cài đặt tài khoản
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
                >
                  Hợp đồng thuê đất số
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
                >
                  Cam kết tiêu chuẩn hữu cơ
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
                >
                  Chính sách bảo hiểm rủi ro mùa vụ
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Trang Trại Đà Lạt */}
          <div className="space-y-3.5">
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Trang Trại Đà Lạt
            </h4>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#1b4d2e] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Tiểu khu 158, Đạ Sar, Huyện Lạc Dương, TP. Đà Lạt, Lâm Đồng
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-700 dark:text-amber-500 shrink-0" />
                <span>
                  Hotline kỹ sư nông học:{" "}
                  <a
                    href="tel:19006868"
                    className="font-bold text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                  >
                    1900 6868
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#1b4d2e] dark:text-emerald-400 shrink-0" />
                <a
                  href="mailto:kythuat@biocloud.dalat.vn"
                  className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
                >
                  kythuat@biocloud.dalat.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Thanh bản quyền & pháp lý dưới đáy */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-center sm:text-left">
            © 2025 BioCloud Farming Đà Lạt. Bản quyền thuộc Công ty CP Nông nghiệp Công nghệ cao Đà Lạt.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <a
              href="/about"
              className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
            >
              Bảo mật dữ liệu IoT
            </a>
            <a
              href="/about"
              className="hover:text-[#1b4d2e] dark:hover:text-emerald-400 transition-colors"
            >
              Tiêu chuẩn nông sản sạch
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.Skeleton = FooterSkeleton;
