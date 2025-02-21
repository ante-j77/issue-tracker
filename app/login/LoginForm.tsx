"use client";

import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Spinner from "@/app/components/Spinner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    setSubmitting(true);
    setError(null);

    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((callback) => {
      setSubmitting(false);

      if (callback?.ok) {
        router.replace(callbackUrl);
        router.refresh();
      }

      if (callback?.error) {
        throw new Error(callback.error);
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="border rounded-md py-6 px-6 w-[30rem]">
      <Flex direction="column" gap="4" justify="center" align="center">
        <Heading align="center">Login</Heading>

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
          Login
          {isSubmitting && <Spinner />}
        </Button>

        <Text>
          Don't have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </Text>
      </Flex>
    </form>
  );
};

export default LoginForm;
