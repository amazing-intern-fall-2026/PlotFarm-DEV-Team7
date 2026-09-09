import * as React from "react";
import { MapPin, Maximize2, Video, Cpu, ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "../Button";
import { PriceDisplay } from "../PriceDisplay";

export type PlotStatus = "available" | "cultivating" | "reserved";

export interface PlotCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  plotCode: string;
  name: string;
  location: string;
  areaM2: number;
  image: string;
  status: PlotStatus;
  hasCamera?: boolean;
  hasIoT?: boolean;
  pricePerMonth: number;
  originalPrice?: number;
  onRentClick?: (id: string) => void;
  onDetailClick?: (id: string) => void;
}

const statusConfig: Record<PlotStatus, { label: string; className: string }> = {
  available: {
    label: "Còn trống",
    className: "bg-emerald-600 text-white"
  },
  cultivating: {
    label: "Đang canh tác",
    className: "bg-amber-500 text-white"
  },
  reserved: {
    label: "Đã giữ chỗ",
    className: "bg-neutral-600 text-white"
  }
};

export const PlotCard = React.forwardRef<HTMLDivElement, PlotCardProps>(
  (
    {
      id,
      plotCode,
      name,
      location,
      areaM2,
      image,
      status,
      hasCamera = true,
      hasIoT = true,
      pricePerMonth,
      originalPrice,
      onRentClick,
      onDetailClick,
      className,
      ...props
    },
    ref
  ) => {
    const statusMeta = statusConfig[status];

    return (
      <div
        ref={ref}
        className={cn(
          "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg",
          className
        )}
        {...props}
      >
        <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold shadow-xs tracking-wide",
                statusMeta.className
              )}
            >
              {statusMeta.label}
            </span>
            <span className="rounded-full bg-black/40 backdrop-blur-xs px-2.5 py-1 text-xs font-medium text-white shadow-xs font-mono">
              {plotCode}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
            {hasCamera && (
              <span
                className="flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-xs px-2 py-1 text-[11px] font-medium text-white shadow-xs"
                title="Camera trực tiếp 24/7"
              >
                <Video className="h-3 w-3 text-emerald-400" />
                Live 24/7
              </span>
            )}
            {hasIoT && (
              <span
                className="flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-xs px-2 py-1 text-[11px] font-medium text-white shadow-xs"
                title="Cảm biến IoT tự động"
              >
                <Cpu className="h-3 w-3 text-cyan-400" />
                IoT
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{location}</span>
            </div>

            <h3
              onClick={() => onDetailClick?.(id)}
              className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors cursor-pointer"
            >
              {name}
            </h3>

            <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Maximize2 className="h-3.5 w-3.5 text-secondary shrink-0" />
                <span>Diện tích: <strong className="text-foreground">{areaM2} m²</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border/60 pt-3.5 gap-2">
            <PriceDisplay
              amount={pricePerMonth}
              originalAmount={originalPrice}
              period="/tháng"
              size="md"
              highlight
            />

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDetailClick?.(id)}
              >
                Chi tiết
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={status !== "available"}
                onClick={() => onRentClick?.(id)}
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Thuê ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
PlotCard.displayName = "PlotCard";
