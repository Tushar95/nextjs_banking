import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";

import React from "react";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import { formSchema } from "@/lib/formSchema";
import { z } from "zod";

const fontSchemaWithLoginType = formSchema('sign-up');
type FormSchemaType = z.infer<typeof fontSchemaWithLoginType>;

interface CustomFormInputProps {
  form: UseFormReturn<FormSchemaType>;
  name: keyof FormSchemaType;
  label: string;
  placeholder?: string;
  inputType?: string;
}

function CustomAuthFormInput({
  form,
  name: nameField,
  label: labelField,
  placeholder: placeholderField,
  inputType,
}: CustomFormInputProps) {
  return (
    <FormField
      control={form.control}
      name={nameField}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel htmlFor={nameField}>{labelField}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholderField}
                type={
                  inputType?.toLowerCase() === "password" ? "password" : "text"
                }
                {...field}
                id={nameField}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
}

export default CustomAuthFormInput;
