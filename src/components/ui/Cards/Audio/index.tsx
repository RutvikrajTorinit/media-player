import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { TypographyH4 } from "../../typography";

interface AUDIO_CARD_PROPS {
  audio: AUDIO_BOOK | TRACK;
}

const AudioCard = (props: AUDIO_CARD_PROPS) => {
  const { audio } = props;
  const { artistName, artworkUrl100, collectionName } = audio;

  return (
    <Card className="h-min bg-background border-none drop-shadow-none shadow-none hover:scale-105 duration-300 p-5 gap-3 text-quinary">
      <img
        src={artworkUrl100}
        alt="track preview"
        className="rounded-lg shadow-xl object-cover h-32 md:h-36 lg:h-44"
        style={{ maxHeight: "-webkit-fill-available" }}
      />
      <CardHeader className="p-1">
        <TypographyH4 className="text-primary truncate">
          {collectionName}
        </TypographyH4>
        <CardDescription>by {artistName}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AudioCard;
