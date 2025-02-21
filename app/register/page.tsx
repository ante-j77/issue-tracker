import { Flex } from "@radix-ui/themes";
import RegisterForm from "./RegisterForm";
import { Suspense } from "react";
import { Spinner } from "../components";

const Register = () => {
  return (
    <Flex justify="center" align="center" className="min-h-full">
      <Suspense fallback={<Spinner />}>
        <RegisterForm />
      </Suspense>
    </Flex>
  );
};

export default Register;
