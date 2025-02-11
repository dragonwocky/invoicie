import { Canvg } from "canvg";

const svgToDataUri = async (svgString: string) => {
    try {
      if (typeof document === "undefined") return "";
      const canvas: HTMLCanvasElement = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
      if (!ctx) return "";
      const v = Canvg.fromString(ctx, svgString.trim());
      await v.render();
      const dataUri = canvas.toDataURL("image/png");
      return dataUri;
    } catch {
      return "";
    }
  },
  flagToDataUri = async (countryCode: string) => {
    const flags = "https://catamphetamine.gitlab.io/country-flag-icons/1x1",
      flag = await fetch(`${flags}/${countryCode}.svg`);
    return await svgToDataUri(await flag.text()) || "";
  };

export { flagToDataUri, svgToDataUri };
