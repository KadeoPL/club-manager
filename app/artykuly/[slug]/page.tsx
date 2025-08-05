import { getArticleBySlug } from "@/lib/api/api";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  console.log(article);

  return <div>My Post: {slug}</div>;
}
