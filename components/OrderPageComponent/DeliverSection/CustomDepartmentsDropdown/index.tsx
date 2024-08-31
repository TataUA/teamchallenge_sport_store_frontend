'use client'

// core
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// selector
import { selectOrder } from '@/redux/order/orderSelector';

// slice
import { setDepartmentToStore } from '@/redux/order/orderSlice';

// services
import { 
    getListOfCitiesNovaPoshta, 
    getListOfDepartmentsInCityNovaPoshta, 
    INovaPoshtaDepartmentItemResponse 
} from '@/services/api';

// utils
import { cn } from '@/services/utils/cn';

// components
import { DropdownItemCityNovaPoshta } from '../CustomCitiesDropdown';

// assets
import getArrowDownSVG from '@/helpers/getArrowDownSVG';

interface IProps {
    typeOfEntity: string
    selectedItem: INovaPoshtaDepartmentItemResponse | null
    city: DropdownItemCityNovaPoshta | null
}

const CustomDepartmentsDropdown = (props: IProps) => {
    const {typeOfEntity, selectedItem, city} = props

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);

    const fetchData = useCallback(async () => {
        if(!city) return
        
        setIsLoading(true);
        try {
            const response = await getListOfDepartmentsInCityNovaPoshta(city?.MainDescription)
            if(typeOfEntity === 'postOffice') {
                const filteredResponseOnlyPostOffices = response.filter(item => item.Description.toLowerCase().includes('поштомат'));
                setData([...filteredResponseOnlyPostOffices])
                return
            }

            const filteredResponseWithoutPostOffices = response.filter(item => !item.Description.toLowerCase().includes('поштомат'));
            setData([...filteredResponseWithoutPostOffices])
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setIsLoading(false);
        }
    },[city, typeOfEntity])

    const toggleDropdown = () => {
        if(!city) return

        if (!isOpen && city) {
            fetchData();
        }
        setIsOpen(!isOpen);
    };

    const handleSelect = (item: any) => {
        dispatch(setDepartmentToStore(item));
        setIsOpen(false);
    };
    

    return (
        <div className="relative w-full mb-4">
            <div
                className={cn("relative cursor-pointer",
                    '[&>svg]:absolute [&>svg]:right-4 [&>svg]:top-[50%] [&>svg]:translate-y-[-50%] [&>svg]:cursor-pointer',{
                        '[&>svg]:rotate-180': isOpen && city && data.length
                    }
                )}
                onClick={toggleDropdown}
            >
                <input className='w-full bg-gray-200 border border-gray-300 rounded px-4 py-[15px] pr-[56px] text-base font-medium text-[#868687]' 
                type="text" value={selectedItem ? selectedItem?.Description : undefined}
                    placeholder={typeOfEntity === 'department' ? 'Оберіть відділення' : 'Оберіть поштомат'}
                />
                {getArrowDownSVG()}
            </div>
            {isOpen && (
                <div className={cn(
                  "absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 max-h-[300px] overflow-y-auto z-10 hidden", {
                    'block': isOpen && (city && data.length || isLoading)
                  })}
                >
                    {isLoading ? (
                        <div className="p-2 text-center">Loading...</div>
                    ) : (
                        data.map((item: {Description: string}, index) => (
                            <div
                                key={index}
                                className={cn("p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer",{
                                    'border-b-0': index === data.length - 1
                                })}
                                onClick={() => handleSelect(item)}
                            >
                                {item.Description}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDepartmentsDropdown;
