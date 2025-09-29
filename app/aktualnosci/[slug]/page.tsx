import { ArticleType } from "@/types/article";
import { articles } from "@/utils/articles";
import ArticleSinglePage from "@/components/ui/ArticleSinglePage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: ArticleType["slug"] }>;
}) {
  const { slug } = await params;

  const article = await articles.find((article) => article.slug === slug);

  if (!article) {
    return <div>Article not found</div>;
  }
  return (
    <div>
      <ArticleSinglePage article={article} />
    </div>
  );

  return;
}
