"use client"

import React, { useState } from "react";
import Image from "next/image";
import Placeholder from "../../../public/No-Image-Placeholder.webp";

type Props = {
  description: string;
  imageSourceUrl: string;
  children: JSX.Element[];
};

export default function CardImage({
  description,
  imageSourceUrl,
  children,
}: Props) {

  const [imgSrcLoaded, setImgSrcLoaded] = useState(true);
  let errorUrlImg = "../../../public/No-Image-Placeholder.webp";

  return (
    <div className="image_container">
        <>
          <Image
            className={`image`}
            src={imgSrcLoaded ? imageSourceUrl : Placeholder}
            alt={description}
            width={400}
            height={300}
            onErrorCapture={ (event) => {
              console.log("ERROR");
              setImgSrcLoaded(false);
            }}
          ></Image>
        </>
      {children}
    </div>
  );
}
