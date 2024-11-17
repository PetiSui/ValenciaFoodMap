import { initMongoose } from "../../../lib/db";
import Card from "../../../models/schemas";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await initMongoose();

  const id = params.id;
  let data = await Card.findOne({ _id: id }).select("address name lat lng photos categories url rating priceLevel").exec();

  if (data == null) {
    data = { message: "Card not found" };
  }  

  return new NextResponse(JSON.stringify(data));
}
