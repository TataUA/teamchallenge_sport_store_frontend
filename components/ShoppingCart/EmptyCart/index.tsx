import getBigCartSVG from "@/helpers/getBigCartSVG";
import Link from "next/link";

const EmptyCart = () => (
  <div className="w-full flex-1 flex flex-col">
    <h3 className="hidden md:block text-left text-heading font-bold leading-140 mb-4 text-title text-2xl">
      Кошик
    </h3>
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center">
          {getBigCartSVG("mb-6")}
          <h1 className="text-heading font-bold text-title mb-2">
            Ваш кошик порожній
          </h1>
          <p className="text-basic font-medium text-title">
            Але його легко заповнити :)
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center rounded-xl py-3 bg-blue cursor-pointer w-full max-w-[342px] text-button font-semibold text-white"
        >
          За покупками
        </Link>
      </div>
    </div>
  </div>
);

export default EmptyCart;
