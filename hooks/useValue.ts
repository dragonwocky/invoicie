import { useClientValue } from "@/hooks/useClientValue.ts";
import { useFormContext } from "react-hook-form";

const useValue = <T = string>(clientKey: string): T => {
  const ctx = useFormContext(),
    clientValue = useClientValue(clientKey, "");
  try {
    return ctx.watch(clientKey, clientValue);
  } catch {
    return clientValue as T;
  }
};

export { useValue };
