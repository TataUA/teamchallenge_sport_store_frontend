import Link from "next/link";

// components
import { ClientComponent } from "../ClientComponent";
import getArrowRightIconSVG from "@/helpers/getArrowRightIconSVG";

export const UsernavMobile = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <ClientComponent>
        <div className="min-h-14 cursor-pointer py-3 flex gap-5 flex-col">
          <Link
            className="flex justify-between items-center [&>svg]:stroke-primary text-primary hover:text-blue active:text-blue [&>svg]:hover:stroke-blue [&>svg]:active:stroke-blue"
            href="/auth/profile"
            onClick={() => onClose()}
          >
            <p className="font-button py-3 cursor-pointer font-medium line-height-150 tracking-wide-04 flex">
              Мої данні
            </p>
            {getArrowRightIconSVG()}
          </Link>
          <Link
            className="flex justify-between items-center [&>svg]:stroke-primary text-primary hover:text-blue active:text-blue [&>svg]:hover:stroke-blue [&>svg]:active:stroke-blue"
            href="/orders"
            onClick={() => onClose()}
          >
            <p className="font-button py-3 cursor-pointer font-medium  line-height-150 tracking-wide-04 flex">
              Мої замовлення
            </p>
            {getArrowRightIconSVG()}
          </Link>
          <div className="bg-[#CFCFCF] h-[1px]" />
          <div
            className="flex justify-between items-center [&>svg]:stroke-primary text-primary hover:text-blue active:text-blue [&>svg]:hover:stroke-blue [&>svg]:active:stroke-blue"
            onClick={() => onClose()}
          >
            <p className="font-button py-3 cursor-pointer font-medium line-height-150 tracking-wide-04 flex">
              Вихід
            </p>
            {getArrowRightIconSVG()}
          </div>
        </div>
      </ClientComponent>
    </>
  );
};
