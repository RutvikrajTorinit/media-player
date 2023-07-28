import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Main";
import { Dashboard, ERROR404, Login } from "./lazyLoading";
import AuthLayout from "../layouts/Auth";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
  {
    path: "*",
    element: <ERROR404 />
  }
]);

export default routes;
