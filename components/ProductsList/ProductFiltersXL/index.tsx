"use client";
import React, { useState } from "react";
// conmponents
import { ClientComponent } from "@/components/ClientComponent";
import ControlFiltersXL from "./ControlFiltersXL";
import ShowSetsFiltersXL from "./ShowSetsFiltersXL";

// typess
import { IProduct } from "@/services/types";
import { IFilters } from "@/app/products/[...sub_category]/page";

export interface IProductsFiltersProps {
  searchParams: IFilters;
  params: { sub_category: string[] };
  products: IProduct[];
}

const ProductFiltersXL = (props: IProductsFiltersProps) => {
  const [isOpenedChangesFilters, setOpenedChangesFilters] = useState(false);

  const { searchParams, params, products } = props;

  return (
    <>
      <ClientComponent>
        {isOpenedChangesFilters ? (
          <ControlFiltersXL
            searchParamsFilter={searchParams}
            setOpenedChangesFilters={setOpenedChangesFilters}
            params={params}
            products={products}
          />
        ) : (
          <ShowSetsFiltersXL
            searchParams={searchParams}
            setOpenedChangesFilters={setOpenedChangesFilters}
          />
        )}
      </ClientComponent>
    </>
  );
};

export default ProductFiltersXL;
