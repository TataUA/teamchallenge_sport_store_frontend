"use client";

import { useCallback } from "react";

import { IFilters } from "@/app/products/[...sub_category]/page";
import { IProduct } from "@/services/types";
import ListItem from "@/components/ProductsList/ListItem";
import Pagination from "@/components/ProductsList/Pagination";

interface IProps {
  products: IProduct[];
  searchParams: IFilters;
}

const List = (props: IProps) => {
  const { products, searchParams } = props;
  const { gender, page } = searchParams;

  const currentPage = Number(page) || 1;

  const getPaginatedItems = useCallback(
    (items: IProduct[], itemsPerPage: number, currentPage: number) => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedProducts = items.slice(
        startIndex,
        startIndex + itemsPerPage,
      );
      const countPages = Math.ceil(items?.length / itemsPerPage);
      return {
        paginatedProducts,
        countPages,
      };
    },
    [],
  );

  const itemsPerPage = 8;

  const { paginatedProducts, countPages } = getPaginatedItems(
    products,
    itemsPerPage,
    currentPage,
  );

  return (
    <div>
      <ul className="flex flex-wrap gap-2 xl:gap-5 justify-start mb-5">
        {paginatedProducts.map((product, index) => (
          <ListItem key={product.id} product={product} />
        ))}
      </ul>
      {paginatedProducts?.length ? <Pagination pageCount={countPages} /> : null}
    </div>
  );
};

export default List;
