"use client";

import { Button } from "@/components/ui/button.tsx";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { CheckCircle2, Download, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useValue } from "@/hooks/useValue.ts";
import { useInvoice } from "@/hooks/useValue.ts";
import { Document, Font, Page, View } from "@react-pdf/renderer";
import { InvoicedToPDF } from "@/app/form/invoicedTo/InvoicedToPDF.tsx";
import { InvoicedFromPDF } from "@/app/form/invoicedFrom/InvoicedFromPDF.tsx";
import { InvoiceItemsPDF } from "@/app/form/invoiceItems/InvoiceItemsPDF.tsx";
import { pdfBorder, pdfStyles } from "@/components/Typography.tsx";
import { PaymentTermsPDF, PaymentDetailsPDF } from "@/app/form/paymentDetails/PaymentDetailsPDF.tsx";

export const InvoiceDownload = () => {
  const invoiceNumber = useValue("invoiceNumber"),
    [status, setStatus] = useState<
      "downloaded" | "downloading" | "not-downloaded"
    >("not-downloaded");
  useEffect(() => {
    if (status !== "downloaded") return;
    setTimeout(() => setStatus("not-downloaded"), 1000);
  }, [status]);

  const {
    invoicedTo,
    invoicedFrom,
    invoiceItems,
    paymentDetails,
  } = useInvoice();

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
            const blob = await pdf(
              <Document>
                <Page size="A4" style={{ fontFamily: "Geist" }}>
                  <PaymentTermsPDF {...paymentDetails} />
                  <View
                    style={{ ...pdfStyles.columns, borderBottom: pdfBorder }}
                  >
                    <InvoicedFromPDF {...invoicedFrom} />
                    <InvoicedToPDF {...invoicedTo} />
                  </View>
                  <InvoiceItemsPDF items={invoiceItems} />
                  <PaymentDetailsPDF {...paymentDetails} />
                </Page>
              </Document>,
            ).toBlob();
            saveAs(blob, `${invoiceNumber || "invoice"}.pdf`);
            setStatus("downloaded");
          } catch (e) {
            console.error(e);
            setStatus("not-downloaded");
          }
        }}
      >
        {status === "not-downloaded" && (
          <>
            <Download />
            <span>Download Invoice</span>
          </>
        )}
        {status === "downloading" && (
          <>
            <LoaderIcon className="animate-spin" />
            <span>Downloading...</span>
          </>
        )}
        {status === "downloaded" && (
          <>
            <CheckCircle2 />
            <span>Downloaded</span>
          </>
        )}
      </Button>
    </>
  );
};

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
