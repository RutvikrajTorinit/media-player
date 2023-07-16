import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const user = Cookies.get("username");

  return (
    <div className="min-h-screen">
      {!user ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
};

export default AuthLayout;
