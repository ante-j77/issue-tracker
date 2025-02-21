import { Flex } from "@radix-ui/themes";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <Flex justify="center" align="center" className="min-h-full">
      <RegisterForm />
    </Flex>
  );
};

export default Register;
