import * as React from "react";
import {
  Loader2,
  AlertCircle,
  Inbox,
  SearchX,
  BellOff,
  Sprout,
  RefreshCw
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "../Button";
import { Skeleton } from "../Skeleton";

export type AsyncStateType = "idle" | "loading" | "fetching" | "empty" | "error" | "success";
export type StateViewVariant = "full-page" | "card" | "inline" | "skeleton";
export type EmptyPreset = "general" | "search" | "notification" | "feed" | "plots" | "contracts";

export interface StateViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trạng thái hiện tại của UI */
  state?: AsyncStateType;
  /** Cờ loading trực tiếp (nếu dùng chung với boolean) */
  isLoading?: boolean;
  /** Cờ fetching ngầm (nền) khi đã có dữ liệu trước đó */
  isFetching?: boolean;
  /** Cờ dữ liệu rỗng */
  isEmpty?: boolean;
  /** Đối tượng lỗi hoặc thông điệp lỗi */
  error?: Error | string | null;
  /** Callback thử lại khi có lỗi */
  onRetry?: () => void;
  /** Nhãn nút bấm thử lại */
  retryLabel?: string;
  /** Tiêu đề hiển thị */
  title?: string;
  /** Mô tả chi tiết */
  description?: string;
  /** Icon tùy biến */
  icon?: React.ReactNode;
  /** Nút hành động CTA tùy biến */
  action?: React.ReactNode;
  /** Kiểu hiển thị (toàn trang, trong card, inline, hoặc skeleton) */
  variant?: StateViewVariant;
  /** Số dòng skeleton hiển thị khi ở chế độ skeleton */
  skeletonLines?: number;
  /** Preset mẫu cho trạng thái rỗng */
  emptyPreset?: EmptyPreset;
  /** Nội dung component chính khi thành công */
  children?: React.ReactNode;
}

const emptyPresets: Record<EmptyPreset, { icon: React.ReactNode; title: string; description: string }> = {
  general: {
    icon: <Inbox className="h-10 w-10 text-muted-foreground" />,
    title: "Chưa có dữ liệu",
    description: "Hiện chưa có thông tin nào để hiển thị trong mục này."
  },
  search: {
    icon: <SearchX className="h-10 w-10 text-muted-foreground" />,
    title: "Không tìm thấy kết quả",
    description: "Thử tìm kiếm với từ khóa khác như tên nông sản, khu vực hoặc tên nông dân."
  },
  notification: {
    icon: <BellOff className="h-10 w-10 text-muted-foreground" />,
    title: "Không có thông báo mới",
    description: "Bạn sẽ nhận được thông báo khi có cập nhật về nông vụ hoặc hợp đồng."
  },
  feed: {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: "Chưa có nhật ký canh tác",
    description: "Kỹ thuật viên sẽ cập nhật nhật ký ngay khi quá trình chăm sóc bắt đầu."
  },
  plots: {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: "Chưa có lô đất nào",
    description: "Khám phá danh sách trang trại và bắt đầu thuê lô đất đầu tiên của bạn!"
  },
  contracts: {
    icon: <Inbox className="h-10 w-10 text-muted-foreground" />,
    title: "Chưa có hợp đồng nào",
    description: "Hợp đồng thuê đất và chăm sóc cây trồng của bạn sẽ được lưu trữ tại đây."
  }
};

