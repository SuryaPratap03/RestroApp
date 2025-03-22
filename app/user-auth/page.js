"use client";
import React, { useState, Suspense } from "react";
import CustomerHeaders from "../_components/CustomerHeaders";
import UserSignup from "../_components/UserSignup";
import UserSignin from "../_components/UserSignin";
import { useSearchParams } from "next/navigation"; 

// For User Authentication - Login/Signup
const Page = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div>
      <CustomerHeaders />

      {/* ✅ Wrap search params with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <AuthSection isSignup={isSignup} setIsSignup={setIsSignup} />
      </Suspense>
    </div>
  );
};

// Separate component to handle `useSearchParams` with Suspense
const AuthSection = ({ isSignup, setIsSignup }) => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("order");

  return isSignup ? (
    <UserSignup setIsSignup={setIsSignup} redirect={redirect} />
  ) : (
    <UserSignin setIsSignup={setIsSignup} redirect={redirect} />
  );
};

export default Page;
