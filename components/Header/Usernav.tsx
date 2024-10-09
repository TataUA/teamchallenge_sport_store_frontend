"use client";

import { cn } from "@/services/utils/cn";
import { ClientComponent } from "../ClientComponent";
import HeaderNavLink from "./HeaderNavLink/HeaderNavLink";

interface UserNavProps {
  className?: string;
}

export const Usernav = ({ className }: UserNavProps) => {
  return (
    <div className={cn("flex items-center ", className)}>
      <ClientComponent>
        <HeaderNavLink />
      </ClientComponent>
    </div>
  );
};
