import {
  PasswordInput as MantinePasswordInput,
  PasswordInputProps,
} from "@mantine/core";

type PASSWORD_INPUT_PROPS = PasswordInputProps;

const PasswordInput = (porps: PASSWORD_INPUT_PROPS) => {
  const { ...rest } = porps;
  return <MantinePasswordInput {...rest} />;
};

export default PasswordInput;
