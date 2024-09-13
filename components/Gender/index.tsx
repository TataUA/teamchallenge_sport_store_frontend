import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "../Header/nav-items.data";

import styles from "./styles.module.css";

export default function Gender() {
  return (
    <>
      <section className="mx-auto py-12 px-6 xl:px-[60px] xl:py-[52px]">
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => (
            <li
              key={item.title.key}
              className="relative bg-[#6f6f6f] rounded-lg w-[167px] h-[88px] flex items-center pl-4 overflow-hidden xl:w-[652px]  xl:h-[240px]"
            >
              <Link href={item.title.href}>
                <h2 className="absolute inset-0 flex items-center left-4 text-white text-base font-semibold z-10 xl:text-2xl  xl:left-[40px]">
                  {item.title.label}
                </h2>

                <Image
                  src={item.title.image ?? ""}
                  height={88}
                  width={167}
                  alt={item.title.key}
                  className="absolute left-0 top-0 object-cover w-full h-full xl:w-[652px] xl:h-[240px]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
