"use client";

import * as Party from "@/app/islands/Party.tsx";
import { ImageInput } from "@/components/form/ImageInput.tsx";
import { TextInput } from "@/components/form/TextInput.tsx";
import { pdfBorder } from "@/components/Typography.tsx";
import { useDocument } from "@/hooks/useDocument.ts";
import { View } from "@react-pdf/renderer";

const Form: React.FC = () => (
  <>
    <TextInput label="Name" placeholder="Name" clientKey="fromName" />
    <TextInput label="ABN" placeholder="XX XXX XXX XXX" clientKey="fromABN" />
    <TextInput label="Phone" placeholder="0XXX XXX XXX" clientKey="fromPhone" />
    <TextInput
      label="Email"
      placeholder="name@me.com"
      clientKey="fromEmail"
    />
    <ImageInput label="Logo" clientKey="fromLogo" />
    <TextInput
      label="Address"
      placeholder="757 Swanston St"
      clientKey="fromAddress"
    />
    <TextInput label="City" placeholder="Parkville" clientKey="fromCity" />
    <TextInput label="State" placeholder="VIC" clientKey="fromState" />
    <TextInput
      label="Country"
      placeholder="Australia"
      clientKey="fromCountry"
    />
    <TextInput label="Postcode" placeholder="XXXX" clientKey="fromPostcode" />
  </>
);

const Preview: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const {
    fromName,
    fromABN,
    fromEmail,
    fromPhone,
    fromLogo,
    fromLogoShape,
    fromAddress,
    fromCity,
    fromState,
    fromCountry,
    fromPostcode,
  } = useDocument();
  return (
    <div className="border-r border-dashed">
      <Party.Preview
        title="From"
        name={fromName}
        description={fromABN ? `ABN ${fromABN}` : ""}
        email={fromEmail}
        phone={fromPhone}
        logo={fromLogo}
        logoShape={fromLogoShape}
        address={fromAddress}
        city={fromCity}
        state={fromState}
        country={fromCountry}
        postcode={fromPostcode}
        onClick={onClick}
      />
    </div>
  );
};

const PDF: React.FC = () => {
  const {
    fromName,
    fromABN,
    fromEmail,
    fromPhone,
    fromLogo,
    fromLogoShape,
    fromAddress,
    fromCity,
    fromState,
    fromCountry,
    fromPostcode,
  } = useDocument();
  return (
    <View style={{ flex: 1, borderRight: pdfBorder }}>
      <Party.PDF
        title="From"
        name={fromName}
        description={fromABN ? `ABN ${fromABN}` : ""}
        email={fromEmail}
        phone={fromPhone}
        logo={fromLogo}
        logoShape={fromLogoShape}
        address={fromAddress}
        city={fromCity}
        state={fromState}
        country={fromCountry}
        postcode={fromPostcode}
      />
    </View>
  );
};

export { Form, PDF, Preview };
