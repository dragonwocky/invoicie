"use client";

import { Image, Text, View } from "@react-pdf/renderer";

import {
  Columns,
  Frame,
  pdfStyles,
  Skeleton,
  Subtitle,
  Subvalue,
  Title,
  Value,
} from "@/components/Typography.tsx";

const Preview: React.FC<Party & { onClick: () => void }> = ({
  title,
  name,
  description,
  email,
  phone,
  logo,
  address,
  city,
  state,
  country,
  postcode,
  onClick,
}) => (
  <div
    className="group cursor-pointer relative py-4 px-8"
    onClick={onClick}
  >
    <Frame />
    <Title>{title}</Title>
    <div className="flex gap-3 items-center h-12 mt-2 mb-4">
      {logo
        ? <img title="" className="w-10 h-10 rounded-full" src={logo} />
        : <Skeleton className="w-10 h-10 rounded-full" />}
      <div className="flex-1">
        {name
          ? <Value className="font-bold">{name}</Value>
          : <Skeleton className="h-6 w-full" />}
        {description && <Subvalue>{description}</Subvalue>}
      </div>
    </div>
    <div className="mb-4">
      {address ? <Value>{address}</Value> : <Skeleton className="h-4 w-2/3" />}
      {city || state || postcode
        ? <Value>{city}, {state} {postcode}</Value>
        : <Skeleton className="h-4 mt-1 w-full" />}
      {country
        ? <Value>{country}</Value>
        : <Skeleton className="h-4 mt-1 w-1/2" />}
    </div>
    <Columns className="mb-1">
      <Subtitle>Phone</Subtitle>
      {phone ? <Value>{phone}</Value> : <Skeleton className="h-4 w-full" />}
    </Columns>
    <Columns>
      <Subtitle>Email</Subtitle>
      {email ? <Value>{email}</Value> : <Skeleton className="h-4 w-full" />}
    </Columns>
  </div>
);

const PDF: React.FC<Party> = ({
  title,
  name,
  description,
  email,
  phone,
  logo,
  address,
  city,
  state,
  country,
  postcode,
}) => (
  <View style={{ paddingVertical: 16, paddingHorizontal: 32 }}>
    <Text style={pdfStyles.title}>{title}</Text>
    <View
      style={{
        ...pdfStyles.columns,
        marginTop: 8,
        marginBottom: 16,
        height: 48,
      }}
    >
      {logo && <Image style={pdfStyles.image} src={logo} />}
      <View>
        {name && (
          <Text style={{ ...pdfStyles.value, fontWeight: "bold" }}>
            {name}
          </Text>
        )}
        {description && <Text style={pdfStyles.subvalue}>{description}</Text>}
      </View>
    </View>
    <View style={{ marginBottom: 16 }}>
      {address && <Text style={pdfStyles.value}>{address}</Text>}
      {(city || state || postcode) &&
        <Text style={pdfStyles.value}>{city}, {state} {postcode}</Text>}
      {country && <Text style={pdfStyles.value}>{country}</Text>}
    </View>
    <View style={{ ...pdfStyles.columns, marginBottom: 1 }}>
      <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>Phone</Text>
      {phone && <Text style={{ ...pdfStyles.value, flex: 1 }}>{phone}</Text>}
    </View>
    <View style={pdfStyles.columns}>
      <Text style={{ ...pdfStyles.subtitle, flex: 1 }}>Email</Text>
      {email && <Text style={{ ...pdfStyles.value, flex: 1 }}>{email}</Text>}
    </View>
  </View>
);

export { PDF, Preview };
