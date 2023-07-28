import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TypographyH2, TypographySmall } from "@/components/ui/typography";
import {
  setIsPlaying,
  setOffsetParam,
  setSearchParam
} from "@/features/audio/audioSlice";
import { useAppDispatch } from "@/store/hooks";
import Cookies from "js-cookie";
import { Menu } from "lucide-react";
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

// const tabs = [
//   { text: "Tracks", id: "tracks" },
//   { text: "Audio Book", id: "audio-book" },
// ];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const [selectedTab, setSelectedTab] = useState<string>("tracks");
  const [searchText, setSearchText] = useState<string>("");

  const handleLogout = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    Cookies.remove("username");
    dispatch(setIsPlaying(false));

    navigate("/login");
  };

  const menus = [
    { text: "Profile", action: () => ({}) },
    { text: "Settings", action: () => ({}) },
    { text: "Sign out", action: handleLogout }
  ];

  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm) => {
        dispatch(setSearchParam(searchTerm));
        dispatch(setOffsetParam(0));
      }, 500),
    []
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchText(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return (
    <nav className="sticky top-0 z-10 bg-secondary drop-shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <TypographyH2 className="cursor-pointer border-accent font-black text-text">
              !Spotify
            </TypographyH2>

            <Input
              type="search"
              placeholder="Search..."
              value={searchText}
              onChange={handleInputChange}
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <Popover>
                  <PopoverTrigger className="hidden md:block">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </PopoverTrigger>

                  <PopoverContent className="hidden w-40 md:block">
                    {menus.map((menu, id) => (
                      <a
                        key={id}
                        className="block cursor-pointer rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-background"
                        role="menuitem"
                        tabIndex={-1}
                        id={`user-menu-item-${id}`}
                        onClick={menu.action}
                      >
                        {menu.text}
                      </a>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent className="bg-secondary md:hidden">
                <div className="md:hidden" id="mobile-menu">
                  {/* <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {tabs?.map((menu) => (
                      <a
                        key={menu.id}
                        className={`block rounded-md px-3 py-2 text-base font-medium cursor-pointer ${
                          selectedTab === menu.id
                            ? "bg-text text-background"
                            : "text-text"
                        }`}
                        aria-current="page"
                        onClick={() => setSelectedTab(menu.id)}
                      >
                        {menu.text}
                      </a>
                    ))}
                  </div> */}
                  <div className="pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>

                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-text">
                          Tom Cook
                        </div>
                        <div className="text-sm font-medium leading-none text-text opacity-80">
                          tom@example.com
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {menus.map((menu, id) => (
                      <Button
                        key={id}
                        onClick={menu.action}
                        variant="secondary"
                        className="border-2 border-accent"
                      >
                        <TypographySmall className="block rounded-md px-4 py-2 text-sm text-gray-700 [&:not(:first-child)]:mt-0">
                          {menu.text}
                        </TypographySmall>
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
