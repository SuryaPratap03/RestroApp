import { foodSchema } from "@/app/lib/foodsModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload = await request.json();
    await mongoose.connect(process.env.MONGODB_URI);
    const food = new foodSchema(payload);
    const result = await food.save();
    return NextResponse.json({result,success:true})
}