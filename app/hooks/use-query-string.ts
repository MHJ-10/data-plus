"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface QueryParam {
  name: string;
  value: string;
}

export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (queryParams: QueryParam[]) => {
      const params = new URLSearchParams(searchParams.toString());
      queryParams.forEach(({ name, value }) => {
        if (value) params.set(name, value);
        else params.delete(name);
      });

      return params.toString();
    },
    [searchParams],
  );

  const setQuery = useCallback(
    (name: string, value: string) => {
      const query = createQueryString([{ name, value }]);
      router.push(`${pathname}?${query}`);
    },
    [createQueryString, pathname, router],
  );

  const setQueries = useCallback(
    (queryParams: QueryParam[]) => {
      const query = createQueryString(queryParams);
      router.push(`${pathname}?${query}`);
    },
    [createQueryString, pathname, router],
  );

  return { setQuery, setQueries };
};
