"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const RestaurantSignUp = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    city: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // To store validation errors
  const router = useRouter();

  // Capitalize the first letter of city
  const capitalizeCity = (city) => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error message when the user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.restaurantName.trim()) newErrors.restaurantName = "Restaurant name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

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

    // ✅ Capitalize the first letter of the city before submitting
    const formattedData = {
      ...formData,
      city: capitalizeCity(formData.city),
    };

    // console.log("Formatted FormData", formattedData);

    const response = await fetch("/api/restaurants", {
      method: "POST",
      body: JSON.stringify(formattedData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Response", data);

    if (data.success) {
      const { result } = data;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      toast.success("Restaurant created successfully");

      // ✅ Clear form fields after successful submission
      setFormData({
        restaurantName: "",
        city: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
      });

      router.push("/restaurant/dashboard");
    } else {
      toast.error("Restaurant creation failed");
    }
  };

  return (
    <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg w-full max-w-md">
      <form onSubmit={handleSubmit}>
        {/* Restaurant Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter restaurant name"
            value={formData.restaurantName}
            onChange={handleChange}
            name="restaurantName"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.restaurantName && <p className="text-red-500 text-sm mt-1">{errors.restaurantName}</p>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            name="city"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        {/* Full Address */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter full address"
            value={formData.address}
            onChange={handleChange}
            name="address"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <input
            type="tel"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RestaurantSignUp;