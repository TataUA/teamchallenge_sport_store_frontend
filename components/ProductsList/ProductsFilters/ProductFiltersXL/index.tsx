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
      {isOpenedChangesFilters ? (
        <ControlFiltersXL
          searchParams={searchParams}
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
    </>
  );
};

export default ProductFiltersXL;
