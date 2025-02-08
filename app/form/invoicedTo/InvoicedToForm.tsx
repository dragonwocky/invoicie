import { TextInput } from "@/components/TextInput.tsx";
import { ImageInput } from "@/components/ImageInput.tsx";

export const InvoicedToForm = () => (
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
