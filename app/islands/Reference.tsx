"use client";

import { format } from "date-fns";
import React from "react";

import {
  Columns,
  Frame,
  pdfBorder,
  pdfStyles,
  Skeleton,
  Title,
  Value,
} from "@/components/Typography.tsx";
import { Text, View } from "@react-pdf/renderer";

const Preview: React.FC<PaymentDetails & { onClick?: () => void }> = ({
  invoiceNumber,
  issueDate,
  dueDate,
  onClick,
}) => (
  <Columns
    className="group cursor-pointer relative py-4 border-b border-dashed"
    onClick={onClick}
  >
    <Frame />
    <div className="px-8">
      <Title>Invoice No</Title>
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
      <div className="ml-2 text-right">
        <Title>Due</Title>
        {dueDate
          ? <Value>{format(dueDate, "do MMM yyyy")}</Value>
          : <Skeleton className="h-4 w-full" />}
      </div>
    </Columns>
  </Columns>
);

const PDF: React.FC<PaymentDetails> = ({
  invoiceNumber,
  issueDate,
  dueDate,
}) => (
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

export { PDF, Preview };
