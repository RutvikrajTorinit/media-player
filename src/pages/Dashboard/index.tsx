/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import AudioBookCard from "@/components/ui/Cards/AudioBookCard";
import TrackCard from "@/components/ui/Cards/TrackCard";
import { Label } from "@/components/ui/label";
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
  console.log("Dashboard  audio >>>", audio);

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
      <TabsList className="sticky top-[7rem] z-10 bg-primary">
        <TabsTrigger
          value="track"
          className="text-quinary data-[state=active]:bg-quinary data-[state=active]:text-tertiary"
        >
          Tracks
        </TabsTrigger>
        <TabsTrigger
          value="audiobook"
          className="text-quinary data-[state=active]:bg-quinary data-[state=active]:text-tertiary"
        >
          Audio Books
        </TabsTrigger>
      </TabsList>
      <TabsContent value="track">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {audio.tracks?.length
            ? audio.tracks?.map((song, id) => (
                <TrackCard key={id} song={song} />
              ))
            : null}
        </div>
      </TabsContent>

      <TabsContent value="audiobook">
        <Label>Audio books</Label>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {audio.tracks?.length
            ? audio.audioBooks?.map((audioBook, id) => (
                <AudioBookCard key={id} audioBook={audioBook} />
              ))
            : null}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;
