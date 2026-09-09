import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
  originalAmount?: number;
  currency?: string;
  period?: string;
  size?: "sm" | "md" | "lg" | "xl";
  highlight?: boolean;
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount);
}

export const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    {
      amount,
      originalAmount,
      currency = "đ",
      period = "/tháng",
      size = "md",
      highlight = false,
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "text-sm",
      md: "text-lg",
      lg: "text-2xl font-bold",
      xl: "text-3xl font-extrabold"
    }[size];

    const periodSizeClasses = {
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
      xl: "text-base"
    }[size];

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-baseline gap-1.5 flex-wrap", className)}
        {...props}
      >
        <div className="flex items-baseline gap-0.5">
          <span
            className={cn(
              "font-bold tabular-nums tracking-tight",
              sizeClasses,
              highlight ? "text-primary" : "text-foreground"
            )}
          >
            {formatVND(amount)}
          </span>
          <span
            className={cn(
              "font-semibold",
              periodSizeClasses,
              highlight ? "text-primary" : "text-foreground"
            )}
          >
            {currency}
          </span>
          {period && (
            <span className={cn("text-muted-foreground font-normal ml-0.5", periodSizeClasses)}>
              {period}
            </span>
          )}
        </div>

        {originalAmount && originalAmount > amount && (
          <span className="text-xs text-muted-foreground line-through tabular-nums">
            {formatVND(originalAmount)} {currency}
          </span>
        )}
      </div>
    );
  }
);
PriceDisplay.displayName = "PriceDisplay";
