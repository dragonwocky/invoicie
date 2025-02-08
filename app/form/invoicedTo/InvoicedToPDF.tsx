"use client";

import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "@/components/Typography.tsx";

export const InvoicedToPDF: React.FC<InvoicedTo> = ({
  toName,
  toEmail,
  toPhone,
  toLogo,
  toDepartment,
  toAddress,
  toCity,
  toState,
  toCountry,
  toPostcode,
}) => (
  <View style={{ flex: 1, padding: "16px 32px" }}>
    <Text style={pdfStyles.title}>To</Text>
    <View
      style={{
        ...pdfStyles.columns,
        marginTop: 8,
        marginBottom: 12,
        height: 48,
      }}
    >
      {toLogo && <Image style={pdfStyles.image} src={toLogo} />}
      <View>
        {toName && (
          <Text style={{ ...pdfStyles.value, fontWeight: "bold" }}>
            {toName}
          </Text>
        )}
        {toDepartment && <Text style={pdfStyles.subvalue}>{toDepartment}</Text>}
      </View>
    </View>
    <View style={{ marginBottom: 12 }}>
      {toAddress && <Text style={pdfStyles.value}>{toAddress}</Text>}
      {(toCity || toState || toPostcode) &&
        (
          <Text style={pdfStyles.value}>
            {toCity}, {toState} {toPostcode}
          </Text>
        )}
      {toCountry && <Text style={pdfStyles.value}>{toCountry}</Text>}
    </View>
    <View style={pdfStyles.columns}>
      <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>Phone</Text>
      {toPhone && <Text style={{ ...pdfStyles.value, flex: 1 }}>{toPhone}
      </Text>}
    </View>
    <View style={pdfStyles.columns}>
      <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>Email</Text>
      {toEmail && <Text style={{ ...pdfStyles.value, flex: 1 }}>{toEmail}
      </Text>}
    </View>
  </View>
);
