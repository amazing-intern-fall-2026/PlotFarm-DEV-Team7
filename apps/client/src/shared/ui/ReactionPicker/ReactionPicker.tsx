import * as React from "react";
import { cn } from "@/shared/lib/utils";

export type ReactionType = "like" | "love" | "harvest" | "great" | "warning" | "sad";

export interface ReactionItem {
  type: ReactionType;
  emoji: string;
  label: string;
}

export const REACTIONS: ReactionItem[] = [
  { type: "like", emoji: "👍", label: "Thích" },
  { type: "love", emoji: "❤️", label: "Yêu thích" },
  { type: "harvest", emoji: "🌾", label: "Trúng mùa" },
  { type: "great", emoji: "🌟", label: "Tuyệt vời" },
  { type: "warning", emoji: "⚠️", label: "Cần chú ý" },
  { type: "sad", emoji: "😢", label: "Buồn" }
];

export interface ReactionPickerProps {
  onSelect: (reaction: ReactionType) => void;
  className?: string;
}

export function ReactionPicker({ onSelect, className }: ReactionPickerProps) {
  const [hoveredReaction, setHoveredReaction] = React.useState<ReactionItem | null>(null);

  return (
    <div
      className={cn(
        "relative flex items-center gap-1 rounded-full border border-border bg-popover/95 px-2 py-1.5 shadow-xl backdrop-blur-md animate-in fade-in-50 zoom-in-90 duration-150",
        className
      )}
    >
      {hoveredReaction && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap shadow pointer-events-none">
          {hoveredReaction.label}
        </div>
      )}

      {REACTIONS.map((item) => (
        <button
          key={item.type}
          type="button"
          onClick={() => onSelect(item.type)}
          onMouseEnter={() => setHoveredReaction(item)}
          onMouseLeave={() => setHoveredReaction(null)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-xl transition-all duration-150 hover:scale-135 hover:-translate-y-1 active:scale-95 cursor-pointer"
          aria-label={item.label}
        >
          <span>{item.emoji}</span>
        </button>
      ))}
    </div>
  );
}
