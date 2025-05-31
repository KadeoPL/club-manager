import React from "react";

interface Props {
  isFirst?: boolean;
}

export default function ArticleBox({ isFirst }: Props) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className={`${isFirst ? "h-80 md:h-100" : "h-40"} bg-red-300`}></div>
      <div>
        <p className="uppercase text-xs">Kategoria</p>
      </div>
      <div>
        <h1 className="text-xl font-bold">Tytuł jakiś tutaj będzie</h1>
      </div>
      <div>
        <p className="text-xs text-gray-400">29.05.2025</p>
      </div>
    </div>
  );
}
