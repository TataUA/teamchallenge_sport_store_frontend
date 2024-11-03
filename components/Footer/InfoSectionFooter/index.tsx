import Image from "next/image";
import Link from "next/link";
// utils
import { cn } from "@/services/utils/cn";

// assets
import footerTitleImage from "@/public/icons/footer/footer-title.png";
import footerTitleImageDesktop from "@/public/images/footer/Logo.jpg";
import { getTelegramIconFooter } from "@/helpers/getTelegramIconFooterSVG";
import { getInstagramIconFooter } from "@/helpers/getInstagramIconFooterSVG";
import { getViberIconFooter } from "@/helpers/getViberIconFooterSVG";

const InfoSectionFooter = () => {
  const infoSectionClassname = cn("shrink-0", "max-[767px]:grow");
  const subtitleClassname = cn(
    "text-lg font-black mb-4 font-semibold",
    "max-[767px]:mb-3 max-[767px]:text-base",
    "xl:text-base xl:font-bold xl:tracking-wide xl:pt-1 xl:mb-1",
    "min-[2800px]:text-4xl min-[2800px]:mb-[30px]",
  );
  const infoListItemClassname = cn(
    "text-base last:mb-0 font-medium tracking-wide",
    "max-[767px]:text-sm max-[767px]:mb-2",
    "xl:text-xs xl:font-medium xl:tracking-wider xl:leading-7 xl:w-[260px]",
    "min-[2800px]:text-3xl min-[2800px]:mb-[10px]",
  );
  const informationBlockClassanme = cn(infoListItemClassname, {
    " hover:cursor-pointer hover:underline": true,
  });
  const infoSocialItemClassname = cn(
    "mr-2 hover:cursor-pointer [&>svg]:hover:fill-blue",
    "min-[2800px]:mr-[50px] min-[2800px]:[&>svg]:w-auto min-[2800px]:[&>svg]:h-[80px]",
  );

  return (
    <div>
      <div className="text-center flex justify-center content-center mt-[-4px] mb-6 min-[2800px]:mb-[50px] xl:hidden">
        <Image
          alt="footer title"
          src={footerTitleImage}
          className="min-[2800px]:h-[200px] min-[2800px]:w-auto"
        />
      </div>
      <div className="hidden xl:flex xl:flex-row pt-[52px] xl:space-x-[136px]">
        <div className="hidden xl:flex xl:flex-col pt-1">
          <Image
            alt="footer title desktop"
            src={footerTitleImageDesktop}
            className=""
          />
          <div className="flex gap-2 mb-6 pt-7">
            <span className={infoSocialItemClassname}>
              {getTelegramIconFooter()}
            </span>
            <span className={infoSocialItemClassname}>
              {getInstagramIconFooter()}
            </span>
            <span className={infoSocialItemClassname}>
              {getViberIconFooter()}
            </span>
          </div>
        </div>

        <div className="hidden xl:flex xl:flex-wrap  xl:mb-6 xl:space-x-[75px] ">
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
        </div>
      </div>
      <div className="flex flex-wrap  mb-6 max-[767px]:gap-[22px] max-[767px]:mb-6 min-[2800px]:mb-12 xl:hidden">
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
      </div>

      <div className="flex gap-2 mb-6 xl:hidden">
        <span className={infoSocialItemClassname}>
          {getTelegramIconFooter()}
        </span>
        <span className={infoSocialItemClassname}>
          {getInstagramIconFooter()}
        </span>
        <span className={infoSocialItemClassname}>{getViberIconFooter()}</span>
      </div>
      <hr className="mb-6 min-[2800px]:my-[50px]  text-[#CFCFCF] xl:mt-3 xl:w-full xl:mb-[18px]" />
      <div className="mb-6 font-nunito font-normal text-[#6e6e70]  text-xs tracking-wider max-[767px]:text-xs min-[2800px]:text-3xl">
        <div className="xl:hidden">
          Project created for educational purposes <br />© 2024 Sport Hub.
        </div>
        <div className="hidden xl:block xl:text-center xl:mt-0">
          © 2024 Sport Hub. Всі права захищено
        </div>
      </div>
    </div>
  );
};

export default InfoSectionFooter;
