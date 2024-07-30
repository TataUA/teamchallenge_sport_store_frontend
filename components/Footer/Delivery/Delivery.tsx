export default function Delivery() {
  return (
    <div className="px-6 pt-4 pb-12 min-[1440px]:w-2/3 mx-auto">
      <h1 className="text-xl mb-8 mt-10 min-[768px]:text-2xl font-bold min-[1440px]:text-4xl">Доставка і оплата</h1>
      <p className="text-sm mb-8 min-[768px]:text-base min-[1440px]:text-lg">Ласкаво просимо до розділу "Доставка і оплата" на нашому сайті "SportHub". Тут ви знайдете всю необхідну інформацію про способи доставки та варіанти оплати, доступні для вас.
      </p>

      <h2 className="mb-2 text-base  min-[768px]:text-lg font-bold min-[1440px]:text-xl">Контактні дані</h2>
      <p className="mb-2 text-sm min-[768px]:text-base min-[1440px]:text-lg">Для оформлення замовлення вам необхідно надати наступну інформацію:</p>

      <ul className="list-disc text-sm mb-8 ml-8 min-[768px]:text-base min-[1440px]:text-lg">
        <li>Прізвище</li>
        <li>Ім’я</li>
        <li>По-батькові</li>
        <li>Номер телефону</li>
        <li>Електронна пошта</li>
      </ul>
      <p className="text-sm mb-8 min-[768px]:text-base min-[1440px]:text-lg">Якщо у вас вже є акаунт, ви можете увійти, щоб швидко заповнити ці дані.</p>

      <h2 className="mb-2 text-base  min-[768px]:text-lg font-bold min-[1440px]:text-xl">Доставка</h2>
      <p className="mb-2 text-sm  min-[768px]:text-base min-[1440px]:text-lg">Ми пропонуємо декілька варіантів доставки через сервіс "Нова пошта":</p>
      <ol className="list-decimal text-sm mb-8 ml-8 min-[768px]:text-base min-[1440px]:text-lg">
        <li>Відділення Нова пошта: Ви можете вибрати місто та конкретне відділення, де вам буде зручно отримати ваше замовлення.
        </li>
        <li>Кур'єром Нова пошта: Ваше замовлення буде доставлено безпосередньо за вказаною вами адресою.
        </li>
        <li>Поштомат Нова пошта: Виберіть найближчий поштомат для отримання замовлення у зручний для вас час.
        </li>
      </ol>

      <h2 className="mb-2 text-base  min-[768px]:text-lg font-bold min-[1440px]:text-xl">Умови відправки</h2>
      <ul className="list-disc text-sm mb-8 ml-8 min-[768px]:text-base min-[1440px]:text-lg">
        <li>Відправка у день замовлення: Якщо ваше замовлення було зроблено до 13:00, ми відправимо його у той же день.
        </li>
        <li>Відправка на наступний день: Якщо ваше замовлення було зроблено після 13:00, ми відправимо його наступного дня.
        </li>
      </ul>

      <h2 className="mb-2 text-base  min-[768px]:text-lg font-bold min-[1440px]:text-xl">Оплата</h2>
      <p className="mb-2 text-sm  min-[768px]:text-base min-[1440px]:text-lg">Для вашої зручності ми пропонуємо кілька варіантів оплати:</p>
      <ul className="list-disc text-sm mb-8 ml-8 min-[768px]:text-base min-[1440px]:text-lg">
        <li>Оплата при отриманні замовлення: Комісія за даний спосіб оплати складає 20 грн + 3.2% від суми замовлення.</li>
        <li>Оплата картою: Швидкий та зручний спосіб оплати онлайн.</li>
      </ul>

      <p className="text-sm min-[768px]:text-base min-[1440px]:text-lg">Наші умови доставки та оплати розроблені для вашого максимального комфорту та зручності. Якщо у вас виникнуть додаткові питання, не соромтеся звертатися до нашої служби підтримки. Дякуємо, що обрали "SportHub"!</p>
    </div>
  )
}