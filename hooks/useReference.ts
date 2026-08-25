import { useValue } from "@/hooks/useValue.ts";
import { format } from "date-fns";

const useDocumentType = () => {
    const isQuote = useValue<boolean>("isQuote");
    if (isQuote) return "Quote";
    const isReceipt = useValue<boolean>("isReceipt");
    if (isReceipt) return "Receipt";
    return "Invoice";
  },
  useDocumentShort = () => {
    const isQuote = useValue<boolean>("isQuote");
    if (isQuote) return "QUOT";
    const isReceipt = useValue<boolean>("isReceipt");
    if (isReceipt) return "RCPT";
    return "INV";
  },
  useReference = () => {
    const isReceipt = useValue<boolean>("isReceipt"),
      issueDate = useValue<string>("issueDate"),
      paymentDate = useValue<string>("paymentDate"),
      customerCode = useValue<string>("customerCode"),
      customerRef = useValue<string>("customerRef"),
      documentDate = isReceipt ? paymentDate : issueDate;
    return `${useDocumentShort()}${
      [
        documentDate
        && format(documentDate, "yyyyMMdd"),
        customerCode,
        customerRef,
      ].filter(s => s).join("-")
    }`;
  };

export { useDocumentShort, useDocumentType, useReference };
