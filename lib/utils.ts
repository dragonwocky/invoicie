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
  calculateSubtotal = (item: Item): number =>
    (item.quantity || 0) * (item.price || 0) *
    (1 - ((item.discount || 0) / 100)),
  calculateTotal = (items: Item[]): number =>
    Array.isArray(items)
      ? items.reduce((total, item) => total + calculateSubtotal(item), 0)
      : 0;

export {
  addCommasToNumber,
  calculateSubtotal,
  calculateTotal,
  cn,
  formatCurrencyValue,
};
