import AudioCard from "@/components/ui/Cards/Audio";
import {
  TypographyBlockquote,
  TypographyLead
} from "@/components/ui/typography";
import { setOffsetParam } from "@/features/audio/audioSlice";
import { fetchAudios } from "@/features/audio/audioThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const {
    searchParam,
    offsetParam,
    audios,
    isLoading,
    error,
    isOffsetLoading
  } = useAppSelector((state) => state.audio);

  const loaderRef = useRef(null);
  const isFirstRender = useRef(true);
  const dispatch = useAppDispatch();

  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    dispatch(setOffsetParam(offset));
  }, [offset]);

  useEffect(() => {
    setOffset(offsetParam);
    dispatch(fetchAudios({ offset: offsetParam, searchTerm: searchParam }));
  }, [offsetParam, searchParam]);

  const handleObserver = useCallback(
    (entries: T) => {
      const target = entries[0];

      if (target.isIntersecting && !isFirstRender.current) {
        setOffset((prev) => prev + 25);
      }
    },
    [audios.length]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);

  return (
    <div>
      {error ? (
        <TypographyBlockquote className="text-primary">
          Something went wrong!
        </TypographyBlockquote>
      ) : isLoading ? (
        <Loader2 className="m-auto animate-spin text-primary" size={50} />
      ) : audios.length ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {audios.map((song, id) => (
              <AudioCard key={id} audio={song} />
            ))}
            <div ref={loaderRef} />
          </div>
          <>
            {isOffsetLoading ? (
              <Loader2 className="m-auto animate-spin text-primary" size={50} />
            ) : null}
          </>
        </>
      ) : (
        <TypographyLead className="text-center ">
          Sorry, we could not find your requested audio!
        </TypographyLead>
      )}
    </div>
  );
};

export default Dashboard;
