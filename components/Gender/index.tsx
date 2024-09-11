import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "../Header/nav-items.data";

export default function Gender() {
  return (
    <>
      <section className="mb-12 px-6">
        <ul className="flex " style={{ gap: "calc(100% - 334px)" }}>
          {NAV_ITEMS.map((item) => (
            <li
              key={item.title.key}
              className="relative bg-[#6f6f6f] rounded-lg w-[167px] h-[88px] flex items-center pl-4 overflow-hidden "
            >
              <Link href={item.title.href}>
                <h2 className="absolute inset-0 flex items-center left-4 text-white text-base font-semibold z-10 ">
                  {item.title.label}
                </h2>

                <Image
                  src={item.title.image ?? ""}
                  height={88}
                  width={167}
                  alt={item.title.key}
                  className="absolute left-0 top-0 object-cover w-full h-full"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
