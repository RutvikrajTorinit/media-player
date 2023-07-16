import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const MainLayout = () => {
  const user = Cookies.get("username");

  return user ? (
    <main>
      <Navbar />
      <div className="container xl:px-20 py-10">
        <Outlet />
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainLayout;
