import { foodSchema } from "@/app/lib/foodsModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// ✅ GET Food Item by ID (for Editing)
export async function GET(request) {
  const id = request.nextUrl.pathname.split("/").pop();  // Extract ID from URL
  let success = false;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const foodItem = await foodSchema.findById(id);

    if (!foodItem) {
      return NextResponse.json({ success, error: "Food item not found" });
    }

    success = true;
    return NextResponse.json({ success, foodItem });

  } catch (error) {
    console.error("Error fetching food item:", error);
    return NextResponse.json({ success, error: "Server error" });
  }
}

// ✅ PUT Request to Update Food Item
export async function PUT(request) {
  const id = request.nextUrl.pathname.split("/").pop();  // Extract ID from URL
  let success = false;

  try {
    const payload = await request.json();

    await mongoose.connect(process.env.MONGODB_URI);

    const result = await foodSchema.findByIdAndUpdate(id, payload, { new: true });

    if (!result) {
      return NextResponse.json({ success, error: "Failed to update food item" });
    }

    success = true;
    return NextResponse.json({ success, message: "Food item updated successfully", result });

  } catch (error) {
    console.error("Error updating food item:", error);
    return NextResponse.json({ success, error: "Server error" });
  }
}
