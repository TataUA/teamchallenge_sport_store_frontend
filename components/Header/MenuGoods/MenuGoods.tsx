"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { NavItem } from "@/services/types";
import { Button } from "@/components/Button/ButtonMenuHeader";

interface NavItemListProps {
  navItems: NavItem[];
  gender: number;
}

const MenuGoods = ({ navItems, gender }: NavItemListProps) => {
  const router = useRouter();

  const handleRedirect = (href: string) => {
    router.push(href);
  };

  const elements = navItems[gender].links.map((item, key) => {
    let paddLeft = "";
    if (item.label === "Кросівки") {
      paddLeft = "pl-0";
    } else {
      paddLeft = "pl-3";
    }
    return (
      <Button
        title={item.label}
        onClick={() => handleRedirect(item.href)}
        key={key}
        paddingLeftFirst={paddLeft}
        backGr="bg-[#f7f7f7]"
        goodsGroups="hover:underline"
        fontWeight="font-medium"
      />
    );
  });

  return <div className=" flex justify-start gap-2">{elements}</div>;
};

export default MenuGoods;
