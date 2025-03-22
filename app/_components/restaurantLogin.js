"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RestaurantLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // To store validation errors

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error message when the user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails
    console.log("FormData", formData);
    const response = await fetch('/api/restaurants',{
      method:"POST",
      body:JSON.stringify({
        login:true,
        email:formData.email,
        password:formData.password
      })
    })
    const data = await response.json();
    if(data.success){
      const {result} = data;
      delete result.password;
      localStorage.setItem('restaurantUser',JSON.stringify(result))
      router.push('/restaurant/dashboard')
    }else{
      alert(data.message)
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition"
        >
          Login
        </button>
      </form>

      {/* Forgot Password */}
      <div className="mt-4 text-center">
        <a href="#" className="text-green-500 text-sm hover:underline">
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

export default RestaurantLogin;
