import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlayerCard from "@/components/ui/Cards/PlayerCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MainLayout = () => {
  const user = Cookies.get("username");
  const [show, setShow] = useState(true);

  return user ? (
    <main>
      <Navbar />
      <div className="container xl:px-20 py-10 flex">
        <div className={show ? "lg:basis-3/4" : ""}>
          <Button onClick={() => setShow(!show)}>SHOW</Button>
          <Outlet />
        </div>
        <div className={show ? "hidden lg:block lg:basis-1/4" : ""}>
          {show ? <PlayerCard /> : null}
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainLayout;
