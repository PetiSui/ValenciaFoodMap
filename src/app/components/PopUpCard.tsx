"use client"
import Image from "next/image";
import Placeholder from "../../../public/No-Image-Placeholder.webp";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import { useState } from "react";

type DetailsProps = {
  _id: string;
  address: string;
  name: string;
  lat: number;
  lng: number;
  photos?: string;
  url: string;
  rating: number;
  categories?: string[];
};

export default function PopUpCard(data: DetailsProps): JSX.Element {
  const pathname = usePathname();
  const [imgSrcLoaded, setImgSrcLoaded] = useState(true);


  return (
    <div className="flex flex-wrap flex-col gap-2 py-4 pr-1 pl-2 sm:min-w-[210px] max-sm:max-w-[190px] sm:max-w-[240px] max-h-fit">
      <div className="overflow-hidden rounded-md shadow-sm shadow-neutral-700/60">
        <Image
          title={data?.name}
          className="!m-0 aspect-[4/3] object-cover hover:scale-110 transition duration-200"
          src={imgSrcLoaded && data?.photos ? data?.photos : Placeholder}
          width={250}
          height={112}
          alt={data?.name}
          onError={ (event) => {
            setImgSrcLoaded(false);
          }}
        ></Image>
      </div>
      {pathname.includes("/descubrir/") ? (
        <p className="text-xl font-semibold !text-lightblack !m-0 max-w-[30ch] overflow-hidden overflow-ellipsis line-clamp-2">
          {data?.name}
        </p>
      ) : (
        <Link
          title="Ver más info del establecimiento"
          className="text-xl font-semibold !text-lightblack max-w-[30ch] overflow-hidden overflow-ellipsis line-clamp-2 hover:underline"
          href={`/descubrir/${data._id}`}
        >
          {data?.name}
        </Link>
      )}
      {!pathname.includes("/descubrir/") && (
        <div className="flex items-center gap-2 mt-2">
          <Star className="max-sm:h-4 max-sm:w-4 h-5 w-5 fill-yellow-400 text-yellow-400 transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110" />
          <span className="text-semibold text-md text-neutral-400 mt-1">
            {data?.rating}
          </span>
        </div>
      )}
      {data?.url && (
        <div className="grid grid-cols-1 gap-4 w-full">
          <Link
            title="Cómo llegar"
            target="_blank"
            className="font-semibold bg-neutral-200/70 transition-colors ease-in-out !text-lightblack border-0 rounded mt-2 px-5 py-3 text-center hover:!bg-neutral-300 hover:!text-lightblack"
            href={data?.url}
          >
            Cómo llegar
            <FontAwesomeIcon
              className="ml-2"
              size="lg"
              icon={faLocationArrow}
            ></FontAwesomeIcon>
          </Link>
        </div>
      )}
    </div>
  );
}
