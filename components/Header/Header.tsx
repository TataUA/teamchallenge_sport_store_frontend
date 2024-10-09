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
    <header className="h-16 py-3 px-4 flex  items-center">
      <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Logo onClick={handleLogoClick} className="py-[13px] pl-2" />

      <Usernav className="ml-auto" />
    </header>
  );
};
