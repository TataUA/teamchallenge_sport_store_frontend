import { cn } from "@/services/utils/cn";

// assets

import { getTelegramIconFooter } from "@/helpers/getTelegramIconFooterSVG";
import { getInstagramIconFooter } from "@/helpers/getInstagramIconFooterSVG";
import { getViberIconFooter } from "@/helpers/getViberIconFooterSVG";

export const BlockSocialIcons = () => {
  const infoSocialItemClassname = cn(
    "mr-2 hover:cursor-pointer [&>svg]:hover:fill-blue",
    "min-[2800px]:mr-[50px] min-[2800px]:[&>svg]:w-auto min-[2800px]:[&>svg]:h-[80px]",
  );

  return (
    <>
      <span className={infoSocialItemClassname}>{getTelegramIconFooter()}</span>
      <span className={infoSocialItemClassname}>
        {getInstagramIconFooter()}
      </span>
      <span className={infoSocialItemClassname}>{getViberIconFooter()}</span>
    </>
  );
};
