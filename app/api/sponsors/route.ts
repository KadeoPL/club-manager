import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name");
  const isPartnership = formData.get("isPartnership") === "true";
  const logo = formData.get("logo");

  let filePath: string | null = null;

  if (logo && logo instanceof File) {
    try {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = logo.name.replaceAll(" ", "_");

      const uploadDir = path.join(process.cwd(), "public", "sponsors");
      filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
    } catch (error) {
      console.error(error);
    }
  }

  return Response.json({ message: "OK" });
}
