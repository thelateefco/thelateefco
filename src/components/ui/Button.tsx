"use client";

import { forwardRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      href,
      icon,
      iconPosition = "right",
      children,
      className,
      onClick,
      target,
      rel,
      type = "button",
      disabled = false,
      id,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2",
      "font-sans text-[0.8125rem] font-medium tracking-[0.06em] uppercase",
      "px-6 py-3.5 md:px-7 md:py-4",
      "rounded-[7px]",
      "transition-[background-color,box-shadow] duration-300 ease-out",
      "border border-transparent",
      "cursor-pointer",
      "no-underline",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]/40 focus-visible:ring-offset-2",
      "disabled:opacity-60 disabled:cursor-not-allowed",
      className
    );

    const variantStyles = {
      primary: cn(
        "bg-[#140f0a] text-[#ECE6DF]",
        "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        "hover:bg-[#2E2E2E] hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]",
        "active:bg-[#1A1A1A]"
      ),
      secondary: cn(
        "bg-transparent text-[#1A1A1A]",
        "border-[#1A1A1A]",
        "hover:bg-[#1A1A1A] hover:text-[#ECE6DF]",
        "active:bg-[#1A1A1A] active:text-[#ECE6DF]"
      ),
    };

    const content = (
      <>
        {icon && iconPosition === "left" && (
          <span className="shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
      </>
    );

    const combinedClassName = cn(baseStyles, variantStyles[variant]);

    // Render as link
    if (href) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          id={id}
          aria-label={ariaLabel}
          className={combinedClassName}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {content}
        </motion.a>
      );
    }

    // Render as button
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={onClick}
        id={id}
        aria-label={ariaLabel}
        className={combinedClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        {...(props as any)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;