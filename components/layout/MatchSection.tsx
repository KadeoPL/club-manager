import React from "react";
import MatchBox from "../ui/MatchBox";

export default function MatchSection() {
  return (
    <div className="w-full min-h-80 bg-gray-200 flex items-center">
      <div className="grid grid-cols-2 grid-rows-1 gap-10 items-center mx-auto max-w-6xl w-full ">
        <MatchBox isEnd={true} />
        <MatchBox isEnd={false} />
      </div>
    </div>
  );
}
