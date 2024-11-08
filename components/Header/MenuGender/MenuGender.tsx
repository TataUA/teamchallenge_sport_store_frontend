"use client";
import React from "react";

import { Button } from "@/components/Button/ButtonMenuHeader";

const MenuGenger = () => {
  const onChoseMen = () => {
    console.log("click gender - Men");
  };
  const onChoseWoman = () => {
    console.log("click gender - Woman");
  };

  return (
    <>
      <Button title="ЧОЛОВІКИ" onClick={onChoseMen} />
      <div className="bg-border w-[2px] h-[18px] inline-block z-10"></div>
      <Button title="ЖІНКИ" onClick={onChoseWoman} paddingLeftFirst={"pl-5"} />
    </>
  );
};

export default MenuGenger;
