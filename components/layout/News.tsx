import React from "react";
import ArticleBox from "../ui/ArticleBox";

export default function News() {
  return (
    <div className="max-w-6xl flex flex-col mx-auto gap-4 my-16 px-6">
      <div>
        <h1 className="text-3xl font-bold">Ostatnie aktualności</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <ArticleBox isFirst={true} />
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          <ArticleBox />
          <ArticleBox />
          <ArticleBox />
          <ArticleBox />
        </div>
      </div>
    </div>
  );
}
