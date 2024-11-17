import { initMongoose } from "../../lib/db";
import Card from "../../models/schemas";
import { NextResponse } from "next/server";

export async function GET(req) {
  await initMongoose();
  const data = await Card.find({}).select("address name lat lng photos categories url rating priceLevel").sort({name: 1});

  return new NextResponse(JSON.stringify(data));
}
