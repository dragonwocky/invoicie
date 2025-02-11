"use client";

import {
  DownloadIcon,
  FileJson2,
  MoveLeft,
  MoveRight,
  UploadIcon,
} from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { Download } from "@/app/islands/Download.tsx";
import * as From from "@/app/islands/From.tsx";
import * as Items from "@/app/islands/Items.tsx";
import * as Payment from "@/app/islands/Payment.tsx";
import * as Reference from "@/app/islands/Reference.tsx";
import * as To from "@/app/islands/To.tsx";
import { Invoicie } from "@/components/Invoicie.tsx";
import { Button } from "@/components/ui/button.tsx";
import { setClientValue } from "@/hooks/useClientValue.ts";
import { usePage, usePageTitle } from "@/hooks/usePage.ts";
import { invoiceKeys, useInvoice } from "@/hooks/useValue.ts";
import pkg from "@/package.json" with { type: "json" };
import { saveAs } from "file-saver";

const PageBack = ({ fromPage }: { fromPage: number }) => {
    const pageTitle = usePageTitle(fromPage - 1);
    if (!pageTitle) return <div className="flex-1" />;
    return (
      <Controller
        render={({ field: { onChange } }) => (
          <div className="mt-3 w-full flex flex-1">
            <button
              className="flex-1 hover:bg-neutral-100 rounded-md p-3"
              onClick={() => [
                setClientValue("page", fromPage - 1),
                onChange(fromPage - 1),
              ]}
            >
              <div className="flex gap-2 items-center">
                <MoveLeft className="w-3 h-3 text-neutral-500" />
                <p className="text-sm font-medium text-neutral-500">Back</p>
              </div>
              <p className="font-medium text-left">{pageTitle}</p>
            </button>
          </div>
        )}
        defaultValue={fromPage}
        name="page"
      />
    );
  },
  PageNext = ({ fromPage }: { fromPage: number }) => {
    const pageTitle = usePageTitle(fromPage + 1);
    if (!pageTitle) return <div className="flex-1" />;
    return (
      <Controller
        render={({ field: { onChange } }) => (
          <div className="mt-3 w-full flex flex-1">
            <button
              className="flex-1 hover:bg-neutral-100 rounded-md p-3"
              onClick={() => [
                setClientValue("page", fromPage + 1),
                onChange(fromPage + 1),
              ]}
            >
              <div className="flex gap-2 items-center justify-end">
                <p className="text-sm font-medium text-neutral-500">Next</p>
                <MoveRight className="w-3 h-3 text-neutral-500" />
              </div>
              <p className="font-medium text-right">{pageTitle}</p>
            </button>
          </div>
        )}
        defaultValue={fromPage}
        name="page"
      />
    );
  };

const Export = () => {
    const invoice = useInvoice();
    return (
      <Button
        variant="ghost"
        className="h-auto p-2"
        onClick={() => {
          const document = JSON.stringify(invoice),
            blob = new Blob([document], { type: "application/json" });
          saveAs(blob, `${invoice.invoiceNumber || "invoice"}.json`);
        }}
      >
        <DownloadIcon />
      </Button>
    );
  },
  Import = () => {
    const ref = useRef<HTMLInputElement>(null),
      [error, setError] = useState<boolean>(),
      { setValue } = useFormContext();
    useEffect(() => {
      if (error) setTimeout(() => setError(false), 1000);
    }, [error]);
    return (
      <Button
        variant={error ? "default" : "ghost"}
        className="h-auto p-2 gap-0"
        onClick={() => ref.current?.click()}
      >
        <UploadIcon />
        <input
          type="file"
          ref={ref}
          accept=".json"
          className="opacity-0 appearance-none w-0 h-0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files?.[0]) return;
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const json = reader.result as string,
                  data = JSON.parse(json);
                for (const clientKey in data) {
                  if (!invoiceKeys.includes(clientKey)) continue;
                  setValue(clientKey, data[clientKey]);
                  setClientValue(clientKey, data[clientKey]);
                }
              } catch {
                setError(true);
              }
            };
            reader.readAsText(e.target.files[0]);
          }}
        />
      </Button>
    );
  };

const Form = () => {
  const page = usePage();
  return (
    <div className="w-full max-w-lg md:max-h-screen md:h-screen md:overflow-x-hidden px-4 md:px-12 py-12 border-r border-dashed flex flex-col justify-between">
      <div className="text-sm">
        <div className="flex justify-around md:justify-between">
          <div className="flex items-center gap-2">
            <Invoicie className="h-12 w-12" />
            <div>
              <p className="font-semibold">Invoicie</p>
              <p className="text-xs">v{pkg.version}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileJson2 className="size-4 mr-1" />
            <Export />
            <Import />
          </div>
        </div>
        <p className="pt-8 text-2xl font-semibold pb-12 max-md:text-center">
          {usePageTitle()}
        </p>
        {[
          <From.Form />,
          <To.Form />,
          <Reference.Form />,
          <Payment.Form />,
          <Items.Form />,
          <Download />,
        ][page]}
      </div>
      <div className="flex gap-9 justify-between">
        <PageBack fromPage={page} />
        <PageNext fromPage={page} />
      </div>
    </div>
  );
};

export { Form };
