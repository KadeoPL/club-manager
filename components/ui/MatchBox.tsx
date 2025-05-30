import React from "react";
import Image from "next/image";

interface Props {
  isEnd?: boolean;
}

export default function MatchBox({ isEnd }: Props) {
  return (
    <div className="bg-white p-6 flex flex-col justify-center items-center">
      <div className="mb-4 py-2 px-4 bg-primary text-white">
        I Liga Krakowska
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col">
          <div className="relative h-16">
            <Image
              src="/images/gdovia_logo.png"
              alt="Gdovia Gdów logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="font-bold text-md mt-2">Gdovia Gdów</div>
        </div>
        <div className="flex text-4xl font-bold gap-6 items-center px-6">
          {isEnd ? (
            <>
              <div className="py-4 px-4 bg-gray-800 text-white">1</div>
              <div>:</div>
              <div className="py-4 px-4 bg-gray-800 text-white">1</div>
            </>
          ) : (
            <div className="py-4 px-4 bg-gray-800 text-white">17:00</div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="relative h-16">
            <Image
              src="/images/gdovia_logo.png"
              alt="Gdovia Gdów logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="font-bold text-md mt-2">Gdovia Gdów</div>
        </div>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
}
