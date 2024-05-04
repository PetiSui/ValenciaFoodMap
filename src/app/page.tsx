import Image from "next/image";
import hero from "../../public/hero.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function App() {
  return (
    <div className="flex justify-center items-center">
      <div className="glassmorphism w-[75%] max-md:w-[85%] max-sm:w-[90%] h-auto flex items-center justify-evenly max-lg:flex-row max-md:flex-col p-10 gap-6">
        <Image className="max-lg:scale-60 self-start place-self-start" src={hero} height={350} priority={true} placeholder="empty" alt="Hero Image"></Image>
        <div className="flex gap-5 flex-col justify-start items-start h-[100%]">
          <h1 className="text-3xl text-lightblack font-semibold self-start place-self-start tracking-tight leading-[1.1] max-w-[36ch] text-balance">
            Las mejores experiencias gastronómicas de {" "}
            <span className="text-3xl text-lightblack font-semibold tracking-wide">
               Valencia
            </span>
          </h1>
          <p className="flex-1 mt-2 text-gray-100 font-normal text-xl">
            Busca y explora los mejores establecimientos
          </p>
          <Link
            className="mt-auto font-semibold place-self-start self-start bg-black border-0 px-5 py-3 rounded hover:bg-slate-100 hover:text-[#020202]"
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
      </div>
    </div>
  );
}
