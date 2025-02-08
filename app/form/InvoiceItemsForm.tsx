"use client";

import { Controller } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/Input.tsx";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";
import { getCurrency } from "@/components/CurrencyInput.tsx";

export const InvoiceItemsForm = () => {
  const currency = getCurrency();
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <>
          {value.map(
            ({ description, quantity, price }: Item, index: number) => (
              <div
                key={index}
                className="flex relative group -mr-10"
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
                    className="rounded-md p-1.5 bg-neutral-50 opacity-0 group-hover:opacity-100"
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
