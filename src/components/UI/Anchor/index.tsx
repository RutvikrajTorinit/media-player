import { Anchor as MantineAnchor, AnchorProps } from "@mantine/core";
import { ReactNode } from "react";

interface ANCHOR_PROPS extends AnchorProps {
  children: ReactNode;
}

const Anchor = (props: ANCHOR_PROPS) => {
  const { children, ...rest } = props;

  return <MantineAnchor {...rest}>{children}</MantineAnchor>;
};

export default Anchor;
