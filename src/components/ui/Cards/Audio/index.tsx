import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { TypographyH4 } from "../../typography";
import { setIsPlaying, setPlayingSong } from "@/features/audio/audioSlice";
import { Info, PauseCircle, PlayCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Dialog, DialogTrigger } from "../../Dialog/dialog";
import AudioDialog from "../../Dialog/AudioDialog";

interface AUDIO_CARD_PROPS {
  audio: AUDIO;
}

const AudioCard = (props: AUDIO_CARD_PROPS) => {
  const { audio } = props;

  const dispatch = useAppDispatch();

  const { artistName, artworkUrl100, collectionName, previewUrl } = audio;

  const { playingSong, isPlaying } = useAppSelector((state) => state.audio);

  const { previewUrl: playingSongURL } = playingSong;

  const isSameAudio = previewUrl === playingSongURL;

  const Icon = isSameAudio && isPlaying ? PauseCircle : PlayCircle;

  const handlePlay = () => {
    if (!isSameAudio) {
      dispatch(setPlayingSong(audio));
    }

    if (isPlaying && isSameAudio) {
      dispatch(setIsPlaying(false));
      return;
    }
    dispatch(setIsPlaying(true));
  };

  return (
    <Card className="h-min bg-background border-none drop-shadow-none shadow-none p-5 gap-3 text-quinary relative">
      <div className="group relative" onClick={handlePlay}>
        <img
          src={artworkUrl100.replace("100x100", "900x900")}
          alt="track preview"
          className={`rounded-lg mx-auto shadow-xl h-32 md:h-36 lg:h-44 transition duration-0 group-hover:duration-300 ${
            isSameAudio ? "opacity-60" : "group-hover:opacity-60"
          }`}
          style={{ maxHeight: "-webkit-fill-available" }}
        />

        <div className="absolute flex justify-center items-center top-0 w-full h-full">
          <Icon
            className={`bg-primary cursor-pointer text-secondary rounded-full w-8 h-8 p-1 right-8 bottom-4 ${
              !isSameAudio
                ? "opacity-0 group-hover:opacity-100 transition duration-0 group-hover:duration-300 "
                : ""
            }`}
          />
        </div>
      </div>

      <CardHeader className="p-1 flex flex-row w-full gap-1">
        <div className="w-4/5 whitespace-normal">
          <TypographyH4 className="text-primary truncate pointer-events-none">
            {collectionName || "--"}
          </TypographyH4>
          <CardDescription className="truncate pointer-events-none">
            by {artistName}
          </CardDescription>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Info className="w-5 cursor-pointer text-primary" />
          </DialogTrigger>

          <AudioDialog audio={audio} />
        </Dialog>
      </CardHeader>
    </Card>
  );
};

export default AudioCard;
