"use client";

import { Image, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";

import { calculateTotalAmount, formatCurrencyValue } from "@/app/utils.ts";
import { CurrencyInput } from "@/components/form/CurrencyInput.tsx";
import { DateInput } from "@/components/form/DateInput.tsx";
import { NumberInput } from "@/components/form/NumberInput.tsx";
import { TextInput } from "@/components/form/TextInput.tsx";
import {
  Columns,
  Frame,
  pdfBorder,
  pdfStyles,
  Skeleton,
  Subtitle,
  Subvalue,
  Title,
  Value,
} from "@/components/Typography.tsx";
import { useCurrency } from "@/hooks/useCurrency.ts";
import { useValue } from "@/hooks/useValue.ts";

const Form = () => (
  <>
    <TextInput
      label="Account Name"
      placeholder="Name"
      clientKey="accountName"
    />
    <TextInput
      label="Account Number"
      placeholder="XXXX XXXX"
      clientKey="accountNumber"
    />
    <TextInput label="BSB" placeholder="XXX XXX" clientKey="branchNumber" />
    <TextInput
      label="Invoice Number"
      placeholder={format(new Date(), "yMMdd-01")}
      clientKey="invoiceNumber"
    />
    <DateInput label="Issue Date" clientKey="issueDate" />
    <DateInput label="Due Date" clientKey="dueDate" />
    <CurrencyInput label="Currency" clientKey="currency" />
    <NumberInput
      label="Discount"
      placeholder="0"
      clientKey="discount"
      percent
    />
    <TextInput label="Note" placeholder="Add a note..." clientKey="note" />
  </>
);

const Preview: React.FC<PaymentDetails & { onClick?: () => void }> = ({
  accountName,
  accountNumber,
  branchNumber,
  note,
  discount,
  onClick,
}) => {
  const currency = useCurrency(),
    subtotal = calculateTotalAmount(useValue("items")),
    discountValue = discount ? (+discount) / 100 * -subtotal : 0,
    total = subtotal + discountValue;
  return (
    <div className="group cursor-pointer relative" onClick={onClick}>
      <Frame />
      <Columns className="pb-4 border-b border-dashed">
        <div className="pt-3 px-8">
          {note && (
            <>
              <Title>Note</Title>
              <Value>{note}</Value>
            </>
          )}
        </div>
        <div className="px-8">
          {subtotal !== total &&
            (
              <>
                <Columns className="py-3 border-b border-dashed">
                  <Subtitle>Subtotal</Subtitle>
                  <Value className="text-right">
                    {formatCurrencyValue(subtotal)}
                  </Value>
                </Columns>
                <Columns className="py-3 border-b border-dashed">
                  <Subtitle>Discount ({discount}%)</Subtitle>
                  <Value className="text-right">
                    {formatCurrencyValue(discountValue)}
                  </Value>
                </Columns>
              </>
            )}
          <Columns className="items-center pt-3">
            <Subtitle>Total</Subtitle>
            <Value className="text-right font-bold text-base">
              {formatCurrencyValue(total)}
            </Value>
          </Columns>
        </div>
      </Columns>
      <Columns className="py-4">
        <div className="px-8">
          <Title>Payment Details</Title>
          <Columns className="mb-1">
            <Subtitle>Account Name</Subtitle>
            {accountName
              ? <Value>{accountName}</Value>
              : <Skeleton className="h-4 w-full" />}
          </Columns>
          <Columns className="mb-1">
            <Subtitle>Account Number</Subtitle>
            {accountNumber
              ? <Value>{accountNumber}</Value>
              : <Skeleton className="h-4 w-full" />}
          </Columns>
          <Columns className="mb-1">
            <Subtitle>BSB</Subtitle>
            {branchNumber
              ? <Value>{branchNumber}</Value>
              : <Skeleton className="h-4 w-full" />}
          </Columns>
        </div>
        <div className="px-8">
          <Title>Payable In</Title>
          <div className="flex gap-2 justify-between items-center w-full">
            <div className="flex gap-3 items-center">
              <currency.Icon className="w-8 h-8 rounded-full" />
              <div>
                <Value>{currency.name}</Value>
                <Subvalue>{currency.symbol} {currency.shortcode}</Subvalue>
              </div>
            </div>
          </div>
        </div>
      </Columns>
    </div>
  );
};

const PDF: React.FC<PaymentDetails & { currencyDataUri: string }> = ({
  accountName,
  accountNumber,
  branchNumber,
  note,
  discount,
  currencyDataUri,
}) => {
  const currency = useCurrency(),
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
              src={currencyDataUri}
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

export { Form, PDF, Preview };
