import { writeFile } from "fs/promises";
import path from "path";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name");
  const logo = formData.get("logo");

  const isPartnershipString = formData.get("isPartnership");
  let isPartnership = false;
  if (isPartnershipString === "true") {
    isPartnership = true;
  } else if (isPartnershipString === "false") {
    isPartnership = false;
  }

  let filePath: string | null = null;
  let dbPath = ``;

  if (logo && logo instanceof File) {
    try {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = logo.name.replaceAll(" ", "_");

      const uploadDir = path.join(process.cwd(), "public", "sponsors");
      filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      dbPath = `/sponsors/${fileName}`;
    } catch (error) {
      console.error(error);
    }
  }
  const query = dbPath
    ? "INSERT INTO sponsors (name, is_partnership, logo) VALUES ($1, $2, $3)"
    : "INSERT INTO sponsors (name, is_partnership) VALUES ($1, $2)";

  const values = dbPath ? [name, isPartnership, dbPath] : [name, isPartnership];
  console.log("Wartości do bazy (values):", values);
  try {
    await pool.query(query, values);
  } catch (error) {
    return Response.json(
      { message: `Błąd przy zapisie sponsora, ${error}` },
      { status: 500 }
    );
  }
  return Response.json({
    success: true,
    message: `Sponsor ${name} zostały dodany.`,
  });
}

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM sponsors ORDER BY id ASC");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to download sponsors data" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id, name } = await req.json();
    const result = await pool.query(`DELETE FROM sponsors WHERE id = $1`, [id]);

    if (result.rowCount !== null && result.rowCount > 0) {
      return Response.json({ message: `Sponsor ${name} usunięty` });
    } else {
      return Response.json(
        { message: `Błąd: Nie znaleziono sponsora o podanym ID.` },
        { status: 404 }
      );
    }
  } catch (error) {
    return Response.json(
      { message: `Błąd przy usuwaniu sponsora, ${error}` },
      { status: 500 }
    );
  }
}
