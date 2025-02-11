import { useValue } from "@/hooks/useValue.ts";

const pages = [
    "Invoiced From",
    "Invoiced To",
    "Invoice Reference",
    "Payment Details",
    "Invoice Items",
    "Review & Download",
  ],
  usePage = () => {
    let page = useValue<number>("page");
    page = Math.max(0, Math.min(page, pages.length - 1));
    return page;
  },
  usePageTitle = (page: number = usePage()) => pages[page];

export { usePage, usePageTitle };
