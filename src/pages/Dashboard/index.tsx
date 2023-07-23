import AudioCard from "@/components/ui/Cards/Audio";
import {
  TypographyBlockquote,
  TypographyLead,
} from "@/components/ui/typography";
import { useAppSelector } from "@/store/hooks";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { audios, isLoading, error, isOffsetLoading } = useAppSelector(
    (state) => state.audio
  );

  return (
    <div>
      {error ? (
        <TypographyBlockquote className="text-primary">
          Something went wrong!
        </TypographyBlockquote>
      ) : isLoading ? (
        <Loader2 className="animate-spin text-primary m-auto" size={50} />
      ) : audios?.length ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {audios?.map((song, id) => (
              <AudioCard key={id} audio={song} />
            ))}
          </div>
          <>
            {isOffsetLoading ? (
              <Loader2 className="animate-spin text-primary m-auto" size={50} />
            ) : null}
          </>
        </>
      ) : (
        <TypographyLead className="text-center ">
          Sorry, we could not find your requested audio!
        </TypographyLead>
      )}
    </div>
  );
};

export default Dashboard;
