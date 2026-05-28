"use client";

import { useQueryString } from "@/hooks";
import { Pagination as HeroPagination } from "@heroui/react";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  totalRows: number;
  showing: number;
  title?: string;
}

const PAGE_SIZE = 10;

const Pagination = ({ totalRows, showing, title }: PaginationProps) => {
  const searchParams = useSearchParams();
  const { setQuery } = useQueryString();

  const page = searchParams.get("page") || 1;

  const totalPages = Math.ceil(totalRows / PAGE_SIZE);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);
    if (+page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, +page - 1);
    const end = Math.min(totalPages - 1, +page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (+page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
      {totalPages > 1 ? (
        <HeroPagination className="w-fit justify-start">
          <HeroPagination.Content>
            <HeroPagination.Item>
              <HeroPagination.Previous
                isDisabled={+page === 1}
                onPress={() => setQuery("page", (+page - 1).toString())}
              >
                <span className="font-bold">قبلی</span>
              </HeroPagination.Previous>
            </HeroPagination.Item>
            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <HeroPagination.Item key={`ellipsis-${i}`}>
                  <HeroPagination.Ellipsis className="font-bold" />
                </HeroPagination.Item>
              ) : (
                <HeroPagination.Item key={p}>
                  <HeroPagination.Link
                    isActive={p === +page}
                    onPress={() => setQuery("page", p.toString())}
                    className="font-bold"
                  >
                    {p}
                  </HeroPagination.Link>
                </HeroPagination.Item>
              ),
            )}
            <HeroPagination.Item>
              <HeroPagination.Next
                isDisabled={+page === totalPages}
                onPress={() => setQuery("page", (+page + 1).toString())}
              >
                <span className="font-bold">بعدی</span>
              </HeroPagination.Next>
            </HeroPagination.Item>
          </HeroPagination.Content>
        </HeroPagination>
      ) : null}
      <p className="text-muted text-sm font-semibold">
        نمایش {showing} از {totalRows} {title}
      </p>
    </div>
  );
};

export default Pagination;
