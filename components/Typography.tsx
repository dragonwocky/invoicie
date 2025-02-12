import { cn } from "@/lib/utils.ts";
import { StyleSheet } from "@react-pdf/renderer";
import { ChevronDown } from "lucide-react";
import { type ComponentProps, type FC } from "react";
import colors from "tailwindcss/colors";

const twStyle = (
  defaultClassName: string,
): FC<ComponentProps<"div">> =>
({ className, children, ...props }) => (
  <div className={cn(defaultClassName, className)} {...props}>{children}</div>
);

const Title = twStyle("text-[11px] font-bold uppercase mb-1 text-neutral-400"),
  Subtitle = twStyle("shrink-0 text-xs font-medium text-gray-500"),
  Value = twStyle("text-xs font-medium text-gray-800"),
  Subvalue = twStyle("text-xs font-medium text-neutral-400"),
  Columns = twStyle("grid grid-cols-2"),
  Skeleton = twStyle("shrink-0 rounded-md bg-neutral-100 animate-pulse"),
  Frame = () => (
    <>
      <ChevronDown className="animate-pulse w-5 h-5 text-primary rotate-[135deg] group-hover:block hidden absolute top-1.5 left-1.5" />
      <ChevronDown className="animate-pulse w-5 h-5 text-primary -rotate-[135deg] group-hover:block hidden absolute top-1.5 right-1.5" />
      <ChevronDown className="animate-pulse w-5 h-5 text-primary rotate-45 group-hover:block hidden absolute bottom-1.5 left-1.5" />
      <ChevronDown className="animate-pulse w-5 h-5 text-primary -rotate-45 group-hover:block hidden absolute bottom-1.5 right-1.5 " />
    </>
  );

const pdfStyles = StyleSheet.create({
    title: {
      fontSize: 11,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: colors.neutral[400],
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 12,
      fontWeight: "medium",
      color: colors.gray[500],
    },
    value: {
      fontSize: 12,
      fontWeight: "medium",
      color: colors.gray[800],
    },
    subvalue: {
      fontSize: 12,
      fontWeight: "medium",
      color: colors.neutral[400],
    },
    columns: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    }
  }),
  pdfBorder = `1px dashed hsl(240 5.9% 90%)`;

export {
  Columns,
  Frame,
  pdfBorder,
  pdfStyles,
  Skeleton,
  Subtitle,
  Subvalue,
  Title,
  Value
};

