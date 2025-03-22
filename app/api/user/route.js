import User from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//Signup api for user
export async function POST(request){
    try{

    const payload = await request.json();  
    await mongoose.connect(process.env.MONGODB_URI);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password,salt);
    payload.password = hashedPassword;
    const user = new User(payload);
    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return NextResponse.json({success:true,message:"User created successfully",data:userWithoutPassword})
}catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create user",
      error: error.message
    });
  }
} 