import { writeFile } from "fs/promises";
import path from "path";
import { pool } from "@/lib/db";

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

    const query = filePath
      ? "INSERT INTO sponsors (name, is_partnership, logo) VALUES ($1, $2, $3)"
      : "INSERT INTO sponsors (name, is_partnership) VALUES ($1, $2)";

    const values = filePath
      ? [name, isPartnership, filePath]
      : [name, isPartnership];

    try {
      await pool.query(query, values);
    } catch (error) {
      console.error("Błąd przy zapisie sponsora:", error);
    }
  }

  return Response.json({ message: "OK" });
}
