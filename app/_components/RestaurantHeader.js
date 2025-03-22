"use client"
import Link from "next/link";
import { useRouter,usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
const RestaurantHeader = () => {
  const [details,setDetails] = useState(null);
  const router = useRouter();
  const pathname = usePathname()
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('restaurantUser'));
    setDetails(user);
    
  if(user){
    if(pathname == '/restaurant'){
      router.push('/restaurant/dashboard')
    }
  }
  },[])
  const handleLogout=()=>{
    localStorage.removeItem('restaurantUser');
    router.push('/restaurant')
  }
  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-10 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkZOIVSe9nrgzU0pjJn1pfro9Esus1q4unw&s"
          alt="Restaurant Logo"
          className="w-14 h-14 rounded-full object-cover"
        />
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Restro App</h1>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="flex space-x-6 md:space-x-8 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-green-500 transition">
              Home
            </Link>
          </li>

          {details ?
          <> 
          <li>
            <Link href="/" className="hover:text-green-500 transition">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/restaurant" className="hover:text-green-500 transition" onClick={handleLogout}>
              Logout
            </Link>
          </li>
          </> :
          <li>
            <Link href="/" className="hover:text-green-500 transition">
              Login / Signup
            </Link>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default RestaurantHeader;
