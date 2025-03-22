"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Loading spinner icon
import toast from "react-hot-toast";
import Link from "next/link"; // Import Link for navigation

const UserSignup = ({setIsSignup,redirect}) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword, contactNumber, city, address } = formData;

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";

    if (!contactNumber) newErrors.contactNumber = "Contact number is required.";
    else if (!/^\d{10}$/.test(contactNumber)) newErrors.contactNumber = "Contact number must be 10 digits.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password.";
    else if (confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match.";

    if (!city) newErrors.city = "City is required.";
    if (!address) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      try {
        const response = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          toast.error("Failed to create user");
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("user", JSON.stringify(data.data));
          if(redirect){
            router.push('/cart');
          }else{
            router.push("/");
          }
        } else {
          toast.error(data.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to create user. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-12 transition hover:shadow-3xl"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-8">
          Create Your Account
        </h2>

        <div
          className="max-h-[65vh] overflow-y-scroll"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 outline-none transition`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 outline-none transition`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Enter contact number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.contactNumber ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 outline-none transition`}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 outline-none transition`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 outline-none transition`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 outline-none transition`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Address</label>
              <textarea
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
              </button>
              <Link onClick={()=>setIsSignup(false)} href="#" className="text-green-600 hover:underline">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
