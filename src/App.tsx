import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import routes from "./routes/routes";
import Loading from "./pages/Loading";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes} fallbackElement={<Loading />} />
    </Suspense>
  );
}

export default App;
