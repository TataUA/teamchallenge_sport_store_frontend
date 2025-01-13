"use client";

import { useState, useEffect } from "react";

import { Logo } from "../Logo/Logo";
import { LogoXl } from "../LogoXl/LogoXl";
import { Navbar } from "./Navbar";
import { Usernav } from "./Usernav";
import { NAV_ITEMS } from "@/public/data/nav-items.data";
import MenuGender from "./MenuGender/MenuGender";
import MenuGoods from "./MenuGoods/MenuGoods";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChoseGenger, setIsChoseGender] = useState("");
  const [isShowMenuGoogs, setIsShowMenuGoods] = useState(false);

  const handleLogoClick = () => {
    setIsModalOpen(false);
  };
  let gender: number | undefined;

  if (isChoseGenger === "men") {
    gender = 0;
  } else {
    gender = 1;
  }

  const showGoods = isShowMenuGoogs ? "block" : "none";

  const handleMouseLeave = (e: boolean) => {
    setIsShowMenuGoods(false);
  };

  return (
    <div onMouseLeave={() => handleMouseLeave(false)}>
      <div className="h-16 py-3 px-4 flex justify-between xl:hidden">
        <div className="h-10 flex items-center gap-[8px]">
          <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <Logo onClick={handleLogoClick} />
        </div>
        <Usernav />
      </div>

      <div className="hidden xl:h-30 xl:flex xl:flex-col fixed top-0 left-0 right-0 bg-white z-60 md:z-50 ">
        <div className="h-18 xl:container xl:mx-auto xl:px-[82px] py-2 flex justify-between items-center">
          <div className="h-12 w-50 flex items-center gap-1">
            <MenuGender
              navItems={NAV_ITEMS}
              setIsChoseGender={setIsChoseGender}
              gender={isChoseGenger}
              setIsShowMenuGoods={(e) => setIsShowMenuGoods(e)}
            />
          </div>
          <LogoXl />
          <Usernav />
        </div>
        <div
          className="h-12 w-full  bg-[#f7f7f7] transition duration-300"
          style={{ display: showGoods }}
        >
          <div
            id="goods"
            className="flex justify-start items-center xl:container xl:mx-auto xl:px-[82px]  transition duration-300"
          >
            <MenuGoods navItems={NAV_ITEMS} gender={gender} />
          </div>
        </div>
      </div>
    </div>
  );
};
