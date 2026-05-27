import { Card, Table } from "@heroui/react";

export const PreviewTable = ({
  data,
}: {
  data: Record<string, string | number>[];
}) => {
  return (
    <Card className="border bg-transparent">
      <Card.Header className="text-foreground text-xl font-bold">
        پیش‌نمایش دیتاست
      </Card.Header>
      <Card.Content>
        <Table dir="ltr">
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                {Object.keys(data[0]).map((header, i) => (
                  <Table.Column
                    key={header}
                    isRowHeader={i === 0}
                    className="text-center text-lg font-bold"
                  >
                    {header}
                  </Table.Column>
                ))}
              </Table.Header>
              <Table.Body>
                {data.map((row, i) => (
                  <Table.Row key={i}>
                    {Object.keys(data[0]).map((header) => (
                      <Table.Cell
                        key={header}
                        className="text-center font-bold"
                      >
                        {row[header]}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Card.Content>
    </Card>
  );
};
