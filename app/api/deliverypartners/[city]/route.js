import deliveryPartnersSchema from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    let city = content.params.city;
    await mongoose.connect(process.env.MONGODB_URI);
    let filter = {city:{$regex:new RegExp(city,'i')}}
    let result = await deliveryPartnersSchema.find(filter);

    return NextResponse.json({result});
}