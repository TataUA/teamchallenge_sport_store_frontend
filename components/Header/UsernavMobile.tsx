import Link from "next/link";

// components
import { ClientComponent } from "../ClientComponent";
import CartItem from "./CartItem";

export const UsernavMobile = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <ClientComponent>
        <div className="min-h-14 cursor-pointer py-3">
          <Link href="/auth/profile" onClick={() => onClose()}>
            <p className="font-button cursor-pointer text-primary font-medium hover:text-blue active:text-blue line-height-150 tracking-wide-04 flex">
              Мій профіль
            </p>
          </Link>
        </div>
        <CartItem onClose={onClose} />
      </ClientComponent>
    </>
  );
};
