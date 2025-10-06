export async function POST(req: Request) {
  console.log("✅ API /api/sponsors wywołane");
  const formData = await req.formData();

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  return Response.json({ message: "OK" });
}
