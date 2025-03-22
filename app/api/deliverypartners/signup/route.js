import deliveryPartnersSchema from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//Signup api for delivery partner
export async function POST(request){
    try{
    const payload = await request.json();   
    await mongoose.connect(process.env.MONGODB_URI);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password,salt);
    payload.password = hashedPassword;
    const deliveryPartner = new deliveryPartnersSchema(payload);
    await deliveryPartner.save();

    const deliveryPartnerWithoutPassword = deliveryPartner.toObject();
    delete deliveryPartnerWithoutPassword.password;
    return NextResponse.json({success:true,message:"Delivery Partner created successfully",data:deliveryPartnerWithoutPassword})
}catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create delivery partner",
      error: error.message
    });
  }
} 