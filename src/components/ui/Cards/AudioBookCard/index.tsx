import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { TypographyH4 } from "../../typography";

const AudioBookCard = (props: { audioBook: AUDIO_BOOK }) => {
  const { audioBook } = props;
  const { artistName, releaseDate, artworkUrl100, collectionName } = audioBook;

  return (
    <Card className="h-min bg-bg border-none drop-shadow-none shadow-none hover:scale-105 duration-300 p-5 gap-3 text-quinary">
      <img
        src={artworkUrl100}
        alt="track preview"
        style={{ width: "100%" }}
        className="rounded-lg shadow-2xl"
      />
      <CardHeader className="p-1">
        <TypographyH4 className="text-primary">{collectionName}</TypographyH4>
        <CardDescription>{artistName}</CardDescription>
        <CardDescription>{new Date(releaseDate).getFullYear()}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AudioBookCard;
