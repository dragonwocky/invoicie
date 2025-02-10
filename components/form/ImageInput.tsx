"use client";

import { svgToDataUri } from "@/app/utils.ts";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";
import { useShape, useShapeStyle } from "@/hooks/useShape.ts";
import { Circle, Plus, Square } from "lucide-react";
import { useRef } from "react";
import { Controller } from "react-hook-form";

type ImageInputProps = {
  label?: string;
  roundedKey?: string;
  clientKey: string;
};

const ImageInput = ({ label, clientKey }: ImageInputProps) => {
  const ref = useRef<HTMLInputElement>(null),
    { shape, shapeKey } = useShape(clientKey),
    { tailwindShape } = useShapeStyle(shape);
  return (
    <div className="flex items-center mb-6 pb-2 border-b-2 border-dashed transition-colors focus-within:border-primary">
      <Controller
        render={({ field: { onChange, value } }) => (
          <button
            title={value ? "Square image" : "Round image"}
            className="mr-3 rounded-md p-1.5 bg-neutral-100 hover:bg-neutral-50 outline-0 focus:ring-ring"
            onClick={() => {
              const newShape = shape === "square" ? "circle" : "square";
              setClientValue(shapeKey, newShape);
              onChange(newShape);
            }}
          >
            {value === "square"
              ? <Square className="h-4 w-4" />
              : <Circle className="h-4 w-4" />}
          </button>
        )}
        defaultValue={shape}
        name={shapeKey}
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <div
            className="flex flex-1 items-center"
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
              className="peer opacity-0 appearance-none w-0 h-0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files?.[0]) {
                  return;
                }
                const reader = new FileReader(),
                  svg = e.target.files[0].type === "image/svg+xml";
                reader.onload = async () => {
                  let url = reader.result as string;
                  if (svg) {
                    url = (await svgToDataUri(url))!;
                  }
                  setClientValue(clientKey, url);
                  onChange(url);
                };
                if (svg) {
                  reader.readAsText(e.target.files[0]);
                } else reader.readAsDataURL(e.target.files[0]);
              }}
            />
            {value
              ? (
                <img
                  src={value}
                  className={`ml-auto max-h-8 max-w-8 cursor-pointer ${tailwindShape}`}
                />
              )
              : (
                <div
                  className={`cursor-pointer ml-auto text-neutral-500/70 border border-dashed peer-focus:border-primary peer-focus:text-primary ${tailwindShape}`}
                >
                  <Plus className="w-4 h-4 m-2" />
                </div>
              )}
          </div>
        )}
        defaultValue={useClientValue(clientKey, "")}
        name={clientKey}
      />
    </div>
  );
};

export { ImageInput };
