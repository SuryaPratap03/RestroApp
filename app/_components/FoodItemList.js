"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const FoodItemList = () => {
  const router = useRouter();
  const [fooditems, setFoodItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);

  // Fetch food items
  const loadFoodItems = async () => {
    const restroId = await JSON.parse(localStorage.getItem("restaurantUser"))._id;
    const response = await fetch(`/api/restaurants/foods/${restroId}`);
    const data = await response.json();

    if (data?.success) {
      setFoodItems(data?.result);
    } else {
      toast.error("Failed to load food items");
      console.error("Error in fetching food items");
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  // Open dialog box for confirmation
  const openDialog = (FoodItemId) => {
    setSelectedFoodId(FoodItemId);
    setShowDialog(true);
  };

  // Handle delete action
  const handleDelete = async () => {
    setShowDialog(false);

    const response = await fetch(`/api/restaurants/foods/${selectedFoodId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    if (data?.success) {
      toast.success("Food item deleted successfully");
      loadFoodItems();
    } else {
      console.error("Error in deleting food item:", data);
      toast.error("Failed to delete food item");
    }
  };

  return (
    <div className={`min-h-[calc(100vh-120px)] bg-gray-50 p-8 ${showDialog ? "overflow-hidden" : ""}`}>
      <h1 className="text-4xl font-bold mb-8 text-center text-green-600">
        Food Items
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-3 px-4 text-center w-[8%]">#</th>
                <th className="py-3 px-4 text-center w-[20%]">Name</th>
                <th className="py-3 px-4 text-center w-[15%]">Price</th>
                <th className="py-3 px-4 text-center w-[25%]">Description</th>
                <th className="py-3 px-4 text-center w-[15%]">Image</th>
                <th className="py-3 px-4 text-center w-[17%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fooditems.length > 0 ? (
                fooditems.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="py-4 px-4 text-center">{index + 1}</td>
                    <td className="py-4 px-4 text-center">{item.name}</td>
                    <td className="py-4 px-4 text-center">₹{item.price}</td>
                    <td className="py-4 px-4 text-center">{item.description}</td>

                    {/* Image */}
                    <td className="py-4 px-4 flex justify-center">
                      <img
                        src={item.img_path}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center items-center gap-3">
                        {/* Edit Button */}
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                          onClick={() => router.push(`/restaurant/dashboard/${item._id}`)}
                        >
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                          onClick={() => openDialog(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700">
                          No Food Items Available
                        </h2>
                        <p className="text-gray-500 mt-2">
                          Add some delicious items to your menu!
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog Box with Blur Background */}
      {showDialog && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this food item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItemList;
