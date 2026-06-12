import {
  ColumnMetadata,
  ColumnRole,
  ColumnType,
} from "@/generated/prisma/client";
import {
  Card,
  Chip,
  ChipVariants,
  Table,
  TableScrollContainer,
} from "@heroui/react";
import { clsx } from "clsx";

const columnTypeMap: Record<ColumnType, string> = {
  NUMBER: "عددی",
  BOOLEAN: "درست/نادرست",
  DATE: "تاریخ",
  TEXT: "متنی",
  CATEGORY: "دسته‌ای",
  ID_LIKE: "شناسه (ID)",
  TEMPORAL: "زمانی",
};

const columnRoleMap: Record<
  ColumnRole,
  { label: string; color: ChipVariants["color"] }
> = {
  DIMENSION: { label: "بعد تحلیلی", color: "success" },
  MEASURE: { label: "مقدار عددی", color: "warning" },
  TEMPORAL: { label: "مقدار زمانی", color: "default" },
  IGNORE: { label: "نادیده گرفته‌شده", color: "danger" },
};

export const ColumnsMetadataTable = ({ data }: { data: ColumnMetadata[] }) => {
  return (
    <Card className="border bg-transparent">
      <Card.Header className="text-foreground text-xl font-bold">
        اطلاعات ستون‌ها
      </Card.Header>
      <Card.Content>
        <Table>
          <TableScrollContainer>
            <Table.Content aria-label="columns-metadata">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="text-center text-lg font-bold after:w-0"
                >
                  نام ستون
                </Table.Column>
                <Table.Column className="text-center text-lg font-bold">
                  نوع شناسایی‌شده
                </Table.Column>
                <Table.Column className="text-center text-lg font-bold">
                  نقش ستون
                </Table.Column>
                <Table.Column className="text-center text-lg font-bold">
                  مقادیر ناقص
                </Table.Column>
                <Table.Column className="text-center text-lg font-bold after:w-px">
                  مقادیر یکتا
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {data.map((metadata) => (
                  <Table.Row
                    key={metadata.id}
                    className="*:first:rounded-l-none *:first:rounded-r-2xl *:last:rounded-l-2xl *:last:rounded-r-none"
                  >
                    <Table.Cell className="text-center font-semibold">
                      {metadata.columnName}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <Chip size="lg" color="accent" variant="soft">
                        {columnTypeMap[metadata.type]}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <Chip
                        size="lg"
                        color={columnRoleMap[metadata.role].color}
                        variant="secondary"
                      >
                        {columnRoleMap[metadata.role].label}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell
                      className={clsx("text-center font-semibold", {
                        "text-danger": metadata.missingCount > 0,
                      })}
                    >
                      {metadata.missingCount}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {metadata.uniqueCount}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </TableScrollContainer>
        </Table>
      </Card.Content>
    </Card>
  );
};
