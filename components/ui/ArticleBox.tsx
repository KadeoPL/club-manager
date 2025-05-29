import React from "react";

export default function ArticleBox() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="h-60 bg-red-300"></div>
      <div>
        <p className="uppercase text-sm">Kategoria</p>
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
