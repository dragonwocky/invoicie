import { useValue } from "@/hooks/useValue.ts";
import { flagToDataUri } from "@/lib/svg.ts";
import { AU, EU, US } from "country-flag-icons/react/1x1";
import { type JSX } from "react";

const currencies: {
    name: string;
    country: string;
    symbol: string;
    shortcode: string;
    flagDataUri: string;
    Icon: (props: { className: string }) => JSX.Element;
  }[] = [
    {
      name: "Australian Dollar",
      country: "Australia",
      symbol: "$",
      shortcode: "AUD",
      flagDataUri: await flagToDataUri("AU"),
      Icon: (props: { className: string }) => AU({ className: props.className + " rounded-full" }),
    },
    {
      name: "United States Dollar",
      country: "United States",
      symbol: "$",
      shortcode: "USD",
      flagDataUri: await flagToDataUri("US"),
      Icon: (props: { className: string }) => US({ className: props.className + " rounded-full" }),
    },
    {
      name: "Euro",
      country: "European Union",
      symbol: "€",
      shortcode: "EUR",
      flagDataUri: await flagToDataUri("EU"),
      Icon: (props: { className: string }) => EU({ className: props.className + " rounded-full" }),
    },
  ],
  useCurrency = (shortcode = useValue("currency")) => {
    return currencies.find((currency) => currency.shortcode.toLowerCase() === shortcode?.toLowerCase())
      || currencies[0];
  };

export { currencies, useCurrency };
