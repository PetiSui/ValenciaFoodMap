import React from "react";
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
  return (
    <div className="image_container">
        <>
          <Image
            className="image"
            src={imageSourceUrl}
            alt={description}
            width={400}
            height={300}
          ></Image>
        </>
      {children}
    </div>
  );
}
