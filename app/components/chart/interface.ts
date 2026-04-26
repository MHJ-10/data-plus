export interface ChartBaseProps<T = { [key: string]: string | number }> {
  data: T[];
  nameKey?: string;
  dataKey?: string;
}
