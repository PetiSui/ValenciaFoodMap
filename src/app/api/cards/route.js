import { initMongoose } from "../../lib/db";
import Card from "../../models/schemas";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const con = await initMongoose();
  console.log("Hit db connect", new Date().getSeconds());
  const data = await Card.find();

  return new NextResponse(JSON.stringify(data));
}

export async function POST(req, res) {
  const con = await initMongoose();
  const request = await req.json();
  console.log(request);

  if (request === null) {
    const data = {
      error: "no favorites",
    };
    return new NextResponse(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }
  console.log(JSON.parse(request));
  const data = await Card.find().where("_id").in(JSON.parse(request)).exec();

  return new NextResponse(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
