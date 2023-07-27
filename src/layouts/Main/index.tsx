import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import MediaControls from "./components/MediaControl";
import { useAppSelector } from "@/store/hooks";

const MainLayout = () => {
  const user = Cookies.get("username");

  const { playingSong } = useAppSelector((state) => state.audio);

  return user ? (
    <main className="grid grid-rows-[auto,1fr,auto] min-h-[100vh]">
      <Navbar />

      <div className="container flex items-center justify-center xl:px-20 py-10">
        <Outlet />
      </div>

      {playingSong?.artistId ? <MediaControls /> : null}
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainLayout;
