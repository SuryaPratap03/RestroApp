"use client";
import CustomerHeaders from "@/app/_components/CustomerHeaders";
import { addToCart, removeFromCart } from "@/app/features/cartSlice";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Page = (props) => {
  const [params, setParams] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const restaurantName = params ? decodeURIComponent(params.name || "") : "";

  useEffect(() => {
    if (props?.params) {
      Promise.resolve(props.params).then((data) => {
        setParams(data);
      });
    }
  }, [props.params]);

  const loadRestaurantDetails = async () => {
    const response = await fetch(`/api/customer/${id}`);
    const data = await response.json();
    setRestaurantDetails(data?.details);
    setFoodItems(data?.foodItems || []);
  };

  useEffect(() => {
    if (id) {
      loadRestaurantDetails();
    }
  }, [id]);

  // ✅ Add to Cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  // ✅ Remove from Cart
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item._id));
    toast.success(`${item.name} removed from cart!`);
  };

  // ✅ Get item quantity in cart
  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item._id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <CustomerHeaders />

      {/* Restaurant Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white py-16 text-center shadow-lg">
        <h1 className="text-6xl font-extrabold tracking-wide">
          {restaurantDetails?.restaurantName || restaurantName}
        </h1>
        <p className="text-lg mt-4">
          {restaurantDetails?.address}, {restaurantDetails?.city}
        </p>
        <p className="text-md mt-2">
          📞 {restaurantDetails?.phoneNumber} | 📧 {restaurantDetails?.email}
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-bold mb-8">Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {foodItems.length > 0 ? (
            foodItems.map((item, index) => {
              const quantity = getItemQuantity(item._id);

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-visible relative transition-transform hover:scale-105"
                >
                  <div className="p-4 relative">
                    <h3 className="text-2xl font-semibold">{item?.name}</h3>
                    <p className="text-gray-600 mt-2">{item?.description}</p>
                    <img
                      src={item?.img_path}
                      alt={item?.name}
                      className="w-full h-48 object-cover rounded-lg mt-4"
                    />

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-green-600 font-bold text-lg">
                        ₹{item?.price}
                      </span>
                    </div>

                    {/* Buttons with Quantity and Tooltips */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        
                        {/* Decrease Quantity */}
                        <div className="group relative">
                          <button
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              quantity > 0
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-gray-300 cursor-not-allowed"
                            } transition text-white`}
                            onClick={() => handleRemoveFromCart(item)}
                            disabled={quantity === 0}
                          >
                            -
                          </button>
                          {/* Tooltip */}
                          <span className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded-md px-2 py-1 bottom-full left-1/2 transform -translate-x-1/2 whitespace-nowrap shadow-lg">
                            Remove from cart
                          </span>
                        </div>

                        {/* Quantity Display */}
                        <span
                          className={`text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full ${
                            quantity > 0 ? "bg-green-100" : "bg-gray-200"
                          } text-gray-800`}
                        >
                          {quantity}
                        </span>

                        {/* Increase Quantity */}
                        <div className="group relative">
                          <button
                            className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition"
                            onClick={() => handleAddToCart(item)}
                          >
                            +
                          </button>
                          {/* Tooltip */}
                          <span className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded-md px-2 py-1 bottom-full left-1/2 transform -translate-x-1/2 whitespace-nowrap shadow-lg">
                            Add to cart
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-4xl font-bold text-gray-700">
                No Food Items Available
              </h3>
              <p className="text-lg text-gray-500 mt-4">
                We're currently out of stock. Check back later for delicious
                updates!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
