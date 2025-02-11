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

const useInvoice = (): Invoice => {
  const invoicedTo: InvoicedTo = {
      toEmail: useValue("toEmail"),
      toPhone: useValue("toPhone"),
      toName: useValue("toName"),
      toDepartment: useValue("toDepartment"),
      toLogo: useValue("toLogo"),
      toLogoShape: useValue("toLogoShape"),
      toAddress: useValue("toAddress"),
      toCity: useValue("toCity"),
      toState: useValue("toState"),
      toCountry: useValue("toCountry"),
      toPostcode: useValue("toPostcode"),
    },
    invoicedFrom: InvoicedFrom = {
      fromEmail: useValue("fromEmail"),
      fromPhone: useValue("fromPhone"),
      fromName: useValue("fromName"),
      fromLogo: useValue("fromLogo"),
      fromLogoShape: useValue("fromLogoShape"),
      fromAddress: useValue("fromAddress"),
      fromCity: useValue("fromCity"),
      fromState: useValue("fromState"),
      fromCountry: useValue("fromCountry"),
      fromPostcode: useValue("fromPostcode"),
      fromABN: useValue("fromABN"),
    },
    invoiceReference: InvoiceReference = {
      invoiceNumber: useValue("invoiceNumber"),
      issueDate: useValue("issueDate"),
      dueDate: useValue("dueDate"),
    },
    paymentDetails: PaymentDetails = {
      accountName: useValue("accountName"),
      accountNumber: useValue("accountNumber"),
      branchNumber: useValue("branchNumber"),
      paymentDescription: useValue("paymentDescription"),
      paymentUrl: useValue("paymentUrl"),
      currency: useValue("currency"),
      discount: useValue("discount"),
      collectGST: useValue("collectGST"),
      note: useValue("note"),
    },
    invoiceItems = useValue<Item[]>("items"),
    isQuote = useValue<boolean>("isQuote");

  return {
    invoicedTo,
    invoicedFrom,
    invoiceReference,
    paymentDetails,
    invoiceItems,
    isQuote,
  };
};

export { useInvoice, useValue };
