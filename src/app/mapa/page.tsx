import { Suspense } from "react";
import MapCaller from "../components/Location/MapCaller";
import Loading from "../descubrir/loading";
import { redirect } from "next/navigation";

export default async function Mapa({searchParams} : {searchParams: { [key: string]: string | string[] | undefined };}) {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

  const getCards = async () => {
    //const apiUrl = "http://localhost:3000";
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    // console.log(process.env.API_URL);

    const res = await fetch(`${apiUrl}/api/map`, {
      headers: {
        cacheStore: "no-store",
        accept: "application/json",
      },
    });

    const jsonData = res.json();

    return jsonData;
  };

  const datax = await getCards();

  if(searchParams["categories"] === ""){
    redirect("/mapa");
  }

  const categoriesSelected = (searchParams["categories"] as string) != undefined && searchParams["categories"] !== '' ? (searchParams["categories"] as string).split(",") : [];

  const dataFiltered = categoriesSelected.length > 0 && categoriesSelected[0] !== 'all' ? datax.filter((card : any) => card?.categories?.some((r: any)=> categoriesSelected.indexOf(r) !== -1)) : datax;

  return (
    <Suspense fallback={<Loading />}>
      <MapCaller data={dataFiltered}></MapCaller>
    </Suspense>
  );
}
