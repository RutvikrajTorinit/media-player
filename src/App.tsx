import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import routes from "./routes/routes";
import mantineTheme from "./theme";

function App() {
  return (
    <MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
      <Suspense fallback={<p>Loading...</p>}>
        <RouterProvider router={routes} fallbackElement={<p>Loading...</p>} />
      </Suspense>
    </MantineProvider>
  );
}

export default App;
