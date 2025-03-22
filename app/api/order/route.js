import { orderSchema } from "@/app/lib/orderModel";
import { Restaurant } from "@/app/lib/restaurantModals";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const payload = await request.json();
        await mongoose.connect(process.env.MONGODB_URI);
        let success = false;
        const orderObj = new orderSchema(payload);
        const result = await orderObj.save();
        if(result){
        success = true;
    }
    return NextResponse.json({result,success})
    } catch (error) {
        return NextResponse.json({error,success:false})
    }
}

export async function GET(request){
    try {
        const userId = request.nextUrl.searchParams.get("id");
        await mongoose.connect(process.env.MONGODB_URI);
        let result = await orderSchema.find({user_Id:userId});
        let success = false;
        if(result){
            let restoData = await Promise.all(
                result.map(async (item)=>{
                    let restroInfo = {};
                    restroInfo.data = await Restaurant.find({_id:item?.restoId})
                    restroInfo.amount = item?.amount;
                    restroInfo.status = item?.status;
                    return restroInfo;
                })
            )
            result = restoData;
            success = true;
        }
        return NextResponse.json({success,message:"Order fetched successfully",result})
    } catch (error) {
        return NextResponse.json({error,success:false,message:"Order fetch failed"})
    }
}