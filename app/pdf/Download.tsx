"use client";

import { InvoiceItemsPDF } from "@/app/pdf/InvoiceItemsPDF.tsx";
import {
  PaymentDetailsPDF,
  PaymentTermsPDF,
} from "@/app/pdf/PaymentDetailsPDF.tsx";
import * as Party from "@/components/Party.tsx";
import { pdfBorder, pdfStyles } from "@/components/Typography.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useInvoice, useValue } from "@/hooks/useValue.ts";
import { Document, Font, Page, pdf, View } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import {
  CheckCircle2,
  Download as DownloadIcon,
  LoaderIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  const {
    invoicedTo,
    invoicedFrom,
    invoiceItems,
    paymentDetails,
  } = useInvoice();
  return (
    <Document>
      <Page size="A4" style={{ fontFamily: "Geist" }}>
        <PaymentTermsPDF {...paymentDetails} />
        <View
          style={{ ...pdfStyles.columns, borderBottom: pdfBorder }}
        >
          <View style={{ flex: 1, borderRight: pdfBorder }}>
            <Party.PDF
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
            />
          </View>
          <View style={{ flex: 1 }}>
            <Party.PDF
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
            />
          </View>
        </View>
        <InvoiceItemsPDF items={invoiceItems} />
        <PaymentDetailsPDF {...paymentDetails} />
      </Page>
    </Document>
  );
};

const Download = () => {
  const invoiceNumber = useValue("invoiceNumber"),
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
      <Button
        title="Download"
        className="mt-6 w-full py-6 text-base"
        disabled={status === "downloading"}
        onClick={async () => {
          try {
            setStatus("downloading");
            const blob = await pdf(<PDF />).toBlob();
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
