import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const data = await req.json();
  const name = data.name;
  try {
    const result = await pool.query(`SELECT 1 FROM teams WHERE name = $1`, [
      name,
    ]);

    if (result.rows.length > 0) {
      return Response.json(
        { message: `Drużyna o tej nazwie już istnieje.` },
        { status: 409 }
      );
    }

    await pool.query("INSERT INTO teams (name) VALUES ($1)", [name]);
  } catch (error) {
    return Response.json(
      { message: `Błąd przy zapisie drużyny, ${error}` },
      { status: 500 }
    );
  }
  return Response.json({
    success: true,
    message: ` ${name} zostały dodany.`,
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const position = searchParams.get("position");
  const limit = 10;
  const offset = parseInt(position ?? "0", 10);

  if (isNaN(offset) || offset < 0) {
    return Response.json(
      { message: "Nieprawidłowa wartość position (OFFSET)." },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query("SELECT * FROM teams LIMIT $1 OFFSET $2", [
      limit,
      offset,
    ]);
    return Response.json(result.rows);
  } catch (error) {
    return Response.json(
      { message: ` Błąd przy pobieraniu drużyny, ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
