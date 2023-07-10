import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core";

type TEXT_INPUT_PROPS = TextInputProps;

const TextInput = (porps: TEXT_INPUT_PROPS) => {
  const { ...rest } = porps;
  return <MantineTextInput {...rest} />;
};

export default TextInput;
