import React, { HTMLAttributes, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-lg bg-background shadow-sm border border-border overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardVariants({ variant, className })}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// CardContent : wrapper interne pour le padding
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
