"use client";

import { Suspense, useEffect, useState } from "react";
import Card from "../components/Card";
import ContentLoader from "react-content-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFaceSadTear, faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Loading from "../descubrir/loading";

export default function App() {
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [lsSize, setLsSize] = useState();

  useEffect(() => {
    setLsSize(
      (prev) =>
        JSON.parse(global?.localStorage?.getItem("likedEstablishments") || "{}")
          .length
    );

    fetch("/api/cards", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        global?.localStorage?.getItem("likedEstablishments")
      ),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // let lsLength = JSON.parse(
  //   global?.localStorage?.getItem("likedEstablishments") || "{}"
  // ).length;

  if (lsSize === 0) {
    return (
      <div className="glassmorphism flex flex-col justify-center items-center gap-5 w-[70%] p-12 mt-12 mx-auto outline outline-1 outline-[#40404030]">
        <FontAwesomeIcon
          icon={faFaceSadTear}
          className="text-6xl drop-shadow-md dark:text-lightwhite text-lightblack"
        />
        <p className="font-semibold mt-4 text-2xl text-balance text-center text-lightblack dark:text-lightwhite">
          Todavia no tienes favoritos añadidos
        </p>
        <Link
          className="bg-lightblack border-0 px-5 py-3 rounded hover:bg-slate-100 hover:text-lightblack text-lightwhite"
          href="/descubrir"
        >
          Explora
          <FontAwesomeIcon
            className="ml-3"
            size="sm"
            icon={faArrowRight}
          ></FontAwesomeIcon>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    //let loaderLength =
    //  JSON.parse(global?.localStorage?.getItem("likedEstablishments") || "{}")
    //    .length || 12;
    const items = Array.from({ length: lsSize || 12 }).map((_, index) => (
      <ContentLoader
        speed={3}
        width={300}
        height={440}
        viewBox="0 0 300 460"
        color="black"
        className="glassmorphism"
        backgroundColor="#171717"
        foregroundColor="#FAFAFA"
        animate={true}
        uniqueKey="siquitoestosaltaerrorxd"
        key={crypto.randomUUID()}
      >
        <rect x="15" y="25" rx="0" ry="0" width="270" height="150" />
        <rect x="15" y="200" rx="2" ry="2" width="270" height="30" />
        <rect x="15" y="250" rx="2" ry="2" width="80" height="20" />
        <rect x="100" y="250" rx="2" ry="2" width="80" height="20" />
        <rect x="185" y="250" rx="2" ry="2" width="80" height="20" />
        <rect x="15" y="340" rx="2" ry="2" width="270" height="10" />
        <rect x="15" y="370" rx="2" ry="2" width="270" height="10" />
        <circle cx="30" cy="430" r="14" />
        <circle cx="75" cy="430" r="14" />
        <circle cx="260" cy="430" r="20" />
      </ContentLoader>
    ));

    return (
      <div className="flex items-center flex-col mx-auto w-[90%] p-10 gap-4">
        <p className=" text-2xl font-semibold text-lightblack dark:text-lightwhite">
          Cargando...
        </p>
        <div className="flex flex-wrap p-0 gap-8">{items}</div>
      </div>
    );
  }

  return (
    // <Suspense fallback={<Loading />}>
    <>
      <div className="flex flex-col w-full max-md:w-[70%] mx-auto sm:!px-[9vw] mt-8 mb-8">
        <h3 className="text-3xl font-semibold text-lightwhite self-start ">
          <FontAwesomeIcon icon={faHeart} className="mr-4" />
          Favoritos
        </h3>
        <p className="text-xl font-light text-lightwhite self-start">
          Explora los establecimientos que más te gustan
        </p>
      </div>
      <div className="flex flex-wrap max-md:w-[70%] max-md:justify-center justify-between gap-8 py-2 px-[9vw] mx-auto w-[100%] mb-8">
        {Object.entries(data).map((card: any, index: Number) => (
          <Card data={JSON.stringify(card[1])} key={crypto.randomUUID()}></Card>
        ))}
      </div>
    </>
    // </Suspense>
  );
}
