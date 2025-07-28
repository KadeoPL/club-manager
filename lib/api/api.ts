const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
console.log(STRAPI_URL);

export async function fetchArticles() {
  const res = await fetch(`${STRAPI_URL}/api/articles?populate=*`);

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  console.log(data.data);
  return data.data;
}
