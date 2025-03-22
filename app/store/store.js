"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";

export const store = configureStore({    // ✅ Only named export
    reducer: {
        cart: cartReducer,
    }
});
