"use client";

import { useEffect, useState } from "react";
import HeroSectionSlide from "../ui/heroSectionSlide";
import { fetchArticles } from "@/lib/api/api";
import { ArticlesType } from "@/types/articles";

export default function HeroSection() {
  const [activeArticle, setActiveArticle] = useState<number>(0);
  const [articles, setArticles] = useState<ArticlesType[]>([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveArticle((prevArticlesIndex) =>
        prevArticlesIndex === articles.length - 1 ? 0 : prevArticlesIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  const handleClick = (direction: "prev" | "next") => {
    if (direction === "next") {
      setActiveArticle((prevArticlesIndex) =>
        prevArticlesIndex === articles.length - 1 ? 0 : prevArticlesIndex + 1
      );
    } else {
      setActiveArticle((prevArticlesIndex) =>
        prevArticlesIndex === 0 ? articles.length - 1 : prevArticlesIndex - 1
      );
    }
  };

  if (!articles.length) return <div>Ładowanie...</div>;
  return (
    <HeroSectionSlide
      id={articles[activeArticle].id}
      title={articles[activeArticle].title}
      coverImage={articles[activeArticle].coverImage}
      onClick={handleClick}
      contentText={articles[activeArticle].contentText}
    />
  );
}
