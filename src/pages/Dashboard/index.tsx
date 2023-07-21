import AudioCard from "@/components/ui/Cards/Audio";
import { fetchAudios } from "@/features/audio/audioThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { audios } = useAppSelector((state) => state.audio);

  useEffect(() => {
    dispatch(fetchAudios({}));
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-5">
      {audios?.length
        ? audios?.map((song, id) => <AudioCard key={id} audio={song} />)
        : null}
    </div>
  );
};

export default Dashboard;
