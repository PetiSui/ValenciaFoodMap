"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/favicons/android-chrome-384x384.png";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const path = usePathname();

  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

//   const [width, setWidth] = useState(0);

//   if(open && width >= 960){console.log("AAAa");    setOpen(false)}

//   const updateWidth = () => {
//     const newWidth = window.innerWidth;
//     setWidth(newWidth);
//   };
//   useEffect(() => {
//     window.addEventListener("resize", updateWidth);
//     updateWidth();

//     return () => {window.removeEventListener("resize", updateWidth);}
//   }, []);

  const navLinks = [
    { title: "Descubrir", href: "/descubrir" },
    { title: "Favoritos", href: "/favoritos" },
    { title: "Mapa", href: "/mapa" },
  ];

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.4,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.4,
        duration: 0.54,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "20vh",
      transition: {
        duration: 0.4,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        ease: [0, 0.55, 0.45, 1],
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {/* <h1>{path}</h1>
      <h1>{path.split('/')[1]}</h1>
       <h1>{width}</h1> */}

      <nav className="flex min-h-4 self-start justify-between items-center bg-lightblack w-full sticky top-0 z-[9999] md:py-5 md:px-10 max-sm:py-3 max-sm:px-3 sm:py-3 sm:px-3 backdrop-blur">
        <div className="flex justify-center items-center">
          <Link
            href="/"
            className="logo text-[#FAFAFA] text-2xl flex justify-center gap-1 items-center"
          >
            <Image src={logo} alt="Logo" className="" width={64}></Image>
            <p className="text-balance leading-tight ">VALENCIA FOOD MAP</p>
          </Link>
        </div>

        <FontAwesomeIcon
          icon={open ? faXmark : faBars}
          size="2xl"
          className="md:hidden max-sm:visible basis-12"
          onClick={() => toggleMenu()}
        ></FontAwesomeIcon>

        <ul className="max-md:hidden flex gap-x-16 items-center justify-around mr-12">
          {navLinks.map((link, index) => {
            return (
              <li key={crypto.randomUUID()}>
                <Link href={link.href} className="grid">
                  <p
                    className={`lg:text-xl md:text-l font-semibold text-[#f0f0f0] hover:text-gray-500 ${
                      path.split("/")[1].toLowerCase() ===
                      link.title.toLowerCase()
                        ? "underline underline-offset-8"
                        : ""
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`fixed left-0 top-0 w-full h-screen origin-top bg-lightblack text-white p-10 z-[500] md:hidden ${!open ? 'hidden' : ''}`}
            >
              <div className="flex h-full flex-col">
                <motion.ul
                  variants={containerVars}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className="flex flex-col h-full justify-center items-center gap-12"
                >
                  {navLinks.map((link, index) => {
                    return (
                      <motion.li key={crypto.randomUUID()} variants={mobileLinkVars}>
                        <Link href={link.href} onClick={() => setOpen(false)}>
                          <p
                            className={`max-md:text-4xl lg:text-xl md:text-l font-bold text-[#f0f0f0] hover:text-gray-500 ${
                              path.split("/")[1].toLowerCase() ===
                              link.title.toLowerCase()
                                ? "underline underline-offset-8"
                                : ""
                            }`}
                          >
                            {link.title.toUpperCase()}
                          </p>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
