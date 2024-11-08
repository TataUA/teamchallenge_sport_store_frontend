"use client";
import React from "react";

import { Button } from "@/components/Button/ButtonMenuHeader";

const MenuGenger = () => {
  const handleRedirect = () => {
    console.log("click gender");
  };

  return (
    <>
      <Button subtype="primary" title="ЧОЛОВІКИ" onClick={handleRedirect} />
      <Button subtype="primary" title="ЖІНКИ" onClick={handleRedirect} />
    </>
  );
};

export default MenuGenger;
