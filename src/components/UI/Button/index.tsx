import { Button as MantineButton, ButtonProps } from "@mantine/core";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface BUTTON_PROPS
  extends Omit<ButtonProps, "color">,
    ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = (props: BUTTON_PROPS) => {
  const { children, ...rest } = props;
  return <MantineButton {...rest}>{children}</MantineButton>;
};

export default Button;
