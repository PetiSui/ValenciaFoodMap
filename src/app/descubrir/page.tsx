import Card from "../components/Card";
import Filters from "../components/Filters";
import { ToastContainer } from "react-toastify";
var cache = require("memory-cache");

export default async function App() {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

  const getCards = async () => {
    // const apiUrl = "http://localhost:3000";
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    // console.log(process.env.API_URL);
    const value = cache.get("descubrir");
    if (value) {
      console.log("CACHE HIT");
      
      return value;
    } else {
      const res = await fetch(`${apiUrl}/api/cards/`, {
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await res.json();
      const hours = 2; //2 hour cache
      cache.put("descubrir", jsonData, hours * 1000 * 60 * 60);

      return jsonData;
    }
  };

  const data = await getCards();
  // console.log(data);

  return (
    <>
      <Filters></Filters>
      <div className="flex flex-wrap justify-center gap-8 p-10 mx-auto">
        {Object.entries(data).map((card: any, index: Number) => (
          <Card data={JSON.stringify(card[1])} key={crypto.randomUUID()}></Card>
        ))}
      </div>
      <ToastContainer />
    </>
  );
}
