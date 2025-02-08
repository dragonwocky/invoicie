interface InvoicedFrom {
  fromName?: string;
  fromEmail?: string;
  fromPhone?: string;
  fromLogo?: string;
  fromAddress?: string;
  fromCity?: string;
  fromState?: string;
  fromCountry?: string;
  fromPostcode?: string;
  fromABN?: string;
}

interface InvoicedTo {
  toName?: string;
  toEmail?: string;
  toPhone?: string;
  toDepartment?: string;
  toLogo?: string;
  toAddress?: string;
  toCity?: string;
  toState?: string;
  toCountry?: string;
  toPostcode?: string;
}

interface Item {
  description: string;
  quantity?: number;
  price?: number;
}

interface PaymentDetails {
  accountName?: string;
  accountNumber?: string;
  branchNumber?: string;
  invoiceNumber?: string;
  issueDate?: string;
  dueDate?: string;
  currency?: string;
  discount?: string;
  note?: string;
}

interface Invoice {
  invoicedTo: InvoicedTo;
  invoicedFrom: InvoicedFrom;
  invoiceItems: Item[];
  paymentDetails: PaymentDetails;
}
