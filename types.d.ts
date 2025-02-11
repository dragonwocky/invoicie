interface InvoicedFrom {
  fromName?: string;
  fromEmail?: string;
  fromPhone?: string;
  fromLogo?: string;
  fromLogoShape?: string;
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
  toLogoShape?: string;
  toAddress?: string;
  toCity?: string;
  toState?: string;
  toCountry?: string;
  toPostcode?: string;
}

interface Party {
  title?: string;
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  logo?: string;
  logoShape?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
}

interface Item {
  description: string;
  quantity?: number;
  price?: number;
}

interface InvoiceReference {
  invoiceNumber?: string;
  issueDate?: string;
  dueDate?: string;
}

interface PaymentDetails {
  accountName?: string;
  accountNumber?: string;
  branchNumber?: string;
  paymentDescription?: string;
  paymentUrl?: string;
  currency?: string;
  discount?: string;
  collectGST?: string;
  note?: string;
}

interface Invoice {
  invoicedTo: InvoicedTo;
  invoicedFrom: InvoicedFrom;
  invoiceReference: InvoiceReference;
  paymentDetails: PaymentDetails;
  invoiceItems: Item[];
  isQuote: boolean;
}
