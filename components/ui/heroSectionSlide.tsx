"use client";

import React from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ArticlesType } from "@/types/articles";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface HeroArticlesType extends ArticlesType {
  onClick: (direction: "prev" | "next") => void;
}

export default function HeroSectionSlide({
  id,
  contentText,
  title,
  coverImage,
  onClick,
}: HeroArticlesType) {
  return (
    <div className="w-full md:h-[720px] h-[500px] overflow-hidden relative">
      <Image
        key={id}
        src={STRAPI_URL + coverImage.url}
        alt={
          coverImage.alternativeText
            ? coverImage.alternativeText
            : "Brak alternatywnego opisu zdjęcia"
        }
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
        className="object-cover -z-10 animate-heroSectionImageZoom"
        priority
        quality={100}
      />
      <div className="w-full h-full flex justify-center bg-gradient-to-t from-black/70 to-black/0">
        <div className="w-full flex flex-col md:flex-row md:justify-center md:items-end justify-end max-w-6xl mb-16 px-10 gap-10">
          <div className="w-full md:w-2/3 text-3xl md:text-4xl font-bold text-white animate-heroSectionText">
            {title}
          </div>
          <div className="w-full md:w-1/3 flex justify-start md:justify-end gap-2">
            <Button
              className="w-16 h-16 p-0 flex items-center justify-center cursor-pointer"
              onClick={() => onClick("prev")}
            >
              <ChevronLeft style={{ width: "24px", height: "24px" }} />
            </Button>
            <Button
              className="w-16 h-16 cursor-pointer"
              onClick={() => onClick("next")}
            >
              <ChevronRight style={{ width: "24px", height: "24px" }} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
