import * as React from "react";
import { Thermometer, Droplets, Sun, Activity, Wind, CloudRain } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export type SensorType = "temperature" | "humidity" | "soilMoisture" | "light" | "ph" | "co2" | "custom";

export interface SensorPillProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: SensorType;
  label?: string;
  value: number | string;
  unit: string;
  status?: "normal" | "warning" | "alert";
  variant?: "default" | "compact" | "overlay";
  icon?: React.ReactNode;
}

const defaultSensorConfig: Record<
  SensorType,
  { defaultLabel: string; icon: React.ReactNode; defaultUnit: string }
> = {
  temperature: {
    defaultLabel: "Nhiệt độ",
    icon: <Thermometer className="h-3.5 w-3.5" />,
    defaultUnit: "°C"
  },
  humidity: {
    defaultLabel: "Độ ẩm KK",
    icon: <Droplets className="h-3.5 w-3.5" />,
    defaultUnit: "%"
  },
  soilMoisture: {
    defaultLabel: "Độ ẩm đất",
    icon: <CloudRain className="h-3.5 w-3.5" />,
    defaultUnit: "%"
  },
  light: {
    defaultLabel: "Ánh sáng",
    icon: <Sun className="h-3.5 w-3.5" />,
    defaultUnit: "lux"
  },
  ph: {
    defaultLabel: "Độ pH",
    icon: <Activity className="h-3.5 w-3.5" />,
    defaultUnit: "pH"
  },
  co2: {
    defaultLabel: "CO2",
    icon: <Wind className="h-3.5 w-3.5" />,
    defaultUnit: "ppm"
  },
  custom: {
    defaultLabel: "Cảm biến",
    icon: <Activity className="h-3.5 w-3.5" />,
    defaultUnit: ""
  }
};

export const SensorPill = React.forwardRef<HTMLDivElement, SensorPillProps>(
  (
    {
      type = "custom",
      label,
      value,
      unit,
      status = "normal",
      variant = "default",
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const config = defaultSensorConfig[type];
    const displayLabel = label ?? config.defaultLabel;
    const displayUnit = unit ?? config.defaultUnit;
    const displayIcon = icon ?? config.icon;

    const statusClasses = {
      normal: {
        default: "bg-emerald-50/80 text-emerald-800 border-emerald-200/60",
        overlay: "bg-black/40 backdrop-blur-md text-white border-white/15"
      },
      warning: {
        default: "bg-amber-50 text-amber-800 border-amber-200",
        overlay: "bg-amber-950/60 backdrop-blur-md text-amber-300 border-amber-500/40"
      },
      alert: {
        default: "bg-red-50 text-red-800 border-red-200",
        overlay: "bg-red-950/60 backdrop-blur-md text-red-300 border-red-500/40"
      }
    }[status];

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tabular-nums transition-colors",
            statusClasses.default,
            className
          )}
          {...props}
        >
          <span className="shrink-0 text-primary">{displayIcon}</span>
          <span>
            {value}
            <span className="text-[10px] opacity-75 ml-0.5">{displayUnit}</span>
          </span>
        </div>
      );
    }

    if (variant === "overlay") {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium shadow-xs",
            statusClasses.overlay,
            className
          )}
          {...props}
        >
          <span className="shrink-0 text-emerald-400">{displayIcon}</span>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] opacity-75 font-normal">{displayLabel}</span>
            <span className="font-semibold tabular-nums">
              {value} {displayUnit}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2.5 rounded-lg border bg-card p-2.5 shadow-xs transition-colors",
          status === "warning" && "border-amber-300 bg-amber-50/50",
          status === "alert" && "border-red-300 bg-red-50/50",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
            status === "normal" && "bg-emerald-50 text-primary",
            status === "warning" && "bg-amber-100 text-amber-700",
            status === "alert" && "bg-red-100 text-red-700"
          )}
        >
          {displayIcon}
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground font-normal leading-none mb-1">
            {displayLabel}
          </span>
          <span className="text-sm font-bold tabular-nums text-foreground leading-none">
            {value} <span className="text-xs font-normal text-muted-foreground">{displayUnit}</span>
          </span>
        </div>
      </div>
    );
  }
);
SensorPill.displayName = "SensorPill";
