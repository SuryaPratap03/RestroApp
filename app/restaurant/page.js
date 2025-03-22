"use client";
import React, { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignUp from "../_components/restaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";

const Page = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <RestaurantHeader />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div
          className={`bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md transition-all duration-300 ${
            login ? "h-auto" : "h-5/6"
          }`}
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {login ? "Restaurant Login" : "Restaurant Sign Up"}
          </h1>

          {/* Render Login or Signup Component */}
          {login ? <RestaurantLogin /> : <RestaurantSignUp />}

          {/* Toggle Button (Now in Same Line) */}
          <div className="mt-4 text-center flex justify-center items-center gap-2">
            <p className="text-gray-600">{login ? "Don't have an account?" : "Already have an account?"}</p>
            <button
              onClick={() => setLogin(!login)}
              className="text-green-500 font-semibold hover:underline"
            >
              {login ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
