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
  // console.log(Object.entries(data.data));

  return (
    <>
      <div className="app">
        {Object.entries(data.data).map((card: any, index: Number) => (
          <div key={crypto.randomUUID()}>
            {/* <p>========== {JSON.stringify(card[0])} ========</p>
            <p>{JSON.stringify(card[1])} </p> */}
            <Card data={JSON.stringify(card[1])}></Card>
            {/* <p>========== A ========</p> */}
            <br />
          </div>
        ))}
      </div>
            <ToastContainer
            // position="bottom-right"
            // autoClose={5000}
            // hideProgressBar={false}
            // newestOnTop={false}
            // closeOnClick
            // rtl={false}
            // pauseOnFocusLoss
            // draggable
            // pauseOnHover
            // theme={colorScheme}
            />
    </>
  );
}
