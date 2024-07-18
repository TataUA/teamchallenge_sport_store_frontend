import { ReactNode } from 'react';

import PaginationWrapper from './PaginationWrapper';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <PaginationWrapper>
      {children}
    </PaginationWrapper>
  );
};

export default Layout;
