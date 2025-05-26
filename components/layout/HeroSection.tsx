"use client";

import { useState } from "react";
import HeroSectionSlide from "../ui/heroSectionSlide";

const articles = [
  {
    text: "Trener Wyroba o mijającej rundzie i okresie przygotowawczym",
    img: "",
    url: "",
  },
  {
    text: "Jakiś inny tytuł tutaj",
    img: "",
    url: "",
  },
  {
    text: "Jeszcze jakiś inny tytuł tutaj",
    img: "",
    url: "",
  },
];

export default function HeroSection() {
  const [activeArticle, setActiveArticle] = useState<number>(0);

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
      text={articles[activeArticle].text}
      img={articles[activeArticle].img}
      url={articles[activeArticle].url}
      onClick={handleClick}
    />
  );
}
