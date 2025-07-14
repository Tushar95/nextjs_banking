import React from "react";
import { UseFormRegisterReturn, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { formSchema } from "./PaymentTransferForm";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

type FormSchemaType = z.infer<typeof formSchema>;

interface CustomFormInputProps {
  form: UseFormReturn<FormSchemaType>;
  name: keyof FormSchemaType;
  label: string;
  description?: string;
  placeholder: string;
  inputType?: string;
}

function CustomTransferFormInput({
  form,
  name: nameField,
  label: labelField,
  description,
  placeholder,
  inputType = 'input',
}: CustomFormInputProps) {
  return (
    <FormField
      control={form.control}
      name={nameField}
      render={({field}) => (
        <FormItem className="border-t border-gray-200">
          <div className="payment-transfer_form-item pb-6 pt-5">
            <div className="payment-transfer_form-content">
              <FormLabel
                htmlFor={nameField}
                className="text-14 font-medium text-gray-700"
              >
                {labelField}
              </FormLabel>
              <FormDescription className="text-12 font-normal text-gray-600">
                {description}
              </FormDescription>
            </div>
            <div className="flex w-full flex-col">
              <FormControl>
                {inputType === "text" ? (
                  <Textarea
                    placeholder={placeholder}
                    className="input-class"
                    {...field}
                  />
                ) : (
                  <Input
                    placeholder={placeholder}
                    className="input-class"
                    {...field}
                  />
                )}
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}

export default CustomTransferFormInput;
