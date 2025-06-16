const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getGlobalData() {
  const res = await fetch(`${API_URL}/global?populate=*`);

  if (!res.ok) {
    throw new Error("Failed to fetch global data");
  }

  const json = await res.json();
  console.log(json.data);
  return json.data;
}
