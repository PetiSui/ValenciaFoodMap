import { initMongoose } from "../../lib/db";
import Card from "../../models/schemas";
import { NextResponse } from "next/server";

export async function GET(req) {
  const con = await initMongoose();
  console.log("Hit db connect", new Date().getSeconds());
  const data = await Card.find({}).select("address name lat lng photos categories url").sort({name: 1});

  return new NextResponse(JSON.stringify(data));
}
