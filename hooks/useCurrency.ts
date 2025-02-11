import { useValue } from "@/hooks/useValue.ts";
import { flagToDataUri } from "@/lib/svg.ts";
import { AU, EU, type FlagComponent, US } from "country-flag-icons/react/1x1";

const currencies: {
    name: string;
    country: string;
    symbol: string;
    shortcode: string;
    flagDataUri: string;
    Icon: FlagComponent;
  }[] = [
    {
      name: "Australian Dollar",
      country: "Australia",
      symbol: "$",
      shortcode: "AUD",
      flagDataUri: await flagToDataUri("AU"),
      Icon: AU,
    },
    {
      name: "United States Dollar",
      country: "United States",
      symbol: "$",
      shortcode: "USD",
      flagDataUri: await flagToDataUri("US"),
      Icon: US,
    },
    {
      name: "Euro",
      country: "European Union",
      symbol: "€",
      shortcode: "EUR",
      flagDataUri: await flagToDataUri("EU"),
      Icon: EU,
    },
  ],
  useCurrency = (shortcode = useValue("currency")) => {
    return currencies.find((currency) =>
      currency.shortcode.toLowerCase() === shortcode?.toLowerCase()
    ) || currencies[0];
  };

export { currencies, useCurrency };
