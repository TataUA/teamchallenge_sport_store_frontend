import { cn } from "@/services/utils/cn";

// assets

import { getTelegramIconFooterMin } from "@/helpers/getTelegramIconFooterSVGMin";
import { getInstagramIconFooterMin } from "@/helpers/getInstagramIconFooterSVGMin";
import { getViberIconFooterMin } from "@/helpers/getViberIconFooterSVGMin";

export const BlockSocialIconsMin = () => {
  const infoSocialItemClassname = cn(
    "mr-2 hover:cursor-pointer [&>svg]:hover:fill-blue",
    "min-[2800px]:mr-[50px] min-[2800px]:[&>svg]:w-auto min-[2800px]:[&>svg]:h-[80px]",
  );

  return (
    <>
      <span className={infoSocialItemClassname}>
        {getTelegramIconFooterMin()}
      </span>
      <span className={infoSocialItemClassname}>
        {getInstagramIconFooterMin()}
      </span>
      <span className={infoSocialItemClassname}>{getViberIconFooterMin()}</span>
    </>
  );
};
