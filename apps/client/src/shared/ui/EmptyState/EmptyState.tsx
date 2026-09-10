import * as React from "react";
import { Sprout, Inbox, BellOff, SearchX, Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "../Button";

export type EmptyStatePreset = "feed" | "notification" | "search" | "general";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  preset?: EmptyStatePreset;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
}

export function EmptyState({
  preset = "general",
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
  className,
  children,
  ...props
}: EmptyStateProps) {
  const defaults = {
    feed: {
      icon: <Sprout className="h-10 w-10 text-primary" />,
      title: "Chưa có bài viết nào",
      description: "Hãy là người đầu tiên chia sẻ kinh nghiệm canh tác hoặc nhật ký mùa màng với cộng đồng!",
      actionLabel: "Tạo bài viết mới",
      actionIcon: <Plus className="h-4 w-4" />
    },
    notification: {
      icon: <BellOff className="h-10 w-10 text-muted-foreground" />,
      title: "Không có thông báo mới",
      description: "Khi có người thích, bình luận bài viết hoặc đặt thuê đất, bạn sẽ nhận được thông báo tại đây.",
      actionLabel: undefined,
      actionIcon: undefined
    },
    search: {
      icon: <SearchX className="h-10 w-10 text-muted-foreground" />,
      title: "Không tìm thấy kết quả",
      description: "Thử tìm kiếm với từ khóa khác như tên nông sản, khu vực hoặc tên nông dân.",
      actionLabel: "Xóa tìm kiếm",
      actionIcon: undefined
    },
    general: {
      icon: <Inbox className="h-10 w-10 text-muted-foreground" />,
      title: "Không có dữ liệu",
      description: "Hiện chưa có thông tin nào để hiển thị trong mục này.",
      actionLabel: undefined,
      actionIcon: undefined
    }
  }[preset];

  const resolvedIcon = icon || defaults.icon;
  const resolvedTitle = title || defaults.title;
  const resolvedDesc = description || defaults.description;
  const resolvedActionLabel = actionLabel !== undefined ? actionLabel : defaults.actionLabel;
  const resolvedActionIcon = actionIcon || defaults.actionIcon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/60 mb-4">
        {resolvedIcon}
      </div>
      <h3 className="text-base font-semibold text-foreground">{resolvedTitle}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground leading-relaxed">
        {resolvedDesc}
      </p>

      {resolvedActionLabel && onAction && (
        <div className="mt-5">
          <Button onClick={onAction} leftIcon={resolvedActionIcon}>
            {resolvedActionLabel}
          </Button>
        </div>
      )}

      {children}
    </div>
  );
}
