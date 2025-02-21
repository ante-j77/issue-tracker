import { Box, Flex } from "@radix-ui/themes";
import React, { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Spinner } from "../components";

const Login = () => {
  return (
    <Flex justify="center" align="center">
      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>
    </Flex>
  );
};

export default Login;
