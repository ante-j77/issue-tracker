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
import { useState } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const onSubmit = handleSubmit((data) => {
    setSubmitting(true);
    setError(null);
    axios
      .post("/api/register", data)
      .then(() => {
        console.log(data);
        router.push("/login");
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Error during registration");
      })
      .finally(() => setSubmitting(false));
  });

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

        <Flex direction="column" className="w-[20rem]">
          <label htmlFor="name">First and last name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
            name="name"
            className="border rounded-md p-3"
          />
          {errors.name && <Text color="red">{errors.name.message}</Text>}
        </Flex>
        <Flex direction="column" className="w-[20rem]">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            name="email"
            className="border rounded-md p-3"
          />
          {errors.email && <Text color="red">{errors.email.message}</Text>}
        </Flex>
        <Flex direction="column" className="w-[20rem]">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            name="password"
            className="border rounded-md p-3"
          />
          {errors.password && (
            <Text color="red">{errors.password.message}</Text>
          )}
        </Flex>

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
