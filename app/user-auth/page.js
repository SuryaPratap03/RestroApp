"use client";
import React, { useState } from "react";
import CustomerHeaders from "../_components/CustomerHeaders";
import UserSignup from "../_components/UserSignup";
import UserSignin from "../_components/UserSignin";
import { useSearchParams } from "next/navigation"; 

// For User Authentication - Login/Signup
const Page = () => {
  const [isSignup, setIsSignup] = useState(false);

  // ✅ Use Next.js hook for search params
  const searchParams = useSearchParams();
  const redirect = searchParams.get("order"); 

  return (
    <div>
      <CustomerHeaders />
      {isSignup ? (
        <UserSignup setIsSignup={setIsSignup} redirect={redirect} />
      ) : (
        <UserSignin setIsSignup={setIsSignup} redirect={redirect} />
      )}
    </div>
  );
};

export default Page;
