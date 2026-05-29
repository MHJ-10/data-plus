"use client";

import { deleteAnalysis, toggleFavorite } from "@/data";
import { AnalysisStatus } from "@/generated/prisma/client";
import {
  Button,
  Chip,
  ChipVariants,
  Modal,
  Table,
  TableCell,
  TableScrollContainer,
  toast,
} from "@heroui/react";
import { clsx } from "clsx";
import {
  AlertTriangleIcon,
  ExternalLinkIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { AnalysesProps } from "./analyses";
import { Pagination } from "@/components";

export const analysisStatusMap: Record<
  AnalysisStatus,
  { label: string; color: ChipVariants["color"] }
> = {
  COMPLETED: { label: "تکمیل‌شده", color: "success" },
  PROCESSING: { label: "در حال پردازش", color: "accent" },
  FAILED: { label: "ناموفق", color: "danger" },
};

export const AnalysesTable = ({ analyses, total }: AnalysesProps) => {
  const [isFavoritePending, startFavoriteTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const onFavoriteButtonClick = (id: string) => {
    startFavoriteTransition(async () => {
      await toggleFavorite(id);
    });
  };

  const onDeleteButtonClick = (id: string) => {
    startDeleteTransition(async () => {
      await deleteAnalysis(id)
        .then(() => toast.success("تحلیل موردنظر با موفقیت حذف شد."))
        .catch((err) => toast.danger(err.message));
    });
  };

  return (
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
                      isPending={isFavoritePending}
                      onClick={() => onFavoriteButtonClick(analysis.id)}
                    >
                      <StarIcon
                        className={clsx("", {
                          "fill-warning text-warning": analysis.isFavorite,
                        })}
                      />
                    </Button>
                    <Modal>
                      <Button size="sm" variant="ghost" isIconOnly>
                        <Trash2Icon className="text-danger" />
                      </Button>
                      <Modal.Backdrop variant="blur">
                        <Modal.Container size="md">
                          <Modal.Dialog>
                            <Modal.Header className="flex flex-row items-center">
                              <Modal.Icon className="bg-danger/30 text-danger rounded-2xl">
                                <AlertTriangleIcon className="size-6" />
                              </Modal.Icon>
                              <Modal.Heading className="text-2xl font-bold">
                                حذف تحلیل
                              </Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="text-muted overflow-hidden text-lg font-semibold">
                              با حذف این تحلیل، تمامی اطلاعات و نمودارهای مرتبط
                              نیز حذف می‌شوند و امکان بازیابی وجود نخواهد داشت.
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                className="w-fit"
                                size="lg"
                                slot="close"
                                variant="secondary"
                              >
                                انصراف
                              </Button>
                              <Button
                                className="w-fit"
                                size="lg"
                                variant="danger"
                                slot="close"
                                onClick={() => onDeleteButtonClick(analysis.id)}
                                isPending={isDeletePending}
                              >
                                حذف
                              </Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                        </Modal.Container>
                      </Modal.Backdrop>
                    </Modal>
                  </div>
                </TableCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </TableScrollContainer>
      <Table.Footer>
        <Pagination totalRows={total} showing={analyses.length} title="تحلیل" />
      </Table.Footer>
    </Table>
  );
};
