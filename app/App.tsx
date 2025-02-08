"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Form } from "@/app/form/Form.tsx";
import { Preview } from "@/app/preview/Preview.tsx";

const App = () => {
  const methods = useForm(),
    [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return isClient
    ? (
      <FormProvider {...methods}>
        <Form />
        <Preview />
      </FormProvider>
    )
    : <></>;
};

export { App };
