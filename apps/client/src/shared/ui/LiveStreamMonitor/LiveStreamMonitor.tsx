import * as React from "react";
import { Maximize, Camera, Radio, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { SensorPill, type SensorType } from "../SensorPill";

export interface LiveSensorItem {
  type: SensorType;
  value: number | string;
  unit: string;
  label?: string;
}

export interface LiveStreamMonitorProps extends React.HTMLAttributes<HTMLDivElement> {
  plotName: string;
  posterImage: string;
  cameraLabel?: string;
  isLive?: boolean;
  sensors?: LiveSensorItem[];
  onSnapshot?: () => void;
  onToggleFullscreen?: () => void;
}

export const LiveStreamMonitor = React.forwardRef<HTMLDivElement, LiveStreamMonitorProps>(
  (
    {
      plotName,
      posterImage,
      cameraLabel = "CAM-01 • Nhà màng A",
      isLive = true,
      sensors = [
        { type: "temperature", value: 26.4, unit: "°C" },
        { type: "humidity", value: 72, unit: "%" },
        { type: "soilMoisture", value: 68, unit: "%" },
        { type: "light", value: 4500, unit: "lux" }
      ],
      onSnapshot,
      onToggleFullscreen,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border/80 bg-neutral-950 shadow-xl",
          className
        )}
        {...props}
      >
        <div className="relative aspect-16/9 w-full overflow-hidden">
          <img
            src={posterImage}
            alt={plotName}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />

          {/* Top Bar */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-red-600/90 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-white shadow-xs animate-pulse">
                <Radio className="h-3 w-3" />
                <span>{isLive ? "TRỰC TIẾP" : "OFFLINE"}</span>
              </div>
              <span className="rounded-full bg-black/40 backdrop-blur-xs px-2.5 py-1 text-xs font-medium text-white/90">
                {cameraLabel}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {isLive ? (
                <div className="flex items-center gap-1 rounded-full bg-emerald-500/20 backdrop-blur-xs px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                  <Wifi className="h-3 w-3" />
                  <span>1080p HD</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 rounded-full bg-red-500/20 backdrop-blur-xs px-2 py-0.5 text-[11px] font-medium text-red-300">
                  <WifiOff className="h-3 w-3" />
                  <span>Mất kết nối</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar / Sensor overlays */}
          <div className="absolute bottom-3 inset-x-3 flex flex-col gap-2 z-10">
            <div className="flex items-center justify-between text-white text-xs">
              <span className="font-semibold text-sm drop-shadow-xs">{plotName}</span>
              <div className="flex items-center gap-2">
                {onSnapshot && (
                  <button
                    type="button"
                    onClick={onSnapshot}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-xs text-white hover:bg-white/30 transition-colors cursor-pointer"
                    title="Chụp ảnh nhanh"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
                {onToggleFullscreen && (
                  <button
                    type="button"
                    onClick={onToggleFullscreen}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-xs text-white hover:bg-white/30 transition-colors cursor-pointer"
                    title="Toàn màn hình"
                  >
                    <Maximize className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {sensors.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
                {sensors.map((sensor, i) => (
                  <SensorPill
                    key={i}
                    type={sensor.type}
                    value={sensor.value}
                    unit={sensor.unit}
                    label={sensor.label}
                    variant="overlay"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
LiveStreamMonitor.displayName = "LiveStreamMonitor";
