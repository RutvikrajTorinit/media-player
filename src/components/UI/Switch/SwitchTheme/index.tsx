import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme,
  ColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";

export const SwitchToggle = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const [, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [theme]);

  return (
    <Group
      position="center"
      my={30}
      style={{ position: "absolute", bottom: "20px", width: "100%" }}
    >
      <Switch
        checked={colorScheme === "dark"}
        onChange={() => toggleColorScheme()}
        size="lg"
        style={{ marginLeft: "auto", marginRight: "40px" }}
        onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
        offLabel={
          <IconMoonStars
            color={theme.colors.gray[6]}
            size="1.25rem"
            stroke={1.5}
          />
        }
      />
    </Group>
  );
};
