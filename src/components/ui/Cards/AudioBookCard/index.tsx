import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH1 } from "../../typography";

const AudioBookCard = (props: { audioBook: AUDIO_BOOK }) => {
  const { audioBook } = props;
  const { artistName, collectionName, releaseDate, artworkUrl100 } = audioBook;

  return (
    <Card
      className="h-[14rem] drop-shadow-md hover:scale-105 hover:drop-shadow-xl duration-300 p-5 flex gap-3  border-primary text-quinary bg-gradient-to-r from-quaternary to-primary"
      style={{
        backgroundImage: `url(${artworkUrl100})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* <Avatar className="duration-1000">
        <AvatarImage src={artworkUrl100} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
      <div>
        <CardHeader className="p-1">
          {/* <CardTitle>{collectionName}</CardTitle> */}
          <TypographyH1>Hey</TypographyH1>
          <CardDescription className="text-white">{artistName}</CardDescription>
          <CardDescription className="text-white">
            {new Date(releaseDate).getFullYear()}
          </CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
};

export default AudioBookCard;
