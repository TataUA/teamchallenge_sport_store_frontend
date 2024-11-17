"use client";

import { useState } from "react";

import { Logo } from "../Logo/Logo";
import { LogoXl } from "../LogoXl/LogoXl";
import { Navbar } from "./Navbar";
import { Usernav } from "./Usernav";
import { NAV_ITEMS } from "@/components/Header/nav-items.data";
import MenuGender from "./MenuGender/MenuGender";
import MenuGoods from "./MenuGoods/MenuGoods";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChoseGenger, setIsChoseGender] = useState("men");

  const handleLogoClick = () => {
    setIsModalOpen(false);
  };
  let gender: number | undefined;

  if (isChoseGenger === "men") {
    gender = 0;
  } else {
    gender = 1;
  }

  return (
    <>
      <header className="h-16 py-3 px-4 flex justify-between xl:hidden">
        <div className="h-10 flex items-center gap-[8px]">
          <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <Logo onClick={handleLogoClick} />
        </div>
        <Usernav />
      </header>

      <header className="hidden xl:h-30 xl:flex xl:flex-col">
        <div className="h-18 xl:px-[60px] py-3 flex justify-between items-center">
          <div className="h-12 w-50 flex items-center gap-1">
            <MenuGender
              navItems={NAV_ITEMS}
              setIsChoseGender={setIsChoseGender}
              gender={gender}
            />
          </div>
          <LogoXl />
          <Usernav />
        </div>
        <div className="h-12 w-full xl:px-[60px] bg-[#f7f7f7] flex justify-start items-center">
          <MenuGoods navItems={NAV_ITEMS} gender={gender} />
        </div>
      </header>
    </>
  );
};
