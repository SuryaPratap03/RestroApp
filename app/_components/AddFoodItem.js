"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, {Toast} from "react-hot-toast";
const AddFoodItem = ({setAddItem}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    img_path: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Handle input changes and clear errors instantly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error on typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Form validation function (only checks if image path is empty)
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

  // Handle form submission (logs the data and clears fields)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails
    formData.resto_id = await JSON.parse(localStorage.getItem("restaurantUser"))._id;
    console.log("Form Data:", formData);
    const response = await fetch('/api/restaurants/foods',{
        method:"POST",
        body:JSON.stringify(formData)
    })
    const data = await response.json();
    if(data.success){
        toast.success("Food item added successfully!");
        setTimeout(()=>{
        ()=>setAddItem(false); 
        },[2000])
        setAddItem(false);
    }else{
        toast.error("Failed to add food item");
    }

    // Clear all fields after successful submission
    setFormData({
      name: "",
      price: "",
      img_path: "",
      description: ""
    });
  };

  return (
    <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <form 
      onSubmit={handleSubmit}
      >
        
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition"
        >
          Add Food Item
        </button>
      </form>
    </div>
  );
};

export default AddFoodItem;
