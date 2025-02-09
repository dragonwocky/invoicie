import { flagToDataUri } from "@/app/utils.ts";
import { useValue } from "@/hooks/useValue.ts";
import { AU, EU, type FlagComponent, US } from "country-flag-icons/react/1x1";

const currencies: {
    name: string;
    country: string;
    symbol: string;
    shortcode: string;
    iconId: string;
    Icon: FlagComponent;
  }[] = [
    {
      name: "Australian Dollar",
      country: "Australia",
      symbol: "$",
      shortcode: "AUD",
      iconId: "AU",
      Icon: AU,
    },
    {
      name: "United States Dollar",
      country: "United States",
      symbol: "$",
      shortcode: "USD",
      iconId: "US",
      Icon: US,
    },
    {
      name: "Euro",
      country: "European Union",
      symbol: "€",
      shortcode: "EUR",
      iconId: "EU",
      Icon: EU,
    },
  ],
  useCurrency = (shortcode = useValue("currency")) => {
    return currencies.find((currency) =>
      currency.shortcode.toLowerCase() === shortcode?.toLowerCase()
    ) || currencies[0];
  },
  useFlag = () => flagToDataUri(useCurrency().iconId);

export { currencies, useCurrency, useFlag };
