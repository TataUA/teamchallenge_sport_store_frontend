"use client";
import { useState, useEffect, useRef } from "react";
// types
import { IProduct } from "@/services/types";
import { apiBaseUrl } from "@/services/api";
// components
import ListItem from "../ListItem";
import Pagination from "../Pagination";
import { Loader } from "@/components/Loader";

interface TestProps {
  gender: string;
  page: number;
}
export default function ContentGenderPage({ gender, page }: TestProps) {
  const [products, setProducts] = useState([]);
  const [countPages, setCountPages] = useState(1);

  const [stateFatching, setStateFetching] = useState("loading");

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async (
      gender: string,
      limit: number,
      offset: number,
    ) => {
      try {
        const result = await fetch(
          `${apiBaseUrl}products/search/?gender=${gender}&limit=${limit}&offset=${offset}`,
          { cache: "no-store" },
        );
        if (result.status === 200) {
          const data = await result?.json();
          setStateFetching("received");
          setCountPages(Math.ceil(data.count / limit));
          setProducts(data.results);
        }
      } catch (error: any) {
        setStateFetching("error");
        console.log("🚀 ~ fetchProductsAction ~ error:", error.response);
      }
    };

    if (pageRef.current) {
      let offset: number;
      let limit: number;

      pageRef.current.scrollWidth < 1025 ? (limit = 8) : (limit = 12);
      !page ? (offset = 0) : (offset = page * limit);

      fetchProducts(gender, limit, offset);
    }
  }, [page]);

  return (
    <div ref={pageRef}>
      {stateFatching === "loading" ? <Loader /> : null}
      {stateFatching === "error" ? (
        <div className="m-auto w-[300px] h-10 text-2xl">
          Помилка отримання данних! Спробуйте пізніше.
        </div>
      ) : null}
      {stateFatching === "received" ? (
        <div>
          <ul className="flex flex-wrap gap-2 justify-start mb-5">
            {products.map((product: IProduct) => (
              <ListItem key={product.id} product={product} />
            ))}
          </ul>
          {products.length ? <Pagination pageCount={countPages} /> : null}
        </div>
      ) : null}
    </div>
  );
}
