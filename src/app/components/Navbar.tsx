"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoDark from "../../../public/LogoBG.png";
import logoLight from "../../../public/LOGO_INVERTEDBG.png";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useHideOnScrollDown } from "../../lib/useHideOnScroll";

export default function Navbar() {
  const path = usePathname();

  const isVisible = useHideOnScrollDown();

  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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
      <nav className={`flex min-h-4 self-start justify-between items-center bg-lightwhite dark:bg-lightblack w-full sticky ${isVisible ? "top-0" : "top-[-8rem]"} navbar-hide z-[9900] lg:px-20 lg:py-4 max-sm:py-4 max-sm:px-4 sm:py-2 sm:px-6 backdrop-blur ${open ? "" : "shadow-md transition delay-500"}  dark:shadow-neutral-800 shadow-neutral-400`}>
        <div className="flex justify-center items-center">
          <Link
            href="/" onClick={() => setOpen(false)}
            className="logo text-lightwhite text-2xl flex justify-center gap-1 items-center"
          >
            <Image src={logoLight} alt="Logo" className="mix-blend-difference" width={80}></Image>
            {!open && <p className="md:text-2xl max-md:text-2xl text-wrap leading-tight dark:text-lightwhite font-bold text-lightblack">VALENCIA FOOD MAP</p>}
          </Link>
        </div>

        <FontAwesomeIcon
          icon={open ? faXmark : faBars}
          size="2xl"
          className="md:hidden md:opacity-0 basis-12 cursor-pointer  text-lightblack dark:text-lightwhite"
          onClick={() => toggleMenu()}
        ></FontAwesomeIcon>

        <ul className="max-md:hidden flex gap-x-16 items-center justify-around mr-12">
          {navLinks.map((link, index) => {
            return (
              <li key={crypto.randomUUID()}>
                <Link href={link.href} className="grid">
                  <p
                    className={`lg:text-xl md:text-l font-bold dark:text-lightwhite text-lightblack relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black dark:after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center ${
                      path.split("/")[1].toLowerCase() ===
                      link.title.toLowerCase()
                        ? "after:scale-x-100"
                        : ""
                    }`}
                    // underline underline-offset-8underline underline-offset-8 
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
              className={`fixed left-0 top-0 w-full h-screen origin-top dark:bg-lightblack bg-lightwhite text-white p-10 z-[500] md:hidden ${!open ? 'hidden' : ''}`}
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
                            className={`max-md:text-4xl lg:text-xl md:text-xl font-bold dark:text-lightwhite text-lightblack hover:text-gray-500 ${
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
