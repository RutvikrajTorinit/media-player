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
    <Card className="text-quinary relative h-min gap-3 border-none bg-background p-5 shadow-none drop-shadow-none">
      <div className="group relative" onClick={handlePlay}>
        <img
          src={artworkUrl100}
          srcSet={artworkUrl100.replace("100x100", "900x900")}
          alt="track preview"
          className={`mx-auto h-32 rounded-lg shadow-xl transition duration-0 group-hover:duration-300 md:h-36 lg:h-44 ${
            isSameAudio ? "opacity-60" : "group-hover:opacity-60"
          }`}
          style={{ maxHeight: "-webkit-fill-available" }}
          loading="lazy"
        />

        <div className="absolute top-0 flex h-full w-full items-center justify-center">
          <Icon
            className={`bottom-4 right-8 h-8 w-8 cursor-pointer rounded-full bg-primary p-1 text-secondary ${
              !isSameAudio
                ? "opacity-0 transition duration-0 group-hover:opacity-100 group-hover:duration-300 "
                : ""
            }`}
          />
        </div>
      </div>

      <CardHeader className="flex w-full flex-row gap-1 p-1">
        <div className="w-4/5 whitespace-normal">
          <TypographyH4 className="pointer-events-none truncate text-primary">
            {collectionName || "--"}
          </TypographyH4>
          <CardDescription className="pointer-events-none truncate">
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
