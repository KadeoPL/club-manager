"use client";

import { useEffect, useState } from "react";
import HeroSectionSlide from "../ui/heroSectionSlide";
import { fetchLatestArticles } from "@/lib/api/api";
import { ArticlesType } from "@/types/articles";

export default function HeroSection() {
  const [activeArticle, setActiveArticle] = useState<number>(0);
  const [articles, setArticles] = useState<ArticlesType[] | null>(null);

  useEffect(() => {
    fetchLatestArticles(0, 3).then(setArticles);
  }, []);

  useEffect(() => {
    if (!articles || articles.length === 0) return;
    const interval = setInterval(() => {
      setActiveArticle((prevArticlesIndex) =>
        prevArticlesIndex === articles.length - 1 ? 0 : prevArticlesIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [articles]);

  const handleClick = (direction: "prev" | "next") => {
    if (!articles || articles.length === 0) return;
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

  const message = !articles
    ? "Wystąpił błąd podczas ładowania artykułów."
    : articles.length === 0
    ? "Ładowanie..."
    : null;

  if (!articles || message) {
    return (
      <div className="w-full md:h-[720px] h-[500px] overflow-hidden bg-gray-300 flex justify-center items-center p-10 text-center">
        <p>{message}</p>
      </div>
    );
  }

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
