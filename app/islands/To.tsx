"use client";

import { View } from "@react-pdf/renderer";

import * as Party from "@/app/islands/Party.tsx";
import { ImageInput } from "@/components/form/ImageInput.tsx";
import { TextInput } from "@/components/form/TextInput.tsx";

const Form = () => (
  <>
    <TextInput label="Name" placeholder="Name" clientKey="toName" />
    <TextInput
      label="Department"
      placeholder="IT Department"
      clientKey="toDepartment"
    />
    <TextInput label="Phone" placeholder="0XXX XXX XXX" clientKey="toPhone" />
    <TextInput
      label="Email"
      placeholder="name@company.com"
      clientKey="toEmail"
    />
    <ImageInput label="Logo" clientKey="toLogo" />
    <TextInput
      label="Address"
      placeholder="757 Swanston St"
      clientKey="toAddress"
    />
    <TextInput label="City" placeholder="Parkville" clientKey="toCity" />
    <TextInput label="State" placeholder="VIC" clientKey="toState" />
    <TextInput label="Country" placeholder="Australia" clientKey="toCountry" />
    <TextInput label="Postcode" placeholder="XXXX" clientKey="toPostcode" />
  </>
);

const Preview = ({
  toName,
  toDepartment,
  toEmail,
  toPhone,
  toLogo,
  toLogoShape,
  toAddress,
  toCity,
  toState,
  toCountry,
  toPostcode,
  onClick,
}: InvoicedTo & { onClick: () => void }) => (
  <Party.Preview
    title="To"
    name={toName}
    description={toDepartment}
    email={toEmail}
    phone={toPhone}
    logo={toLogo}
    logoShape={toLogoShape}
    address={toAddress}
    city={toCity}
    state={toState}
    country={toCountry}
    postcode={toPostcode}
    onClick={onClick}
  />
);

const PDF = ({
  toName,
  toDepartment,
  toEmail,
  toPhone,
  toLogo,
  toLogoShape,
  toAddress,
  toCity,
  toState,
  toCountry,
  toPostcode,
}: InvoicedTo) => (
  <View style={{ flex: 1 }}>
    <Party.PDF
      title="To"
      name={toName}
      description={toDepartment}
      email={toEmail}
      phone={toPhone}
      logo={toLogo}
      logoShape={toLogoShape}
      address={toAddress}
      city={toCity}
      state={toState}
      country={toCountry}
      postcode={toPostcode}
    />
  </View>
);

export { Form, PDF, Preview };
