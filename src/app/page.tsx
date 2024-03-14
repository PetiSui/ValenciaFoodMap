import { UUID } from "mongodb";

export default async function App() {
  const getCards = async () => {
    const res = await fetch("http://localhost:3000/api/", {
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  };
  const data = await getCards();
  // console.log(data);
  // console.log(Object.entries(data.data));

  return (
    <>
      <div>AA</div>
      {Object.entries(data.data).map((card: any, index: any) => (
        <>
          <p>========== {JSON.stringify(card[0])} ========</p>
          <p key={crypto.randomUUID()}>{JSON.stringify(card[1])}</p>
          <br />
        </>
      ))}
    </>
  );
}
