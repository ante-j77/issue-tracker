import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Flex justify="center" align="center">
      <LoginForm />
    </Flex>
  );
};

export default Login;
