"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";
import { CheckCircle2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { Controller } from "react-hook-form";

type SelectProps = {
  label?: string;
  values: {
    name: string;
    shortcode: string;
    Icon?: (props: { className: string }) => ReactNode;
  }[];
  clientKey: string;
};

const Select = ({ label, values, clientKey }: SelectProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        const selected = values.find((v) => v.shortcode === value) || values[0];
        return (
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger className="flex w-full mb-6 pb-2 border-b-2 border-dashed transition-colors focus-within:border-primary">
              {label && <div className="shrink-0 mr-4 font-medium">{label}</div>}
              <div className="ml-auto flex gap-1.5 items-center pl-2 pr-2.5 py-0.5 bg-neutral-100 rounded-full">
                {selected.Icon && <selected.Icon className="w-4 h-4" />}
                <p className="font-medium">{selected.shortcode}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-3" align="end">
              <Command className="w-full">
                <CommandInput
                  placeholder="Search..."
                  className="peer block w-full caret-primary"
                />
                <CommandEmpty>
                  <p className="text-neutral-500 p-4 text-left font-medium">
                    Not found.
                  </p>
                </CommandEmpty>
                <CommandGroup className="max-h-96 overflow-y-auto scrollbar-hide">
                  {values.map((value) => (
                    <CommandItem
                      key={value.shortcode}
                      onSelect={() => {
                        setClientValue(clientKey, value.shortcode);
                        onChange(value.shortcode);
                        setOpen(false);
                      }}
                      className="w-full cursor-pointer my-2"
                    >
                      <div className="flex gap-2 justify-between items-center w-full">
                        <div className="flex gap-2 items-center font-medium">
                          {value.Icon && <value.Icon className="w-6 h-6" />}
                          <p>{value.name}</p>
                          <p className="text-neutral-500">
                            {value.shortcode}
                          </p>
                        </div>
                        {selected.shortcode === value.shortcode && (
                          <CheckCircle2 className="h-6 w-6 rounded-full opacity-100 bg-primary text-white" />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
      defaultValue={useClientValue(clientKey, values[0].shortcode)}
      name={clientKey}
    />
  );
};

export { Select };
