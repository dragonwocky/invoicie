import React from "react";
import {
  Columns,
  Frame,
  Skeleton,
  Subtitle,
  Subvalue,
  Title,
  Value,
} from "@/components/Typography.tsx";

export const InvoicedToPreview: React.FC<
  InvoicedTo & { onClick: () => void }
> = (
  {
    toName,
    toEmail,
    toPhone,
    toLogo,
    toDepartment,
    toAddress,
    toCity,
    toState,
    toCountry,
    toPostcode,
    onClick,
  },
) => (
  <div
    className="group cursor-pointer relative py-4 px-8"
    onClick={onClick}
  >
    <Frame />
    <Title>To</Title>
    <div className="flex gap-3 items-center h-12 mt-2 mb-4">
      {toLogo
        ? <img title="" className="w-10 h-10 rounded-full" src={toLogo} />
        : <Skeleton className="w-10 h-10 rounded-full" />}
      <div className="flex-1">
        {toName
          ? <Value className="font-bold">{toName}</Value>
          : <Skeleton className="h-6 w-full" />}
        {toDepartment && <Subvalue>{toDepartment}</Subvalue>}
      </div>
    </div>
    <div className="mb-4">
      {toAddress
        ? <Value>{toAddress}</Value>
        : <Skeleton className="h-4 w-2/3" />}
      {toCity || toState || toPostcode
        ? <Value>{toCity}, {toState} {toPostcode}</Value>
        : <Skeleton className="h-4 mt-1 w-full" />}
      {toCountry
        ? <Value>{toCountry}</Value>
        : <Skeleton className="h-4 mt-1 w-1/2" />}
    </div>
    <Columns className="mb-1">
      <Subtitle>Phone</Subtitle>
      {toPhone ? <Value>{toPhone}</Value> : <Skeleton className="h-4 w-full" />}
    </Columns>
    <Columns>
      <Subtitle>Email</Subtitle>
      {toEmail ? <Value>{toEmail}</Value> : <Skeleton className="h-4 w-full" />}
    </Columns>
  </div>
);
