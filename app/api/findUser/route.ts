import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response(JSON.stringify({ message: "Username is required" }), {
      status: 400,
    });
  }

  try {
    const client = await pool.connect();
    const res = await client.query(
      "SELECT id, name, password, role FROM users WHERE name = $1",
      [username]
    );

    client.release();

    if (res.rows.length > 0) {
      return new Response(JSON.stringify(res.rows[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Database error: ", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
