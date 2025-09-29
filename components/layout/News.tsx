import React from "react";
import ArticleBox from "../ui/ArticleBox";
import { articles } from "@/utils/articles";

export default function News() {
  return (
    <div className="max-w-6xl flex flex-col mx-auto gap-4 my-16 px-6">
      <div>
        <h1 className="text-3xl font-bold">Ostatnie aktualności</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          {articles.map((article, index) => {
            if (article.isFirst) {
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
            } else {
              return null;
            }
          })}
        </div>
        <div className="w-full md:w-1/2 grid md:grid-cols-2 gap-4">
          {articles.map((article, index) => {
            if (!article.isFirst) {
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
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
