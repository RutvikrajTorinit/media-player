import { Card, CardContent } from "../../card";
import { TypographyH4 } from "../../typography";

const PlayerCard = () => {
  return (
    <Card className="h-[40.5rem] sticky top-[7rem]">
      <img
        src="https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/50/0a/1e/500a1eac-b447-1299-72dc-d52bd74d3968/mzi.sdgeshou.jpg/100x100bb.jpg"
        alt="player preview"
        className="w-full rounded-2xl"
      />

      <CardContent>
        <TypographyH4>Song Name</TypographyH4>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
