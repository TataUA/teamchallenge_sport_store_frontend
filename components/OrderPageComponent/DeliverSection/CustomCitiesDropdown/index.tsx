'use client'

// core
import React, { useCallback, useEffect, useState } from 'react';

// assets
import getArrowDownSVG from '@/helpers/getArrowDownSVG';

// services
import { getListOfCitiesNovaPoshta } from '@/services/api';

// utils
import { cn } from '@/services/utils/cn';
import { IntInitialStateOrder } from '../..';

export interface DropdownItemCityNovaPoshta {
    MainDescription: string;
    Present: string;
}

const CustomCitiesDropdown = ({
    error, 
    setError,
    handleChangeOrder,
}: {
    error: boolean, 
    setError: (arg: boolean)=>void,
    handleChangeOrder: (propert:keyof IntInitialStateOrder, value: string)=>void,
}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [city, setCity] = useState<string>('');
    const [data, setData] = useState<any[]>([]);

    const [selectedItem, setSelectedItem] = useState('')

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getListOfCitiesNovaPoshta(city)
            
            setData([...response]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    },[city])

    const toggleDropdown = () => {
        setError(false)
        if (!isOpen && city) {
            fetchData();
        }
        setIsOpen(!isOpen);
    };

    const handleSelect = (item: DropdownItemCityNovaPoshta) => {
        handleChangeOrder('city', item.MainDescription)
        setSelectedItem(item.MainDescription)
        setCity(item.MainDescription)
        setIsOpen(false);
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(selectedItem) handleChangeOrder('city', '')
        setCity(event.target.value)
        setIsOpen(true);
    };

    useEffect(()=>{
        if (!isOpen || !city) {
            return
        }
        fetchData();
    },[isOpen, city, fetchData])

    return (
        <div className="relative w-full mb-4">
            <div
                className={cn("relative cursor-pointer",
                    '[&>svg]:absolute [&>svg]:right-4 [&>svg]:top-[50%] [&>svg]:translate-y-[-50%] [&>svg]:cursor-pointer',{
                    '[&>svg]:rotate-180': isOpen && city && data.length,
                    }
                )}
                onClick={toggleDropdown}
            >
                <input 
                    className={cn('w-full bg-gray-200 border border-gray-300 rounded-lg px-4 py-[15px] pr-[56px] text-base font-medium text-[#868687]',
                        "focus:border-blue outline-none", {
                        'border-red': error,
                    })}
                    type="text" 
                    value={city}
                    placeholder='Оберіть місто'
                    onChange={handleCityChange}    
                />
                {getArrowDownSVG()}
            </div>
            {isOpen && (
                <div className={cn(
                  "absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 max-h-[300px] overflow-y-auto z-10 hidden", {
                    'block': isOpen && city && data.length
                  })}
                >
                    {isLoading ? (
                        <div className="p-2 text-center">Loading...</div>
                    ) : (
                        data.map((item: DropdownItemCityNovaPoshta, index) => (
                            <div
                                key={index}
                                className={cn("p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer",{
                                    'border-b-0': index === data.length - 1
                                })}
                                onClick={() => handleSelect(item)}
                            >
                                {item.Present}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomCitiesDropdown;
