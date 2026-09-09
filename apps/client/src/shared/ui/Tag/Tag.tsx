import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface VerifiedBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "farmer" | "expert" | "standard";
  size?: "sm" | "md";
}

export function VerifiedBadge({
  variant = "farmer",
  size = "md",
  className,
  ...props
}: VerifiedBadgeProps) {
  const titles = {
    farmer: "Nông dân đã xác thực",
    expert: "Chuyên gia nông nghiệp",
    standard: "Tài khoản đã xác minh"
  };

  const colors = {
    farmer: "bg-emerald-600 text-white",
    expert: "bg-amber-600 text-white",
    standard: "bg-sky-600 text-white"
  };

  const dimensions = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4"
  };

  return (
    <span
      role="img"
      title={titles[variant]}
      aria-label={titles[variant]}
      className={cn(
        "inline-flex items-center justify-center rounded-full shrink-0",
        colors[variant],
        dimensions[size],
        className
      )}
      {...props}
    >
      <Check className={size === "sm" ? "h-2.5 w-2.5 stroke-[3]" : "h-3 w-3 stroke-[3]"} />
    </span>
  );
}

export interface NotificationBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number;
  max?: number;
  dot?: boolean;
}

export function NotificationBadge({
  count = 0,
  max = 99,
  dot = false,
  className,
  ...props
}: NotificationBadgeProps) {
  if (count <= 0 && !dot) return null;

  if (dot) {
    return (
      <span
        className={cn(
          "h-2 w-2 rounded-full bg-red-500 ring-2 ring-background",
          className
        )}
        {...props}
      />
    );
  }

  const displayCount = count > max ? `${max}+` : count;

  return (
    <span
      className={cn(
        "inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-background tabular-nums",
        className
      )}
      {...props}
    >
      {displayCount}
    </span>
  );
}

export interface CategoryTagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  count?: number;
  isActive?: boolean;
}

export function CategoryTag({
  label,
  count,
  isActive = false,
  className,
  ...props
}: CategoryTagProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-muted text-muted-foreground hover:bg-emerald-50 hover:text-primary",
        className
      )}
      {...props}
    >
      <span>{label.startsWith("#") ? label : `#${label}`}</span>
      {count !== undefined && (
        <span
          className={cn(
            "text-[10px] tabular-nums font-semibold",
            isActive ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
