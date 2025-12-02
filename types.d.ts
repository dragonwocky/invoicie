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
  discount?: number;
  quantity?: number;
  price?: number;
}

interface Invoice {
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
  invoiceNumber?: string;
  issueDate?: string;
  dueDate?: string;
  accountName?: string;
  accountNumber?: string;
  branchNumber?: string;
  paymentDescription?: string;
  paymentUrl?: string;
  currency?: string;
  note?: string;
  items?: Item[];
  breakPages?: boolean;
  isQuote?: boolean;
}
