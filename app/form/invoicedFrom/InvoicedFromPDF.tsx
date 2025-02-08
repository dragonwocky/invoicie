"use client";

import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import { pdfBorder, pdfStyles } from "@/components/Typography.tsx";

export const InvoicedFromPDF: React.FC<InvoicedFrom> = ({
  fromName,
  fromEmail,
  fromPhone,
  fromLogo,
  fromAddress,
  fromCity,
  fromState,
  fromCountry,
  fromPostcode,
  fromABN,
}) => (
  <View style={{ flex: 1, padding: "16px 32px", borderRight: pdfBorder }}>
    <Text style={pdfStyles.title}>From</Text>
    <View
      style={{
        ...pdfStyles.columns,
        marginTop: 8,
        marginBottom: 12,
        height: 48,
      }}
    >
      {fromLogo && <Image style={pdfStyles.image} src={fromLogo} />}
      <View>
        {fromName && (
          <Text style={{ ...pdfStyles.value, fontWeight: "bold" }}>
            {fromName}
          </Text>
        )}
        {fromABN && <Text style={pdfStyles.subvalue}>ABN {fromABN}</Text>}
      </View>
    </View>
    <View style={{ marginBottom: 12 }}>
      {fromAddress && <Text style={pdfStyles.value}>{fromAddress}</Text>}
      {(fromCity || fromState || fromPostcode) &&
        (
          <Text style={pdfStyles.value}>
            {fromCity}, {fromState} {fromPostcode}
          </Text>
        )}
      {fromCountry && <Text style={pdfStyles.value}>{fromCountry}</Text>}
    </View>
    <View style={pdfStyles.columns}>
      <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>Phone</Text>
      {fromPhone && (
        <Text style={{ ...pdfStyles.value, flex: 1 }}>{fromPhone}</Text>
      )}
    </View>
    <View style={pdfStyles.columns}>
      <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>Email</Text>
      {fromEmail && (
        <Text style={{ ...pdfStyles.value, flex: 1 }}>{fromEmail}</Text>
      )}
    </View>
  </View>
);
