import Image from "next/image";

//helpers
import getLogoMobile from "@/helpers/getLogoMobile";

// assets

import footerImageDesktop from "@/public/icons/footer/LogoFooter180-18.jpg";
import { BlockSocialIcons } from "./BlockSocialIcons";
import { BlockSocialIconsMin } from "./BlockSocialIconsMin";
import { BlockInfo } from "./BlockInfo";

const InfoSectionFooter = () => {
  return (
    <div>
      <div className="text-center flex justify-center content-center mt-[-4px] mb-4 min-[2800px]:mb-[50px] xl:hidden pt-4 pb-2  ">
        {getLogoMobile()}
      </div>
      <div className="hidden xl:flex xl:flex-row pt-[34px] xl:justify-between xl:space-x-4">
        <div className="hidden xl:flex xl:flex-col mr-2.5 pt-1 xl:min-w-[300px]">
          <Image alt="footer title desktop" src={footerImageDesktop} />
          <div className="flex gap-2 mb-6 pt-6">
            <BlockSocialIconsMin />
          </div>
        </div>
        <BlockInfo />
      </div>
      <div className="flex flex-wrap justify-between mb-6 max-[767px]:gap-[22px] max-[767px]:mb-6 min-[2800px]:mb-12 xl:hidden">
        <BlockInfo />
      </div>

      <div className="flex gap-2 mb-6 xl:hidden">
        <BlockSocialIcons />
      </div>
      <hr className="mb-6 min-[2800px]:my-[50px]  text-[#CFCFCF] xl:mt-3 xl:hidden xl:mb-[18px]" />
      <div className="mb-6 font-nunito font-normal text-[#6e6e70]  text-xs tracking-wider max-[767px]:text-xs min-[2800px]:text-3xl">
        <div className="xl:hidden">
          Project created for educational purposes <br />© 2024 Sport Hub.
        </div>
        <div className="hidden xl:block xl:text-center xl:mt-10 xl:tracking-wider xl:mb-5 ">
          © 2024 Sport Hub. Всі права захищено
        </div>
      </div>
    </div>
  );
};

export default InfoSectionFooter;
