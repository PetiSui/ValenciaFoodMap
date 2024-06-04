import { initMongoose } from "../../../lib/db";
import Card from "../../../models/schemas";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const con = await initMongoose();

  const id = params.id;
  //console.log(id);
  console.log("Hit db connect", new Date().getSeconds());
  let data = await Card.findOne({ _id: id }).exec();
  //console.log(JSON.stringify(data));
  if (data == null) {
    data = { message: "Card not found" };
  }
  return new NextResponse(JSON.stringify(data));
}
