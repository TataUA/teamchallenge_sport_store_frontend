import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import { NAV_ITEMS } from "@/public/data/nav-items.data";

export default function Gender() {
  return (
    <>
      <section className="container py-12 xl:pt-[60px] xl:pb-[52px]">
        <ul className="flex justify-between gap-2 xl:gap-6">
          {NAV_ITEMS.map((item) => (
            <li
              key={uuidv4()}
              className="relative w-[calc((100%-8px)/2)] xl:w-[648px] min-h-[88px] xl:min-h-[240px] max-h-[240px] aspect-ratio-[1365/720] xl:aspect-auto rounded-xl xl:rounded-2xl overflow-hidden"
            >
              <Link
                href={item.title.href}
                className="flex items-center justify-center h-full"
              >
                <Image
                  src={item.title.image ?? ""}
                  alt={item.title.key}
                  width={648}
                  height={240}
                  className="object-fill w-full h-full xl:object-cover"
                />
                <div className="absolute z-10 left-4 xl:left-10 top-[50%] xl:top-[104px] transform-translate-y-1/2 text-white">
                  <h2 className="xl:mb-6 font-medium text-base xl:text-2xl">
                    {item.title.label}
                  </h2>
                  <button className="hidden xl:block w-[124px] h-12 p-3 border rounded-xl font-semibold text-base tracking-custom_2 bg-transparent hover:bg-[#0e0e10]/20 transition">
                    Дивитися
                  </button>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
