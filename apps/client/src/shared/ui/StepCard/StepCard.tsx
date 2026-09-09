import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface StepCardProps extends React.HTMLAttributes<HTMLDivElement> {
  stepNumber: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export const StepCard = React.forwardRef<HTMLDivElement, StepCardProps>(
  ({ stepNumber, title, description, icon, isActive = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300",
          isActive
            ? "border-primary shadow-md bg-linear-to-b from-emerald-50/40 to-transparent"
            : "border-border hover:border-primary/40 hover:shadow-xs",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-3xl font-black text-primary/30 group-hover:text-primary transition-colors">
            {stepNumber}
          </span>
          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-primary transition-transform group-hover:scale-110">
              {icon}
            </div>
          )}
        </div>

        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
    );
  }
);
StepCard.displayName = "StepCard";
