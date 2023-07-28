import { Slider } from "@/components/ui/slider";
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall
} from "@/components/ui/typography";
import { setIsPlaying, setPlayingSong } from "@/features/audio/audioSlice";
import formattedDuration from "@/helpers/formatDuration";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MediaControls = () => {
  const audioRef = useRef<any>();
  const dispatch = useAppDispatch();

  const [volume, setVolume] = useState<number>(20);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [sleekTime, setSleekTime] = useState<number>(0);

  const { playingSong, isPlaying, audios } = useAppSelector(
    (state) => state.audio
  );

  const { artistName, collectionCensoredName, artworkUrl100, previewUrl } =
    playingSong;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = previewUrl;
    }
  }, [playingSong, previewUrl]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      dispatch(setIsPlaying(false));
    } else {
      audioRef.current?.play();
      // dispatch(setCurrentSong(currentSong!));
      dispatch(setIsPlaying(true));
    }
  };

  const handlePrevSong = () => {
    const currentIndex = audios.findIndex(
      (song) => song.collectionId === playingSong.collectionId
    );
    const previousIndex =
      currentIndex === 0 ? audios.length - 1 : currentIndex - 1;
    const previousSong = audios[previousIndex];
    dispatch(setPlayingSong(previousSong));
    dispatch(setIsPlaying(true));
  };

  const handleNextSong = () => {
    const currentIndex = audios.findIndex(
      (song) => song.collectionId === playingSong.collectionId
    );
    const nextIndex = currentIndex + 1;
    const loopedIndex = nextIndex >= audios.length ? 0 : nextIndex;
    const nextSong = audios[loopedIndex];
    dispatch(setPlayingSong(nextSong));
    dispatch(setIsPlaying(true));
  };

  const handleSongEnded = () => {
    handleNextSong();
  };

  // TODO Add playback loop linear random

  return (
    <div className="sticky bottom-3 m-5 flex h-16 items-center justify-between rounded-md bg-primary px-3 text-background sm:bottom-0 md:m-0 md:justify-around md:rounded-none md:px-10 xl:px-28">
      <div className="flex basis-1/2 gap-5 md:basis-3/12">
        <img
          src={artworkUrl100}
          alt="media image"
          className="h-10 w-10 rounded-full md:h-12 md:w-12"
        />
        <div className="space-y-1.5">
          <TypographyLarge className="w-[7rem] truncate text-sm md:w-56">
            {collectionCensoredName || "--"}
          </TypographyLarge>
          <TypographyMuted className="w-[7rem] truncate text-xs text-background md:w-56">
            {artistName || "--"}
          </TypographyMuted>
        </div>
      </div>

      <div className="flex basis-1/2 flex-col items-center gap-2 md:basis-6/12">
        <div className="flex gap-3">
          <SkipBack className="cursor-pointer" onClick={handlePrevSong} />
          {isPlaying ? (
            <Pause className="cursor-pointer" onClick={handlePlay} />
          ) : (
            <Play className="cursor-pointer" onClick={handlePlay} />
          )}
          <SkipForward className="cursor-pointer" onClick={handleNextSong} />
        </div>

        <div className="flex w-full items-center justify-center gap-1">
          <TypographySmall className="hidden md:block">
            {formattedDuration(currentTime)}
          </TypographySmall>

          <Slider
            defaultValue={[33]}
            max={sleekTime}
            value={[currentTime]}
            min={0}
            step={1}
            className="w-[70%]"
            onValueChange={(value) => {
              audioRef.current.currentTime = value[0];
              setCurrentTime(value[0]);
            }}
          />

          <TypographySmall className="hidden md:block">
            {formattedDuration(sleekTime)}
          </TypographySmall>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={previewUrl}
        autoPlay
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime)}
        onDurationChange={() => setSleekTime(audioRef.current.duration)}
        onEnded={handleSongEnded}
      />

      <div className="hidden gap-3 md:flex md:basis-3/12">
        <Volume1
          className="cursor-pointer"
          onClick={() => {
            setVolume((prevVal) => {
              if (prevVal - 10 > 0) {
                audioRef.current.volume = (volume - 10) / 100;
                return prevVal - 10;
              }
              audioRef.current.volume = 0;
              return 0;
            });
          }}
        />

        <Slider
          defaultValue={[33]}
          max={100}
          value={[volume]}
          min={0}
          step={1}
          className="w-[70%]"
          onValueChange={(value) => {
            audioRef.current.volume = value[0] / 100;
            setVolume(value[0]);
          }}
        />

        <Volume2
          className="cursor-pointer"
          onClick={() => {
            setVolume((prevVal) => {
              if (prevVal + 10 <= 100) {
                audioRef.current.volume = (volume + 10) / 100;
                return prevVal + 10;
              }
              audioRef.current.volume = 1;
              return 100;
            });
          }}
        />
      </div>
    </div>
  );
};

export default MediaControls;
