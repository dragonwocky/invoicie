import { getCurrency } from "@/components/CurrencyInput.tsx";
import { Columns, Frame, Title, Value } from "@/components/Typography.tsx";

const addCommasToNumber = (number: number): string => {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  },
  formatCurrencyValue = (number: number): string => {
    number = Math.round((number + Number.EPSILON) * 100) / 100;
    const parts = addCommasToNumber(number).replace(/^-/, "").split(".");
    if (parts[1]) parts[1] = parts[1].padEnd(2, "0");
    const str = getCurrency().symbol + parts.join(".");
    return number < 0 ? `(${str})` : str;
  };

const InvoiceItemsPreview: React.FC<
  { items: Item[]; onClick?: () => void }
> = ({ items, onClick }) => (
  <div className="group cursor-pointer relative pt-4" onClick={onClick}>
    <Frame />
    <Columns className="mx-8 pb-2 border-b border-dashed">
      <Title className="mr-8">Description</Title>
      <Columns className="grid-cols-3 ml-8">
        <Title>Qty</Title>
        <Title>Price</Title>
        <Title className="text-right">Amount</Title>
      </Columns>
    </Columns>
    {Array.isArray(items) &&
      items.map(({ description, quantity, price }, index) => (
        <Columns key={index} className="mx-8 py-3 border-b border-dashed">
          <Value className="mr-8">{description}</Value>
          <Columns className="grid-cols-3 ml-8">
            <Value>{addCommasToNumber(quantity || 0)}</Value>
            <Value>{formatCurrencyValue(price || 0)}</Value>
            <Value className="text-right">
              {formatCurrencyValue((quantity || 0) * (price || 0))}
            </Value>
          </Columns>
        </Columns>
      ))}
  </div>
);

export { addCommasToNumber, formatCurrencyValue, InvoiceItemsPreview };
