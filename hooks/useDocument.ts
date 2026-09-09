import { useValue } from "@/hooks/useValue.ts";
import { format } from "date-fns";

const useDocumentType = () => {
    const documentType = useValue("documentType");
    if (documentType === "INV") return "Invoice";
    if (documentType === "RCPT") return "Receipt";
    return "Quote";
  },
  useDocumentRef = () => {
    const documentType = useValue("documentType"),
      issueDate = useValue<string>("issueDate"),
      paymentDate = useValue<string>("paymentDate"),
      toId = useValue<string>("toId"),
      documentRef = useValue<string>("documentRef"),
      documentDate = documentType === "RCPT" ? paymentDate : issueDate;
    return `${documentType}${
      [
        documentDate
        && format(documentDate, "yyyyMMdd"),
        toId,
        documentRef,
      ].filter((s) => s).join("-")
    }`;
  };

export { useDocumentRef, useDocumentType };
