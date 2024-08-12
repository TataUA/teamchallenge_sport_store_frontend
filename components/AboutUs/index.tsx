import Image from "next/image";

export default function AboutUs() {
  const itemClassname =
    "text-[#333] text-sm leading-140 text-center mb-[40px] md:mb-0 max-w-[335px] mx-auto md:mx-0 md:text-sm md:text-left min-[2800px]:min-w-3xl min-[2800px]:text-3xl ";
  
  return (
    <div className="px-6 md:flex md:flex-col-reverse">
      <div>
        <ul className="mb-[72px] md:flex md:flex-row justify-between  md:gap-3 md:mb-[125px]">
          <li className={itemClassname}>
            <Image
              alt="footer title"
              src="/images/aboutUs/woman.png"
              width={44}
              height={44}
              className="mb-4 ml-auto mr-auto md:w-6xl md:hidden"
            />

            <h3 className="mb-1 font-bold md:mb-[10px]">
              Твій Спорт, Твій Стиль
            </h3>
            <p>
              Пропонуємо спортивний одяг та взуття від провідних брендів.
              Оригінал, не репліки. Відкрий для себе нові можливості разом з
              нами!
            </p>
          </li>
          <li className={itemClassname}>
            <Image
              alt="footer title"
              src="/images/aboutUs/fitness.png"
              width={54}
              height={56}
              className="mb-4 ml-auto mr-auto md:w-6xl md:hidden"
            />

            <h3 className="mb-1 font-bold md:mb-[10px]">Спорт для Кожного</h3>
            <p>
              Незалежно від рівня підготовки, у нас є все, що потрібно для твого
              спорту. Почни свою подорож до здорового способу життя вже
              сьогодні!
            </p>
          </li>
          <li className={itemClassname}>
            <Image
              alt="footer title"
              src="/images/aboutUs/marathon.png"
              width={62}
              height={62}
              className="mb-4 ml-auto mr-auto md:w-6xl md:hidden"
            />

            <h3 className="mb-1 font-bold md:mb-[10px]">Рухайся Вільно</h3>
            <p>
              Відчуй комфорт і підтримку в кожному русі з нашими якісними
              спортивними товарами. Ідеально підібрані для активного життя!
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-extrabold  mb-4 md:text-2xl md:mb-6 min-[2800px]:text-5xl min-[2800px]:mb-7">
          Про нас
        </h2>
        <div className="flex justify-between items-center md:mb-[100px] ">
          <div className="max-w-[741px] mb-12 md:mb-0 md:flex-1 min-[2800px]:max-w-screen-xl">
            <p className="text-[#333] text-sm leading-140 md:text-sm min-[2800px]:text-3xl">
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
              знайти кросівки для бігу, також ми пропонуємо тренувальні кросівки
              для інтенсивних тренувань, які гарантують оптимальну підтримку та
              комфорт.
              <br /> <br />
              Крім взуття, у нас є великий вибір одягу: легкі та дихаючі
              футболки з матеріалів, які швидко відводять вологу, забезпечують
              комфорт протягом всього дня; шорти для будь-якого виду спорту -
              від бігу до тренувань у залі; спортивні штани, які забезпечують
              свободу руху.
              <br /> <br />
              Приєднуйтесь до нашої спільноти і відкрийте для себе світ
              активного життя з SportHub! Пам&apos;ятайте, що наш сайт створений
              виключно в учбових цілях, тому замовити товар на ньому неможливо.
            </p>
          </div>
          <div className="md:flex-shrink-0">
            <Image
              alt="sport girl"
              src="/images/aboutUs/sport.jpg"
              width={427}
              height={290}
              className="hidden md:block md:max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
