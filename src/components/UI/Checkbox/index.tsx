import { Checkbox as MantineCheckbox, CheckboxProps } from "@mantine/core";

type CHECK_BOX_PROPS = CheckboxProps;

const Checkbox = (props: CHECK_BOX_PROPS) => {
  const { ...rest } = props;
  return <MantineCheckbox {...rest} />;
};

export default Checkbox;
