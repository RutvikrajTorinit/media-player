import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Cookies from "js-cookie";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    Cookies.remove("username");

    navigate("/login");
  };
  return (
    <header className="h-16 flex items-center bg-tertiary drop-shadow-lg sticky top-0 z-10">
      <nav className="px-10 lg:px-40 flex w-full items-center justify-between">
        <Label className="font-black text-xl text-quaternary cursor-pointer">
          !Spotify
        </Label>
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <Button onClick={handleLogout}>Logout</Button>
          </PopoverContent>
        </Popover>
      </nav>
    </header>
  );
};

export default Navbar;
