"use client";
import React from "react";
import CustomerHeaders from "../_components/CustomerHeaders";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/app/features/cartSlice";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react"; // Stylish dustbin icon
import { useRouter } from "next/navigation";
import Link from "next/link";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
    const router = useRouter();
  // ✅ Increase quantity
  const handleIncrease = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} quantity increased!`);
  };

  // ✅ Decrease or Remove item
  const handleDecreaseOrRemove = (item) => {
    if (item.quantity > 1) {
      dispatch(removeFromCart(item._id));
      toast.success(`${item.name} quantity decreased!`);
    } else {
      dispatch(removeFromCart(item._id));
      toast.success(`${item.name} removed from cart!`);
    }
  };

  // ✅ Calculate total cart price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // ✅ GST and Delivery Charge Calculation
  const gstCharge = totalPrice * 0.18;  // 18% GST
  const deliveryCharge = totalPrice * 0.03;  // 5% Delivery Charge
  const finalPrice = totalPrice + gstCharge + deliveryCharge; // Final total

  const handleCheckout =()=>{
    if(localStorage.getItem("user")){
      router.push("/order");
    }else{
      toast.error("Please login to checkout");
      router.push("/user-auth?order=true");
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <CustomerHeaders />

      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-bold mb-8">Shopping Cart</h2>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:scale-105 transition transform relative overflow-visible"
              >
                {/* Item Image */}
                <img
                  src={item.img_path}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{item.price} x {item.quantity}
                    </span>
                    <span className="text-gray-900 font-bold text-lg">
                      ₹{item.totalPrice}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex justify-between items-center mt-6 relative">
                    <div className="flex items-center space-x-2">
                      {/* Decrease/Remove Button */}
                      <div className="relative group">
                        <button
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.quantity > 1
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-gray-300 hover:bg-gray-400"
                          } transition text-white`}
                          onClick={() => handleDecreaseOrRemove(item)}
                        >
                          {item.quantity > 1 ? (
                            "-"
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>

                        {/* Tooltip */}
                        <div
                          className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap 
                          left-1/2 -translate-x-1/2 -top-10"
                        >
                          {item.quantity > 1
                            ? "Decrease Quantity"
                            : "Remove Item"}
                        </div>
                      </div>

                      {/* Quantity */}
                      <span className="text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-gray-800">
                        {item.quantity}
                      </span>

                      {/* Increase Button */}
                      <div className="relative group">
                        <button
                          className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>

                        {/* Tooltip */}
                        <div
                          className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap 
                          left-1/2 -translate-x-1/2 -top-10"
                        >
                          Increase Quantity
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-4xl font-bold text-gray-700">
              Your cart is empty!
            </h3>
            <p className="text-lg text-gray-500 mt-4">
              Add items to your cart and come back here to review them.
            </p>
          </div>
        )}

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
            <h3 className="text-3xl font-bold mb-4">Cart Summary</h3>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Total Price:</span>
              <span className="text-2xl font-bold">₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">GST (18%):</span>
              <span className="text-2xl font-bold text-yellow-600">
                ₹{gstCharge.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Delivery Charge :</span>
              <span className="text-2xl font-bold text-blue-600">
                ₹{deliveryCharge.toFixed(2)}
              </span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Final Price:</span>
              <span className="text-3xl font-bold text-green-600">
                ₹{finalPrice.toFixed(2)}
              </span>
            </div>

            
            <div className="flex justify-end mt-6" onClick={handleCheckout}>
              <button 
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition"
              onClick={()=>router.push("/user-auth")}
              >
                Proceed to Checkout
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
