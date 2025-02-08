import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Canvg } from "canvg";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs)),
  svgToDataUri = async (svgString: string) => {
    try {
      if (typeof document === "undefined") return "";
      const canvas: HTMLCanvasElement = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
      if (!ctx) return "";
      const v = Canvg.fromString(ctx, svgString.trim());
      await v.render();
      const dataUri = canvas.toDataURL("image/png");
      return dataUri;
    } catch {
      return "";
    }
  };
export { cn, svgToDataUri };
