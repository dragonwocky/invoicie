"use client";

import { svgToDataUri } from "@/app/utils.ts";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { Controller } from "react-hook-form";

type ImageInputProps = {
  label?: string;
  clientKey: string;
};

const ImageInput = ({ label, clientKey }: ImageInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div
          className="flex items-center mb-6 pb-2 border-b-2 border-dashed transition-colors focus-within:border-primary"
          onClick={() => ref.current?.click()}
        >
          {label && (
            <label htmlFor={clientKey} className="shrink-0 mr-4 font-medium">
              {label}
            </label>
          )}
          <input
            type="file"
            ref={ref}
            id={clientKey}
            accept=".png, .jpg, .jpeg, .svg"
            className="peer hidden appearance-none w-0 h-0"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files?.[0]) return;
              const reader = new FileReader(),
                svg = e.target.files[0].type === "image/svg+xml";
              reader.onload = async () => {
                let url = reader.result as string;
                if (svg) url = (await svgToDataUri(url))!;
                setClientValue(clientKey, url);
                onChange(url);
              };
              if (svg) reader.readAsText(e.target.files[0]);
              else reader.readAsDataURL(e.target.files[0]);
            }}
          />
          {value
            ? (
              <img
                src={value}
                className="ml-auto rounded-full h-8 w-8 cursor-pointer"
              />
            )
            : (
              <div className="cursor-pointer ml-auto text-neutral-500/70 border border-dashed rounded-full peer-focus:border-primary peer-focus:text-primary">
                <Plus className="w-4 h-4 m-2" />
              </div>
            )}
        </div>
      )}
      defaultValue={useClientValue(clientKey, "")}
      name={clientKey}
    />
  );
};

export { ImageInput };
