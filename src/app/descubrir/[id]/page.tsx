import { redirect } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { Euro, Globe, MapPin, Phone, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import Loading from "../loading";
import SingleLocationMapCaller from "@/app/components/Location/SingleLocationMapCaller";

export default async function Categorias({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { id: string };
}) {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

  const getCard = async () => {
    //const apiUrl = "http://localhost:3000";
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    // console.log(process.env.API_URL);
    const id = params.id ? params.id : redirect("/descubrir");
    console.log(id);

    const res = await fetch(`${apiUrl}/api/cards/${params.id}`, {
      headers: {
        "Cache-store": "no-store",
      },
    });

    const jsonData = await res.json();
    console.log(jsonData);

    return jsonData;
  };

  const datax = await getCard();

  if (datax.message || !datax) {
    return (
      <div className="glassmorphism flex flex-col justify-center items-center gap-5 w-[70%] p-12 mt-12 mx-auto outline outline-1 outline-[#40404030]">
        <FontAwesomeIcon
          icon={faFaceSadTear}
          className="text-6xl drop-shadow-md dark:text-lightwhite text-lightblack"
        />
        <p className="font-semibold mt-2 text-2xl text-balance text-center text-lightblack dark:text-lightwhite">
          No se ha encontrado el establecimiento
        </p>
        <Link
          className="bg-lightblack border-0 px-5 py-3 mt-4 rounded hover:bg-slate-100 hover:text-lightblack text-lightwhite"
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

  return (
    <div className="flex flex-wrap max-sm:w-[90dvw] max-md:w-[80dvw] w-[70dwh] max-md:justify-center justify-between gap-8 py-0 px-[9vw] mx-auto">
      {/* <Card data={JSON.stringify(datax)}></Card> */}

      <main className="bg-lightwhite mx-auto min-h-screen">
        {/* Hero Section */}
        <div className="relative max-h-[50vh] h-[max(300px,30dvh)] max-sm:w-[90dvw] max-md:w-[80dvw] w-[70dwh]">
          <div className="absolute inset-0">
            <img
              src={
                datax?.photos?.startsWith("https://lh3.googleusercontent.com/")
                  ? datax?.photos.replace("400", "800").replace("300", "600")
                  : datax?.photos
              }
              alt={datax?.name}
              className="h-full w-full object-cover shadow-black/35 shadow-lg scale-100 transition-all hover:!scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative flex h-full items-end">
            <div className="container pb-8">
              <h1 className="max-sm:text-2xl max-md:text-3xl text-4xl font-bold text-white md:text-6xl drop-shadow-xl transition-all">
                {datax?.name}
              </h1>
              <div className="mt-4 flex items-center max-sm:gap-8 gap-12">
                <div className="flex items-center gap-1">
                  <Star className="max-sm:h-6 max-sm:w-6 h-8 w-8 fill-yellow-400 text-yellow-400 hover:brightness-110" />
                  <span className="ml-2 text-xl text-lightwhite drop-shadow-lg mt-1">
                    {datax?.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: datax?.priceLevel }).map((_, index) => {
                    return (
                      // <EuroIcon key={crypto.randomUUID()} className="h-8 w-8 bg-white-400/50 text-lightblack border-lightblack border rounded" />
                      <div
                        key={crypto.randomUUID()}
                        className="flex items-center justify-center"
                      >
                        <div className="max-sm:h-8 max-sm:w-8 h-10 w-10 max-sm:p-1 rounded-lg border-2 border-black/80 flex items-center justify-center bg-white/85 hover:bg-white/65 text-blue-400 transition-all">
                          <span className="text-xl font-medium text-inherit">
                            <Euro className="max-sm:h-6 max-sm:w-6 h-8 w-8"></Euro>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 max-sm:p-4 p-6">
          {datax?.categories.map((category: string) => {
            return (
              <Badge
                key={crypto.randomUUID()}
                variant="secondary"
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2"
              >
                {category}
              </Badge>
            );
          })}
        </div>

        {(datax?.address || datax?.telephone || datax?.website) && (
          <div className="flex flex-col flex-wrap gap-4 max-sm:px-6 px-12 mt-2">
            <h2 className="text-2xl font-bold">
              Información del establecimiento
            </h2>
            <div className="rounded-lg border border-[hsl(214.3deg_15.61%_83.38%)] p-4">
              <div className="space-y-4">
                {datax?.address && (
                  <div className="flex items-center gap-2 hover:underline">
                    <MapPin className="min-h-5 min-w-5 text-[rgb(90,92,97)] hover:fill-gray-400/80" />
                    <a href={datax?.url ?? ""} target="_blank">
                      {datax?.address}
                    </a>
                  </div>
                )}
                {datax?.telephone && (
                  <div className="flex items-center gap-2">
                    <Phone className="min-h-5 min-w-5 text-[rgb(90,92,97)] hover:fill-gray-400/80" />
                    <a
                      href={`tel:${datax?.telephone}`}
                      className="hover:!underline"
                    >
                      {datax?.telephone}
                    </a>
                  </div>
                )}
                {datax?.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="min-h-5 min-w-5 text-[rgb(90,92,97)] hover:fill-gray-400/80" />
                    <a href={`${datax?.website}`} className="hover:!underline">
                      {datax?.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* <MapCaller data={[datax]}></MapCaller> */}

        <div className="mx-auto mt-8 mb-8 max-sm:px-4 px-12 drop-shadow-lg flex justify-center items-center">
          <Suspense fallback={<Loading />}>
            <SingleLocationMapCaller datax={datax}></SingleLocationMapCaller>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
