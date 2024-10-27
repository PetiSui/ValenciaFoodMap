import { Suspense } from "react";
import MapCaller from "../components/Location/MapCaller";
import Loading from "../descubrir/loading";
import { redirect } from "next/navigation";

export default async function Mapa({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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

  if (searchParams["categories"] === "") {
    redirect("/mapa");
  }

  function convertPricelevelStringToNumber(filter: string) {
    switch (filter) {
      case "low":
        return 1;
      case "med":
        return 2;
      case "high":
        return 3;
      default:
        return;
    }
  }

  //FILTER
  const filterByPriceLevel =
    (searchParams["cost"] as string) != undefined
      ? decodeURIComponent(searchParams["cost"] as string)
          .split(",")
          .map(convertPricelevelStringToNumber)
      : [];
  const filterByRating = parseFloat(
    decodeURIComponent((searchParams["rating"] as string) || "0.0")
  );

  console.log('0', datax);
  

  let dataFiltered =
    filterByPriceLevel.length > 0 || filterByRating > 0.0
      ? datax.filter((card: any) => {
          return (
            filterByPriceLevel.includes(card.priceLevel) &&
            card.rating >= filterByRating
          );
        })
      : datax;


  console.log('1', dataFiltered);
  

  const categoriesSelected =
    (searchParams["categories"] as string) != undefined &&
    searchParams["categories"] !== ""
      ? (searchParams["categories"] as string).split(",")
      : [];

  const dataFilteredWihCategories =
    categoriesSelected.length > 0 && categoriesSelected[0] !== "all"
      ? dataFiltered.filter((card: any) =>
          card?.categories?.some(
            (r: any) => categoriesSelected.indexOf(r) !== -1
          )
        )
      : dataFiltered;

      console.log('2', dataFilteredWihCategories);
      

  return (
    <Suspense fallback={<Loading />}>
      <MapCaller data={dataFilteredWihCategories}></MapCaller>
    </Suspense>
  );
}
