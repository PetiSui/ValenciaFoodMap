"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function App() {
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cards/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        global?.localStorage?.getItem("likedEstablishments")
      ),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No favorites</p>;

  return (
    <>
      <div className="cards p-10">
        {Object.entries(data).map((card: any, index: Number) => (
          <Card data={JSON.stringify(card[1])} key={crypto.randomUUID()}></Card>
        ))}
      </div>
    </>
  );
}
