import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { TypographyH4 } from "../../typography";
import { useDispatch } from "react-redux";
import {
  AUDIO,
  setIsPlaying,
  setPlayingSong,
} from "@/features/audio/audioSlice";

interface AUDIO_CARD_PROPS {
  audio: AUDIO;
}

const AudioCard = (props: AUDIO_CARD_PROPS) => {
  const { audio } = props;
  const dispatch = useDispatch();

  const { artistName, artworkUrl100, collectionName } = audio;

  const playSong = () => {
    dispatch(setPlayingSong(audio));
    dispatch(setIsPlaying(true));
  };

  return (
    <Card className="h-min bg-background border-none drop-shadow-none shadow-none hover:scale-105 duration-300 p-5 gap-3 text-quinary">
      <img
        src={artworkUrl100}
        alt="track preview"
        className="rounded-lg mx-auto shadow-xl h-32 md:h-36 lg:h-44"
        style={{ maxHeight: "-webkit-fill-available" }}
        onClick={playSong}
      />

      <CardHeader className="p-1">
        <TypographyH4 className="text-primary truncate">
          {collectionName || "--"}
        </TypographyH4>
        <CardDescription>by {artistName}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AudioCard;
