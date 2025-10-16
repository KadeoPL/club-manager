import { pool } from "@/lib/db";

export async function GET(
  req: Request,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;

  try {
    const result = await pool.query("SELECT * FROM teams WHERE name = $1", [
      name,
    ]);

    if (result.rows.length === 0) {
      return Response.json(
        { message: "Nie znaleziono drużyny" },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json(
      {
        message: `Błąd przy pobieraniu drużyny, ${error as Error}.message`,
      },
      { status: 500 }
    );
  }
}
