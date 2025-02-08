"use client";

import { Controller } from "react-hook-form";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";

type NumberInputProps = {
  label?: string;
  placeholder: string;
  clientKey: string;
  percent?: boolean;
};

const NumberInput = (
  { label, placeholder, clientKey, percent }: NumberInputProps,
) => (
  <Controller
    render={({ field: { onChange, value } }) => (
      <div className="flex items-center mb-6 pb-2 border-b-2 border-dashed transition-colors focus-within:border-primary">
        {label && (
          <label htmlFor={clientKey} className="shrink-0 mr-4 font-medium">
            {label}
          </label>
        )}
        <input
          type="number"
          value={value}
          id={clientKey}
          placeholder={placeholder}
          className="border-none text-right w-full bg-transparent text-inherit caret-primary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => {
            if (e.target.value === "") {
              setClientValue(clientKey, "");
              onChange("");
              return;
            }
            let number = +e.target.value;
            if (isNaN(number)) number = 0;
            if (percent) number = Math.max(0, Math.min(100, number));
            setClientValue(clientKey, number);
            onChange(number);
          }}
        />
        {percent && <span className="ml-2 text-gray-400">%</span>}
      </div>
    )}
    defaultValue={useClientValue(clientKey, "")}
    name={clientKey}
  />
);

export { NumberInput };
