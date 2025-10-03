import React from "react";
import MatchBox from "../main-page-ui/MatchBox";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MatchSection() {
  return (
    <div className="w-full min-h-80 bg-gray-200 flex flex-col gap-10 items-center py-10">
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-10 items-center mx-auto max-w-6xl w-full ">
        <MatchBox isEnd={true} />
        <MatchBox isEnd={false} />
      </div>
      <Link href="#" className="text-sm text-gray-800 flex items-center gap-1">
        Zobacz więcej <ArrowRight size={16} />
      </Link>
    </div>
  );
}
