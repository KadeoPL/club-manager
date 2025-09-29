import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "@/types/article";

export default function ArticleBox({
  isFirst,
  image,
  title,
  date,
  category,
  slug,
}: ArticleType) {
  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer" tabIndex={1}>
      <div
        className={`${
          isFirst ? "h-80 md:h-100" : "h-40"
        } relative overflow-hidden`}
      >
        <Image
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          alt={title}
          className="object-cover transiton-all hover:scale-110 duration-300 ease-in-out"
        />
      </div>
      <div>
        <p className="uppercase text-xs">{category}</p>
      </div>
      <div>
        <Link
          href={`/aktualnosci/${slug}`}
          className="text-xl font-bold transition-all hover:text-primary duration-300 ease-in-out"
        >
          {title}
        </Link>
      </div>
      <div>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  );
}
