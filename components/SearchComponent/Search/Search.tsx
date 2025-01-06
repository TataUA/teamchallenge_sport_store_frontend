import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

// styles
import styles from "./Search.module.css";

// store

import {
  setSearchResultProducts,
  setSearchQuery,
} from "@/redux/search/searchSlice";

// component
import SearchResultComponent from "../SearchResultComponent";
import SearchResultComponentXL from "../SearchResultComponentXL";
import SearchForm from "../SearchForm";
import SearchFormXL from "../SearchFormXL";

export interface SearchFormProps {
  isOpen: boolean;
  onClose?: () => void;
  name: string;
}

const Search = (props: SearchFormProps) => {
  const [isStringSearch, setIsStringSearch] = useState(false);
  const [isListCategories, setIsListCategories] = useState(0);
  const [isListCategoriesMob, setIsListCategoriesMob] = useState(0);
  const { isOpen, onClose } = props;
  const dispatch: AppDispatch = useDispatch();

  if (!isOpen) return null;

  const widthBrowser = document.documentElement.clientWidth;
  let shift = 0;
  if (widthBrowser > 1440) {
    shift = (widthBrowser - 1440) / 2 + 185;
  }

  const handleClick = (e: any) => {
    if (e.target.id === "wrapper-mod") {
      dispatch(setSearchResultProducts(null));
      setSearchQuery("");
      setIsStringSearch(false);
      setTimeout(() => {
        onClose?.();
      }, 100);
    }
  };

  return (
    <>
      <div className="xl:hidden">
        <div
          className={`${styles.search_wrapper} ${isOpen ? styles.active : ""}`}
        >
          <SearchForm
            {...props}
            setStringSearch={(e) => setIsStringSearch(e)}
            setIsListCategoriesMob={(e) => setIsListCategoriesMob(e)}
          />
          <SearchResultComponent
            onClose={onClose}
            stringSearch={isStringSearch}
            isListCategoriesMob={isListCategoriesMob}
          />
        </div>
      </div>
      <div className="hidden xl:block  xl:fixed  left-0 top-0 w-[100%] h-[100%]">
        <div
          className="relative w-[100%] h-[100%]"
          id="wrapper-mod"
          onClick={(e) => handleClick(e)}
        >
          <div
            className={`${styles.search_wrapperXL} ${isOpen ? styles.active : ""}`}
            style={{ right: `${shift}px` }}
          >
            <SearchFormXL
              {...props}
              setStringSearch={(e) => setIsStringSearch(e)}
              setIsListCategories={(e) => setIsListCategories(e)}
            />
            <SearchResultComponentXL
              onClose={onClose}
              stringSearch={isStringSearch}
              isListCategories={isListCategories}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
