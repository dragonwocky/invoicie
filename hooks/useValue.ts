import { useFormContext } from "react-hook-form";
import { useClientValue } from "@/hooks/useClientValue.ts";

const useValue = <T = string>(clientKey: string): T => {
  const ctx = useFormContext(),
    clientValue = useClientValue(clientKey, "");
  try {
    return ctx.watch(clientKey, clientValue);
  } catch {
    return clientValue as T;
  }
};

const invoiceKeys = [
    "fromName",
    "fromEmail",
    "fromPhone",
    "fromLogo",
    "fromLogoShape",
    "fromAddress",
    "fromCity",
    "fromState",
    "fromCountry",
    "fromPostcode",
    "fromABN",
    "toName",
    "toEmail",
    "toPhone",
    "toDepartment",
    "toLogo",
    "toLogoShape",
    "toAddress",
    "toCity",
    "toState",
    "toCountry",
    "toPostcode",
    "invoiceNumber",
    "issueDate",
    "dueDate",
    "accountName",
    "accountNumber",
    "branchNumber",
    "paymentDescription",
    "paymentUrl",
    "currency",
    "note",
    "items",
    "breakPages",
    "isQuote",
  ],
  useInvoice = (): Invoice => {
    const get = (clientKey: string) => [clientKey, useValue(clientKey)],
      entries = invoiceKeys.map(get);
    return Object.fromEntries(entries);
  };

export { invoiceKeys, useInvoice, useValue };
