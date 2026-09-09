import { svgToDataUri } from "@/lib/svg.ts";

const stripeDataUri = globalThis.window
  ? svgToDataUri(await fetch("/stripe.svg").then((res) => res.text()))
  : "";

const useSvg = (icon: "stripe") => {
  if (icon === "stripe") return stripeDataUri;
  return "";
};

export { useSvg };
