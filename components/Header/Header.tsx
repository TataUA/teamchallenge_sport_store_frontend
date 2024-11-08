"use client";

import { useState } from "react";
import { Logo } from "../Logo/Logo";
import { LogoXl } from "../LogoXl/LogoXl";
import { Navbar } from "./Navbar";
import { Usernav } from "./Usernav";
import MenuGender from "./MenuGender/MenuGender";
import MenuGoods from "./MenuGoods/MenuGoods";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoClick = () => {
    setIsModalOpen(false);
  };

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
          <div className="h-12 w-50 flex items-center gap-[8px]">
            <MenuGender />
          </div>
          <LogoXl />
          <Usernav />
        </div>
        <div className="h-12 w-full xl:px-[60px] bg-[#f7f7f7] flex justify-start items-center">
          <MenuGoods />
        </div>
      </header>
    </>
  );
};
