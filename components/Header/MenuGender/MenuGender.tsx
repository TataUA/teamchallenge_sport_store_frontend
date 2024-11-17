"use client";
import React from "react";

import { NavItem } from "@/services/types";
import { Button } from "@/components/Button/ButtonMenuHeader";

interface NavItemListProps {
  navItems: NavItem[];
  setIsChoseGender: (isGender: string) => void;
  gender: number;
}

const MenuGenger = ({
  navItems,
  setIsChoseGender,
  gender,
}: NavItemListProps) => {
  return (
    <>
      <Button
        title={navItems[0].title.label.toUpperCase()}
        onClick={() => setIsChoseGender(navItems[0].title.key)}
        selected={gender === 0 ? true : false}
      />
      <div className="bg-border w-[2px] h-6 inline-block z-10"></div>
      <Button
        title={navItems[1].title.label.toUpperCase()}
        onClick={() => setIsChoseGender(navItems[1].title.key)}
        paddingLeftFirst={"pl-5"}
        selected={gender === 1 ? true : false}
      />
    </>
  );
};

export default MenuGenger;
