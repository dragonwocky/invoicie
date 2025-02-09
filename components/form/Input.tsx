"use client";

import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/app/utils.ts";

const Input = forwardRef<
  HTMLInputElement,
  ComponentProps<"input"> & { label?: string }
>(({ className, ...props }, ref) => (
  <div className="flex items-center mb-6 pb-2 border-b-2 border-dashed transition-colors focus-within:border-primary">
    <input
      className={cn(
        "border-none w-full min-h-5 h-5 bg-transparent text-inherit caret-primary outline-none",
        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
Input.displayName = "Input";

export { Input };
