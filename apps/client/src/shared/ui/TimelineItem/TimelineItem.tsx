import * as React from "react";
import { CheckCircle2, UserCheck } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string;
  stage: string;
  title: string;
  description: string;
  engineer?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  images?: string[];
  isLast?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      date,
      stage,
      title,
      description,
      engineer,
      images = [],
      isLast = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("relative flex gap-4 text-xs", className)} {...props}>
        <div className="flex flex-col items-center">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-primary ring-4 ring-background">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          {!isLast && <div className="w-0.5 grow bg-border my-1" />}
        </div>

        <div className="pb-6 grow space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-800 text-[11px]">
                {stage}
              </span>
              <span className="text-muted-foreground tabular-nums text-[11px]">{date}</span>
            </div>
            {engineer && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                <UserCheck className="h-3 w-3 text-primary" />
                <span>{engineer.name} ({engineer.role || "Kỹ sư nông nghiệp"})</span>
              </div>
            )}
          </div>

          <h4 className="text-sm font-bold text-foreground">{title}</h4>
          <p className="text-muted-foreground leading-relaxed text-xs">{description}</p>

          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${title} - ${i + 1}`}
                  className="h-20 w-28 rounded-lg object-cover border border-border shadow-2xs hover:scale-105 transition-transform cursor-pointer"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";
