import Image from "next/image";

// assets
import footerTitleImage from "@/public/icons/footer/footer-title.png";
import footerTitleImageDesktop from "@/public/images/footer/Logo.jpg";
import { BlockSocialIcons } from "./BlockSocialIcons";
import { BlockInfo } from "./BlockInfo";

const InfoSectionFooter = () => {
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
          <Image alt="footer title desktop" src={footerTitleImageDesktop} />
          <div className="flex gap-2 mb-6 pt-7">
            <BlockSocialIcons />
          </div>
        </div>

        <div className="hidden xl:flex xl:flex-wrap  xl:mb-6 xl:space-x-[75px] ">
          <BlockInfo />
        </div>
      </div>
      <div className="flex flex-wrap  mb-6 max-[767px]:gap-[22px] max-[767px]:mb-6 min-[2800px]:mb-12 xl:hidden">
        <BlockInfo />
      </div>

      <div className="flex gap-2 mb-6 xl:hidden">
        <BlockSocialIcons />
      </div>
      <hr className="mb-6 min-[2800px]:my-[50px]  text-[#CFCFCF] xl:mt-3 xl:w-full xl:mb-[18px]" />
      <div className="mb-6 font-nunito font-normal text-[#6e6e70]  text-xs tracking-wider max-[767px]:text-xs min-[2800px]:text-3xl">
        <div className="xl:hidden">
          Project created for educational purposes <br />© 2024 Sport Hub.
        </div>
        <div className="hidden xl:block xl:text-center xl:mt-0 xl:tracking-wider xl:mb-5">
          © 2024 Sport Hub. Всі права захищено
        </div>
      </div>
    </div>
  );
};

export default InfoSectionFooter;
