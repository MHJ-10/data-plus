"use client";

import { useQueryString } from "@/hooks";
import { Button, SearchField } from "@heroui/react";
import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  CircleXIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const Filter = () => {
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "desc";

  const { setQuery, setQueries } = useQueryString();

  const onSortButtonClick = () => {
    setQuery("order", order === "desc" ? "asc" : "desc");
  };

  const onSearchInputChange = useDebouncedCallback((val: string) => {
    setQueries([
      { name: "search", value: val },
      { name: "page", value: "1" },
    ]);
  }, 500);

  return (
    <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:gap-5">
      <SearchField
        fullWidth
        defaultValue={searchParams.get("search") || ""}
        onChange={(val) => onSearchInputChange(val)}
        aria-label="search"
      >
        <SearchField.Group>
          <SearchField.SearchIcon className="ms-2" />
          <SearchField.Input placeholder="جستجوی تحلیل‌ها..." />
          <SearchField.ClearButton className="me-2 bg-transparent">
            <CircleXIcon />
          </SearchField.ClearButton>
        </SearchField.Group>
      </SearchField>
      <Button
        size="lg"
        variant="tertiary"
        className="w-full sm:w-fit"
        onClick={onSortButtonClick}
      >
        مرتب‌سازی با تاریخ
        {order === "desc" ? <CalendarArrowUpIcon /> : <CalendarArrowDownIcon />}
      </Button>
    </div>
  );
};
