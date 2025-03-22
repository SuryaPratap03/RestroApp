"use client";
import React, { useState, useEffect } from "react";
import CustomerHeaders from "../_components/CustomerHeaders";
import DeliveryPartnerLogin from "../_components/DeliveryPartnerLogin";
import DeliveryPartnerSignup from "../_components/DeliveryPartnerSignUp";
import { useRouter } from "next/navigation";

const Page = () => {  // ✅ Component name starts with uppercase
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const DeliveryPartner = JSON.parse(localStorage.getItem("delivery"));
    if (DeliveryPartner) {
      router.push("/deliverydashboard");
    }
  }, [router]);

  return (
    <div>
      {isLoggedIn ? (
        <DeliveryPartnerLogin setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <DeliveryPartnerSignup setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default Page;
