"use client";

import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "../validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Spinner from "@/app/components/Spinner";
import { useCallback, useState } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import InputField from "../components/InputField";

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = useCallback(
    handleSubmit((data) => {
      setSubmitting(true);
      setError(null);
      axios
        .post("/api/register", data)
        .then(() => {
          router.push("/login");
        })
        .catch((error) => {
          setError(
            error.response?.data?.message || "Error during registration"
          );
        })
        .finally(() => setSubmitting(false));
    }),
    []
  );

  return (
    <form onSubmit={onSubmit} className="border rounded-md py-6 px-6 w-[30rem]">
      <Flex direction="column" gap="4" justify="center" align="center">
        <Heading align="center">Register</Heading>

        <Button
          type="button"
          size="3"
          color="purple"
          className="w-[20rem]"
          onClick={() =>
            signIn("google", { callbackUrl }).then(() => {
              router.push(callbackUrl);
            })
          }
        >
          <FaGoogle /> Continue with Google
        </Button>

        <InputField<RegisterFormData>
          id="name"
          type="text"
          register={register}
          label="First and last name"
          errors={errors}
        />
        <InputField<RegisterFormData>
          id="email"
          type="email"
          register={register}
          label="Email"
          errors={errors}
        />
        <InputField<RegisterFormData>
          id="password"
          type="password"
          register={register}
          label="Password"
          errors={errors}
        />

        <Button type="submit" size="3" disabled={isSubmitting}>
          Submit
          {isSubmitting && <Spinner />}
        </Button>

        <Text>
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </Text>
      </Flex>
    </form>
  );
};

export default RegisterForm;
