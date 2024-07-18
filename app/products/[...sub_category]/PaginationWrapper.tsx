'use client'

import { usePagination } from '@/hooks/usePagination';

export default function PaginationWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  // removing page parameter from url
  // when user leaves from current page with products
  usePagination()
  return <div>{children}</div>
}