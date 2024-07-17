import Image from "next/image";
import hero from "../../public/hero.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSearch,
  faHeart,
  faLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import LandingCard from "./components/LandingCard";

const landingCardsData = [
  {
    icon: faSearch,
    color: "bg-[#e39e83]",
    title: "Descubre",
    description:
      "Encuentra el establecimiento que más se ajuste a tu preferencia",
    url: "/descubrir",
  },
  {
    icon: faHeart,
    color: "bg-[#51bbbd]",
    title: "Favoritos",
    description: "Guarda establecimientos para verlos más tarde",
    url: "/favoritos",
  },
  {
    icon: faLocationDot,
    color: "bg-[#96c180]",
    title: "Mapa",
    description: "Visualiza gráficamente tu próxima visita gastronómica",
    url: "/mapa",
  },
];

export default async function App() {
  return (
    <div className="flex flex-col justify-center items-center mt-12 gap-12">
      <div className="glassmorphism w-[80%] h-auto flex items-center justify-evenly max-lg:flex-row max-md:flex-col p-10 gap-6">
        <Image
          className="max-lg:scale-60 self-start place-self-start"
          src={hero}
          height={350}
          priority={true}
          placeholder="empty"
          alt="Hero Image"
        ></Image>
        <div className="flex gap-5 flex-col justify-start items-start h-[100%]">
          <h1 className="text-3xl text-lightblack font-normal self-start place-self-start tracking-tight leading-[1.1] max-w-[36ch] text-balance">
            Las mejores experiencias gastronómicas de
            <span className="ml-2 text-3xl text-lightblack font-semibold tracking-wide">
              Valencia
            </span>
          </h1>
          <p className="flex-1 mt-1 text-neutral-950 dark:text-lightwhite font-light text-xl">
            Busca y explora los mejores establecimientos
          </p>
          <Link
            className="mt-2 font-semibold place-self-start self-start bg-lightblack text-lightwhite border-0 px-5 py-3 rounded hover:bg-slate-100 hover:text-[#020202]"
            href="/descubrir"
            title="Explora"
          >
            Explora
            <FontAwesomeIcon
              className="ml-3"
              size="sm"
              icon={faArrowRight}
            ></FontAwesomeIcon>
          </Link>
        </div>
      </div>
      <div className="mt-8 p-16 bg-opacity-80 flex flex-wrap flex-col md:flex-row gap-24 sm:gap-48 mx-auto w-full justify-center items-center">
        {landingCardsData.map((data: any) => (
          <LandingCard key={crypto.randomUUID()}>
            <FontAwesomeIcon
              icon={data?.icon}
              size="lg"
              className={`absolute top-[-30px] aspect-square z-20 self-center ${data?.color} p-5 rounded-full shadow-neutral-400 shadow-md`}
            ></FontAwesomeIcon>
            <Link href={data?.url} className="text-2xl font-semibold mt-4">{data?.title}</Link>
            <p className="texl-xl">{data?.description}</p>
            <Link className={`mt-auto self-center underline text-blue-600`} href={data?.url}>
              Más info 
              <FontAwesomeIcon className="ml-2" icon={faPlus}></FontAwesomeIcon>
            </Link>
          </LandingCard>
        ))}
      </div>
    </div>
  );
}
