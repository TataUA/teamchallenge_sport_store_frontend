import Image from "next/image";
import { Modal } from "@/components/Modal/Modal";
import { NavItemListMobile } from "@/components/Header/NavItemListMobile/NavItemListMobile";
import { UsernavMobile } from "@/components/Header/UsernavMobile";
import { NAV_ITEMS } from "@/public/data/nav-items.data";
import menuIcon from "@/public/icons/header/mob-menu.svg";

interface NavbarProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const Navbar = ({ isModalOpen, setIsModalOpen }: NavbarProps) => {
  return (
    <div className="flex items-center justify-center">
      <button className="border-none" onClick={() => setIsModalOpen(true)}>
        <Image src={menuIcon} alt="menu" width={40} height={40} />
      </button>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="mb-[16px]">
          <NavItemListMobile
            navItems={NAV_ITEMS}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
        <div className="border-t border-border mb-[16px]"></div>
        <UsernavMobile onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};
