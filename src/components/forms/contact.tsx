"use client";
import { useSearchParams } from "next/navigation";

import {
  Input,
  Textarea,
  type TextAreaProps,
  type InputProps,
} from "@nextui-org/input";
import { Button } from "../common/button";

import { Form, Formik, FormikHelpers, useField } from "formik";

import { string, object } from "yup";
import { SendIcon } from "@/icons/send-icon";
import { UserIcon } from "@/icons/user-icon";
import { EmailIcon } from "@/icons/email-icon";
import { PhoneIcon } from "@/icons/phone-icon";
import { BusinessIcon } from "@/icons/business-icon";
import { MessageIcon } from "@/icons/message-icon";

const Validation = object({
  names: string()
    .required("El nombre completo es requerido.")
    .min(6, "Ingresa un nombre válido."),
  email: string()
    .required("La dirección E-mail es requerida.")
    .email("Ingresa una dirección E-mail válida"),
  phone: string().optional(),
  company: string().optional(),
  issue: string()
    .required("El asunto del contacto es requerido")
    .min(5, "El asunto es demasiado corto."),
  message: string()
    .required("El mensaje del contacto es requerido")
    .min(5, "El mensaje es demasiado corto."),
});

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ContactForm() {
  const params = useSearchParams();

  const values = {
    names: params.get("names") ?? "",
    email: params.get("email") ?? "",
    phone: params.get("phone") ?? "",
    company: params.get("company") ?? "",
    issue: params.get("issue") ?? "",
    message: params.get("message") ?? "",
  };

  type Props = typeof values;

  const onSubmit = async (values: Props, props: FormikHelpers<Props>) => {
    await sleep(5000);
    console.log(values);
    alert(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={Validation}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form
          className="p-4 sm:p-8 bg-content1 rounded-3xl flex flex-col gap-4"
          noValidate
        >
          <FormInput
            type="name"
            name="names"
            label="Nombres Completos"
            placeholder="Mi nombre completo"
            startContent={<UserIcon />}
            required
          />
          <FormInput
            type="email"
            name="email"
            label="Dirección E-mail"
            placeholder="companyname@neenbyss.com"
            startContent={<EmailIcon />}
            required
          />
          <FormInput
            type="phone"
            name="phone"
            label="Número de Teléfono"
            placeholder="+00 1234567890"
            startContent={<PhoneIcon />}
            required
          />
          <FormInput
            type="name"
            name="company"
            label="Compañía"
            placeholder="Neenbyss Arc"
            startContent={<BusinessIcon />}
          />
          <FormInput
            type="text"
            name="issue"
            label="Asunto"
            placeholder="Información de un servicio."
            startContent={<MessageIcon />}
          />
          <FormTextarea
            required
            label="Mensaje"
            name="message"
            placeholder="Escribenos un mensaje..."
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              color="secondary"
              endContent={<SendIcon />}
              isLoading={isSubmitting}
            >
              Enviar mensaje
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

const FormInput = ({ ...props }: InputProps) => {
  const [field, meta] = useField({
    name: props.name ?? "",
    onChange: props.onChange,
    value: props.value,
  });
  return (
    <>
      <Input
        errorMessage={meta.error}
        isInvalid={Boolean(meta.error)}
        {...field}
        {...props}
      />
    </>
  );
};

const FormTextarea = ({ ...props }: TextAreaProps) => {
  const [field, meta] = useField({
    name: props.name ?? "",
    onChange: props.onChange,
    value: props.value,
  });
  return (
    <>
      <Textarea
        errorMessage={meta.error}
        isInvalid={Boolean(meta.error)}
        {...field}
        {...props}
      />
    </>
  );
};
