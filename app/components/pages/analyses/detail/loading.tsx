import { Card, Skeleton, Table, TableScrollContainer } from "@heroui/react";

const InfoSkeleton = () => (
  <div className="flex items-start justify-between">
    <div className="flex items-start gap-4">
      <Skeleton className="size-8 rounded-2xl" />

      <div>
        <Skeleton className="h-8 w-40 rounded" />
        <div className="mt-1 flex flex-wrap items-center gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded" />
          ))}
        </div>
      </div>
    </div>

    <Skeleton className="size-8 rounded-2xl" />
  </div>
);

export const InsightsSkeleton = () => (
  <Card className="w-full border bg-transparent">
    <Skeleton className="h-8 w-45 rounded" />
    <Card.Content className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="p-5">
          <div className="flex items-start gap-3">
            <Skeleton className="size-10 rounded-2xl" />
            <div className="flex-1">
              <Skeleton className="h-7 w-40 rounded" />
              <Skeleton className="my-4 h-20 w-full rounded" />
            </div>
          </div>
        </Card>
      ))}
    </Card.Content>
  </Card>
);

const ChartsSkeleton = () => (
  <div>
    <Skeleton className="mb-4 h-8 w-45 rounded" />
    <div className="grid gap-5 lg:grid-cols-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <Skeleton className="h-8 w-45 rounded" />
          <div className="grid h-75 w-full grid-cols-12 items-end gap-4 p-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full rounded"
                color="red"
                style={{ height: `${(i + 1) * 8}%` }}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const TableSkeleton = () => (
  <Card>
    <Card.Header>
      <Skeleton className="mb-4 h-8 w-45 rounded" />
      <Card.Content>
        <Table>
          <TableScrollContainer>
            <Table.Content aria-label="columns-metadata">
              <Table.Header>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Table.Column
                    className="text-center after:w-0"
                    key={i}
                    isRowHeader={i === 0}
                  >
                    <Skeleton className="h-8 w-45 rounded" />
                  </Table.Column>
                ))}
              </Table.Header>
              <Table.Body>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Table.Row
                    key={i}
                    className="*:first:rounded-l-none *:first:rounded-r-2xl *:last:rounded-l-2xl *:last:rounded-r-none"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Table.Cell key={i} className="text-center">
                        <Skeleton className="h-8 w-45 rounded" />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </TableScrollContainer>
        </Table>
      </Card.Content>
    </Card.Header>
  </Card>
);

export const Loading = () => (
  <div className="space-y-8">
    <InfoSkeleton />
    <InsightsSkeleton />
    <ChartsSkeleton />
    <TableSkeleton />
    <TableSkeleton />
  </div>
);
