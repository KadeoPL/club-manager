import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { login, email, password } = await req.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { login }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Użytkownik z takim loginem lub e-mailem już istnieje" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        login,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("API error", error);
    return NextResponse.json({ error: "Registery error" }, { status: 500 });
  }
}
