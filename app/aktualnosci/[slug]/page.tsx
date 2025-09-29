import { ArticleType } from "@/types/article";
import { articles } from "@/utils/articles";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: ArticleType["slug"] }>;
}) {
  const { slug } = await params;

  const article = await articles.find((article) => article.slug === slug);

  if (!article) {
    return <div>Article not found</div>;
  } else {
    return <div>Article: {article.title}</div>;
  }

  return;
}
