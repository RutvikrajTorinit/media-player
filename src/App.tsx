import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import routes from "./routes/routes";
import mantineTheme from "./theme";
import { SwitchToggle } from "./components/UI/Switch/SwitchTheme";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ ...mantineTheme, colorScheme: colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Suspense fallback={<p>Loading...</p>}>
          <RouterProvider router={routes} fallbackElement={<p>Loading...</p>} />
          <SwitchToggle />
        </Suspense>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
