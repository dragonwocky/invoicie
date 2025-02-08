"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormPages } from "@/app/form/FormPages.tsx";
import { InvoiceForm } from "@/app/form/InvoiceForm.tsx";
import { InvoicePreview } from "@/app/form/InvoicePreview.tsx";

const InvoiceGenerator = () => {
  const methods = useForm(),
    [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return isClient
    ? (
      <FormProvider {...methods}>
        <div className="max-w-lg max-h-screen min-h-screen w-full h-full overflow-x-hidden overflow-y-auto p-4 md:p-12 border-r border-dashed flex flex-col justify-between">
          <InvoiceForm />
          <FormPages />
        </div>
        <div className="relative min-h-screen h-full w-full flex justify-center items-center p-4 md:p-0">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          </div>
          <InvoicePreview />
        </div>
      </FormProvider>
    )
    : <></>;
};

export { InvoiceGenerator };
