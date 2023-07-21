import AudioCard from "@/components/ui/Cards/Audio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSongs } from "@/services/songs";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [audio, setAudio] = useState<{
    tracks: TRACK[];
    audioBooks: AUDIO_BOOK[];
  }>({
    tracks: [],
    audioBooks: [],
  });

  useEffect(() => {
    (async () => {
      const data: { resultsCount: number; results: T[] } = await getSongs();
      setAudio({
        tracks: data.results.filter(
          (data: T) => data.wrapperType === "track" && data.kind === "song"
        ),
        audioBooks: data.results.filter(
          (data: T) => data.wrapperType === "audiobook"
        ),
      });
    })();
  }, []);

  return (
    <Tabs defaultValue="track">
      {/* <TabsList className="sticky top-[7rem] z-10">
        <TabsTrigger
          value="track"
          className="transition-all text-quinary data-[state=active]:bg-primary data-[state=active]:text-background"
        >
          Tracks
        </TabsTrigger>
        <TabsTrigger
          value="audiobook"
          className="transition-all text-quinary data-[state=active]:bg-primary data-[state=active]:text-background"
        >
          Audio Books
        </TabsTrigger>
      </TabsList> */}
      <TabsContent value="track">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
          {audio.tracks?.length
            ? audio.tracks?.map((song, id) => (
                <AudioCard key={id} audio={song} />
              ))
            : null}
        </div>
      </TabsContent>

      <TabsContent value="audiobook">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
          {audio.tracks?.length
            ? audio.audioBooks?.map((audioBook, id) => (
                <AudioCard key={id} audio={audioBook} />
              ))
            : null}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;
