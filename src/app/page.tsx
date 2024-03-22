import { UUID } from "mongodb";
import Card from "./components/Card";
import { ToastContainer } from "react-toastify";

export default async function App() {
  const getCards = async () => {
    const res = await fetch("http://localhost:3000/api/", {
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  };
  const data = await getCards();
  // console.log(data);

  return (
    <>
      <div className="cards">
        {Object.entries(data).map((card: any, index: Number) => (
          <Card data={JSON.stringify(card[1])} key={crypto.randomUUID()}></Card>
        ))}
      </div>
      <ToastContainer />
    </>
  );
}
