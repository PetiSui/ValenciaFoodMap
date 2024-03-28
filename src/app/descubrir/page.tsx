import Card from "../components/Card";
import { ToastContainer } from "react-toastify";

export default async function App() {
  if(!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

  const getCards = async () => {
    // const apiUrl = "http://localhost:3000";
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    // console.log(process.env.API_URL);
    
    const res = await fetch(`${apiUrl}/api/cards/`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  };
  const data = await getCards();
  // console.log(data);

  return (
    <>
      <div className="cards p-10">
        {Object.entries(data).map((card: any, index: Number) => (
          <Card data={JSON.stringify(card[1])} key={crypto.randomUUID()}></Card>
        ))}
      </div>
      <ToastContainer />
    </>
  );
}
