import { foodSchema } from "@/app/lib/foodsModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//this api will fetch all the food items of a restaurant
export async function GET(request,content){
    const id = await content.params.id;
    let success = false;
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await foodSchema.find({resto_id:id})
    if(result){
        success = true;
    }
    return NextResponse.json({result:result,success:success})
}

//this api will delete a food item from the restaurant by getting the id of the 
// food item 
export async function DELETE(request,content){
    const id = await content.params.id;
    let success = false;
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await foodSchema.findByIdAndDelete(id);
    if(result){
        success = true;
    }
    return NextResponse.json({success:success,message:"Food Item Deleted Successfully"})
}