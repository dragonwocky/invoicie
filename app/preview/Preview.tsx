"use client";

import { InvoiceItemsPreview } from "@/app/preview/InvoiceItemsPreview.tsx";
import {
  PaymentDetailsPreview,
  PaymentTermsPreview,
} from "@/app/preview/PaymentDetailsPreview.tsx";
import { Columns } from "@/components/Typography.tsx";
import { setClientValue } from "@/hooks/useClientValue.ts";
import { useInvoice, useValue } from "@/hooks/useValue.ts";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import { Download } from "lucide-react";
import * as Party from "@/components/Party.tsx";

export const Preview = () => {
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
    <div className="relative min-h-screen h-full w-full flex justify-center items-center p-4 md:p-0">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      </div>
      <div className="w-[595px] h-[842px] overflow-y-auto overflow-x-hidden bg-white rounded-2xl border border-dashed justify-center items-center">
        <PaymentTermsPreview {...paymentDetails} onClick={() => onClick(2)} />
        <Columns className="border-b border-dashed">
          <div className="border-r border-dashed">
            <Party.Preview
              title="From"
              name={invoicedFrom.fromName}
              description={invoicedFrom.fromABN
                ? `ABN ${invoicedFrom.fromABN}`
                : ""}
              email={invoicedFrom.fromEmail}
              phone={invoicedFrom.fromPhone}
              logo={invoicedFrom.fromLogo}
              address={invoicedFrom.fromAddress}
              city={invoicedFrom.fromCity}
              state={invoicedFrom.fromState}
              country={invoicedFrom.fromCountry}
              postcode={invoicedFrom.fromPostcode}
              onClick={() => onClick(0)}
            />
          </div>
          <Party.Preview
            title="To"
            name={invoicedTo.toName}
            description={invoicedTo.toDepartment}
            email={invoicedTo.toEmail}
            phone={invoicedTo.toPhone}
            logo={invoicedTo.toLogo}
            address={invoicedTo.toAddress}
            city={invoicedTo.toCity}
            state={invoicedTo.toState}
            country={invoicedTo.toCountry}
            postcode={invoicedTo.toPostcode}
            onClick={() => onClick(1)}
          />
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
    </div>
  );
};
