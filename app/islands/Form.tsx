"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import { Controller } from "react-hook-form";

import { Download } from "@/app/islands/Download.tsx";
import * as From from "@/app/islands/From.tsx";
import * as Items from "@/app/islands/Items.tsx";
import * as Payment from "@/app/islands/Payment.tsx";
import * as To from "@/app/islands/To.tsx";
import { setClientValue } from "@/hooks/useClientValue.ts";
import { usePage, usePageTitle } from "@/hooks/usePage.ts";
import pkg from "@/package.json" with { type: "json" };

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

const Form = () => {
  const page = usePage();
  return (
    <div className="max-w-lg max-h-screen min-h-screen w-full h-full overflow-x-hidden overflow-y-auto p-4 md:p-12 border-r border-dashed flex flex-col justify-between">
      <div className="text-sm ">
        <div className="flex gap-2 items-center">
          <p className="font-semibold">Invoicie</p>
          <p className="text-primary rounded-md p-1.5 bg-neutral-50">
            v{pkg.version}
          </p>
        </div>
        <p className="pt-16 text-2xl font-semibold pb-12">{usePageTitle()}</p>
        {[
          <To.Form />,
          <From.Form />,
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
