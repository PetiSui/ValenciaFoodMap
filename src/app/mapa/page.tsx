import MapCaller from "../components/Location/MapCaller";

export default async function Mapa() {

    if (!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

    const getCards = async () => {
      const apiUrl = "http://localhost:3000";
      //const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  
      // console.log(process.env.API_URL);
  
      const res = await fetch(
        `${apiUrl}/api/map`,
        {
          headers: {
            "Cache-store": "no-store",
          },
        }
      );
  
      const jsonData = await res.json();
  
      return jsonData;
    };
  
    const datax = await getCards();


  return <MapCaller data={datax}></MapCaller>
}
