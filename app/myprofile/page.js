"use client";
import React, { useState, useEffect } from "react";
import CustomerHeaders from "../_components/CustomerHeaders";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`/api/order?id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        console.log("Order Data:", data);
        setOrderData(data?.result);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchOrders(storedUser?._id);
    }else{
      router.push("/");
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-700 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div  className="bg-gray-100 ">
      <CustomerHeaders />

      <div className="min-h-screen bg-gray-100 p-8" style={{marginBottom:'-60px',marginTop:'30px'}}>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-6">My Profile</h2>

          {/* ✅ Profile Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Profile Info</h3>
              <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {user.contactNumber}</p>
              <p className="text-gray-700"><strong>Address:</strong> {user.address}</p>
              <p className="text-gray-700"><strong>City:</strong> {user.city}</p>
              <p className="text-gray-700"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            {/* ✅ Scrollable Order History Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow max-h-[400px] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Order History</h3>

              {loading ? (
                <p className="text-gray-500">Loading orders...</p>
              ) : orderData.length > 0 ? (
                <div className="space-y-4">
                  {orderData.map((order, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-lg shadow-sm bg-white"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">
                            Restaurant: {order.data[0]?.restaurantName}
                          </p>
                          <p className="text-gray-600">
                            City: {order.data[0]?.city}
                          </p>
                          <p className="text-gray-600">
                            Phone: {order.data[0]?.phoneNumber}
                          </p>
                          <p className="text-gray-600">
                            Email: {order.data[0]?.email}
                          </p>
                        </div>

                        <div className="text-right">
                          {/* ✅ Amount Fixed to 2 Decimals */}
                          <p className="text-lg font-bold">
                            ₹{parseFloat(order.amount).toFixed(2)}
                          </p>
                          <p
                            className={`text-sm ${
                              order.status === "confirm"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {order.status === "confirm"
                              ? "Confirmed"
                              : "Pending"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No orders found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