export const StateView: React.FC<StateViewProps> = ({
  state,
  isLoading = false,
  isFetching = false,
  isEmpty = false,
  error = null,
  onRetry,
  retryLabel = "Thử lại",
  title,
  description,
  icon,
  action,
  variant = "card",
  skeletonLines = 3,
  emptyPreset = "general",
  className,
  children,
  ...props
}) => {
  // 1. Phân giải trạng thái hoạt động thực tế
  let resolvedState: AsyncStateType = "success";

  if (isLoading || state === "loading") {
    resolvedState = "loading";
  } else if (error || state === "error") {
    resolvedState = "error";
  } else if (isEmpty || state === "empty") {
    resolvedState = "empty";
  } else if (isFetching || state === "fetching") {
    resolvedState = "fetching";
  } else if (state) {
    resolvedState = state;
  }

  // 2. Xử lý trạng thái LOADING (1 phần hoặc Full Page)
  if (resolvedState === "loading") {
    if (variant === "skeleton") {
      return (
        <div className={cn("space-y-3 p-4", className)} {...props}>
          <Skeleton className="h-6 w-1/3 rounded-lg" />
          {Array.from({ length: skeletonLines }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      );
    }

    const isFullPage = variant === "full-page";

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center transition-all animate-in fade-in duration-300",
          isFullPage ? "min-h-[calc(100vh-12rem)] w-full" : "rounded-xl border border-dashed border-border py-12",
          className
        )}
        {...props}
      >
        <div className="relative flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="h-7 w-7 text-primary animate-spin" />
          </div>
        </div>
        <h4 className="mt-4 text-base font-semibold text-foreground">
          {title || "Đang tải dữ liệu..."}
        </h4>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">
          {description || "Hệ thống đang đồng bộ và cập nhật thông tin mới nhất."}
        </p>
      </div>
    );
  }

  // 3. Xử lý trạng thái ERROR
  if (resolvedState === "error") {
    const errorMessage =
      typeof error === "string" ? error : error?.message || description || "Đã xảy ra lỗi khi tải dữ liệu.";

    const isFullPage = variant === "full-page";

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center transition-all animate-in fade-in duration-300",
          isFullPage ? "min-h-[calc(100vh-12rem)] w-full" : "rounded-xl border border-dashed border-red-200 bg-red-50/40 dark:border-red-900/50 dark:bg-red-950/20 py-10",
          className
        )}
        {...props}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40 text-destructive mb-3">
          {icon || <AlertCircle className="h-7 w-7 text-red-600 dark:text-red-400" />}
        </div>
        <h4 className="text-base font-semibold text-foreground">
          {title || "Không thể tải dữ liệu"}
        </h4>
        <p className="mt-1 max-w-md text-sm text-muted-foreground leading-relaxed">
          {errorMessage}
        </p>

        {(onRetry || action) && (
          <div className="mt-5 flex items-center gap-3">
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                leftIcon={<RefreshCw className="h-4 w-4" />}
              >
                {retryLabel}
              </Button>
            )}
            {action}
          </div>
        )}
      </div>
    );
  }

  // 4. Xử lý trạng thái EMPTY
  if (resolvedState === "empty") {
    const preset = emptyPresets[emptyPreset] || emptyPresets.general;
    const resolvedIcon = icon || preset.icon;
    const resolvedTitle = title || preset.title;
    const resolvedDesc = description || preset.description;
    const isFullPage = variant === "full-page";

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center transition-all animate-in fade-in duration-300",
          isFullPage ? "min-h-[calc(100vh-12rem)] w-full" : "rounded-xl border border-dashed border-border py-12",
          className
        )}
        {...props}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/70 mb-4">
          {resolvedIcon}
        </div>
        <h3 className="text-base font-semibold text-foreground">{resolvedTitle}</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground leading-relaxed">
          {resolvedDesc}
        </p>

        {action && <div className="mt-5">{action}</div>}
      </div>
    );
  }

  // 5. Xử lý trạng thái FETCHING (Background Refresh mà KHÔNG giật UI)
  if (resolvedState === "fetching") {
    return (
      <div className={cn("relative", className)} {...props}>
        {/* Subtle background fetching badge */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xs border border-primary/20 px-2.5 py-1 text-xs font-medium text-primary shadow-xs animate-in fade-in">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Đang làm mới...</span>
        </div>
        <div className="opacity-80 transition-opacity duration-200">{children}</div>
      </div>
    );
  }

  // 6. Trạng thái SUCCESS / IDLE: Hiển thị nội dung chính
  return <>{children}</>;
};

StateView.displayName = "StateView";
