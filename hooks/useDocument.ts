import { useValue } from "@/hooks/useValue.ts";
import { format } from "date-fns";

const templateKeys = [
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
    "toId",
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
    "accountName",
    "accountNumber",
    "branchNumber",
    "paymentDescription",
    "paymentUrl",
    "currency",
    "breakPages",
  ],
  useTemplate = (): Template => {
    const get = (clientKey: string) => [clientKey, useValue(clientKey)],
      entries = templateKeys.map(get);
    return Object.fromEntries(entries);
  };

const documentKeys = [
    ...templateKeys,
    "documentRef",
    "issueDate",
    "paymentDate",
    "dueDate",
    "paymentDescription",
    "paymentUrl",
    "paymentReceipt",
    "note",
    "items",
    "documentType",
  ],
  useDocument = (): Document => {
    const get = (clientKey: string) => [clientKey, useValue(clientKey)],
      entries = documentKeys.map(get);
    return Object.fromEntries(entries);
  },
  useDocumentType = () => {
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

export { documentKeys, useDocument, useDocumentRef, useDocumentType, useTemplate };
