"use client";

import { Controller } from "react-hook-form";

import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";

type TextInputProps = {
  label?: string;
  placeholder: string;
  clientKey: string;
};

const TextInput = (
  { label, placeholder, clientKey }: TextInputProps,
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
          type="text"
          className="border-none text-right w-full min-h-5 h-5 bg-transparent text-inherit caret-primary outline-none"
          value={value}
          id={clientKey}
          placeholder={placeholder}
          onChange={(e) => {
            setClientValue(clientKey, e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    )}
    defaultValue={useClientValue(clientKey, "")}
    name={clientKey}
  />
);

export { TextInput };
