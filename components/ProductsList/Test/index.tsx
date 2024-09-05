"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

// types
import { IProduct } from "@/services/types";

// components
import ListItem from "../ListItem";
import Pagination from "../Pagination";

interface TestProps {
  products: IProduct[];
}
export default function Test({ products }: TestProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

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
      <ul className="flex flex-wrap gap-2 justify-between mb-5">
        {paginatedProducts.map((product) => (
          <ListItem key={product.id} product={product} />
        ))}
      </ul>
      {paginatedProducts?.length ? <Pagination pageCount={countPages} /> : null}
    </div>
  );
}
