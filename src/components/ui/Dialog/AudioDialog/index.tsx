import { PauseCircle, PlayCircle } from "lucide-react";
import { Badge } from "../../badge";
import { ScrollArea } from "../../scroll-area";
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall
} from "../../typography";
import { DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsPlaying, setPlayingSong } from "@/features/audio/audioSlice";

interface AUDIO_CARD_PROPS {
  audio: AUDIO;
}

const AudioDialog = (props: AUDIO_CARD_PROPS) => {
  const { audio } = props;

  const {
    artworkUrl100,
    collectionCensoredName,
    artistName,
    description,
    trackExplicitness,
    primaryGenreName,
    releaseDate,
    previewUrl
  } = audio;

  const dispatch = useAppDispatch();

  const { isPlaying, playingSong } = useAppSelector((state) => state.audio);

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
    <DialogContent className="w-[90%] md:w-[31rem]">
      <div className="flex gap-3">
        <img
          src={artworkUrl100.replace("100x100", "900x900")}
          alt="track preview"
          className="mx-auto h-32 basis-1/5 rounded-md shadow-xl transition duration-0 group-hover:duration-300 md:h-36 lg:h-44"
          style={{ maxHeight: "-webkit-fill-available" }}
        />
        <DialogHeader className="basis-4/5 text-left">
          <DialogTitle>
            <TypographyLarge>{collectionCensoredName}</TypographyLarge>
            <TypographyMuted>{artistName}</TypographyMuted>
            <TypographyMuted>
              {new Date(releaseDate).getFullYear()}
            </TypographyMuted>
            <TypographyMuted>{primaryGenreName}</TypographyMuted>

            {trackExplicitness === "explicit" ? (
              <Badge className="my-1 capitalize">{trackExplicitness}</Badge>
            ) : null}
          </DialogTitle>

          <Icon className="cursor-pointer text-primary" onClick={handlePlay} />
        </DialogHeader>
      </div>

      <ScrollArea className="max-h-60 md:max-h-40">
        <TypographySmall>{description}</TypographySmall>
      </ScrollArea>
    </DialogContent>
  );
};

export default AudioDialog;
