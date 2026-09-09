import * as React from "react";
import { Search, MapPin, Maximize2, Sprout, RotateCcw } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "../Button";

export interface PlotFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  locations?: string[];
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
  areaOptions?: { label: string; value: string }[];
  selectedArea?: string;
  onAreaChange?: (area: string) => void;
  farmingTypeOptions?: { label: string; value: string }[];
  selectedFarmingType?: string;
  onFarmingTypeChange?: (type: string) => void;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onlyAvailable?: boolean;
  onOnlyAvailableChange?: (val: boolean) => void;
  onReset?: () => void;
}

export const PlotFilterBar = React.forwardRef<HTMLDivElement, PlotFilterBarProps>(
  (
    {
      locations = ["Tất cả khu vực", "Đà Lạt, Lâm Đồng", "Lạc Dương, Lâm Đồng", "Ba Vì, Hà Nội", "Mộc Châu, Sơn La"],
      selectedLocation = "Tất cả khu vực",
      onLocationChange,
      areaOptions = [
        { label: "Tất cả diện tích", value: "all" },
        { label: "Dưới 40 m²", value: "lt40" },
        { label: "40 - 80 m²", value: "40-80" },
        { label: "Trên 80 m²", value: "gt80" }
      ],
      selectedArea = "all",
      onAreaChange,
      farmingTypeOptions = [
        { label: "Tất cả mô hình", value: "all" },
        { label: "Nhà màng hữu cơ", value: "greenhouse" },
        { label: "Thủy canh tuần hoàn", value: "hydroponic" },
        { label: "Vườn sinh thái mở", value: "open_field" }
      ],
      selectedFarmingType = "all",
      onFarmingTypeChange,
      searchValue = "",
      onSearchChange,
      onlyAvailable = false,
      onOnlyAvailableChange,
      onReset,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm",
          className
        )}
        {...props}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search input */}
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Tìm theo tên mảnh đất..."
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Location select */}
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 h-4 w-4 text-primary pointer-events-none" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange?.(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-8 text-xs text-foreground appearance-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Area select */}
          <div className="relative flex items-center">
            <Maximize2 className="absolute left-3 h-4 w-4 text-secondary pointer-events-none" />
            <select
              value={selectedArea}
              onChange={(e) => onAreaChange?.(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-8 text-xs text-foreground appearance-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              {areaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Farming type select */}
          <div className="relative flex items-center">
            <Sprout className="absolute left-3 h-4 w-4 text-emerald-600 pointer-events-none" />
            <select
              value={selectedFarmingType}
              onChange={(e) => onFarmingTypeChange?.(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-8 text-xs text-foreground appearance-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              {farmingTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bottom controls & toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
          <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => onOnlyAvailableChange?.(e.target.checked)}
              className="h-4 w-4 rounded-sm border-input text-primary focus:ring-primary/20 cursor-pointer accent-primary"
            />
            <span>Chỉ hiển thị mảnh đất còn trống</span>
          </label>

          <div className="flex items-center gap-2">
            {onReset && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
                className="text-xs text-muted-foreground"
              >
                Đặt lại
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
PlotFilterBar.displayName = "PlotFilterBar";
