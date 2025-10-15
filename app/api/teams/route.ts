import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const data = await req.json();
  const name = data.name;
  try {
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
