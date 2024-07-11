import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useCallback } from 'react';

export function usePagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
 
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const handleRouteChange = () => {
      const currentPage = searchParams.get('page');
      if (currentPage) {
        // Reset page parameter when navigating to a different page
        router.push(pathname);
      }
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [router, pathname, searchParams]);

  const setPage = useCallback((page: number) => {
    router.push(pathname + '?' + createQueryString('page', page.toString()));
  }, [router, pathname, createQueryString]);

  return {
    currentPage: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    setPage
  };
}
