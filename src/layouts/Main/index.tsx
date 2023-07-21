import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import MediaControls from "./components/MediaControl";
import { useAppSelector } from "@/store/hooks";

const MainLayout = () => {
  const user = Cookies.get("username");

  const { playingSong } = useAppSelector((state) => state.audio);

  return user ? (
    <main>
      <Navbar />
      <div className="container xl:px-20 py-10">
        <Outlet />
      </div>
      {playingSong.artistId ? <MediaControls /> : null}
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainLayout;
