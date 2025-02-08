import { format } from "date-fns";

import { CurrencyInput } from "@/components/CurrencyInput.tsx";
import { DateInput } from "@/components/DateInput.tsx";
import { TextInput } from "@/components/TextInput.tsx";
import { NumberInput } from "@/components/NumberInput.tsx";

export const PaymentDetailsForm = () => (
  <>
    <TextInput
      label="Account Name"
      placeholder="Name"
      clientKey="accountName"
    />
    <TextInput
      label="Account Number"
      placeholder="XXXX XXXX"
      clientKey="accountNumber"
    />
    <TextInput label="BSB" placeholder="XXX XXX" clientKey="branchNumber" />
    <TextInput
      label="Invoice Number"
      placeholder={format(new Date(), "yMMdd-01")}
      clientKey="invoiceNumber"
    />
    <DateInput label="Issue Date" clientKey="issueDate" />
    <DateInput label="Due Date" clientKey="dueDate" />
    <CurrencyInput label="Currency" clientKey="currency" />
    <NumberInput
      label="Discount"
      placeholder="0"
      clientKey="discount"
      percent
    />
    <TextInput label="Note" placeholder="Add a note..." clientKey="note" />
  </>
);
