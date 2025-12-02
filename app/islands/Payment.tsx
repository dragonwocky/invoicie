"use client";

import { Image, Link, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";

import { CurrencyInput } from "@/components/form/CurrencyInput.tsx";
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
import { useInvoice, useValue } from "@/hooks/useValue.ts";
import { calculateTotal, formatCurrencyValue } from "@/lib/utils.ts";

const Form: React.FC = () => (
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
      label="Description"
      placeholder={format(new Date(), "yMMdd-01")}
      clientKey="paymentDescription"
    />
    <CurrencyInput label="Currency" clientKey="currency" />
    <TextInput
      label="URL"
      placeholder="https://checkout.stripe.com/..."
      clientKey="paymentUrl"
    />
    <TextInput label="Note" placeholder="Add a note..." clientKey="note" />
  </>
);

const Preview: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const {
      accountName,
      accountNumber,
      branchNumber,
      paymentDescription,
      paymentUrl,
      note,
      isQuote,
    } = useInvoice(),
    currency = useCurrency(),
    total = calculateTotal(useValue("items"));
  return (
    <div className="group cursor-pointer relative" onClick={onClick}>
      <Frame />
      <Columns className="pb-4 mb-4 border-b border-dashed">
        <div className="pt-3 px-8">
          {note && (
            <>
              <Title>Note</Title>
              <Value>{note}</Value>
            </>
          )}
        </div>
        <div className="px-8">
          <Columns className="items-center pt-3">
            <Title>Total</Title>
            <Value className="text-right font-bold text-base">
              {formatCurrencyValue(total)}
            </Value>
          </Columns>
        </div>
      </Columns>
      {!isQuote && paymentUrl && (
        <Columns className="grid-cols-4 pb-3">
          <Title className="pl-8 mb-0 mt-px">Pay Online</Title>
          <Value className="pr-8 col-span-3 underline truncate">
            <a href={paymentUrl} target="_blank">{paymentUrl}</a>
          </Value>
        </Columns>
      )}
      <Columns className="pb-5">
        <div className="px-8">
          {!isQuote && (
            <>
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
              {paymentDescription &&
                (
                  <Columns className="mb-1">
                    <Subtitle>Description</Subtitle>
                    <Value>{paymentDescription}</Value>
                  </Columns>
                )}
            </>
          )}
        </div>
        <div className="px-8">
          <Title>Payable In</Title>
          <div className="flex gap-2 justify-between items-center w-full">
            <div className="flex gap-3 items-center">
              <currency.Icon className="w-8 h-8 shrink-0 rounded-full" />
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

const PDF: React.FC = () => {
  const {
      accountName,
      accountNumber,
      branchNumber,
      paymentDescription,
      paymentUrl,
      isQuote,
      note,
    } = useInvoice(),
    currency = useCurrency(),
    total = calculateTotal(useValue("items"));
  return (
    <>
      <View
        wrap={false}
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
          <View style={{ ...pdfStyles.columns, paddingTop: 12 }}>
            <Text style={pdfStyles.title}>Total</Text>
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
      <View wrap={false} style={{ marginTop: 16 }}>
        {!isQuote && paymentUrl && (
          <View
            style={{
              ...pdfStyles.columns,
              justifyContent: "center",
              paddingHorizontal: 32,
              paddingBottom: 12,
            }}
          >
            <Text
              style={{
                ...pdfStyles.title,
                marginBottom: 0,
                marginTop: 1,
                width: 148,
              }}
            >
              Pay Online
            </Text>
            <Link
              src={paymentUrl}
              style={{
                ...pdfStyles.value,
                textDecoration: "underline",
                width: "100%",
              }}
            >
              {paymentUrl.length > 64
                ? paymentUrl.slice(0, 64) + "..."
                : paymentUrl}
            </Link>
          </View>
        )}
        <View
          style={{ display: "flex", flexDirection: "row", paddingBottom: 20 }}
        >
          <View style={{ flex: 1, paddingHorizontal: 32 }}>
            {!isQuote && (
              <>
                <Text style={pdfStyles.title}>Payment Details</Text>
                {accountName && (
                  <View style={{ ...pdfStyles.columns, marginBottom: 4 }}>
                    <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>
                      Account Name
                    </Text>
                    <Text style={{ ...pdfStyles.value, flex: 1 }}>
                      {accountName}
                    </Text>
                  </View>
                )}
                {accountNumber && (
                  <View style={{ ...pdfStyles.columns, marginBottom: 4 }}>
                    <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>
                      Account Number
                    </Text>
                    <Text style={{ ...pdfStyles.value, flex: 1 }}>
                      {accountNumber}
                    </Text>
                  </View>
                )}
                {branchNumber && (
                  <View style={{ ...pdfStyles.columns, marginBottom: 4 }}>
                    <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>BSB</Text>
                    <Text style={{ ...pdfStyles.value, flex: 1 }}>
                      {branchNumber}
                    </Text>
                  </View>
                )}
                {paymentDescription && (
                  <View style={{ ...pdfStyles.columns, marginBottom: 4 }}>
                    <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>
                      Description
                    </Text>
                    <Text style={{ ...pdfStyles.value, flex: 1 }}>
                      {paymentDescription}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
          <View style={{ flex: 1, paddingHorizontal: 32 }}>
            <Text style={pdfStyles.title}>Payable In</Text>
            <View style={pdfStyles.columns}>
              <Image
                src={currency.flagDataUri}
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
      </View>
    </>
  );
};

export { Form, PDF, Preview };
