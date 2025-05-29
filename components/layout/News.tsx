import React from "react";
import ArticleBox from "../ui/ArticleBox";

export default function News() {
  return (
    <div className="max-w-6xl flex mx-auto gap-4">
      <ArticleBox />
      <ArticleBox />
      <ArticleBox />
    </div>
  );
}
