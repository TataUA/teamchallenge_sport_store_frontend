"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

// components
import SvgComponent from "@/components/SvgComponent/SvgComponent";

// data
import { iconsData } from "@/constants";
import { categoriesListData } from "../categoriesListData";

// styles
import styles from "../Search/Search.module.css";

// store
import { selectSearch } from "@/redux/search/searchSelector";
import {
  sendSearchQueryThunk,
  setErrorNull,
  setSearchResultProducts,
  setSearchQuery,
  saveSearchQueryToArray,
} from "@/redux/search/searchSlice";

// utils
import { cn } from "@/services/utils/cn";
import getCloseIconSVG from "@/helpers/getCloseIconSVG";
import getTranslatedSubcategoryFromUkraineToEnglish from "@/helpers/getTranslatedSubcategoryFromUkraineToEnglish";
import getOldQueryIconSVG from "@/helpers/getOldQueryIconSVG";
import getArrowRightIconSVG from "@/helpers/getArrowRightIconSVG";

interface IProps {
  name: string;
  onClose?: () => void;
  setStringSearch: (id: boolean) => void;
  setIsListCategoriesMob: (id: number) => void;
}

const SearchForm = (props: IProps) => {
  const { name, onClose, setStringSearch, setIsListCategoriesMob } = props;

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const { error, previousQueries, products } = useSelector(selectSearch);

  const [searchText, setSearchText] = useState("");

  const recomendedCategories = categoriesListData.filter(
    (category) => searchText && category.includes(searchText),
  );

  if (recomendedCategories.length > 0) {
    setIsListCategoriesMob(recomendedCategories.length);
  } else {
    setIsListCategoriesMob(0);
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value?.toLowerCase());

    if (event.target.value?.length == 0) {
      setStringSearch(false);
    } else {
      setStringSearch(true);
    }

    if (error) {
      dispatch(setErrorNull());
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchText) {
      dispatch(sendSearchQueryThunk(searchText));
      dispatch(saveSearchQueryToArray(searchText));
    }
  };

  const handleKeyboardEvent = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const recomendedCategories = categoriesListData.filter(
        (category) => searchText && category.includes(searchText),
      );
      if (products?.length && recomendedCategories?.length === 1) {
        router.push(
          `/products/${getTranslatedSubcategoryFromUkraineToEnglish(recomendedCategories[0])}/`,
        );
        onClose?.();
      }
    }
  };

  const handleClickResetButton = () => {
    setSearchText("");
    dispatch(setSearchResultProducts(null));
    setSearchQuery("");
  };

  const handleClickCloseIcon = () => {
    setSearchText("");
    dispatch(setSearchResultProducts(null));
    setSearchQuery("");

    setTimeout(() => {
      onClose?.();
    }, 100);
  };

  const handleClickCategory = (subCategory: string) => {
    router.push(
      `/products/${getTranslatedSubcategoryFromUkraineToEnglish(subCategory)}/`,
    );
    if (onClose) onClose();
  };

  const handleClickOldQuery = (query: string) => {
    setSearchText(query);
    dispatch(sendSearchQueryThunk(query));
    dispatch(saveSearchQueryToArray(query));
  };

  useEffect(() => {
    dispatch(setSearchQuery(searchText));
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch, searchText]);

  useEffect(() => {
    const recomendedCategories = categoriesListData.filter(
      (category) => searchText && category.includes(searchText),
    );

    if (recomendedCategories.length !== 1) return;

    const currentCategory = products?.[0]?.category.sub_category.toLowerCase();
    if (currentCategory === recomendedCategories[0].toLowerCase()) return;

    const debouncedSearch = setTimeout(() => {
      dispatch(sendSearchQueryThunk(searchText));
      dispatch(saveSearchQueryToArray(searchText));
    }, 300);

    return () => clearTimeout(debouncedSearch);
  }, [dispatch, searchText]);

  return (
    <div className="">
      <div className="flex gap-2 items-center justify-between">
        <form
          className={cn(
            "flex w-full rounded-xl gap-2 items-center bg-bgSearch px-4 py-2",
          )}
          onSubmit={handleSubmit}
        >
          {iconsData.map(
            (icon) =>
              icon.name === name && (
                <button
                  type="submit"
                  className={cn("inline-block", {
                    "pointer-events-none opacity-[25%]": !searchText,
                  })}
                  key={icon.name}
                >
                  <SvgComponent
                    key={icon.name}
                    viewBox={icon.viewBox}
                    path={icon.path}
                  />
                </button>
              ),
          )}
          <input
            type="text"
            placeholder="Пошук"
            className={styles.search_text}
            value={searchText}
            onChange={(e) => handleChangeInput(e)}
            onKeyDown={(e) => handleKeyboardEvent(e)}
          />
          <div
            className="[&>svg]:size-5 [&>svg]:fill-[#868687]"
            onClick={handleClickResetButton}
          >
            {getCloseIconSVG()}
          </div>
        </form>
        <span
          className="text-sm text-[#868687] cursor-pointer hover:underline xl:hidden"
          onClick={() => handleClickCloseIcon()}
        >
          Скасувати
        </span>
      </div>
      {products && recomendedCategories?.length ? (
        <>
          <div className="mt-5">
            <h4 className="text-[#868687] text-base mb-1">Категорії</h4>
            {recomendedCategories.map((item, index) => (
              <div
                className="text-base text-[#272728] capitalize flex items-center justify-between py-2 hover:text-blue hover:underline"
                key={index}
                onClick={() => handleClickCategory(item)}
              >
                <span>{item}</span>
                {getArrowRightIconSVG()}
              </div>
            ))}
          </div>
        </>
      ) : null}
      {!searchText && previousQueries?.length ? (
        <>
          <div className="mt-5 ">
            {[...previousQueries]?.reverse()?.map((item, index) => (
              <div
                className={cn(
                  "text-sm min-h-[48px] text-[#272728] capitalize flex items-center gap-3 py-2 cursor-pointer",
                  "hover:text-blue hover:underline",
                  "border-b-[1px] border-b-border_button",
                )}
                key={index}
                onClick={() => handleClickOldQuery(item)}
              >
                <span className="[&>svg]:size-6">{getOldQueryIconSVG()}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </>
      ) : null}
      {searchText && !products && recomendedCategories?.length ? (
        <>
          <div className="mt-5">
            <h3 className="mb-5">Можливо ви мали на увазі</h3>
            {recomendedCategories.map((item, index) => (
              <div
                className={cn(
                  "text-sm text-[#272728] capitalize flex items-center gap-3 py-2",
                  "hover:text-blue hover:underline",
                  "border-b-[1px]",
                )}
                key={index}
                onClick={() => handleClickOldQuery(item)}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SearchForm;
