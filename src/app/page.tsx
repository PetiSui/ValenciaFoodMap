import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSearch,
  faHeart,
  faLocationDot,
  faPlus,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import LandingCard from "./components/LandingCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Utensils } from "lucide-react";

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
    <div className="flex flex-col justify-center items-center md:mt-12 mt-8 gap-20 md:gap-24">
      {/* <div className="glassmorphism w-[80dvw] h-auto flex items-center justify-evenly max-lg:flex-row max-md:flex-col p-10 gap-6 dark:shadow-neutral-700 shadow-neutral-600 shadow">
         <Image
           className="max-lg:scale-90 self-start place-self-start saturate-150"
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
       </div> */}

      <div className="mt-0 md:mt-6 relative mx-auto max-sm:max-w-[75dvw] max-md:max-w-[max(500px,60dvw)] max-w-[max(700px,65dvw)] p-8 md:p-16 bg-background/80 backdrop-blur-sm border-none swadow shadow-lg rounded-lg">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="relative group md:col-span-2 max-sm:scale-75 md:scale-100 transition-all duration-300">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/10 rounded-full blur-2xl group-hover:blur-xl transition-all duration-300 " /> */}
            <div className="relative aspect-square w-full max-w-[300px] mx-auto ">
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,currentColor_20deg,transparent_60deg,transparent_320deg,currentColor_360deg)] text-primary animate-spin-gradient z-30" />
              <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-background to-background/90 flex items-center justify-center z-40">
                <Utensils className="max-sm:w-18 w-20 max-sm:h-18 h-20 text-primary transition-all" />
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/20 shadow" />
            </div>
          </div>
          <div className="text-center md:text-left md:col-span-3">
            <div className="flex flex-col gap-6 justify-center items-center">
              <h1 className="max-sm:text-2xl max-md:text-3xl text-4xl font-bold tracking-tighter text-balance transition-all">
                Las mejores experiencias gastronómicas de Valencia
              </h1>
              {/* <p className="text-neutral-600 font-light text-lg mt-6">
                Busca y explora los mejores establecimientos
              </p> */}

              <Link
                className="mt-2 font-semibold md:place-self-start md:self-start bg-lightblack text-lightwhite border-0 px-5 py-3 rounded hover:bg-slate-100 hover:text-[#020202] transition-all"
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
        </div>
      </div>

      {/* flex flex-wrap flex-col md:flex-row */}
      <div className="p-16 lg:px-32 sm:py-16 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] justify-items-center gap-12 w-full max-sm:justify-center justify-around items-center dark:bg-neutral-600/60 bg-neutral-400/60 shadow">
        {landingCardsData.map((data: any) => (
          <LandingCard key={crypto.randomUUID()}>
            <FontAwesomeIcon
              icon={data?.icon}
              size="lg"
              className={`absolute top-[-30px] aspect-square z-20 self-center ${data?.color} p-5 rounded-full shadow-neutral-400 shadow-md`}
            ></FontAwesomeIcon>
            <Link href={data?.url} className="text-2xl font-semibold mt-4">
              {data?.title}
            </Link>
            <p className="texl-xl">{data?.description}</p>
            <Link
              className={`mt-auto p-3 text-center text-blue-600 border border-blue-400 border-solid rounded hover:bg-blue-100`}
              href={data?.url}
            >
              Más info
              <FontAwesomeIcon className="ml-3" icon={faPlus}></FontAwesomeIcon>
            </Link>
          </LandingCard>
        ))}
      </div>
      <div className="px-16 pt-8 md:pb-12 pb-8 mb-8 md:mb-16 w-[80dvw] bg-white/80 dark:bg-white/70 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-6 dark:shadow-neutral-600 shadow-neutral-500 shadow-lg">
        <div className="font-semibold text-xl w-full flex gap-6 items-center justify-center">
          <FontAwesomeIcon icon={faCircleQuestion} size="lg" className="max-w-6"/>
          <p>Preguntas frecuentes</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-[70dvw] flex flex-col gap-3"
        >
          <AccordionItem
            value="item-1"
            className="dark:bg-neutral-100 px-8 py-2 rounded"
          >
            <AccordionTrigger>
              ¿Sólo estan disponibles establecimientos en Valencia?
            </AccordionTrigger>
            <AccordionContent>
              Por el momento nos especializamos en recomendar establecimientos
              principalmente en la provincia de Valencia, España.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="dark:bg-neutral-100 px-8 py-2 rounded"
          >
            <AccordionTrigger>
              ¿Cómo se eligen los establecimientos?
            </AccordionTrigger>
            <AccordionContent>
              Los establecimientos se seleccionan en base a la combinación de
              experiencia y relación calidad/precio.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="dark:bg-neutral-100 px-8 py-2 rounded"
          >
            <AccordionTrigger>
              ¿Se almacenan cookies de terceros?
            </AccordionTrigger>
            <AccordionContent>
              En{" "}
              <span className="font-semibold">
                ValenciaFoodMap<sup className="text-[.78rem]">&copy;</sup>
              </span>{" "}
              no almacenamos ningún tipo de información de los usuarios que
              visitan nuestra web.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
