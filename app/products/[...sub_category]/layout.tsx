// 'use client'

import { ReactNode } from 'react';

import { usePagination } from '@/hooks/usePagination';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // removing page parameter from url
  // when user leaves from current page with products
  // usePagination()

  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;
