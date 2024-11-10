"use client";
import React from "react";
import { NavItem } from "@/services/types";
import { Button } from "@/components/Button/ButtonMenuHeader";

interface NavItemListProps {
  navItems: NavItem[];
  setIsChoseGender: (isGender: string) => void;
}

const MenuGenger = ({ navItems, setIsChoseGender }: NavItemListProps) => {
  return (
    <>
      <Button
        title={navItems[0].title.label.toUpperCase()}
        onClick={() => setIsChoseGender(navItems[0].title.key)}
      />
      <div className="bg-border w-[2px] h-[18px] inline-block z-10"></div>
      <Button
        title={navItems[1].title.label.toUpperCase()}
        onClick={() => setIsChoseGender(navItems[1].title.key)}
        paddingLeftFirst={"pl-5"}
      />
    </>
  );
};

export default MenuGenger;
