"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const UserSignin = ({ setIsSignup,redirect }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const { email, password } = formData;

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      try {
        const response = await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("API Response:", response);
        if (!response.ok) {
          toast.error("Failed to login user");
          return;
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("user", JSON.stringify(data.result));
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
        toast.error("Failed to Signin user. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      style={{ marginTop: "-100px", marginBottom: "-50px" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-green-500 outline-none transition`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-green-500 outline-none transition`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-lg transition flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Sign In"
              )}
            </button>

            {/* Signup Link */}
            <div
              onClick={() => setIsSignup(true)}
              className="text-green-600 hover:underline text-sm cursor-pointer"
            >
              Don't have an account? Sign Up
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignin;
