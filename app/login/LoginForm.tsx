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
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "../components/InputField";

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

  const onSubmit = useCallback(
    handleSubmit((data) => {
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
    }),
    [callbackUrl, router]
  );

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

        <InputField<LoginFormData>
          id="email"
          type="email"
          register={register}
          label="Email"
          errors={errors}
        />
        <InputField<LoginFormData>
          id="password"
          type="password"
          register={register}
          label="Password"
          errors={errors}
        />

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
