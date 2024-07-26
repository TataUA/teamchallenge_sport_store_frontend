"use client";

import Link from "next/link";
import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// utils
import { cn } from "@/services/utils/cn";

interface PaginationProps {
  pageCount: number;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <Link
      href={href}
      className={cn(`hover:bg-gray-200 ${disabledClassName}`, {
        'opacity-[50%] pointer-events-none': isDisabled
      })}
      aria-disabled={isDisabled}
    >
      {isLeft ? 
      (
        <span className="min-[2800px]:[&>svg]:size-14">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5" stroke="#272728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="#272728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      ) : (
        <span className="min-[2800px]:[&>svg]:size-14">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19" stroke="#3E3E40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="#3E3E40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </Link>
  );
};


const Pagination = ({ pageCount }: Readonly<PaginationProps>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURLWithPageParams = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    for (let i = 1; i <= pageCount; i++) {
      if (
        i === 1 ||
        i === pageCount ||
        (i >= currentPage - 1 && i <= currentPage + 1) ||
        (pageCount <= maxVisiblePages)
      ) {
        pageNumbers.push(
          <Link
            key={i} 
            href={createPageURLWithPageParams(i)}
            className={cn("cursor-pointer text-[#B7B7B8] py-1 px-2 min-[2800px]:text-4xl", 
              'min-[2800px]:after:size-5', {
                'after:block after:bg-blue after:size-2 after:rounded-[50%] after:absolute': i == currentPage,
                  'text-[#272728]': i == currentPage,
                })}
          >
            {i}
          </Link>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < pageCount - 2)
      ) {
        pageNumbers.push(<span key={i} className="px-3 py-2">...</span>);
      }
    }

    return pageNumbers;
  };
 
  return (
    <div className="px-3 max-[480px]:px-0">
      <div className="flex justify-between m-auto max-w-[500px] min-[2800px]:max-w-[800px]">
        <div>
          <PaginationArrow
            direction="left"
            href={createPageURLWithPageParams(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </div>
        <ul className="flex w-full justify-center gap-5 text-base overflow-auto max-[480px]:gap-3">
          {renderPageNumbers()}
        </ul>
        <div>
          <PaginationArrow
            direction="right"
            href={createPageURLWithPageParams(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
          />
        </div>
      </div>
    </div>
  );
}
export default Pagination
