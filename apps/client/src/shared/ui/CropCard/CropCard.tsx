import * as React from "react";
import { Check, Clock, Scale } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatVND } from "../PriceDisplay";

export interface CropCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  cropId: string;
  name: string;
  category?: string;
  image: string;
  growTimeWeeks: number;
  yieldKg: string | number;
  price?: number;
  tags?: string[];
  isSelected?: boolean;
  onSelect?: (cropId: string) => void;
}

export const CropCard = React.forwardRef<HTMLDivElement, CropCardProps>(
  (
    {
      cropId,
      name,
      category = "Rau ăn lá",
      image,
      growTimeWeeks,
      yieldKg,
      price,
      tags = ["100% Hữu cơ"],
      isSelected = false,
      onSelect,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={() => onSelect?.(cropId)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.(cropId);
          }
        }}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all cursor-pointer select-none",
          isSelected
            ? "border-primary ring-2 ring-primary/20 shadow-md"
            : "border-border hover:border-primary/50 hover:shadow-sm",
          className
        )}
        {...props}
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold text-emerald-800 shadow-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className={cn(
              "absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full transition-all",
              isSelected
                ? "bg-primary text-primary-foreground shadow-sm scale-100"
                : "border border-white/60 bg-black/20 text-transparent opacity-60 group-hover:opacity-100"
            )}
          >
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <span className="text-[11px] font-medium text-muted-foreground">{category}</span>
          <h4 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h4>

          <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-border/60 pt-2.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>{growTimeWeeks} tuần vụ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5 text-secondary shrink-0" />
              <span>{yieldKg} kg</span>
            </div>
          </div>

          {price !== undefined && (
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
              <span className="text-xs text-muted-foreground">Giá giống vụ</span>
              <span className="font-bold text-primary text-sm tabular-nums">
                {formatVND(price)} đ
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
CropCard.displayName = "CropCard";
