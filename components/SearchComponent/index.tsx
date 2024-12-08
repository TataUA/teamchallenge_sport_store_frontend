// core
import { useEffect, useState } from "react";

// data
import { iconsData } from "@/constants";

// assets
import getCloseIconSVG from "@/helpers/getCloseIconSVG";

// components
import SvgComponent from "@/components/SvgComponent/SvgComponent";
import Search from "./Search/Search";

const SearchComponent = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    if (isSearchVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSearchVisible]);

  return (
    <>
      <div onClick={() => setIsSearchVisible(!isSearchVisible)}>
        {isSearchVisible ? (
          <span className="[&>svg]:size-6 [&>svg]:hover:opacity-[50%] cursor-pointer">
            {getCloseIconSVG()}
          </span>
        ) : (
          <>
            {iconsData
              .filter((item) => item.name === "search")
              .map((icon) => (
                <span
                  key={icon.name}
                  className="relative hover:opacity-[50%] xl:hover:opacity-100 cursor-pointer"
                >
                  <SvgComponent
                    key={icon.name}
                    viewBox={icon.viewBox}
                    path={icon.path}
                  />
                </span>
              ))}
          </>
        )}
      </div>
      <Search
        isOpen={isSearchVisible}
        onClose={() => setIsSearchVisible(false)}
        name={"search"}
      />
    </>
  );
};

export default SearchComponent;
