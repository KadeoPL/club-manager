"use client";

import { useEffect, useState } from "react";
import HeroSectionSlide from "../ui/heroSectionSlide";
import { fetchArticles } from "@/lib/api/api";
import { ArticlesType } from "@/types/articles";

// const articles = [
//   {
//     text: "Trener Wyroba o mijającej rundzie i okresie przygotowawczym",
//     img: "/images/1.jpg",
//     url: "",
//   },
//   {
//     text: "Jakiś inny tytuł tutaj",
//     img: "/images/2.jpg",
//     url: "",
//   },
//   // {
//   //   text: "Jeszcze jakiś inny tytuł tutaj",
//   //   img: "/images/1.jpg",
//   //   url: "",
//   // },
// ];

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
  }, [activeArticle]);

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
