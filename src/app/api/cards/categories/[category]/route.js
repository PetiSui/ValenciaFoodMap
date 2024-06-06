import { initMongoose } from "../../../../lib/db";
import Card from "../../../../models/schemas";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const con = await initMongoose();

  const category = params.category ? params.category.charAt(0).toUpperCase() + params.category.slice(1) : null;
  //console.log(id);
  console.log("Hit db connect", new Date().getSeconds());
  let data = category != null ? await Card.find({ categories : { $all : [category] }}).exec() : { message: "Categories not found" };
  console.log(JSON.stringify(data));

  return new NextResponse(JSON.stringify(data));
}
