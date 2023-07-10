import { MantineThemeOverride } from "@mantine/core";

const mantineTheme: MantineThemeOverride = {
  colorScheme: "dark",
  loader: "oval",
  cursorType: "pointer",
  colors: {
    black: ["#0D1321"],
    blue: ["#1D2D44"],
    eggShell: ["#F0EBD8"],
    lakeBlue: ["#748CAB"],
    gray: ["#3E5C76"],
    babyBlue: ["#E7F2F8"],
    aquamarine: ["#74BDCB"],
    salmon: ["#FFA384"],
    freesia: ["#EFE7BC"],
    lightPink: ["#FFC7C7"],
    newGray: ["#DBE2EF"],
    lightBlue: ["#3F72AF"],
    newBlue: ["#112D4E"],
  },
  primaryColor: "cyan",
  defaultRadius: "sm",
  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },
  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: "6rem" },
    },
  },
  fontFamily: "Roboto, sans-serif",
};

export default mantineTheme;
