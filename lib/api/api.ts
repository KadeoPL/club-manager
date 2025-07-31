const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchAllArticles() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=*`);
    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchLatestArticles(startIndex: number, limit: number) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?sort=publishedAt:desc&pagination[start]=${startIndex}&pagination[limit]=${limit}&populate=*`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }
    const data = await res.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
