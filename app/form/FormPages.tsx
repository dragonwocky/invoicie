"use client";

import { useValue } from "@/hooks/useValue.ts";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";
import { MoveLeft, MoveRight } from "lucide-react";
import { Controller } from "react-hook-form";

const pages = [
    "Invoiced From",
    "Invoiced To",
    "Payment Details",
    "Invoice Items",
    "Review & Download",
  ],
  getPageIndex = () => {
    let page = useValue<number>("page");
    page = Math.max(0, Math.min(page, pages.length - 1));
    return page;
  },
  getPageTitle = () => pages.at(getPageIndex());

type PageButtonProps = {
  previous?: boolean;
  title: string;
  page: number;
};
const PageButton = ({ previous, title, page }: PageButtonProps) => (
    <Controller
      render={({ field: { onChange } }) => (
        <div className="mt-3 w-full flex flex-1">
          <button
            className="flex-1 hover:bg-neutral-100 rounded-md p-3"
            onClick={() => {
              setClientValue("page", page);
              onChange(page);
            }}
          >
            {previous
              ? (
                <>
                  <div className="flex gap-2 items-center">
                    <MoveLeft className="w-3 h-3 text-neutral-500" />
                    <p className="text-sm font-medium text-neutral-500">Back</p>
                  </div>
                  <p className="font-medium text-left">{title}</p>
                </>
              )
              : (
                <>
                  <div className="flex gap-2 items-center justify-end">
                    <p className="text-sm font-medium text-neutral-500">Next</p>
                    <MoveRight className="w-3 h-3 text-neutral-500" />
                  </div>
                  <p className="font-medium text-right">{title}</p>
                </>
              )}
          </button>
        </div>
      )}
      defaultValue={useClientValue<number>("page", 0)}
      name="page"
    />
  ),
  FormPages = () => {
    const page = getPageIndex();
    return (
      <div className="flex gap-9 justify-between">
        {page - 1 >= 0
          ? <PageButton page={page - 1} title={pages[page - 1]} previous />
          : <div className="flex-1" />}
        {page + 1 < pages.length
          ? <PageButton page={page + 1} title={pages[page + 1]} />
          : <div className="flex-1" />}
      </div>
    );
  };

export { FormPages, getPageIndex, getPageTitle };
