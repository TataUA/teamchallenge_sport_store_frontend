import Link from "next/link";

// components
import { ClientComponent } from "../ClientComponent";
import CartItem from "./CartItem";

export const UsernavMobile = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <ClientComponent>
        <div className="min-h-14 cursor-pointer py-3 flex gap-5 flex-col">
          <Link href="/auth/profile" onClick={() => onClose()}>
            <p className="font-button py-3 cursor-pointer text-primary font-medium hover:text-blue active:text-blue line-height-150 tracking-wide-04 flex">
              Мій профіль
            </p>
          </Link>
          <Link href="/orders" onClick={() => onClose()}>
            <p className="font-button py-3 cursor-pointer text-primary font-medium hover:text-blue active:text-blue line-height-150 tracking-wide-04 flex">
              Мої замовлення
            </p>
          </Link>
        </div>
        <CartItem onClose={onClose} />
      </ClientComponent>
    </>
  );
};
