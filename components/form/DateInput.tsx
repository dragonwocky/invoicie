"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";

type DateInputProps = {
  label?: string;
  clientKey: string;
};

const DateInput = ({ label, clientKey }: DateInputProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger className="flex w-full mb-6 pb-2 border-b-2 border-dashed transition-colors focus-within:border-primary">
            {label && <div className="shrink-0 mr-4 font-medium">{label}</div>}
            <div className="ml-auto flex gap-2 items-center">
              <span>{value ? format(value, "do MMM yyyy") : "Select date"}</span>
              <CalendarIcon className="h-4 w-4" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 mt-3" align="end">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={(date: Date | undefined) => {
                if (date) {
                  const iso = date.toISOString();
                  setClientValue(clientKey, iso);
                  onChange(iso);
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
      defaultValue={useClientValue(clientKey, "")}
      name={clientKey}
    />
  );
};

export { DateInput };
