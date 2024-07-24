import { Suspense } from "react";
import MapCaller from "../components/Location/MapCaller";
import Loading from "../descubrir/loading";

export default async function Mapa() {
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

  return (
    <Suspense fallback={<Loading />}>
      <MapCaller data={datax}></MapCaller>
    </Suspense>
  );
}
