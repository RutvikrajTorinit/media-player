import { ReactNode } from "react";
import { Text as MantineText, TextProps } from "@mantine/core";

interface TEXT_PROPS extends TextProps {
  children: ReactNode;
}

const Text = (props: TEXT_PROPS) => {
  const { children, ...rest } = props;

  return <MantineText {...rest}>{children}</MantineText>;
};

export default Text;
