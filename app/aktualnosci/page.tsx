import ArticleBox from "@/components/ui/ArticleBox";
import { articles } from "@/utils/articles";

export default function News() {
  const newArticles = articles.map((article) => ({
    ...article,
    isFirst: true,
  }));

  return (
    <div className="flex justify-center w-full bg-accent min-h-screen my-10">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-10">
        {newArticles.map((article, index) => {
          return (
            <ArticleBox
              key={index}
              isFirst={article.isFirst}
              image={article.image}
              title={article.title}
              date={article.date}
              slug={article.slug}
            />
          );
        })}
      </div>
    </div>
  );
}
