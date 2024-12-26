import Image from "next/image";

import getAboutUs1 from "@/helpers/getAboutUs1";
import getAboutUs156 from "@/helpers/getAboutUs156";
import getAboutUs256 from "@/helpers/getAboutUs256";
import getAboutUs264 from "@/helpers/getAboutUs264";
import getAboutUs356 from "@/helpers/getAboutUs356";
import getAboutUs364 from "@/helpers/getAboutUs364";
import { aboutUs } from "@/public/data/about-us.data";

export default function AboutUs() {
  return (
    <section className="px-6 pt-[72px] pb-8 md:flex md:flex-col-reverse xl:container xl:mx-auto xl:px-[60px] xl:pt-[44px] xl:pb-[88px]">
      <ul className="mb-[72px] md:flex md:flex-row justify-between md:mt-[88px] md:mb-0 xl:gap-6">
        {aboutUs.map(({ title, subtitle, image }, index) => (
          <li
            key={title}
            className="flex flex-col xl:flex-row text-[#333] text-sm leading-140 text-center mb-[40px] md:mb-0 mx-auto md:mx-0 md:text-sm md:text-left  xl:flex w-full xl:w-[424px] min-[2800px]:min-w-3xl min-[2800px]:text-3xl"
          >
            <div className="xl:hidden w-[76px] h-[76px] mb-4 ml-auto mr-auto xl:w-16 xl:h-16 xl:mr-2  xl:ml-0 ">
              {index == 0 ? getAboutUs1() : null}
              {index == 1 ? getAboutUs264() : null}
              {index == 2 ? getAboutUs364() : null}
            </div>
            <div className="hidden xl:block w-[76px] h-[76px] mb-4 ml-auto mr-auto xl:w-16 xl:h-16 xl:mr-2  xl:ml-0 ">
              {index == 0 ? getAboutUs156() : null}
              {index == 1 ? getAboutUs256() : null}
              {index == 2 ? getAboutUs356() : null}
            </div>

            <div>
              <h3 className="text-base mb-1 font-bold md:mb-[10px] xl:text-title">
                {title}
              </h3>
              <p className="text-common xl:leading-6 xl:text-base xl:w-[352px] xl:text-[#323234]">
                {subtitle}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <div className="flex justify-between items-center md:pb-[52px] ">
          <div>
            <h2 className="text-xl text-title font-semibold  mb-4 md:text-2xl md:mb-6 min-[2800px]:text-5xl min-[2800px]:mb-7 xl:">
              Про нас
            </h2>
            <div className="max-w-[741px] xl:hidden">
              <p className="text-[#333] text-sm leading-140 md:text-sm min-[2800px]:text-3xl ">
                В нашому онлайн-магазині
                <span className="font-bold"> SportHub </span>
                ви знайдете найкращий вибір спортивного взуття та одягу,
                створеного для максимального комфорту і продуктивності під час
                тренувань та активного відпочинку. Ми пропонуємо асортимент
                товарів від провідних світових брендів, таких як Adidas, Nike,
                Puma, Reebok, Under Armour та багато інших.
                <br /> <br />
                Наша мета - надихнути вас на нові досягнення і допомогти знайти
                саме ті товари, які підходять вам найкраще. У нас ви зможете
                знайти кросівки для бігу, також ми пропонуємо тренувальні
                кросівки для інтенсивних тренувань, які гарантують оптимальну
                підтримку та комфорт.
                <br /> <br />
                Крім взуття, у нас є великий вибір одягу: легкі та дихаючі
                футболки з матеріалів, які швидко відводять вологу, забезпечують
                комфорт протягом всього дня; шорти для будь-якого виду спорту -
                від бігу до тренувань у залі; спортивні штани, які забезпечують
                свободу руху.
                <br /> <br />
                Приєднуйтесь до нашої спільноти і відкрийте для себе світ
                активного життя з SportHub! Пам&apos;ятайте, що наш сайт
                створений виключно в учбових цілях, тому замовити товар на ньому
                неможливо.
              </p>
            </div>

            <div className="hidden xl:block text-base text-[#323234] w-[760px]">
              <p>
                У нашому онлайн-магазині SportHub ви знайдете широкий вибір
                спортивного взуття та одягу для чоловіків і жінок від провідних
                світових брендів, таких як Adidas, Nike, Puma, Reebok та Under
                Armour та інші. Ми пропонуємо кросівки для бігу, зручні
                тренувальні моделі, легкі футболки, спортивні штани та шорти, що
                забезпечують свободу руху і комфорт. Долучайтеся до нашої
                спільноти та відкрийте для себе світ активного життя разом із
                SportHub! <br />
                <span className="xl:leading-4 text-sm text-[#868687]">
                  Зверніть увагу, що сайт створений в учбових цілях, тому
                  замовити товар неможливо
                </span>
              </p>
            </div>
          </div>
          <div className="md:flex-shrink-0">
            <Image
              alt="sport girl"
              src="/images/aboutUs/sport.jpg"
              width={536}
              height={202}
              className="hidden md:block md:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
