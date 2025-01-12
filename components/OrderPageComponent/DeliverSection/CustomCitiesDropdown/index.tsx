"use client";

// core
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// assets
import getArrowDownSVG from "@/helpers/getArrowDownSVG";

// selectors
import { setCityToStore } from "@/redux/order/orderSlice";

// services
import {
  getListOfCitiesNovaPoshta,
  NovaPoshCityResponseDataItem,
} from "@/services/api";

// utils
import { cn } from "@/services/utils/cn";
import { IntInitialStateOrder } from "../..";

export interface DropdownItemCityNovaPoshta {
  mainDescription: string;
  fullAddress: string;
  ref: string;
}

const CustomCitiesDropdown = ({
  error,
  setError,
  handleChangeOrder,
}: {
  error: boolean;
  setError: (arg: boolean) => void;
  handleChangeOrder: (
    propert: keyof IntInitialStateOrder,
    value: string,
  ) => void;
}) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [emptyResponse, setEmptyResponse] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState("");

  const fetchData = useCallback(async () => {
    if (!city || !city.length) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await getListOfCitiesNovaPoshta(city);

      setData([...response]);

      if (!response.length) {
        setEmptyResponse(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorResponse(true);
    } finally {
      setIsLoading(false);
    }
  }, [city]);

  const toggleDropdown = () => {
    setError(false);
    if (!isOpen && city) {
      fetchData();
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: NovaPoshCityResponseDataItem) => {
    const presentString = `${item.SettlementTypeDescription} ${item.Description}, ${item.RegionsDescription ? item.RegionsDescription + " район, " : ""}${item.AreaDescription} область`;

    dispatch(
      setCityToStore({
        mainDescription: item.Description,
        ref: item.Ref,
        fullAddress: presentString,
      }),
    );

    handleChangeOrder("city", presentString);

    setSelectedItem(presentString);

    setCity(presentString);

    setIsOpen(false);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedItem) {
      handleChangeOrder("city", "");
    }

    setCity(event.target.value);

    setIsOpen(true);

    setEmptyResponse(false);

    setErrorResponse(false);
  };

  useEffect(() => {
    if (!isOpen || !city) {
      return;
    }
    fetchData();
  }, [isOpen, city, fetchData]);

  return (
    <div className="relative w-full mb-4 md:mb-6">
      <div
        className={cn(
          "relative cursor-pointer",
          "[&>svg]:absolute [&>svg]:right-4 [&>svg]:top-[50%] [&>svg]:translate-y-[-50%] [&>svg]:cursor-pointer",
          {
            "[&>svg]:rotate-180": isOpen && city && data.length,
          },
        )}
        onClick={toggleDropdown}
      >
        <input
          className={cn(
            "w-full bg-gray-200 border border-[#CFCFCF] rounded-xl px-4 py-[15px] pr-[56px] text-base font-medium text-[#000]",
            "focus:border-blue active:border-blue outline-none",
            {
              "border-red": error,
            },
          )}
          type="text"
          value={city}
          placeholder="Почніть вводити назву"
          onChange={handleCityChange}
        />
      </div>
      {isOpen && (
        <div
          className={cn(
            "absolute top-full rounded-xl left-0 w-full p-[5px] px-[10px] bg-white border border-[#CFCFCF] mt-1 max-h-[300px] overflow-y-auto z-10 hidden",
            {
              block: isOpen && city && data.length,
            },
          )}
        >
          {isLoading ? (
            <div className="p-2 text-center">Loading...</div>
          ) : (
            data.map((item: NovaPoshCityResponseDataItem, index) => (
              <div
                key={index}
                className={cn(
                  "p-[10px] border-b hover:bg-gray-100 cursor-pointer border-[#CFCFCF] hover:text-blue",
                  {
                    "border-b-0": index === data.length - 1,
                  },
                )}
                onClick={() => handleSelect(item)}
              >
                {`${item.SettlementTypeDescription} ${item.Description}, ${item.RegionsDescription ? item.RegionsDescription + " район, " : ""}${item.AreaDescription} область`}
              </div>
            ))
          )}
        </div>
      )}
      {emptyResponse && !city && (
        <div className="text-gray text-xs">
          <span>Немає данних про таке місто.</span>
          <span>Виберіть інший пункт доставки будь ласка.</span>
        </div>
      )}
      {errorResponse && (
        <div className="text-gray text-xs">
          <span>
            Сталася помиллка під час запиту. Напишіть в службу підтримки.
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomCitiesDropdown;
