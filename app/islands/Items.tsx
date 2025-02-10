"use client";

import { Text, View } from "@react-pdf/renderer";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";

import { addCommasToNumber, formatCurrencyValue } from "@/app/utils.ts";
import { Input } from "@/components/form/Input.tsx";
import {
  Columns,
  Frame,
  pdfBorder,
  pdfStyles,
  Title,
  Value,
} from "@/components/Typography.tsx";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";
import { useCurrency } from "@/hooks/useCurrency.ts";

const Form = () => {
  const currency = useCurrency();
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <>
          {value.map(
            ({ description, quantity, price }: Item, index: number) => (
              <div
                key={index}
                className="flex relative group md:-mr-10"
              >
                <div className="w-full flex-1">
                  <Input
                    type="text"
                    value={description}
                    placeholder="Item description"
                    onChange={(e) => {
                      const items = [...value],
                        description = e.target.value;
                      items[index] = { description, quantity, price };
                      setClientValue("items", items);
                      onChange(items);
                    }}
                  />
                </div>
                <div className="relative flex gap-2">
                  <span className="absolute text-gray-400">#</span>
                  <Input
                    type="number"
                    value={quantity ?? ""}
                    className="pl-4 w-16"
                    placeholder="Qty"
                    onChange={(e) => {
                      const items = [...value];
                      if (e.target.value !== "") {
                        let quantity = Math.max(+e.target.value, 0);
                        if (isNaN(quantity)) quantity = 0;
                        items[index] = { description, quantity, price };
                      } else items[index] = { description, price };
                      setClientValue("items", items);
                      onChange(items);
                    }}
                  />
                </div>
                <div className="relative flex gap-2">
                  <span className="absolute text-gray-400">
                    {currency.symbol}
                  </span>
                  <Input
                    type="number"
                    value={price ?? ""}
                    className="pl-4 w-16"
                    placeholder="Price"
                    onChange={(e) => {
                      const items = [...value];
                      if (e.target.value !== "") {
                        let price = +e.target.value;
                        if (isNaN(price)) price = 0;
                        items[index] = { description, quantity, price };
                      } else items[index] = { description, quantity };
                      setClientValue("items", items);
                      onChange(items);
                    }}
                  />
                </div>
                <div className="ml-2 -mt-1 w-8">
                  <button
                    type="button"
                    title="Delete item"
                    className="rounded-md p-1.5 bg-neutral-50 md:opacity-0 group-hover:opacity-100"
                    onClick={() => {
                      const items = [...value];
                      items.splice(index, 1);
                      setClientValue("items", items);
                      onChange(items);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-primary" />
                  </button>
                </div>
              </div>
            ),
          )}
          <div className="mb-6 pb-2 border-b-2 border-dashed transition-colors focus-within:border-primary">
            <button
              type="button"
              className="flex items-center text-primary gap-2"
              onClick={() => {
                const items = [...value, { description: "" }];
                setClientValue("items", items);
                onChange(items);
              }}
            >
              <Plus className="w-4 h-4" />
              <p className="font-medium">Add Item</p>
            </button>
          </div>
        </>
      )}
      name="items"
      defaultValue={useClientValue<Item[]>("items", [{ description: "" }])}
    />
  );
};

const Preview: React.FC<
  { items: Item[]; onClick?: () => void }
> = ({ items, onClick }) => (
  <div className="group cursor-pointer relative pt-4" onClick={onClick}>
    <Frame />
    <Columns className="mx-8 pb-2 border-b border-dashed">
      <Title className="mr-8">Description</Title>
      <Columns className="grid-cols-3 ml-8">
        <Title>Qty</Title>
        <Title>Price</Title>
        <Title className="text-right">Amount</Title>
      </Columns>
    </Columns>
    {Array.isArray(items) &&
      items.map(({ description, quantity, price }, index) => (
        <Columns key={index} className="mx-8 py-3 border-b border-dashed">
          <Value className="mr-8">{description}</Value>
          <Columns className="grid-cols-3 ml-8">
            <Value>{addCommasToNumber(quantity || 0)}</Value>
            <Value>{formatCurrencyValue(price || 0)}</Value>
            <Value className="text-right">
              {formatCurrencyValue((quantity || 0) * (price || 0))}
            </Value>
          </Columns>
        </Columns>
      ))}
  </div>
);

const PDF: React.FC<{ items: Item[] }> = ({ items }) => (
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
          wrap={false}
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

export { Form, PDF, Preview };
