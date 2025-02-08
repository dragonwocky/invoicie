"use client";

import { AU, EU, type FlagComponent, US } from "country-flag-icons/react/1x1";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";

import { useValue } from "@/hooks/useValue.ts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { setClientValue, useClientValue } from "@/hooks/useClientValue.ts";
import { svgToDataUri } from "@/app/utils.ts";

type CurrencyInputProps = {
  label?: string;
  clientKey: string;
};

const getFlag = async (countryCode: string) => {
  const flags = "https://catamphetamine.gitlab.io/country-flag-icons/1x1",
    flag = await fetch(`${flags}/${countryCode}.svg`);
  return await svgToDataUri(await flag.text()) || "";
};

const currencies: {
    name: string;
    country: string;
    symbol: string;
    shortcode: string;
    iconDataUri: string;
    Icon: FlagComponent;
  }[] = [
    {
      name: "Australian Dollar",
      country: "Australia",
      symbol: "$",
      shortcode: "AUD",
      iconDataUri: await getFlag("AU"),
      Icon: AU,
    },
    {
      name: "United States Dollar",
      country: "United States",
      symbol: "$",
      shortcode: "USD",
      iconDataUri: await getFlag("US"),
      Icon: US,
    },
    {
      name: "Euro",
      country: "European Union",
      symbol: "€",
      shortcode: "EUR",
      iconDataUri: await getFlag("EU"),
      Icon: EU,
    },
  ],
  getCurrency = (shortcode = useValue("currency")) => {
    return currencies.find((currency) =>
      currency.shortcode.toLowerCase() === shortcode?.toLowerCase()
    ) || currencies[0];
  };

const CurrencyInput = ({ label, clientKey }: CurrencyInputProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        const selected = getCurrency(value);
        return (
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger className="flex w-full mb-6 pb-2 border-b-2 border-dashed transition-colors focus-within:border-primary">
              {label && <div className="shrink-0 mr-4 font-medium">{label}
              </div>}
              <div className="ml-auto flex gap-1.5 items-center pl-2 pr-2.5 py-0.5 bg-neutral-100 rounded-full">
                <selected.Icon className="w-4 h-4 rounded-full" />
                <p className="font-medium">{selected.shortcode}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-3" align="end">
              <Command className="w-full">
                <CommandInput
                  placeholder="Search..."
                  className="peer block w-full caret-primary"
                />
                <CommandEmpty>
                  <p className="text-neutral-500 p-4 text-left font-medium">
                    No currency found.
                  </p>
                </CommandEmpty>
                <CommandGroup className="max-h-96 overflow-y-auto scrollbar-hide">
                  {currencies.map((currency) => (
                    <CommandItem
                      key={currency.shortcode}
                      onSelect={() => {
                        setClientValue(clientKey, currency.shortcode);
                        onChange(currency.shortcode);
                        setOpen(false);
                      }}
                      className="w-full cursor-pointer my-2"
                    >
                      <div className="flex gap-2 justify-between items-center w-full">
                        <div className="flex gap-2 items-center font-medium">
                          <currency.Icon className="w-6 h-6 rounded-full border" />
                          <p>{currency.name}</p>
                          <p className="text-neutral-500">
                            {currency.shortcode}
                          </p>
                        </div>
                        {selected.shortcode === currency.shortcode && (
                          <CheckCircle2 className="h-6 w-6 rounded-full opacity-100 bg-primary text-white" />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
      defaultValue={useClientValue(clientKey, currencies[0].shortcode)}
      name={clientKey}
    />
  );
};

export { CurrencyInput, getCurrency };
