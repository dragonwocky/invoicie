"use client";

import { getPageIndex, getPageTitle } from "@/app/form/FormPages.tsx";
import { InvoicedFromForm } from "@/app/form/invoicedFrom/InvoicedFromForm.tsx";
import { InvoicedToForm } from "@/app/form/invoicedTo/InvoicedToForm.tsx";
import { InvoiceItemsForm } from "@/app/form/invoiceItems/InvoiceItemsForm.tsx";
import { PaymentDetailsForm } from "@/app/form/paymentDetails/PaymentDetailsForm.tsx";
import { InvoiceDownload } from "@/app/form/InvoiceDownload.tsx";
import { version } from "@/package.json" with { type: "json" };

const InvoiceForm = () => (
  <div className="text-sm ">
    <div className="flex gap-2 items-center">
      <p className="font-semibold">Invoicie</p>
      <p className="text-primary rounded-md p-1.5 bg-neutral-50">
        v{version}
      </p>
    </div>
    <p className="pt-16 text-2xl font-semibold pb-12">{getPageTitle()}</p>
    {[
      <InvoicedFromForm />,
      <InvoicedToForm />,
      <PaymentDetailsForm />,
      <InvoiceItemsForm />,
      <InvoiceDownload />,
    ][getPageIndex()]}
  </div>
);

export { InvoiceForm };
