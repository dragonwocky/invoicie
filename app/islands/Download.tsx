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
import { useFlag } from "@/hooks/useCurrency.ts";
import { useInvoice, useValue } from "@/hooks/useValue.ts";

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

const PDF: React.FC<{ flagDataUri: string; breakPages: boolean }> = (
  { flagDataUri, breakPages },
) => {
  const {
    invoicedTo,
    invoicedFrom,
    invoiceItems,
    paymentDetails,
    isQuote,
  } = useInvoice();
  return (
    <Document>
      <Page size="A4" style={{ fontFamily: "Geist" }} wrap={breakPages}>
        <Reference.PDF isQuote={isQuote} {...paymentDetails} />
        <View
          style={{
            ...pdfStyles.columns,
            borderBottom: pdfBorder,
          }}
        >
          <From.PDF {...invoicedFrom} />
          <To.PDF {...invoicedTo} />
        </View>
        <Items.PDF items={invoiceItems} />
        <Payment.PDF
          isQuote={isQuote}
          flagDataUri={flagDataUri}
          {...paymentDetails}
        />
      </Page>
    </Document>
  );
};

const Download = () => {
  const flag = useFlag(),
    invoiceNumber = useValue("invoiceNumber"),
    breakPages = useValue<boolean>("breakPages"),
    [status, setStatus] = useState<
      "downloaded" | "downloading" | "not-downloaded"
    >("not-downloaded"),
    [icon, title] = {
      "not-downloaded": [
        <DownloadIcon />,
        "Download Invoice",
      ],
      "downloading": [
        <LoaderIcon className="animate-spin" />,
        "Downloading...",
      ],
      "downloaded": [
        <CheckCircle2 />,
        "Downloaded",
      ],
    }[status];
  useEffect(() => {
    if (status !== "downloaded") return;
    setTimeout(() => setStatus("not-downloaded"), 1000);
  }, [status]);

  return (
    <>
      <p className="text-neutral-500 text-base font-medium">
        You're almost there! Please review entered details carefully before
        downloading your invoice.
      </p>
      <Switch label="Download a quote" clientKey="isQuote" />
      <Switch label="Split pages for print" clientKey="breakPages" />
      <Button
        title="Download"
        className="mt-6 w-full py-6 text-base"
        disabled={status === "downloading"}
        onClick={async () => {
          try {
            setStatus("downloading");
            const blob = await pdf(
              <PDF
                flagDataUri={await flag}
                breakPages={breakPages}
              />,
            ).toBlob();
            saveAs(blob, `${invoiceNumber || "invoice"}.pdf`);
            setStatus("downloaded");
          } catch (e) {
            console.error(e);
            setStatus("not-downloaded");
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
