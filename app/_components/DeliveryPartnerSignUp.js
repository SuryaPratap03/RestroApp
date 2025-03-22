"use client";
import React, { useState } from "react";
import CustomerHeaders from "../_components/CustomerHeaders";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DeliveryHeader from "./DeliveryHeader";

const DeliveryPartnerSignup = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    city: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Capitalize City Name
  const capitalizeCity = (city) => {
    if (!city) return "";
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format city name before updating state
    const formattedValue = name === "city" ? capitalizeCity(value) : value;

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  // ✅ Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/deliverypartners/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Signup successful!");
        localStorage.setItem("delivery", JSON.stringify(data?.data));
        router.push("/deliverydashboard"); 
      } else {
        toast.error(data.message || "Signup failed.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DeliveryHeader />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="mt-20 bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
            Delivery Partner Signup
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
                required
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-gray-700 font-semibold">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Enter your contact number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
                required
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700 font-semibold">City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-semibold">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Signup"}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <div
                onClick={() => setIsLoggedIn(true)}
                className="text-green-600 hover:underline cursor-pointer"
              >
                Login here
              </div>
            </p>
          </div>
        </div>

        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default DeliveryPartnerSignup;
