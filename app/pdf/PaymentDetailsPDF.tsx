import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import { pdfBorder, pdfStyles } from "@/components/Typography.tsx";
import { format } from "date-fns";
import { getCurrency } from "@/components/CurrencyInput.tsx";
import { calculateTotalAmount } from "@/app/preview/PaymentDetailsPreview.tsx";
import { useValue } from "@/hooks/useValue.ts";
import { formatCurrencyValue } from "@/app/preview/InvoiceItemsPreview.tsx";

const PaymentTermsPDF: React.FC<PaymentDetails> = (
  { invoiceNumber, issueDate, dueDate },
) => (
  <View
    style={{
      ...pdfStyles.columns,
      paddingVertical: 16,
      borderBottom: pdfBorder,
    }}
  >
    <View style={{ flex: 1, paddingHorizontal: 32 }}>
      <Text style={pdfStyles.title}>Invoice No</Text>
      {invoiceNumber && <Text style={pdfStyles.value}>{invoiceNumber}</Text>}
    </View>
    <View style={{ ...pdfStyles.columns, flex: 1, paddingHorizontal: 32 }}>
      <View style={{ flex: 1, marginRight: 8 }}>
        <Text style={pdfStyles.title}>Issued</Text>
        {issueDate && (
          <Text style={pdfStyles.value}>
            {format(issueDate, "do MMM yyyy")}
          </Text>
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 8, textAlign: "right" }}>
        <Text style={pdfStyles.title}>Due</Text>
        {dueDate && (
          <Text style={pdfStyles.value}>{format(dueDate, "do MMM yyyy")}</Text>
        )}
      </View>
    </View>
  </View>
);

const PaymentDetailsPDF: React.FC<PaymentDetails> = (
  { accountName, accountNumber, branchNumber, note, discount },
) => {
  const currency = getCurrency(),
    subtotal = calculateTotalAmount(useValue("items")),
    discountValue = discount ? (+discount) / 100 * -subtotal : 0,
    total = subtotal + discountValue;
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: pdfBorder,
          paddingBottom: 16,
        }}
      >
        <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 32 }}>
          {note && (
            <>
              <Text style={pdfStyles.title}>Note</Text>
              <Text style={pdfStyles.value}>{note}</Text>
            </>
          )}
        </View>
        <View style={{ flex: 1, paddingHorizontal: 32 }}>
          {subtotal !== total &&
            (
              <>
                <View
                  style={{
                    ...pdfStyles.columns,
                    borderBottom: pdfBorder,
                    paddingVertical: 12,
                  }}
                >
                  <Text style={pdfStyles.subtitle}>Subtotal</Text>
                  <Text
                    style={{ ...pdfStyles.value, flex: 1, textAlign: "right" }}
                  >
                    {formatCurrencyValue(subtotal)}
                  </Text>
                </View>
                <View
                  style={{
                    ...pdfStyles.columns,
                    borderBottom: pdfBorder,
                    paddingVertical: 12,
                  }}
                >
                  <Text style={pdfStyles.subtitle}>Discount ({discount}%)</Text>
                  <Text
                    style={{ ...pdfStyles.value, flex: 1, textAlign: "right" }}
                  >
                    {formatCurrencyValue(discountValue)}
                  </Text>
                </View>
              </>
            )}
          <View style={{ ...pdfStyles.columns, paddingTop: 12 }}>
            <Text style={pdfStyles.subtitle}>Total</Text>
            <Text
              style={{
                ...pdfStyles.value,
                flex: 1,
                textAlign: "right",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {formatCurrencyValue(total)}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingVertical: 16,
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 32 }}>
          <Text style={pdfStyles.title}>Payment Details</Text>
          <View style={{ ...pdfStyles.columns, marginBottom: 4 }}>
            <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>
              Account Name
            </Text>
            {accountName && (
              <Text style={{ ...pdfStyles.value, flex: 1 }}>{accountName}</Text>
            )}
          </View>
          <View style={{ ...pdfStyles.columns, marginBottom: 4 }}>
            <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>
              Account Number
            </Text>
            {accountNumber && (
              <Text style={{ ...pdfStyles.value, flex: 1 }}>
                {accountNumber}
              </Text>
            )}
          </View>
          <View style={{ ...pdfStyles.columns, marginBottom: 4 }}>
            <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>BSB</Text>
            {branchNumber && (
              <Text style={{ ...pdfStyles.value, flex: 1 }}>
                {branchNumber}
              </Text>
            )}
          </View>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 32 }}>
          <Text style={pdfStyles.title}>Payable In</Text>

          <View style={pdfStyles.columns}>
            <Image
              src={currency.iconDataUri}
              style={{
                width: 32,
                height: 32,
                borderRadius: "100%",
                objectFit: "cover",
                marginRight: 8,
              }}
            />
            <View>
              <Text style={pdfStyles.value}>
                {currency.name}
              </Text>
              <Text style={pdfStyles.subvalue}>
                {currency.symbol} {currency.shortcode}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export { PaymentDetailsPDF, PaymentTermsPDF };
