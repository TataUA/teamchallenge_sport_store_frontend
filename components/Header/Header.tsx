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
    <header className="container px-4 py-3 flex justify-between">
      <div className="flex items-center gap-2">
        <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Logo onClick={handleLogoClick} />
      </div>
      <Usernav />
    </header>
  );
};
