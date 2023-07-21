import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TypographyH2 } from "@/components/ui/typography";
import Cookies from "js-cookie";
import { Menu } from "lucide-react";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
  { text: "Tracks", id: "tracks" },
  { text: "Audio Book", id: "audio-book" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    Cookies.remove("username");

    navigate("/login");
  };

  const menus = [
    { text: "Profile", action: () => ({}) },
    { text: "Settings", action: () => ({}) },
    { text: "Sign out", action: handleLogout },
  ];

  const [selectedTab, setSelectedTab] = useState<string>("tracks");

  return (
    <nav className="bg-secondary drop-shadow-lg sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <TypographyH2 className="font-black text-text cursor-pointer hover:border-b-primary">
              !Spotify
            </TypographyH2>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {tabs?.map((menu) => (
                  <a
                    key={menu.id}
                    className={`rounded-md px-3 py-2 text-sm font-medium cursor-pointer ${
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
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <Popover>
                  <PopoverTrigger className="hidden md:block">
                    <button
                      type="button"
                      className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent className="w-40 hidden md:block">
                    {menus?.map((menu, id) => (
                      <a
                        key={id}
                        className="block px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-primary hover:text-background cursor-pointer"
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
          <div className="-mr-2 flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent className="bg-secondary md:hidden">
                <div className="md:hidden" id="mobile-menu">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
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
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>

                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          Tom Cook
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          tom@example.com
                        </div>
                      </div>
                    </div>
                  </div>
                  {menus?.map((menu, id) => (
                    <a
                      key={id}
                      className="block px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-text hover:text-background cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      id={`user-menu-item-${id}`}
                      onClick={menu.action}
                    >
                      {menu.text}
                    </a>
                  ))}
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
