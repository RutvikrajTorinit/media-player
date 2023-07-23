import { Slider } from "@/components/ui/slider";
import { TypographyLarge, TypographyMuted } from "@/components/ui/typography";
import { setIsPlaying, setPlayingSong } from "@/features/audio/audioSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
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
    if (playingSong) {
      if (audioRef.current) {
        audioRef.current.src = previewUrl;
      }
    }
  }, [playingSong, previewUrl]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      audioRef?.current?.pause();
    } else {
      audioRef?.current?.play();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
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
      (song) => song.collectionId === playingSong?.collectionId
    );
    const previousIndex =
      currentIndex === 0 ? audios.length - 1 : currentIndex - 1;
    const previousSong = audios[previousIndex];
    dispatch(setPlayingSong(previousSong));
    dispatch(setIsPlaying(true));
  };

  const handleNextSong = () => {
    const currentIndex = audios.findIndex(
      (song) => song.collectionId === playingSong?.collectionId
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
    <div className="m-5 md:m-0 rounded-md md:rounded-none bottom-3 sticky px-3 md:px-10 xl:px-28 sm:bottom-0 h-16 bg-primary text-background flex justify-between md:justify-around items-center">
      <div className="flex gap-5 basis-1/2 md:basis-3/12">
        <img
          src={artworkUrl100}
          alt="media image"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full"
        />
        <div className="space-y-1.5">
          <TypographyLarge className="w-[7rem] md:w-56 text-sm truncate">
            {collectionCensoredName || "--"}
          </TypographyLarge>
          <TypographyMuted className="w-[7rem] md:w-56 text-background text-xs truncate">
            {artistName || "--"}
          </TypographyMuted>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center basis-1/2 md:basis-6/12">
        <div className="flex gap-3">
          <SkipBack className="cursor-pointer" onClick={handlePrevSong} />
          {isPlaying ? (
            <Pause className="cursor-pointer" onClick={handlePlayPause} />
          ) : (
            <Play className="cursor-pointer" onClick={handlePlayPause} />
          )}
          <SkipForward className="cursor-pointer" onClick={handleNextSong} />
        </div>
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
        <audio
          ref={audioRef}
          src={previewUrl}
          autoPlay
          onTimeUpdate={() => setCurrentTime(audioRef?.current?.currentTime)}
          onDurationChange={() => setSleekTime(audioRef.current.duration)}
          onEnded={handleSongEnded}
        />
      </div>

      <div className="hidden md:flex gap-3 md:basis-3/12">
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
