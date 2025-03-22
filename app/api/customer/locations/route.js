import { Restaurant } from "@/app/lib/restaurantModals";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(process.env.MONGODB_URI);
    let result = await Restaurant.find();
    result = result.map((item)=>item.city.charAt(0).toUpperCase()+item.city.slice(1))
    result = [...new Set(result.map((item)=>item))]
    return NextResponse.json({success:true,result,message:"Locations fetched successfully"});
}