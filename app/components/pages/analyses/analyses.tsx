"use client";

import { Pagination } from "@/components";
import { AnalysisStatus, Prisma } from "@/generated/prisma/client";
import { useQueryString } from "@/hooks";
import {
  Button,
  Chip,
  ChipVariants,
  SearchField,
  Table,
  TableCell,
  TableScrollContainer,
} from "@heroui/react";
import { clsx } from "clsx";
import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  CircleXIcon,
  ExternalLinkIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type AnalysisWithRelations = Prisma.AnalysisGetPayload<{
  include: {
    charts: true;
  };
}>;

interface AnalysesProps {
  analyses: AnalysisWithRelations[];
  total: number;
}

const analysisStatusMap: Record<
  AnalysisStatus,
  { label: string; color: ChipVariants["color"] }
> = {
  COMPLETED: { label: "تکمیل‌شده", color: "success" },
  PROCESSING: { label: "در حال پردازش", color: "accent" },
  FAILED: { label: "ناموفق", color: "danger" },
};

const Analyses = ({ analyses, total }: AnalysesProps) => {
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "desc";

  const { setQuery } = useQueryString();

  const onSortButtonClick = () => {
    setQuery("order", order === "desc" ? "asc" : "desc");
  };

  const onSearchInputChange = useDebouncedCallback((val: string) => {
    setQuery("search", val);
    setQuery("page", "1");
  }, 500);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-foreground text-3xl font-bold">تحلیل‌ها</p>
        <p className="text-muted text-xl font-semibold">
          دیتاست‌های آپلودشده خود را مدیریت و بررسی کنید
        </p>
      </div>

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
          {order === "desc" ? (
            <CalendarArrowUpIcon />
          ) : (
            <CalendarArrowDownIcon />
          )}
        </Button>
      </div>

      <Table dir="rtl">
        <TableScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column
                isRowHeader
                className="text-center text-lg font-bold after:w-0"
              >
                نام دیتاست
              </Table.Column>
              <Table.Column className="text-center text-lg font-bold">
                تاریخ آپلود
              </Table.Column>
              <Table.Column className="text-center text-lg font-bold">
                ردیف‌ها
              </Table.Column>
              <Table.Column className="text-center text-lg font-bold">
                ستون‌ها
              </Table.Column>
              <Table.Column className="text-center text-lg font-bold">
                وضعیت
              </Table.Column>
              <Table.Column className="text-center text-lg font-bold">
                نمودارها
              </Table.Column>
              <Table.Column className="text-center text-lg font-bold after:w-px">
                عملیات
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {analyses.map((analysis) => (
                <Table.Row
                  key={analysis.id}
                  className="*:first:rounded-l-none *:first:rounded-r-2xl *:last:rounded-l-2xl *:last:rounded-r-none"
                >
                  <TableCell className="text-center font-semibold">
                    {analysis.datasetName}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {analysis.createdAt.toLocaleString("fa-IR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {analysis.rowsCount}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {analysis.columnsCount}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    <Chip
                      size="lg"
                      variant="soft"
                      color={analysisStatusMap[analysis.status].color}
                    >
                      {analysisStatusMap[analysis.status].label}
                    </Chip>
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {analysis.charts.length}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        isDisabled={analysis.status !== "COMPLETED"}
                      >
                        <Link href={`/dashboard/analyses/${analysis.id}`}>
                          <ExternalLinkIcon />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        isDisabled={analysis.status !== "COMPLETED"}
                      >
                        <StarIcon
                          className={clsx("", {
                            "fill-warning text-warning": analysis.isFavorite,
                          })}
                        />
                      </Button>
                      <Button size="sm" variant="ghost" isIconOnly>
                        <Trash2Icon className="text-danger" />
                      </Button>
                    </div>
                  </TableCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </TableScrollContainer>
        <Table.Footer>
          <Pagination
            totalRows={total}
            showing={analyses.length}
            title="تحلیل"
          />
        </Table.Footer>
      </Table>
    </div>
  );
};

export default Analyses;
