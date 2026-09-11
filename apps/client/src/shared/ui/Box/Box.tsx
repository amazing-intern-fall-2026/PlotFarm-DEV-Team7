import * as React from "react";
import { cn } from "@/shared/lib/utils";

export type BoxElement =
  | "div"
  | "section"
  | "article"
  | "main"
  | "aside"
  | "header"
  | "footer"
  | "nav";

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** Thẻ HTML ngữ nghĩa cần render (mặc định là "div") */
  as?: BoxElement;
  children?: React.ReactNode;
}

/**
 * Box — Khối bố cục (Container / Wrapper) chuẩn hóa duy nhất của PlotFarm.
 * Thay thế cho việc viết các thẻ `<div>` thô trong các trang và component.
 * Cho phép linh hoạt chuyển đổi giữa div, section, article, main,...
 */
export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as = "div", className, children, ...props }, ref) => {
    return React.createElement(
      as,
      {
        ref,
        className: cn(className),
        ...props,
      },
      children
    );
  }
);

Box.displayName = "Box";
