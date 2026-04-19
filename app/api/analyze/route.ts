import { mapAllRoles } from "@/utils/role-convertor";
import { detectAllColumns } from "@/utils/type-detection";
import Papa from "papaparse";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  // Convert File to Array
  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const text = await file.text();

  const { data } = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  //Type detection
  const types = detectAllColumns(data);

  // Role Detection
  const roles = mapAllRoles(types);

  return Response.json({
    roles,
  });
}
