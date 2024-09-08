"use client";

import { useState } from "react";
import { Logo } from "../Logo/Logo";
import { Navbar } from "./Navbar";
import { Usernav } from "./Usernav";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoClick = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="h-16 py-3 px-4 flex justify-between">
      <div className="h-10 flex items-center gap-[8px]">
        <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Logo onClick={handleLogoClick} />
      </div>
      <Usernav />
    </header>
  );
};
