import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import MediaControls from "./components/MediaControl";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAudios } from "@/features/audio/audioThunk";
import { setOffsetParam } from "@/features/audio/audioSlice";

const MainLayout = () => {
  const user = Cookies.get("username");
  const loaderRef = useRef(null);
  const isFirstRender = useRef(true);
  const dispatch = useAppDispatch();

  const { playingSong, searchParam, offsetParam } = useAppSelector(
    (state) => state.audio
  );

  const [offset, setOffset] = useState<number>(1);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    dispatch(setOffsetParam(offset));
  }, [offset]);

  useEffect(() => {
    // TODO Reduce API calls
    dispatch(fetchAudios({ offset: offsetParam, searchTerm: searchParam }));
  }, [searchParam, offsetParam]);

  const handleObserver = useCallback((entries: T) => {
    const target = entries[0];
    if (target.isIntersecting && !isFirstRender.current) {
      setOffset((prev) => prev + 25);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return user ? (
    <main className="grid grid-rows-[auto,1fr,auto] min-h-[100vh]">
      <Navbar />
      <div className="container flex items-center justify-center xl:px-20 py-10">
        <Outlet />
      </div>

      <div ref={loaderRef} className="border-solid border-primary w-96" />

      {playingSong?.artistId ? <MediaControls /> : null}
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainLayout;
