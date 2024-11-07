import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "../Header/nav-items.data";

import styles from "./styles.module.css";

export default function Gender() {
  return (
    <>
      <section className="mx-auto py-12 px-6 xl:px-[60px] xl:pt-[60px] xl:pb-[52px]">
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => (
            <li
              key={item.title.key}
              className="relative  bg-[#6f6f6f] rounded-lg w-[167px] h-[88px] flex items-center pl-4 overflow-hidden sm:w-[280px] sm:h-[107px] sm:rounded-xl xl:w-[648px] xl:pl-0 xl:h-[240px] xl:rounded-2xl "
            >
              <Link href={item.title.href}>
                <div className="absolute flex flex-col justify-center left-4 top-8  z-10  text-white  xl:left-[40px] xl:bottom-[-40px] ">
                  <h2 className="text-base font-medium  xl:text-2xl xl:mb-6">
                    {item.title.label}
                  </h2>
                  <button className="hidden xl:inline-block w-[124px] text-sm xl:font-semibold tracking-[2%] bg-transparent rounded-lg px-4 py-[6px] border xl:text-base xl:transparent-wide xl:px-6 xl:py-3 xl:rounded-xl">
                    Дивитися
                  </button>
                </div>

                <Image
                  src={item.title.image ?? ""}
                  height={88}
                  width={167}
                  alt={item.title.key}
                  className="z-1 absolute left-0 top-0 object-cover w-full h-full xl:w-[648px] xl:h-[240px]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
