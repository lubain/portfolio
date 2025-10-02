import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center px-2 py-1 rounded-full text-sm font-semibold",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-muted text-foreground",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={badgeVariants({ variant, className })}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
export default Badge;
