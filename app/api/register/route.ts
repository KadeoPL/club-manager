import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { login, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { OR: [{ email: email }, { login: login }] },
  });

  if (existingUser) {
    return null;
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
}
