import React from "react";
import ArticleBox from "../ui/ArticleBox";

const footballArticles = [
  {
    isFirst: true,
    image: "/images/1.jpg",
    title: "Emocjonujący finał Ligi Mistrzów — gol w doliczonym czasie!",
    date: "2025-06-08",
    category: "Liga Mistrzów",
  },
  {
    image: "/images/2.jpg",
    title: "Reprezentacja Polski pewnie wygrywa w eliminacjach MŚ",
    date: "2025-06-05",
    category: "Reprezentacja",
  },
  {
    image: "/images/2.jpg",
    title: "Głośny transfer — Lewandowski zmienia klub!",
    date: "2025-06-03",
    category: "Transfery",
  },
  {
    image: "/images/2.jpg",
    title: "Zapowiedź EURO 2024 — faworyci i czarne konie turnieju",
    date: "2025-05-30",
    category: "EURO 2024",
  },
  {
    image: "/images/2.jpg",
    title:
      "5 młodych talentów, na których warto zwrócić uwagę w nadchodzącym sezonie",
    date: "2025-05-28",
    category: "Talenty",
  },
];

export default function News() {
  return (
    <div className="max-w-6xl flex flex-col mx-auto gap-4 my-16 px-6">
      <div>
        <h1 className="text-3xl font-bold">Ostatnie aktualności</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          {footballArticles.map((article, index) => {
            if (article.isFirst) {
              return (
                <ArticleBox
                  key={index}
                  isFirst={article.isFirst}
                  image={article.image}
                  title={article.title}
                  date={article.date}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          {footballArticles.map((article, index) => {
            if (!article.isFirst) {
              return (
                <ArticleBox
                  key={index}
                  isFirst={article.isFirst}
                  image={article.image}
                  title={article.title}
                  date={article.date}
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
