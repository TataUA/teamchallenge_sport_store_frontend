"use client";
import React from "react";

import { NavItem } from "@/services/types";
import { Button } from "@/components/Button/ButtonMenuHeader";

interface NavItemListProps {
  navItems: NavItem[];
  setIsChoseGender: (isGender: string) => void;
  gender?: string;
  setIsShowMenuGoods: (e: boolean) => void;
}

const MenuGenger = ({
  navItems,
  setIsChoseGender,
  gender,
  setIsShowMenuGoods,
}: NavItemListProps) => {
  const handleMouseEnter = (e: string) => {
    setIsChoseGender(e);
    setIsShowMenuGoods(true);
  };

  return (
    <div className="item.box flex ">
      <div onMouseEnter={() => handleMouseEnter("men")}>
        <Button
          title={navItems[0].title.label.toUpperCase()}
          selected={gender === "men" ? true : false}
        />
      </div>

      <div className="h-4 w-[1px]  mt-4 bg-[#E7E7E8]"></div>
      <div onMouseEnter={() => handleMouseEnter("women")}>
        <Button
          title={navItems[1].title.label.toUpperCase()}
          paddingLeftFirst={"pl-4"}
          selected={gender === "women" ? true : false}
        />
      </div>
    </div>
  );
};

export default MenuGenger;
