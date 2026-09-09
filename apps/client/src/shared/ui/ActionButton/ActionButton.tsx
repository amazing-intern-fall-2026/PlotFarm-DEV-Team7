import * as React from "react";
import { Heart, Bookmark, Repeat2, Share2, UserPlus, UserCheck } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export type ActionButtonType = "like" | "bookmark" | "repost" | "share" | "follow";

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  actionType: ActionButtonType;
  isActive?: boolean;
  count?: number;
  showCount?: boolean;
  onToggle?: (active: boolean) => void;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      actionType,
      isActive: externalActive,
      count: initialCount,
      showCount = true,
      onToggle,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = React.useState(externalActive ?? false);
    const [count, setCount] = React.useState(initialCount ?? 0);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
      if (externalActive !== undefined) {
        setIsActive(externalActive);
      }
    }, [externalActive]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const nextActive = !isActive;
      setIsActive(nextActive);
      if (initialCount !== undefined) {
        setCount((prev) => (nextActive ? prev + 1 : Math.max(0, prev - 1)));
      }
      if (onToggle) onToggle(nextActive);
      if (props.onClick) props.onClick(e);
    };

    if (actionType === "follow") {
      return (
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-50",
            isActive
              ? isHovered
                ? "border border-destructive/40 bg-destructive/10 text-destructive"
                : "border border-border bg-background text-muted-foreground hover:border-destructive/30"
              : "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
            className
          )}
          {...props}
        >
          {isActive ? (
            <>
              <UserCheck className="h-3.5 w-3.5" />
              <span>{isHovered ? "Bỏ theo dõi" : "Đang theo dõi"}</span>
            </>
          ) : (
            <>
              <UserPlus className="h-3.5 w-3.5" />
              <span>Theo dõi</span>
            </>
          )}
        </button>
      );
    }

    const icons = {
      like: (
        <Heart
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isActive ? "fill-red-500 text-red-500 scale-110" : "text-muted-foreground"
          )}
        />
      ),
      bookmark: (
        <Bookmark
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isActive
              ? "fill-secondary text-secondary scale-110"
              : "text-muted-foreground"
          )}
        />
      ),
      repost: (
        <Repeat2
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isActive ? "text-primary scale-110" : "text-muted-foreground"
          )}
        />
      ),
      share: <Share2 className="h-4 w-4 text-muted-foreground" />
    };

    const hoverColors = {
      like: "hover:bg-red-50 hover:text-red-600",
      bookmark: "hover:bg-amber-50 hover:text-secondary",
      repost: "hover:bg-emerald-50 hover:text-primary",
      share: "hover:bg-muted hover:text-foreground",
      follow: ""
    }[actionType];

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-50",
          hoverColors,
          className
        )}
        {...props}
      >
        <span className="inline-flex items-center justify-center transition-transform group-active:scale-90">
          {icons[actionType]}
        </span>
        {showCount && count > 0 && (
          <span
            className={cn(
              "text-xs tabular-nums",
              isActive && actionType === "like" && "text-red-500 font-semibold",
              isActive && actionType === "bookmark" && "text-secondary font-semibold",
              isActive && actionType === "repost" && "text-primary font-semibold",
              !isActive && "text-muted-foreground"
            )}
          >
            {count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}
          </span>
        )}
      </button>
    );
  }
);
ActionButton.displayName = "ActionButton";

export { ActionButton };
