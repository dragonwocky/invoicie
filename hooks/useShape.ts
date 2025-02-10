import { useValue } from "@/hooks/useValue.ts";

const useShape = (clientKey: string) => {
    const shapeKey = clientKey + "Shape";
    return { shapeKey, shape: useValue(shapeKey) };
  },
  useShapeStyle = (shape?: string) => {
    const square = shape === "square";
    return {
      tailwindShape: square ? "rounded-sm" : "rounded-full",
      cssShape: { borderRadius: square ? "4px" : "100%" },
    };
  };

export { useShape, useShapeStyle };
