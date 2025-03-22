import { orderSchema } from "@/app/lib/orderModel";
import { Restaurant } from "@/app/lib/restaurantModals";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    try {
        const id = content?.params?.id;
        await mongoose.connect(process.env.MONGODB_URI);
        let result = await orderSchema.find({deliveryBoy_id:id});
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
