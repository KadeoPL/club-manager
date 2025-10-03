"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface Props {
  isEnd?: boolean;
}

export default function MatchBox({ isEnd }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  return (
    <div className="bg-white p-6 flex flex-col justify-center items-center">
      <div className=" py-2 px-4 bg-primary text-white text-sm">
        I Liga Krakowska
      </div>
      <div className="flex w-full justify-around items-center mt-6">
        <div className="flex flex-col">
          <motion.div
            ref={ref}
            className="relative h-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 0.8,
              scale: { type: "spring", bounce: 0.5 },
            }}
          >
            <Image
              src="/images/gdovia_logo.png"
              alt="Gdovia Gdów logo"
              sizes="(max-width: 768px) 50vw, 33vw"
              fill
              style={{ objectFit: "contain" }}
            />
          </motion.div>
          <div className="font-bold text-md mt-2 text-center">Gdovia Gdów</div>
        </div>
        <div className="flex text-4xl font-bold gap-6 items-center px-6">
          {isEnd ? (
            <>
              <div className="p-4 md:p-2 xl:p-4 bg-gray-800 text-white">1</div>
              <div>:</div>
              <div className="p-4 md:p-2 xl:p-4 bg-gray-800 text-white">1</div>
            </>
          ) : (
            <div className="p-4 md:p-2 xl:p-4 bg-gray-800 text-white">
              17:00
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <motion.div
            ref={ref}
            className="relative h-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              duration: 0.8,
              scale: { type: "spring", bounce: 0.5 },
            }}
          >
            <Image
              src="/images/gdovia_logo.png"
              alt="Gdovia Gdów logo"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
            />
          </motion.div>
          <div className="font-bold text-md mt-2 text-center">Gdovia Gdów</div>
        </div>
      </div>
      <div className="text-sm mt-6 text-gray-400">
        <p>31.05.2025 | Szkolna 6</p>
      </div>
    </div>
  );
}
