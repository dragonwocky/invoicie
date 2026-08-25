"use client";

import { Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";

import { DateInput } from "@/components/form/DateInput.tsx";
import { TextInput } from "@/components/form/TextInput.tsx";
import { Columns, Frame, pdfBorder, pdfStyles, Skeleton, Title, Value } from "@/components/Typography.tsx";
import { useDocumentType, useReference } from "@/hooks/useReference.ts";
import { useInvoice } from "@/hooks/useValue.ts";

const Form: React.FC = () => (
  <>
    <TextInput
      label="Customer Code"
      placeholder="CUST"
      clientKey="customerCode"
    />
    <TextInput
      label="Customer Ref"
      placeholder="01"
      clientKey="customerRef"
    />
    <DateInput label="Issue Date" clientKey="issueDate" />
    <DateInput label="Due Date" clientKey="dueDate" />
    <DateInput label="Payment Date" clientKey="paymentDate" />
  </>
);

const Preview: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const {
    customerRef,
    issueDate,
    dueDate,
    paymentDate,
    isQuote,
    isReceipt,
  } = useInvoice();
  return (
    <Columns
      className="group cursor-pointer relative py-4 border-b border-dashed"
      onClick={onClick}
    >
      <Frame />
      <div className="px-8">
        <Title>{useDocumentType()} No</Title>
        {customerRef
          ? <Value>{useReference()}</Value>
          : <Skeleton className="h-4 w-full" />}
      </div>
      <Columns className="px-8">
        <div className="mr-2">
          <Title>{isReceipt ? "Invoiced" : "Issued"}</Title>
          {issueDate
            ? <Value>{format(issueDate, "do MMM yyyy")}</Value>
            : <Skeleton className="h-4 w-full" />}
        </div>
        {!isQuote && !isReceipt && (
          <div className="ml-2 text-right">
            <Title>Due</Title>
            {dueDate
              ? <Value>{format(dueDate, "do MMM yyyy")}</Value>
              : <Skeleton className="h-4 w-full" />}
          </div>
        )}
        {isReceipt && (
          <div className="ml-2 text-right">
            <Title>Paid</Title>
            {paymentDate
              ? <Value>{format(paymentDate, "do MMM yyyy")}</Value>
              : <Skeleton className="h-4 w-full" />}
          </div>
        )}
      </Columns>
    </Columns>
  );
};

const PDF: React.FC = () => {
  const {
    customerRef,
    issueDate,
    dueDate,
    paymentDate,
    isQuote,
    isReceipt,
  } = useInvoice();
  return (
    <View
      style={{
        ...pdfStyles.columns,
        paddingBottom: 16,
        borderBottom: pdfBorder,
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: 32 }}>
        <Text style={pdfStyles.title}>{useDocumentType()} No</Text>
        {customerRef && <Text style={pdfStyles.value}>{useReference()}</Text>}
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
        {!isQuote && !isReceipt && (
          <View style={{ flex: 1, marginLeft: 8, textAlign: "right" }}>
            <Text style={pdfStyles.title}>Due</Text>
            {dueDate && (
              <Text style={pdfStyles.value}>
                {format(dueDate, "do MMM yyyy")}
              </Text>
            )}
          </View>
        )}
        {isReceipt && (
          <View style={{ flex: 1, marginLeft: 8, textAlign: "right" }}>
            <Text style={pdfStyles.title}>Paid</Text>
            {paymentDate && (
              <Text style={pdfStyles.value}>
                {format(paymentDate, "do MMM yyyy")}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export { Form, PDF, Preview };
