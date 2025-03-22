"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CustomerHeaders from "../_components/CustomerHeaders";
import { clearCart } from "../features/cartSlice";

const Order = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log("cartcartcartcart", cart);
  const { cartItems, totalQuantity, totalAmount } = cart;
  useEffect(()=>{
    if(cartItems.length == 0){
        router.push("/");
    }
  },[])
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    paymentMethod: "Pay on Delivery",
  });

  // ✅ GST and Delivery Charge Calculation
  const gstCharge = totalAmount * 0.18; // 18% GST
  const deliveryCharge = totalAmount * 0.03; // 3% Delivery Charge
  const finalPrice = totalAmount + gstCharge + deliveryCharge;

  // ✅ Load user details from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setOrderDetails((prev) => ({
        ...prev,
        address: storedUser.address || "",
        city: storedUser.city || "",
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.contactNumber || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderDetails.address || !orderDetails.city || !orderDetails.phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

  let deliveryBoyResponse = await fetch(`/api/deliverypartners/${user?.city}`);
    deliveryBoyResponse = await deliveryBoyResponse.json();

    let deliveryBoyIds = deliveryBoyResponse?.result?.map((item)=>item._id);
    console.log("deliveryBoyIds",deliveryBoyIds);
    let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds?.length)];
    if(!deliveryBoy_id){
      toast.error("No delivery boy available for your city");
      return;
    }
    try {
      const orderPayload = {
        user_Id:user._id,
        foodItemsIds:cartItems.map((item)=>item._id).toString(),
        restoId:cartItems[0].resto_id,
        deliveryBoy_id:deliveryBoy_id,
        status:"confirm",
        amount:finalPrice
      };

      // API request to place order
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        router.push("/myprofile");
        // setTimeout(() => {
        //   router.push("/thank-you");
        // }, 2000);
      } else {
        toast.error("Failed to place order.");
      }
    
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomerHeaders />
      <div className="min-h-screen bg-gray-100 flex justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
            Place Your Order
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* ✅ Order Details Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={orderDetails.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={orderDetails.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Address</label>
                <textarea
                  name="address"
                  placeholder="Enter delivery address"
                  value={orderDetails.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={orderDetails.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter contact number"
                    value={orderDetails.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Payment Method</label>
                <input
                  type="text"
                  value="Pay on Delivery"
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 outline-none bg-gray-100"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-lg transition"
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Confirm Order"}
                </button>
              </div>
            </form>

            {/* ✅ Cart Summary */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>

              {cartItems.length > 0 ? (
                <div>
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <img
                          src={item.img_path}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-600">x {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold">₹{item.totalPrice}</p>
                    </div>
                  ))}

                  <hr className="my-4" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal:</span>
                    <span>₹{totalAmount}</span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold">
                    <span>GST (18%):</span>
                    <span>₹{gstCharge.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Delivery Charge (3%):</span>
                    <span>₹{deliveryCharge.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-xl font-bold mt-4">
                    <span>Final Price:</span>
                    <span>₹{finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No items in cart.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
