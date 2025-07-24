const STRAPI_URL = process.env.STRAPI_URL;

export async function fetchArticles() {
  const res = await fetch(`${STRAPI_URL}/articles?populate=*`);

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return data.data;
}
