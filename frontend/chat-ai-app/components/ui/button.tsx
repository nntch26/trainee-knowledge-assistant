import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
};

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const variantClasses = {
    default:
      "bg-gradient-to-r from-blue-700 to-sky-500 text-primary-foreground hover:bg-primary/90",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost:
      "bg-transparent hover:bg-gray-100 hover:text-accent-foreground",
  };

  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-6",
    icon: "h-9 w-9 p-0",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}

export { Button };