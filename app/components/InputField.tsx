import { Flex, Text } from "@radix-ui/themes";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type: string;
}

const InputField = <T extends FieldValues>({
  id,
  label,
  register,
  errors,
  type,
}: Props<T>) => {
  return (
    <Flex direction="column" className="w-[20rem]">
      <label htmlFor={String(id)}>{label}</label>
      <input
        {...register(id, { required: true })}
        type={type}
        id={String(id)}
        name={String(id)}
        className="border rounded-md p-3"
      />
      {errors[id] && <Text color="red">{errors[id]?.message as string}</Text>}
    </Flex>
  );
};

export default InputField;
