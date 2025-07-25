"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/formSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomAuthFormInput from "./CustomAuthFormInput";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import PlaidLink from "./PlaidLink";

function AuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const fontSchemaWithLoginType = formSchema(type);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof fontSchemaWithLoginType>>({
    resolver: zodResolver(fontSchemaWithLoginType),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof fontSchemaWithLoginType>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const safeValues = {
      ...values,
      password: values.password ? "****" : "",
    };
    setLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          ...values,
          address1: values.address1!,
          city: values.city!,
          state: values.state!,
          postalCode: values.postalCode!,
          dateOfBirth: values.dateOfBirth!,
          ssn: values.ssn!,
          email: values.email!,
          password: values.password!,
          firstName: values.firstName!,
          lastName: values.lastName!,
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
            email: values.email,
            password: values.password
        });
        if(response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            className=""
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign-In" : "Sign-Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
        <PlaidLink user={user} variant='primary'/>
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-12">
                    <CustomAuthFormInput
                      form={form}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your Firstname"
                    />
                    <CustomAuthFormInput
                      form={form}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your lastName"
                    />
                  </div>
                  <CustomAuthFormInput
                    form={form}
                    name="address1"
                    label="Address 1"
                    placeholder="Enter your Address"
                  />
                  <CustomAuthFormInput
                    form={form}
                    name="city"
                    label="City"
                    placeholder="Enter your City"
                  />
                  <div className="flex gap-12">
                    <CustomAuthFormInput
                      form={form}
                      name="state"
                      label="State"
                      placeholder="Enter your State"
                    />
                    <CustomAuthFormInput
                      form={form}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="ex: 110057"
                    />
                  </div>
                  <div className="flex gap-12">
                    <CustomAuthFormInput
                      form={form}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="yyyy-mm-dd"
                    />
                    <CustomAuthFormInput
                      form={form}
                      name="ssn"
                      label="SSN"
                      placeholder="ex: 1234"
                    />
                  </div>
                </>
              )}
              <CustomAuthFormInput
                form={form}
                name="email"
                label="Email"
                placeholder="Enter your Email"
              />
              <CustomAuthFormInput
                form={form}
                name="password"
                label="Password"
                placeholder="Enter your password"
                inputType="password"
              />
              <div className="flex flex-col">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign-In"
                  ) : (
                    "Sign-Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign-Up" : "Sign-In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}

export default AuthForm;
