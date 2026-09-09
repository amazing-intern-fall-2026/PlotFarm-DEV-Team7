import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar } from "@/shared/ui";

export interface StoryItem {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  hasUnseen?: boolean;
}

export interface StoryStripProps extends React.HTMLAttributes<HTMLDivElement> {
  stories: StoryItem[];
  currentUser?: {
    name: string;
    avatarUrl?: string;
  };
  onCreateStory?: () => void;
  onSelectStory?: (story: StoryItem) => void;
}

export function StoryStrip({
  stories,
  currentUser = { name: "Bạn" },
  onCreateStory,
  onSelectStory,
  className,
  ...props
}: StoryStripProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3.5 overflow-x-auto p-3 scrollbar-none rounded-xl border border-border bg-card shadow-sm",
        className
      )}
      {...props}
    >
      {/* Create Story item */}
      <button
        type="button"
        onClick={onCreateStory}
        className="group flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
      >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-primary/60 bg-emerald-50 text-primary transition-colors group-hover:bg-emerald-100 group-hover:border-primary">
          <Avatar
            src={currentUser.avatarUrl}
            name={currentUser.name}
            size="md"
            className="opacity-70 group-hover:opacity-90"
          />
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Plus className="h-3.5 w-3.5 stroke-[3]" />
          </div>
        </div>
        <span className="max-w-[64px] truncate text-[11px] font-medium text-foreground">
          Tạo tin
        </span>
      </button>

      {/* Friends Stories */}
      {stories.map((story) => (
        <button
          key={story.id}
          type="button"
          onClick={() => onSelectStory && onSelectStory(story)}
          className="group flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <div
            className={cn(
              "rounded-full p-[2px] transition-transform group-hover:scale-105",
              story.hasUnseen
                ? "bg-gradient-to-tr from-amber-500 via-emerald-500 to-green-600"
                : "bg-muted-foreground/30"
            )}
          >
            <div className="rounded-full bg-card p-[2px]">
              <Avatar
                src={story.user.avatarUrl}
                name={story.user.name}
                size="md"
              />
            </div>
          </div>
          <span className="max-w-[68px] truncate text-[11px] font-medium text-foreground">
            {story.user.name}
          </span>
        </button>
      ))}
    </div>
  );
}
