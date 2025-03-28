"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Constants } from "@/lib/constants";
import Link from "next/link";
import "../styles/Card.css";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Categorias({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { categoria: string };
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full px-[7dvw] max-sm:px-6 mx-auto mt-6 mb-8">
        <h3 className="text-3xl font-semibold dark:text-lightwhite text-lightblack self-start">
          <FontAwesomeIcon icon={faSearch} className="mr-4" />
          Categorías
        </h3>
        <p className="text-xl font-light dark:text-neutral-300/95 text-neutral-700/95 self-start">
          Busca tu categoria preferida
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] max-md:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] max-sm:grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] max-sm:gap-2 gap-5 mt-6 max-sm:mt-4">
          {Constants.CATEGORIAS.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                className={`relative overflow-hidden rounded-xl ${category.color} cursor-pointer group shadow-lg dark:shadow-stone-800 shadow-stone-500`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20">
                  <svg width="100%" height="100%" className="opacity-80">
                    <pattern
                      id={`pattern-${index}`}
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M0 10h20v1H0zM10 0v20h1V0z"
                        fill="currentColor"
                        fillOpacity="0.5"
                      />
                    </pattern>
                    <rect
                      width="100%"
                      height="100%"
                      fill={`url(#pattern-${index})`}
                    />
                  </svg>
                </div>
                <Link
                  href={"/categorias/" + category.name.toLowerCase()}
                  className="relative aspect-square p-6 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-125"
                >
                  <Icon
                    className={`w-8 h-8 mb-3 transition-transform duration-300 ${
                      hoveredIndex === index ? "scale-150" : ""
                    }`}
                  />
                  <p className="text-lg font-medium tracking-wide text-gray-900">
                    {category.name}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
