"use client";
import React from "react";

import { Button } from "@/components/Button/ButtonMenuHeader";

const MenuGoods = () => {
  const handleRedirect = () => {
    console.log("click gender");
  };

  return (
    <div className="flex justify-start">
      <Button subtype="primary" title="кросівки" onClick={handleRedirect} />
      <Button subtype="primary" title="футболки" onClick={handleRedirect} />
      <Button subtype="primary" title="кросівки" onClick={handleRedirect} />
      <Button subtype="primary" title="футболки" onClick={handleRedirect} />
    </div>
  );
};

export default MenuGoods;
