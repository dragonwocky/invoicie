"use client";

import { Document, Font, Page, pdf, View } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import {
  CheckCircle2,
  Download as DownloadIcon,
  LoaderIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import * as From from "@/app/islands/From.tsx";
import * as Items from "@/app/islands/Items.tsx";
import * as Payment from "@/app/islands/Payment.tsx";
import * as Reference from "@/app/islands/Reference.tsx";
import * as To from "@/app/islands/To.tsx";
import { Switch } from "@/components/form/Switch.tsx";
import { pdfBorder, pdfStyles } from "@/components/Typography.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useValue } from "@/hooks/useValue.ts";

Font.register({
  family: "Geist",
  fonts: [
    "https://fonts.gstatic.com/s/geist/v1/gyBhhwUxId8gMGYQMKR3pzfaWI_RnOI4nZPby1QNtA.ttf",
    "https://fonts.gstatic.com/s/geist/v1/gyBhhwUxId8gMGYQMKR3pzfaWI_RHOM4nZPby1QNtA.ttf",
    "https://fonts.gstatic.com/s/geist/v1/gyBhhwUxId8gMGYQMKR3pzfaWI_RwuM4nZPby1QNtA.ttf",
    "https://fonts.gstatic.com/s/geist/v1/gyBhhwUxId8gMGYQMKR3pzfaWI_RnOM4nZPby1QNtA.ttf",
    "https://fonts.gstatic.com/s/geist/v1/gyBhhwUxId8gMGYQMKR3pzfaWI_RruM4nZPby1QNtA.ttf",
    "https://fonts.gstatic.com/s/geist/v1/gyBhhwUxId8gMGYQMKR3pzfaWI_RQuQ4nZPby1QNtA.ttf",
    "https://fonts.gstatic.com/s/geist/v1/gyBhhwUxId8gMGYQMKR3pzfaWI_Re-Q4nZPby1QNtA.ttf",
    "https://fonts.gstatic.com/s/geist/v1/gyBhhwUxId8gMGYQMKR3pzfaWI_RHOQ4nZPby1QNtA.ttf",
    "https://fonts.gstatic.com/s/geist/v1/gyBhhwUxId8gMGYQMKR3pzfaWI_RNeQ4nZPby1QNtA.ttf",
  ].map((src, i) => ({ src, fontWeight: i * 100 + 100 })),
});

const PDF = () => {
  const breakPages = useValue<boolean>("breakPages");
  return (
    <Document>
      <Page size="A4" style={{ fontFamily: "Geist" }} wrap={breakPages}>
        <Reference.PDF />
        <View
          style={{
            ...pdfStyles.columns,
            borderBottom: pdfBorder,
          }}
        >
          <From.PDF />
          <To.PDF />
        </View>
        <Items.PDF />
        <Payment.PDF />
      </Page>
    </Document>
  );
};

const Download = () => {
  const isQuote = useValue<boolean>("isQuote"),
    invoiceNumber = useValue("invoiceNumber"),
    [status, setStatus] = useState<0 | 1 | 2>(0),
    [icon, title] = [[
      <DownloadIcon />,
      `Download ${isQuote ? "Quote" : "Invoice"}`,
    ], [
      <LoaderIcon className="animate-spin" />,
      "Downloading...",
    ], [
      <CheckCircle2 />,
      "Downloaded",
    ]][status];
  useEffect(() => {
    if (status === 2) setTimeout(() => setStatus(0), 1000);
  }, [status]);

  return (
    <>
      <p className="text-neutral-500 text-base font-medium mb-3">
        You're almost there! Please review entered details carefully before
        downloading your invoice.
      </p>
      <Switch label="Prepare a quote" clientKey="isQuote" />
      <Switch label="Split pages for print" clientKey="breakPages" />
      <Button
        title="Download"
        className="mt-3 w-full py-6 text-base"
        disabled={status === 1}
        onClick={async () => {
          try {
            setStatus(1);
            const blob = await pdf(<PDF />).toBlob();
            saveAs(blob, `${invoiceNumber || "invoice"}.pdf`);
            setStatus(2);
          } catch {
            setStatus(0);
          }
        }}
      >
        {icon}
        <span>{title}</span>
      </Button>
    </>
  );
};

export { Download };
