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
  const handleMouseEnter = () => {
    setIsShowMenuGoods(true);
  };

  const handleMouseLeave = () => {
    if (!gender) {
      setIsShowMenuGoods(false);
      return;
    }
  };

  const handleClick = (e: string) => {
    setIsChoseGender(e);
    setIsShowMenuGoods(true);
  };

  return (
    <div
      className="item.box flex "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        title={navItems[0].title.label.toUpperCase()}
        onClick={() => handleClick(navItems[0].title.key)}
        selected={gender === "men" ? true : false}
      />
      <div className="h-4 w-[1px] mt-4 bg-[#E7E7E8]"></div>
      <Button
        title={navItems[1].title.label.toUpperCase()}
        onClick={() => handleClick(navItems[1].title.key)}
        paddingLeftFirst={"pl-4"}
        selected={gender === "women" ? true : false}
      />
    </div>
  );
};

export default MenuGenger;
