import { initMongoose } from "../lib/db";
import Card from "../models/schemas";
import { NextResponse } from 'next/server';

export async function GET(req, res) {
    const con = await initMongoose();
    console.log("Hit db connect", new Date().getSeconds());
    const data = await Card.find();

    return new NextResponse(JSON.stringify(data));
}

export async function POST(req, res) {
    //const con = await initMongoose();
    //const data = await Card.find().exec();

    return new NextResponse.json({message: "Connected"});
}