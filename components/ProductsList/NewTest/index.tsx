"use client";

// types
import { IProduct } from "@/services/types";

// components
import ListItem from "../ListItem";
import Pagination from "../Pagination";

interface TestProps {
  products: IProduct[];
  count: number;
  limit: number;
}
export default function NewTest({ products, count, limit }: TestProps) {
  const countPages = Math.ceil(count / limit);

  return (
    <div>
      <ul className="flex flex-wrap gap-2 justify-between mb-5">
        {products.map((product) => (
          <ListItem key={product.id} product={product} />
        ))}
      </ul>
      {products.length ? <Pagination pageCount={countPages} /> : null}
    </div>
  );
}
