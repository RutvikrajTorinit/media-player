import { Title as MantineTitle } from "@mantine/core";
import { TitleProps } from "@mantine/core/lib/Title/Title";
import { ReactNode } from "react";

interface TITLE_PROPS extends TitleProps {
  children: ReactNode;
}

const Title = (props: TITLE_PROPS) => {
  const { children, ...rest } = props;
  return <MantineTitle {...rest}>{children}</MantineTitle>;
};

export default Title;
