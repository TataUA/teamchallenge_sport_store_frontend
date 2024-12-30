import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import { aboutUs } from "@/public/data/about-us.data";

export default function AboutUs() {
  return (
    <section className="my-12 xl:my-0 container xl:flex xl:flex-col-reverse">
      <ul className="mb-12 xl:mb-0 py-6 xl:py-[88px] flex flex-col xl:flex-row gap-10 xl:gap-6">
        {aboutUs.map(({ title, subtitle, image }, index) => (
          <li
            key={uuidv4()}
            className="flex flex-col items-center justify-center xl:flex-row xl:items-start gap-4"
          >
            <Image
              src={image}
              alt={title}
              width={64}
              height={64}
              className="xl:w-[56px] xl:h-[56px]"
            ></Image>
            <div className="flex flex-col text-center xl:text-left">
              <h3 className="mb-1 xl:mb-2 font-semibold text-base xl:text-title">
                {title}
              </h3>
              <p className="block font-medium text-sm xl:text-base tracking-custom_4 xl:tracking-normal text-common">
                {subtitle}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="xl:py-[52px] flex gap-6">
        <div>
          <h2 className="mb-4 xl:mb-6 font-semibold text-xl xl:text-2xl text-title">
            Про нас
          </h2>
          <p className="xl:mb-2 block font-medium text-sm xl:text-base tracking-custom_4 xl:tracking-normal text-common">
            У нашому онлайн-магазині{" "}
            <span className="font-bold xl:font-medium">SportHub</span> ви
            знайдете широкий вибір спортивного взуття та одягу для чоловіків і
            жінок від провідних світових брендів, таких як Adidas, Nike, Puma,
            Reebok та Under Armour та інші. Ми пропонуємо кросівки для бігу,
            зручні тренувальні моделі, легкі футболки, спортивні штани та шорти,
            що забезпечують свободу руху і комфорт. Долучайтеся до нашої
            спільноти та відкрийте для себе світ активного життя разом із
            SportHub!
          </p>
          <p className="hidden xl:block font-medium text-sm text-label">
            Зверніть увагу, що сайт створений в учбових цілях, тому замовити
            товар неможливо
          </p>
        </div>
        <Image
          src="/images/aboutUs/sport.jpg"
          alt="Спортивна дівчина"
          width={536}
          height={202}
          className="hidden xl:block"
        />
      </div>
    </section>
  );
}
