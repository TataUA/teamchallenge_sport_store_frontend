import Image from "next/image";

// utils
import { cn } from "@/services/utils/cn";

// assets
import footerTitleImage from '@/public/icons/footer/footer-title.png'
import { getTelegramIconFooter } from "@/public/icons/footer/socials/getTelegramIconFooter";
import { getInstagramIconFooter } from "@/public/icons/footer/socials/getInstagramIconFooter";
import { getViberIconFooter } from "@/public/icons/footer/socials/getViberIconFooter";

const InfoSectionFooter = () => {
  const infoSectionClassname = cn('shrink-0', 'max-[767px]:grow');
  const subtitleClassname = cn('text-lg font-black mb-4', 
    'max-[767px]:mb-3 max-[767px]:text-base', 
    'min-[2800px]:text-4xl min-[2800px]:mb-[30px]');
  const infoListItemClassname = cn('text-base last:mb-0', 
    'max-[767px]:text-sm max-[767px]:mb-2', 
    'min-[2800px]:text-3xl min-[2800px]:mb-[10px]')
  const informationBlockClassanme = cn(infoListItemClassname, {'hover:cursor-pointer hover:underline': true})
  const infoSocialItemClassname = cn('mr-2 hover:cursor-pointer [&>svg]:hover:fill-blue', 
    'min-[2800px]:mr-[50px] min-[2800px]:[&>svg]:w-auto min-[2800px]:[&>svg]:h-[80px]');

  return (
    <div>
      <div className="text-center flex justify-center content-center mb-5 min-[2800px]:mb-[50px]">
        <Image alt='footer title' src={footerTitleImage} className="min-[2800px]:h-[200px] min-[2800px]:w-auto"/>
      </div>
      <div className="flex flex-wrap gap-20 mb-5 max-[767px]:gap-7 max-[767px]:mb-6 min-[2800px]:mb-12">
        <div className={infoSectionClassname}>
          <div className={subtitleClassname}>Інформація</div>
          <div className="list-none">
            <li className={informationBlockClassanme}>Про компанію </li>
            <li className={informationBlockClassanme}>Доставка і оплата</li>
            <li className={informationBlockClassanme}>Повернення</li>
          </div>
        </div>
        <div  className={infoSectionClassname}>
          <div className={subtitleClassname}>Контакти</div>
          <div className="list-none">
            <li className={infoListItemClassname}>м.Харків, вул.Мироносицька 79 </li>
            <li className={infoListItemClassname}>+ 38 (050) 000 00 21</li>
          </div>
        </div>
        <div  className={infoSectionClassname}>
          <div className={subtitleClassname}>Час роботи</div>
          <div className="list-none">
            <li className={infoListItemClassname}>Пн - Сб 10:00-19:00</li>
            <li className={infoListItemClassname}>Нд 11:00 - 18:00</li>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mb-5">
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
        <hr className="mb-5 min-[2800px]:my-[50px]" />
        <div className="font-normal text-sm max-[767px]:text-xs min-[2800px]:text-3xl">
          <div>Project created for educational purposes <br />
            © 2024 Sport Hub.
          </div>
        </div>
    </div>
  )
}

export default InfoSectionFooter