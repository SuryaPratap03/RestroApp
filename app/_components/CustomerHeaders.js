"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomerHeaders = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const router = useRouter();
  
  const [user, setUser] = useState(null);

  // ✅ Load user on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    router.push("/user-auth");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-10 flex items-center justify-between">
      {/* Logo Section */}
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

      {/* Navigation Menu */}
      <nav>
        <ul className="flex space-x-6 md:space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/restaurant" className="hover:text-green-500 transition">
              Add Restaurant
            </Link>
          </li>

          <li>
            <Link href="/cart" className="hover:text-green-500 transition">
              Cart <span className="text-green-600">({cartItems.length})</span>
            </Link>
          </li>

          {user ? (
            <>
              <li>{user?.name}</li>
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

export default CustomerHeaders;
