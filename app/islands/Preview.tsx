"use client";

import { Download } from "lucide-react";
import { useFormContext } from "react-hook-form";

import * as From from "@/app/islands/From.tsx";
import * as Items from "@/app/islands/Items.tsx";
import * as Payment from "@/app/islands/Payment.tsx";
import * as Reference from "@/app/islands/Reference.tsx";
import * as To from "@/app/islands/To.tsx";
import { Columns } from "@/components/Typography.tsx";
import { Button } from "@/components/ui/button.tsx";
import { setClientValue } from "@/hooks/useClientValue.ts";
import { useInvoice, useValue } from "@/hooks/useValue.ts";

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
      <div className="overflow-auto md:overflow-x-hidden bg-white rounded-2xl border border-dashed justify-center">
        <div className="w-[595px] h-[842px]">
          <Reference.Preview {...paymentDetails} onClick={() => onClick(2)} />
          <Columns className="border-b border-dashed">
            <From.Preview {...invoicedFrom} onClick={() => onClick(0)} />
            <To.Preview {...invoicedTo} onClick={() => onClick(1)} />
          </Columns>
          <Items.Preview items={invoiceItems} onClick={() => onClick(3)} />
          <Payment.Preview {...paymentDetails} onClick={() => onClick(2)} />
          {page !== 4 && (
            <div className="absolute inset-x-0 bottom-0 md:bottom-8 w-full flex justify-center">
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
    </div>
  );
};
