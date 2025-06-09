import React from "react";
import Image from "next/image";

interface Props {
  isFirst?: boolean;
  image: string;
  title: string;
  date: string;
  category?: string;
}

export default function ArticleBox({
  isFirst,
  image,
  title,
  date,
  category,
}: Props) {
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
          alt={title}
          className="object-cover transiton-all hover:scale-110 duration-300 ease-in-out"
        />
      </div>
      <div>
        <p className="uppercase text-xs">{category}</p>
      </div>
      <div>
        <h1 className="text-xl font-bold tranistion-all hover:text-primary duration-300 ease-in-out">
          {title}
        </h1>
      </div>
      <div>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  );
}
