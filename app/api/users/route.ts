export const runtime = "nodejs";

import { NextResponse } from "next/server";
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export async function GET() {
  try {
    await client.connect();
    const res = await client.query("SELECT * FROM users");
    return NextResponse.json(res.rows);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}
