import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  text: string;
  img: string;
  url: string;
}

export default function HeroSectionSlide({ text, img, url }: Props) {
  return (
    <div className="w-full h-[720px] bg-red-500 ">
      <div className="w-full h-full flex justify-center bg-gradient-to-t from-black/70 to-black/0">
        <div className="w-full flex justify-center items-end max-w-6xl mb-16 ">
          <div className="w-2/3 text-4xl font-bold text-white">{text}</div>
          <div className="w-1/3 flex justify-end gap-2">
            <Button className="w-16 h-16 p-0 flex items-center justify-center">
              <ChevronLeft style={{ width: "24px", height: "24px" }} />
            </Button>
            <Button className="w-16 h-16">
              <ChevronRight style={{ width: "24px", height: "24px" }} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
