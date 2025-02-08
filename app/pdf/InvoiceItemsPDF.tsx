import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { pdfBorder, pdfStyles } from "@/components/Typography.tsx";
import {
  addCommasToNumber,
  formatCurrencyValue,
} from "@/app/preview/InvoiceItemsPreview.tsx";

export const InvoiceItemsPDF: React.FC<{ items: Item[] }> = ({ items }) => (
  <View style={{ paddingTop: 16, paddingHorizontal: 32 }}>
    <View
      style={{
        ...pdfStyles.columns,
        borderBottom: pdfBorder,
        paddingBottom: 8,
      }}
    >
      <Text style={{ ...pdfStyles.title, flex: 1, marginRight: 32 }}>
        Description
      </Text>
      <View style={{ ...pdfStyles.columns, flex: 1, marginLeft: 32 }}>
        <Text style={{ ...pdfStyles.title, flex: 1 }}>Qty</Text>
        <Text style={{ ...pdfStyles.title, flex: 1 }}>Price</Text>
        <Text style={{ ...pdfStyles.title, flex: 1, textAlign: "right" }}>
          Amount
        </Text>
      </View>
    </View>
    {Array.isArray(items) &&
      items.map(({ description, quantity, price }, index) => (
        <View
          key={index}
          style={{
            ...pdfStyles.columns,
            borderBottom: pdfBorder,
            paddingVertical: 12,
          }}
        >
          <Text style={{ ...pdfStyles.value, flex: 1, marginRight: 32 }}>
            {description}
          </Text>
          <View style={{ ...pdfStyles.columns, flex: 1, marginLeft: 32 }}>
            <Text style={{ ...pdfStyles.value, flex: 1 }}>
              {addCommasToNumber(quantity || 0)}
            </Text>
            <Text style={{ ...pdfStyles.value, flex: 1 }}>
              {formatCurrencyValue(price || 0)}
            </Text>
            <Text style={{ ...pdfStyles.value, flex: 1, textAlign: "right" }}>
              {formatCurrencyValue((quantity || 0) * (price || 0))}
            </Text>
          </View>
        </View>
      ))}
  </View>
);
