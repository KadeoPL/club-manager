import React from "react";
import { ArticleType } from "@/types/article";
import Image from "next/image";

export default function ArticleSinglePage({
  article,
}: {
  article: ArticleType;
}) {
  return (
    <div>
      <div className="w-full h-96 relative overflow-hidden">
        <Image
          src={article.image}
          fill
          sizes="(max-width: 1920px) 100vw, 50vw"
          alt={article.title}
          className="object-cover"
        />
      </div>
      <div className="max-w-6xl mx-auto my-10 px-5">
        <h1 className="font-black text-2xl md:text-5xl w-full md:w-1/2">
          {article.title}
        </h1>
        <p className="text-gray-400 text-sm mt-2">{article.date}</p>
      </div>
    </div>
  );
}
