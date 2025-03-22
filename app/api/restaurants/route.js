import { connectDB } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModals";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const { restaurantName, city, address, phoneNumber, email, password, login } = await request.json();

    if (login) {
      // ➡️ Handle Login
      const restaurant = await Restaurant.findOne({ email });

      if (!restaurant) {
        return NextResponse.json({ success: false, message: "Restaurant not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, restaurant.password);

      if (!isPasswordValid) {
        return NextResponse.json({ success: false, message: "Invalid credentials" });
      }

      return NextResponse.json({
        success: true,
        message: "Login successful",
        result: restaurant,
      });
    } else {
      // ➡️ Handle Signup
      const existingRestaurant = await Restaurant.findOne({ email });

      if (existingRestaurant) {
        return NextResponse.json({ success: false, message: "Email already in use" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newRestaurant = new Restaurant({
        restaurantName,
        city,
        address,
        phoneNumber,
        email,
        password: hashedPassword,
      });

      const savedRestaurant = await newRestaurant.save();
      return NextResponse.json({
        success: true,
        message: "Restaurant created successfully",
        result: newRestaurant,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Request failed" });
  }
}
