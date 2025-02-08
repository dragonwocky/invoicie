"use client";

import { InvoicedFromPreview } from "@/app/form/invoicedFrom/InvoicedFromPreview.tsx";
import { InvoicedToPreview } from "@/app/form/invoicedTo/InvoicedToPreview.tsx";
import { InvoiceItemsPreview } from "@/app/form/invoiceItems/InvoiceItemsPreview.tsx";
import {
  PaymentDetailsPreview,
  PaymentTermsPreview,
} from "@/app/form/paymentDetails/PaymentDetailsPreview.tsx";
import { Columns } from "@/components/Typography.tsx";
import { setClientValue } from "@/hooks/useClientValue.ts";
import { useInvoice, useValue } from "@/hooks/useValue.ts";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import { Download } from "lucide-react";

export const InvoicePreview = () => {
  const {
    invoicedTo,
    invoicedFrom,
    invoiceItems,
    paymentDetails,
  } = useInvoice();

  const page = useValue<number>("page"),
    { setValue } = useFormContext(),
    onClick = (page: number) => {
      setValue("page", page);
      setClientValue("page", page);
    };

  return (
    <div className="w-[595px] h-[842px] overflow-y-auto overflow-x-hidden bg-white rounded-2xl border border-dashed justify-center items-center">
      <PaymentTermsPreview {...paymentDetails} onClick={() => onClick(2)} />
      <Columns className="border-b border-dashed">
        <InvoicedFromPreview {...invoicedFrom} onClick={() => onClick(0)} />
        <InvoicedToPreview {...invoicedTo} onClick={() => onClick(1)} />
      </Columns>
      <InvoiceItemsPreview items={invoiceItems} onClick={() => onClick(3)} />
      <PaymentDetailsPreview {...paymentDetails} onClick={() => onClick(2)} />
      {page !== 4 && (
        <div className="absolute inset-x-0 bottom-8 w-full flex justify-center">
          <Button
            title="Download"
            className="text-base"
            onClick={() => onClick(4)}
          >
            <Download />
            <span>Review & Download</span>
          </Button>
        </div>
      )}
    </div>
  );
};
