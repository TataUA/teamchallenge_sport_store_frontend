import React, { useState, useEffect, useRef, useCallback } from "react";

interface Response {
  Addresses: SearchItem[];
  TotalCount: number;
}
interface SearchItem {
  Present: string;
}

interface SearchInputDropdownProps {
  placeholder?: string;
  onSearch: (query: string) => Promise<Response[]>;
  onSelect: (selected: string) => void;
}

const SearchInputDropdown: React.FC<SearchInputDropdownProps> = ({
  placeholder = "",
  onSearch,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [dropdownData, setDropdownData] = useState<SearchItem[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selected, setSelected] = useState<SearchItem | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length > 0) {
        setIsDropdownVisible(true);
        setIsLoading(true);
        try {
          const results = await onSearch(inputValue);

          setDropdownData(results[0].Addresses);

          setIsDropdownVisible(results[0].TotalCount > 0);
          setError(results[0].TotalCount <= 0);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setError(true);
          setIsDropdownVisible(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setDropdownData([]);
        setIsDropdownVisible(false);
      }
    };

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelected(null);
    onSelect("");
    setError(false);
  };

  const handleOptionClick = (option: SearchItem) => {
    setInputValue(option.Present);
    setSelected(option);
    onSelect(option?.Present);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    if (selected && error) {
      setError(false);
    }
  }, [selected, error]);

  const handleInputBlur = useCallback(() => {
    setTimeout(() => {
      if (
        !dropdownData?.some(
          (item) =>
            item.Present == inputValue || item.Present == selected?.Present,
        )
      ) {
        setInputValue("");
      }
      setIsDropdownVisible(false);
    }, 200);
  }, [selected, dropdownData, inputValue]);

  return (
    <div className="relative">
      <div>
        <input
          ref={inputRef}
          type="text"
          value={selected?.Present || inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full bg-gray-200 border border-gray-300 rounded-lg px-4 py-[15px] text-base font-medium text-[#000]"
        />
      </div>
      {isDropdownVisible && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-2 text-center">Loading...</div>
          ) : null}
          {dropdownData.map((item) => (
            <li
              key={item.Present}
              onClick={() => handleOptionClick(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {item.Present}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <div className="mt-2 text-red text-xs">
          Перевірте назву будь ласка, немає такої вулиці.
        </div>
      )}
    </div>
  );
};

export default SearchInputDropdown;
