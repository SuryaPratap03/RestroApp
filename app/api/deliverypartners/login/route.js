import deliveryPartnersSchema from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request){
    const {contactNumber,password} = await request.json();
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await deliveryPartnersSchema.findOne({contactNumber});
    if(!result){
        return NextResponse.json({success:false,message:"User not found"});
    }
const isPasswordMatch= bcrypt.compare(password,result.password);

    if(!isPasswordMatch){
        return NextResponse.json({success:false,message:"Invalid Credentials"});
    }
    const DetailsWithoutPassword = result.toObject();
    delete DetailsWithoutPassword.password;
    return NextResponse.json({success:true,message:"Delivery Partner logged in successfully",result:DetailsWithoutPassword});
}