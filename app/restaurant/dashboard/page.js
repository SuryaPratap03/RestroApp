"use client";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [addItem, setAddItem] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("restaurantUser"));
    if (!user) {
      router.push("/restaurant");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantHeader />

      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => setAddItem(true)}
          className={`px-6 py-3 bg-green-500 text-white rounded-full shadow-lg transition 
            hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400`}
        >
          Add Food Item
        </button>

        <button
          onClick={() => setAddItem(false)}
          className={`px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg transition 
            hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          Dashboard
        </button>
      </div>

      <div className="px-4">
        {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
      </div>
    </div>
  );
};

export default Dashboard;
