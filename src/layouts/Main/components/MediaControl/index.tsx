import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { TypographyLarge, TypographyMuted } from "@/components/ui/typography";
import { Play, SkipBack, SkipForward, Volume1, Volume2 } from "lucide-react";
import { useState } from "react";

const MediaControls = () => {
  const [volume, setVolume] = useState<number>(33);

  return (
    <div className="m-5 md:m-0 rounded-md md:rounded-none bottom-3 sticky px-3 md:px-10 sm:bottom-0 h-16 bg-primary text-background flex justify-between md:justify-around items-center">
      <div className="flex gap-5 basis-1/2 md:basis-3/12">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="media image"
          className="w-10 h-10 md:w-12 rounded-full animate-spin duration-1000"
        />
        <div>
          <TypographyLarge className="text-sm">Song Name</TypographyLarge>
          <TypographyMuted className="text-background text-xs">
            Artist name
          </TypographyMuted>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center basis-1/2 md:basis-6/12">
        <div className="flex gap-3">
          <SkipBack className="cursor-pointer" />
          <Play className="cursor-pointer" />
          <SkipForward className="cursor-pointer" />
          <Popover>
            <PopoverTrigger>
              <Volume2 className="md:hidden md:cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="-rotate-90 -mr-[5.5rem] mb-32 md:hidden">
              <Slider
                defaultValue={[33]}
                max={100}
                value={[volume]}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Slider
          defaultValue={[33]}
          max={100}
          step={1}
          className="hidden md:flex w-[80%]"
        />
      </div>

      <div className="hidden md:flex gap-3 md:basis-3/12">
        <Volume1
          className="cursor-pointer"
          onClick={() =>
            setVolume((prevVal) => {
              if (!prevVal) {
                return 0;
              }
              return prevVal - 10;
            })
          }
        />
        <Slider
          defaultValue={[33]}
          max={100}
          value={[volume]}
          step={1}
          className="w-[70%]"
          onValueChange={(value) => setVolume(value[0])}
        />
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            setVolume((prevVal) => {
              if (volume > 100) {
                return 100;
              }
              return prevVal + 10;
            })
          }
        />
      </div>
    </div>
  );
};

export default MediaControls;
