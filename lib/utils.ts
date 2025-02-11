import { useCurrency } from "@/hooks/useCurrency.ts";
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

export {
  addCommasToNumber,
  calculateTotalAmount,
  cn,
  formatCurrencyValue,
};
