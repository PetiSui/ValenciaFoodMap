"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/favicons/android-chrome-384x384.png";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const [width, setWidth] = useState(0);
  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  return (
    <>
      {/* <h1>{path}</h1>
      <h1>{path.split('/')[1]}</h1>
       <h1>{width}</h1> */}
      
      <nav className="flex min-h-4 self-start justify-between items-center bg-black w-full sticky top-0 z-50 lg:px-24 lg:py-6 sm:px-12 sm:py-3">
        <Link href="/" className="logo text-[#FAFAFA] text-2xl flex justify-center gap-1 items-center">
          <Image
            src={logo}
            alt="Logo"
            className=""
            width={60}
          ></Image>
          VALENCIA FOOD MAP
        </Link>
        
        <ul className="flex gap-x-16 items-center justify-around">
          <li>
            <Link href="/descubrir" className="grid">
              <p className={`lg:text-xl md:text-l font-semibold text-[#f0f0f0] hover:text-gray-500 ${path.split('/')[1].toLowerCase() === "descubrir" ? "underline underline-offset-8" : ""}`}>Descubrir</p>
            </Link>
          </li>
          <li>
            <Link href="/favoritos">
              <p className={`lg:text-xl md:text-l font-semibold text-[#FAFAFA] hover:text-gray-500 ${path.split('/')[1].toLowerCase() === "favoritos" ? "underline underline-offset-8" : ""}`}>Favoritos</p>
            </Link>
          </li>
          <li>
            <Link href="/mapa">
              <p className={`lg:text-xl md:text-l font-semibold text-[#FAFAFA] hover:text-gray-500 ${path.split('/')[1].toLowerCase() === "mapa" ? "underline underline-offset-8" : ""}`}>Mapa</p>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
