import { foodSchema } from "@/app/lib/foodsModal";
import { Restaurant } from "@/app/lib/restaurantModals";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//we are fetching reatuarant id from the url
export async function GET(request,content){
    const id = await content?.params?.id;
    console.log(id);
    await mongoose.connect(process.env.MONGODB_URI);
    const details = await Restaurant.findById(id);
    const foodItems = await foodSchema.find({resto_id:id});
    return NextResponse.json({success:true,message:"Restaurant details fetched successfully",details,foodItems}) 
}