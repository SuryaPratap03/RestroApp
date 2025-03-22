import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
    unique: true,        // Ensures restaurant names are unique
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,        // Ensures email uniqueness
    lowercase: true,      // Store in lowercase
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6          // Minimum 6 characters for password
  },
  createdAt: {
    type: Date,
    default: Date.now      // Automatically stores the current date and time
  }
});

// Prevents multiple model declaration error in serverless environments
export const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
