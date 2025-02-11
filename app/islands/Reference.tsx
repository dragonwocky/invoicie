"use client";

import { Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";

import { DateInput } from "@/components/form/DateInput.tsx";
import { TextInput } from "@/components/form/TextInput.tsx";
import {
  Columns,
  Frame,
  pdfBorder,
  pdfStyles,
  Skeleton,
  Title,
  Value,
} from "@/components/Typography.tsx";

const Form = () => (
  <>
    <TextInput
      label="Invoice Number"
      placeholder={format(new Date(), "yMMdd-01")}
      clientKey="invoiceNumber"
    />
    <DateInput label="Issue Date" clientKey="issueDate" />
    <DateInput label="Due Date" clientKey="dueDate" />
  </>
);

const Preview: React.FC<
  InvoiceReference & { isQuote: boolean; onClick?: () => void }
> = ({
  invoiceNumber,
  issueDate,
  dueDate,
  isQuote,
  onClick,
}) => (
  <Columns
    className="group cursor-pointer relative py-4 border-b border-dashed"
    onClick={onClick}
  >
    <Frame />
    <div className="px-8">
      <Title>{isQuote ? "Quote" : "Invoice"} No</Title>
      {invoiceNumber
        ? <Value>{invoiceNumber}</Value>
        : <Skeleton className="h-4 w-full" />}
    </div>
    <Columns className="px-8">
      <div className="mr-2">
        <Title>Issued</Title>
        {issueDate
          ? <Value>{format(issueDate, "do MMM yyyy")}</Value>
          : <Skeleton className="h-4 w-full" />}
      </div>
      {!isQuote && (
        <div className="ml-2 text-right">
          <Title>Due</Title>
          {dueDate
            ? <Value>{format(dueDate, "do MMM yyyy")}</Value>
            : <Skeleton className="h-4 w-full" />}
        </div>
      )}
    </Columns>
  </Columns>
);

const PDF: React.FC<InvoiceReference & { isQuote: boolean }> = ({
  invoiceNumber,
  issueDate,
  dueDate,
  isQuote,
}) => (
  <View
    style={{
      ...pdfStyles.columns,
      paddingVertical: 16,
      borderBottom: pdfBorder,
    }}
  >
    <View style={{ flex: 1, paddingHorizontal: 32 }}>
      <Text style={pdfStyles.title}>{isQuote ? "Quote" : "Invoice"} No</Text>
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
      {!isQuote && (
        <View style={{ flex: 1, marginLeft: 8, textAlign: "right" }}>
          <Text style={pdfStyles.title}>Due</Text>
          {dueDate && (
            <Text style={pdfStyles.value}>
              {format(dueDate, "do MMM yyyy")}
            </Text>
          )}
        </View>
      )}
    </View>
  </View>
);

export { Form, PDF, Preview };
