"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { ComponentPropsWithoutRef, FC, useRef } from "react";
import { Controller } from "react-hook-form";

import { cn } from "@/app/utils.ts";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";

const Switch: FC<
  ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    label: string;
    clientKey: string;
  }
> = ({ label, clientKey, className, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div
          className="flex py-3 gap-3 cursor-pointer"
          onClick={() => ref.current?.click()}
        >
          <SwitchPrimitives.Root
            className={cn(
              "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
              className,
            )}
            {...props}
            id={clientKey}
            checked={value}
            onCheckedChange={(checked) => {
              setClientValue(clientKey, checked);
              onChange(checked);
            }}
            ref={ref}
          >
            <SwitchPrimitives.Thumb
              className={cn(
                "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
              )}
            />
          </SwitchPrimitives.Root>
          <span className="font-medium select-none cursor-pointer">
            {label}
          </span>
        </div>
      )}
      defaultValue={useClientValue(clientKey, false)}
      name={clientKey}
    />
  );
};
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
