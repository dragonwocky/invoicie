import { getCurrency } from "@/components/CurrencyInput.tsx";
import {
  Columns,
  Frame,
  Skeleton,
  Subtitle,
  Subvalue,
  Title,
  Value,
} from "@/components/Typography.tsx";
import { format } from "date-fns";
import { useValue } from "@/hooks/useValue.ts";
import { formatCurrencyValue } from "@/app/preview/InvoiceItemsPreview.tsx";

const calculateTotalAmount = (items: Item[]): number =>
  Array.isArray(items)
    ? items.reduce((total, item) => {
      const quantity = item.quantity ? +item.quantity : 0,
        price = item.price ? +item.price : 0;
      return total + quantity * price;
    }, 0)
    : 0;

type Preview = React.FC<PaymentDetails & { onClick?: () => void }>;
const PaymentTermsPreview: Preview = (
  { invoiceNumber, issueDate, dueDate, onClick },
) => (
  <Columns
    className="group cursor-pointer relative py-4 border-b border-dashed"
    onClick={onClick}
  >
    <Frame />
    <div className="px-8">
      <Title>Invoice No</Title>
      {invoiceNumber
        ? <Value>{invoiceNumber}</Value>
        : <Skeleton className="h-4 w-full" />}
    </div>
    <Columns className="px-8">
      <div className="mr-2">
        <Title>Issued</Title>
        {issueDate
          ? <Value>{format(issueDate, "do MMM yyyy")}</Value>
          : <Skeleton className="h-4 w-full" />}
      </div>
      <div className="ml-2 text-right">
        <Title>Due</Title>
        {dueDate
          ? <Value>{format(dueDate, "do MMM yyyy")}</Value>
          : <Skeleton className="h-4 w-full" />}
      </div>
    </Columns>
  </Columns>
);

const PaymentDetailsPreview: Preview = (
  { accountName, accountNumber, branchNumber, note, discount, onClick },
) => {
  const currency = getCurrency(),
    subtotal = calculateTotalAmount(useValue("items")),
    discountValue = discount ? (+discount) / 100 * -subtotal : 0,
    total = subtotal + discountValue;
  return (
    <div className="group cursor-pointer relative" onClick={onClick}>
      <Frame />
      <Columns className="pb-4 border-b border-dashed">
        <div className="pt-3 px-8">
          {note && (
            <>
              <Title>Note</Title>
              <Value>{note}</Value>
            </>
          )}
        </div>
        <div className="px-8">
          {subtotal !== total &&
            (
              <>
                <Columns className="py-3 border-b border-dashed">
                  <Subtitle>Subtotal</Subtitle>
                  <Value className="text-right">
                    {formatCurrencyValue(subtotal)}
                  </Value>
                </Columns>
                <Columns className="py-3 border-b border-dashed">
                  <Subtitle>Discount ({discount}%)</Subtitle>
                  <Value className="text-right">
                    {formatCurrencyValue(discountValue)}
                  </Value>
                </Columns>
              </>
            )}
          <Columns className="items-center pt-3">
            <Subtitle>Total</Subtitle>
            <Value className="text-right font-bold text-base">
              {formatCurrencyValue(total)}
            </Value>
          </Columns>
        </div>
      </Columns>
      <Columns className="py-4">
        <div className="px-8">
          <Title>Payment Details</Title>
          <Columns className="mb-1">
            <Subtitle>Account Name</Subtitle>
            {accountName
              ? <Value>{accountName}</Value>
              : <Skeleton className="h-4 w-full" />}
          </Columns>
          <Columns className="mb-1">
            <Subtitle>Account Number</Subtitle>
            {accountNumber
              ? <Value>{accountNumber}</Value>
              : <Skeleton className="h-4 w-full" />}
          </Columns>
          <Columns className="mb-1">
            <Subtitle>BSB</Subtitle>
            {branchNumber
              ? <Value>{branchNumber}</Value>
              : <Skeleton className="h-4 w-full" />}
          </Columns>
        </div>
        <div className="px-8">
          <Title>Payable In</Title>
          <div className="flex gap-2 justify-between items-center w-full">
            <div className="flex gap-3 items-center">
              <currency.Icon className="w-8 h-8 rounded-full" />
              <div>
                <Value>{currency.name}</Value>
                <Subvalue>{currency.symbol} {currency.shortcode}</Subvalue>
              </div>
            </div>
          </div>
        </div>
      </Columns>
    </div>
  );
};

export { calculateTotalAmount, PaymentDetailsPreview, PaymentTermsPreview };
