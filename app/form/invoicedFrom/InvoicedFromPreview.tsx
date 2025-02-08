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

export const InvoicedFromPreview: React.FC<
  InvoicedFrom & { onClick: () => void }
> = (
  {
    fromName,
    fromEmail,
    fromPhone,
    fromLogo,
    fromAddress,
    fromCity,
    fromState,
    fromCountry,
    fromPostcode,
    fromABN,
    onClick,
  },
) => (
  <div
    className="group cursor-pointer relative py-4 px-8 border-r border-dashed"
    onClick={onClick}
  >
    <Frame />
    <Title>From</Title>
    <div className="flex gap-3 items-center h-12 mt-2 mb-4">
      {fromLogo
        ? <img title="" className="w-10 h-10 rounded-full" src={fromLogo} />
        : <Skeleton className="w-10 h-10 rounded-full" />}
      <div>
        {fromName
          ? <Value className="font-bold">{fromName}</Value>
          : <Skeleton className="h-6 w-full" />}
        {fromABN
          ? <Subvalue>ABN {fromABN}</Subvalue>
          : <Skeleton className="h-6 w-full" />}
      </div>
    </div>
    <div className="mb-4">
      {fromAddress
        ? <Value>{fromAddress}</Value>
        : <Skeleton className="h-4 w-2/3" />}
      {fromCity || fromState || fromPostcode
        ? <Value>{fromCity}, {fromState} {fromPostcode}</Value>
        : <Skeleton className="h-4 mt-1 w-full" />}
      {fromCountry
        ? <Value>{fromCountry}</Value>
        : <Skeleton className="h-4 mt-1 w-1/2" />}
    </div>
    <Columns className="mb-1">
      <Subtitle>Phone</Subtitle>
      {fromPhone
        ? <Value>{fromPhone}</Value>
        : <Skeleton className="h-4 w-full" />}
    </Columns>
    <Columns>
      <Subtitle>Email</Subtitle>
      {fromEmail
        ? <Value>{fromEmail}</Value>
        : <Skeleton className="h-4 w-full" />}
    </Columns>
  </div>
);
