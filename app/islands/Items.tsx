"use client";

import { Text, View } from "@react-pdf/renderer";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";

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
import {
  addCommasToNumber,
  calculateSubtotal,
  formatCurrencyValue,
} from "@/lib/utils.ts";
import { useValue } from "@/hooks/useValue.ts";

const Form: React.FC = () => {
  const currency = useCurrency();
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <>
          {value.map(
            (item: Item, index: number) => (
              <div
                key={index}
                className="flex relative group md:-mr-10"
              >
                <div className="w-full flex-1">
                  <Input
                    type="text"
                    className="mr-3"
                    value={item.description}
                    placeholder="Item description"
                    onChange={(e) => {
                      const items = [...value],
                        description = e.target.value;
                      items[index] = { ...item, description };
                      setClientValue("items", items);
                      onChange(items);
                    }}
                  />
                </div>
                <div className="relative flex gap-2">
                  <span className="absolute text-gray-400">#</span>
                  <Input
                    type="number"
                    value={item.quantity ?? ""}
                    className="pl-4 w-16"
                    placeholder="Qty"
                    onChange={(e) => {
                      const items = [...value];
                      if (e.target.value !== "") {
                        let quantity = Math.max(+e.target.value, 0);
                        if (isNaN(quantity)) quantity = 0;
                        items[index] = { ...item, quantity };
                      } else items[index] = { ...item, quantity: undefined };
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
                    value={item.price ?? ""}
                    className="pl-4 w-16"
                    placeholder="Price"
                    onChange={(e) => {
                      const items = [...value];
                      if (e.target.value !== "") {
                        let price = +e.target.value;
                        if (isNaN(price)) price = 0;
                        items[index] = { ...item, price };
                      } else items[index] = { ...item, price: undefined };
                      setClientValue("items", items);
                      onChange(items);
                    }}
                  />
                </div>
                <div className="relative flex gap-2">
                  <Input
                    type="number"
                    value={item.discount ?? ""}
                    className="pr-4 w-16"
                    placeholder="Disc."
                    onChange={(e) => {
                      const items = [...value];
                      if (e.target.value !== "") {
                        let discount = +e.target.value;
                        if (isNaN(discount)) discount = 0;
                        discount = Math.max(0, Math.min(100, discount));
                        items[index] = { ...item, discount };
                      } else items[index] = { ...item, discount: undefined };
                      setClientValue("items", items);
                      onChange(items);
                    }}
                  />
                  <span className="absolute right-0 text-gray-400">%</span>
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

const Preview: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const items = useValue<Item[]>("items");
  return (
    <div className="group cursor-pointer relative pt-4" onClick={onClick}>
      <Frame />
      <Columns className="mx-8 pb-2 border-b border-dashed">
        <Columns className="mr-8 grid-cols-5">
          <Title className="col-span-4">Description</Title>
          <Title className="text-right">Qty</Title>
        </Columns>
        <Columns className="grid-cols-3 ml-8">
          <Title>Price</Title>
          <Title className="pr-4">Discount</Title>
          <Title className="text-right">Subtotal</Title>
        </Columns>
      </Columns>
      {Array.isArray(items) &&
        items.map((item, index) => (
          <Columns key={index} className="mx-8 py-3 border-b border-dashed">
            <Columns className="mr-8 grid-cols-5">
              <Value className="col-span-4">{item.description}</Value>
              <Value className="text-right">
                {addCommasToNumber(item.quantity || 0)}
              </Value>
            </Columns>
            <Columns className="grid-cols-3 ml-8">
              <Value>{formatCurrencyValue(item.price || 0)}</Value>
              <Value>{item.discount ? `${item.discount}%` : "-"}</Value>
              <Value className="text-right">
                {formatCurrencyValue(calculateSubtotal(item))}
              </Value>
            </Columns>
          </Columns>
        ))}
    </div>
  );
};

const PDF: React.FC = () => {
  const items = useValue<Item[]>("items");
  return (
    <View style={{ paddingTop: 16, paddingHorizontal: 32 }}>
      <View
        style={{
          ...pdfStyles.columns,
          borderBottom: pdfBorder,
          paddingBottom: 8,
        }}
      >
        <View style={{ ...pdfStyles.columns, flex: 1, marginRight: 32 }}>
          <Text style={{ ...pdfStyles.title, flex: 4 }}>Description</Text>
          <Text style={{ ...pdfStyles.title, flex: 1, textAlign: "right" }}>
            Qty
          </Text>
        </View>
        <View style={{ ...pdfStyles.columns, flex: 1, marginLeft: 32 }}>
          <Text style={{ ...pdfStyles.title, flex: 1 }}>Price</Text>
          <Text style={{ ...pdfStyles.title, flex: 1 }}>Discount</Text>
          <Text style={{ ...pdfStyles.title, flex: 1, textAlign: "right" }}>
            Subtotal
          </Text>
        </View>
      </View>
      {Array.isArray(items) &&
        items.map((item, index) => (
          <View
            key={index}
            wrap={false}
            style={{
              ...pdfStyles.columns,
              borderBottom: pdfBorder,
              paddingVertical: 12,
            }}
          >
            <View style={{ ...pdfStyles.columns, flex: 1, marginRight: 32 }}>
              <Text style={{ ...pdfStyles.value, flex: 4 }}>
                {item.description}
              </Text>
              <Text
                style={{ ...pdfStyles.value, flex: 1, textAlign: "right" }}
              >
                {addCommasToNumber(item.quantity || 0)}
              </Text>
            </View>
            <View style={{ ...pdfStyles.columns, flex: 1, marginLeft: 32 }}>
              <Text style={{ ...pdfStyles.value, flex: 1 }}>
                {formatCurrencyValue(item.price || 0)}
              </Text>
              <Text style={{ ...pdfStyles.value, flex: 1 }}>
                {item.discount ? `${item.discount}%` : "-"}
              </Text>
              <Text
                style={{ ...pdfStyles.value, flex: 1, textAlign: "right" }}
              >
                {formatCurrencyValue(calculateSubtotal(item))}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
};

export { Form, PDF, Preview };
