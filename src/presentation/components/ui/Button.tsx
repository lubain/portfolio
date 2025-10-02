import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/presentation/shared/utils/button-variants";

export interface ButtonProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  disabled?: boolean;
  form?: string;
  formAction?: string | ((formData: FormData) => void | Promise<void>);
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  type?: "submit" | "reset" | "button";
  value?: string | ReadonlyArray<string> | number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      disabled,
      type,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...motionProps
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        type={type || "button"}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
