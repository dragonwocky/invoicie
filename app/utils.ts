import { useCurrency } from "@/hooks/useCurrency.ts";
import { Canvg } from "canvg";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const addCommasToNumber = (number: number): string => {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  },
  formatCurrencyValue = (number: number): string => {
    number = Math.round((number + Number.EPSILON) * 100) / 100;
    const parts = addCommasToNumber(number).replace(/^-/, "").split(".");
    if (parts[1]) parts[1] = parts[1].padEnd(2, "0");
    const str = useCurrency().symbol + parts.join(".");
    return number < 0 ? `(${str})` : str;
  },
  calculateTotalAmount = (items: Item[]): number =>
    Array.isArray(items)
      ? items.reduce((total, item) => {
        const quantity = item.quantity ? +item.quantity : 0,
          price = item.price ? +item.price : 0;
        return total + quantity * price;
      }, 0)
      : 0;

const svgToDataUri = async (svgString: string) => {
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
  },
  flagToDataUri = async (countryCode: string) => {
    const flags = "https://catamphetamine.gitlab.io/country-flag-icons/1x1",
      flag = await fetch(`${flags}/${countryCode}.svg`);
    return await svgToDataUri(await flag.text()) || "";
  };

export {
  addCommasToNumber,
  calculateTotalAmount,
  cn,
  flagToDataUri,
  formatCurrencyValue,
  svgToDataUri,
};
