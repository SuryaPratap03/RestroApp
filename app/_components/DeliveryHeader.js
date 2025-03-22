"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeliveryHeader = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const router = useRouter();

  const [delivery, setDelivery] = useState(null);

  // ✅ Load from localStorage only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDelivery = localStorage.getItem("delivery");

      // ✅ Check if storedDelivery exists and is valid JSON
      try {
        const parsedDelivery = storedDelivery ? JSON.parse(storedDelivery) : null;
        setDelivery(parsedDelivery);
      } catch (error) {
        console.error("Invalid JSON:", error);
        setDelivery(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("delivery");
    router.push("/deliverypartner");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-10 flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center space-x-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkZOIVSe9nrgzU0pjJn1pfro9Esus1q4unw&s"
            alt="Restaurant Logo"
            className="w-14 h-14 rounded-full object-cover"
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Restro App
          </h1>
        </div>
      </Link>

      <nav>
        <ul className="flex space-x-6 md:space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/restaurant" className="hover:text-green-500 transition">
              Add Restaurant
            </Link>
          </li>
          <li>
            <Link href="/deliverypartner" className="hover:text-green-500 transition">
              Delivery Partner
            </Link>
          </li>

          {delivery ? (
            <>
              <li>{delivery?.name}</li>
              <li
                onClick={handleLogout}
                className="hover:text-green-500 transition cursor-pointer"
              >
                Logout
              </li>
            </>
          ) : (
            <div className="flex gap-4">
              <li>
                <Link href="/user-auth" className="hover:text-green-500 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/user-auth" className="hover:text-green-500 transition">
                  Signup
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default DeliveryHeader;
