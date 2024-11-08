"use client";
import React from "react";

import { Button } from "@/components/Button/ButtonMenuHeader";

const MenuGoods = () => {
  const items: string[] = [
    "Кросівки",
    "Футболки",
    "Шорти",
    "Штани",
    "Світшоти",
  ];

  const handleRedirect = (item: string) => {
    console.log(`click gender - ${item}`);
  };

  const elements = items.map((item, itemName) => {
    let paddLeft = "";
    if (item === "Кросівки") {
      paddLeft = "pl-0";
    } else {
      paddLeft = "pl-5";
    }
    return (
      <Button
        title={item}
        onClick={() => handleRedirect(item)}
        key={itemName}
        paddingLeftFirst={paddLeft}
        backGr="bg-[#f7f7f7]"
      />
    );
  });

  return <div className="flex justify-start gap-2">{elements}</div>;
};

export default MenuGoods;
