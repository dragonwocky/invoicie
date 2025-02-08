import { TextInput } from "@/components/TextInput.tsx";
import { ImageInput } from "@/components/ImageInput.tsx";

export const InvoicedFromForm = () => (
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
