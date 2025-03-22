"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RestaurantHeader from "@/app/_components/RestaurantHeader.js";

const EditFoodItem = () => {
  const router = useRouter();
  const params = useParams();  // ✅ Calling useParams at the top level
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    img_path: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  // ✅ Load food item after params are available
  const handleLoadFoodItem = async () => {
    if (!params?.id) return;  // Ensure params are available

    try {
      const response = await fetch(`/api/restaurants/foods/edit/${params.id}`);
      const data = await response.json();

      if (data?.success) {
        setFormData(data?.foodItem);
      } else {
        toast.error("Failed to load food item");
      }
    } catch (error) {
      console.error("Error loading food item:", error);
      toast.error("Error loading food item");
    }
  };

  useEffect(() => {
    if (params?.id) {
      handleLoadFoodItem();
    }
  }, [params]);

  // Handle input changes and clear errors instantly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Food name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Food name must be at least 3 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.img_path.trim()) {
      newErrors.img_path = "Image path is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`/api/restaurants/foods/edit/${params?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data?.success) {
        toast.success("Food item updated successfully!");
        router.back();
      } else {
        toast.error("Failed to update food item");
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error("Error updating food item");
    }
  };

  // Navigate back function
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <RestaurantHeader />

      {/* Form Container */}
      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg relative">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 bg-gray-200 px-4 py-2 rounded-full text-sm shadow-sm hover:bg-gray-300 transition duration-300"
        >
          ← Back
        </button>

        {/* Centered Edit Food Item Button */}
        <div className="flex justify-center mb-8">
          <button
            disabled={true}
            className="px-8 py-3 bg-green-500 text-white rounded-full shadow-lg"
          >
            Edit Food Item
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Food Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter food name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter food price"
              value={formData.price}
              onChange={handleChange}
              name="price"
              min={0}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Image Path */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter image path"
              value={formData.img_path}
              onChange={handleChange}
              name="img_path"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.img_path && <p className="text-red-500 text-sm mt-1">{errors.img_path}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <textarea
              placeholder="Enter food description"
              value={formData.description}
              onChange={handleChange}
              name="description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 shadow-md"
            onClick={handleSubmit}
            >
              Update Food Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoodItem;
