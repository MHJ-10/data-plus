export const downloadCSVFile = (content: string, name?: string) => {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM, content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", `${name || "data"}.csv`);
  link.click();
  URL.revokeObjectURL(url);
};
