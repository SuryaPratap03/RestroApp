"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DeliveryHeader from "./DeliveryHeader";

const DeliveryPartnerLogin = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    contactNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ Validate Form
  const validateForm = () => {
    const newErrors = {};

    // Contact number validation
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Invalid contact number format (10 digits required).";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setLoading(true);

    try {
      const response = await fetch("/api/deliverypartners/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        toast.success("Login successful!");
        localStorage.setItem("delivery", JSON.stringify(data.result));

        // Redirect to the dashboard
        router.push("/deliverydashboard");
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (error) {
    //   toast.error("Failed to connect to the server. Please try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <DeliveryHeader />
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
            Delivery Partner Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
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
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.contactNumber ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 outline-none transition`}
                required
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
              )}
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
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 outline-none transition`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
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
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="text-center mt-4">
            <div className="text-gray-600">
              Don't have an account?{" "}
              <div
                onClick={() => setIsLoggedIn(false)}
                className="text-green-600 hover:underline cursor-pointer"
              >
                Register here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerLogin;
