"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import ContentLoader from "react-content-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function App() {
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cards/", {
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

  let lsLength =
  JSON.parse(global?.localStorage?.getItem("likedEstablishments") || "{}")
    .length || 0;

  if (lsLength === 0 || data.length === 0) {
    return (
      <div className="glassmorphism flex flex-col justify-center items-center gap-5 w-[70%] p-12 mx-auto">
        <FontAwesomeIcon icon={faFaceSadTear} className="text-4xl" />
        <p className="font-semibold text-2xl">
          Todavia no tienes favoritos añadidos
        </p>
        <Link
          className="bg-black border-0 px-5 py-3 rounded hover:bg-slate-100 hover:text-[#020202]"
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
  } else if (isLoading) {
    let loaderLength =
      JSON.parse(global?.localStorage?.getItem("likedEstablishments") || "{}")
        .length || 10;
    const items = Array.from({ length: loaderLength }).map((_, index) => (
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
        <p className=" text-2xl font-semibold">Cargando...</p>
        <div className="flex flex-wrap p-0 gap-8">{items}</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 p-10 mx-auto">
        {Object.entries(data).map((card: any, index: Number) => (
          <Card data={JSON.stringify(card[1])} key={crypto.randomUUID()}></Card>
        ))}
      </div>
    </>
  );
}
