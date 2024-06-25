import { redirect } from "next/navigation";

import Card from "../components/Card";
import Filters from "../components/Filters";
import { ToastContainer } from "react-toastify";
import PageInfo from "../components/PageInfo";
import OrderResults from "../components/OrderResults";
import Image from "next/image";
import hero from '../../../public/hero.jpeg';
import Paginacion from "../components/Paginacion";



var cache = require("memory-cache");

export default async function App({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

  const getCards = async () => {
    // const apiUrl = "http://localhost:3000";
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    // console.log(process.env.API_URL);

    // const value = cache.get("descubrir");
    let value = false;
    if (value) {
      console.log("CACHE HIT");

      return value;
    } else {
      const res = await fetch(`${apiUrl}/api/cards?order=${searchParams["order"] || 'AZ'}`, {
        headers: {
          "Content-Type": "application/json",
          "Cache-store": "no-store",
        },
      });
      const jsonData = await res.json();
      const hours = 1; //1 hour cache
      cache.put("descubrir", jsonData, hours * 1000 * 60 * 60);

      return jsonData;
    }
  };

  const datax = await getCards();

  const orderFunction = {
    'AZ': (a: any, b: any) => {
      if (a.name === b.name) return 0;
      return a.name > b.name ? 1 : -1;
    },
    'ZA': (a: any, b: any) => {
      if (a.name === b.name) return 0;
      return a.name > b.name ? -1 :  1;
    }
  }
  
  function convertPricelevelStringToNumber(filter: string){
    switch(filter){
      case "low" : return 1;
      case "med" : return 2;
      case "high" : return 3;
      default: return;
    }
  }  

  console.log("Por curiosidad", JSON.stringify(searchParams));
  

  //FILTER
  const filterByPriceLevel = searchParams["cost"] as string != undefined ? decodeURIComponent(searchParams["cost"] as string).split(",").map(convertPricelevelStringToNumber) : [];
  const filterByRating = parseFloat(decodeURIComponent(searchParams["rating"] as string || "0.0"));
  console.log("PRICELEVEL", filterByPriceLevel);
  console.log("RATING", filterByRating);
  console.log("Que hago con mi vida", filterByPriceLevel.length > 0 || filterByRating > 0.0);
  
   let dataFiltered = (filterByPriceLevel.length > 0 || filterByRating > 0.0) ? datax.filter( (card: any) => {     
     return filterByPriceLevel.includes(card.priceLevel) && card.rating >= filterByRating 
   }) : datax;

  //let dataFiltered = datax;
  
  //ORDER
  const orderBy = searchParams["order"] as string;

  let data = orderBy === 'ZA' ? dataFiltered.sort(orderFunction['ZA']) : dataFiltered.sort(orderFunction['AZ']);

  // Controls how many cards per page are displayed
  const perPage = 24;

  const totalPages = Math.ceil(Object.entries(data).length / perPage);
  let pageNumber = parseInt(searchParams["page"] as string) || 1;

  //console.log("PAGINA " + parseInt(searchParams["page"] as string));

  if (
    (searchParams["page"] as string) !== undefined &&
    isNaN(parseInt(searchParams["page"] as string))
  ) {
    redirect("/descubrir?page=1");
  }

  if (pageNumber < 1) {
    pageNumber = 1;
    redirect("/descubrir?page=1");
  }

  if (pageNumber > totalPages) {
    pageNumber = totalPages;
    redirect("/descubrir?page=" + totalPages);
  }

  console.log(pageNumber + "/" + totalPages);

  const start = (pageNumber - 1) * perPage;
  const end = start + perPage;

  return (
    <>
    <Image src={hero} alt="test" className="hidden" width={500}></Image>
      {/* <div className="flex flex-wrap justify-center items-center gap-8 p-4 mx-auto  w-[90%] bg-neutral-600 bg-opacity-80 rounded"> */}
      <div className="w-[100%] max-md:max-w-[350px] mx-auto flex justify-between items-center gap-4 py-2 sm:px-[9vw] mt-10 pb-4">
        <Filters></Filters>
        <OrderResults></OrderResults>
      </div>

      {/* </div> */}
      <div className="flex flex-wrap max-md:w-[70%] max-md:justify-center justify-between gap-8 py-2 sm:px-[9vw] mx-auto w-[100%]">
      {/* <div className="grid-card-layout items-stretch justify-items-center gap-8 p-10 mx-auto sm:w-[95%]"> */}
        {Object.entries(data)
          .slice(start, end)
          .map((card: any, index: Number) => (
            <Card
              data={JSON.stringify(card[1])}
              key={crypto.randomUUID()}
            ></Card>
          ))}
      </div>
      <ToastContainer />
      <Paginacion pageNumber={pageNumber} totalPages={totalPages} ></Paginacion>
    </>
  );
}
