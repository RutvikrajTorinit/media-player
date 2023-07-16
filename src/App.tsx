import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import routes from "./routes/routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={routes} fallbackElement={<p>Loading...</p>} />
    </Suspense>
  );
}

export default App;
