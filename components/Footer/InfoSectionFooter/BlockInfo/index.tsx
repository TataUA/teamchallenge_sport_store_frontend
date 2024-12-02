import Link from "next/link";
import { cn } from "@/services/utils/cn";

export const BlockInfo = () => {
  const infoSectionClassname = cn(" xl:w-[314px]", "max-[767px]:grow");

  const subtitleClassname = cn(
    "text-lg font-black mb-4 font-semibold",
    "max-[767px]:mb-3 max-[767px]:text-base",
    "xl:text-base  xl:tracking-wide xl:pt-1 xl:mb-1 xl:text-title",
    "min-[2800px]:text-4xl min-[2800px]:mb-[30px]",
  );

  const infoListItemClassname = cn(
    "text-base last:mb-0 font-medium tracking-wide",
    "max-[767px]:text-sm max-[767px]:mb-2",
    "xl:text-sm  xl:font-medium xl:tracking-wide xl:leading-5 xl:w-[260px] xl:pt-2 xl:text-common",
    "min-[2800px]:text-3xl min-[2800px]:mb-[10px]",
  );

  const informationBlockClassanme = cn(infoListItemClassname, {
    " hover:cursor-pointer hover:underline": true,
  });

  return (
    <>
      <div className={infoSectionClassname}>
        <div className={subtitleClassname}>Інформація</div>
        <div className="list-none">
          <li className={informationBlockClassanme}>
            <Link href="/info/about">Про компанію </Link>{" "}
          </li>
          <li className={informationBlockClassanme}>
            <Link href="/info/delivery">Доставка і оплата</Link>
          </li>
          <li className={informationBlockClassanme}>
            <Link href="/info/return">Повернення</Link>
          </li>
        </div>
      </div>
      <div className={infoSectionClassname}>
        <div className={subtitleClassname}>Контакти</div>
        <div className="list-none">
          <li className={infoListItemClassname}>
            м.Харків, вул.Мироносицька 79{" "}
          </li>
          <li className={infoListItemClassname}>
            <span className="text-xs">+ 38 (050) 000 00 21</span>
          </li>
        </div>
      </div>
      <div className={infoSectionClassname}>
        <div className={subtitleClassname}>Час роботи</div>
        <div className="list-none">
          <li className={infoListItemClassname}>Пн - Сб 10:00-19:00</li>
          <li className={infoListItemClassname}>Нд 11:00 - 18:00</li>
        </div>
      </div>
    </>
  );
};
