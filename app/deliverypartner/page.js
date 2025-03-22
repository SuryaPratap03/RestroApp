"use client"
import React, { useState } from 'react'
import CustomerHeaders from '../_components/CustomerHeaders'
import DeliveryPartnerLogin from '../_components/DeliveryPartnerLogin'
import DeliveryPartnerSignup from '../_components/DeliveryPartnerSignUp'
import { useRouter } from 'next/navigation';
const page = () => {
    const router = useRouter();
    const [isLoggedIn,setIsLoggedIn] = useState(true);
    const DeliveryPartner = JSON.parse(localStorage.getItem("delivery"));
    if(DeliveryPartner){
        router.push("/deliverydashboard");
    }
  return (
    <div>
      
      {isLoggedIn ? (
        <DeliveryPartnerLogin setIsLoggedIn={setIsLoggedIn}/>
      ) : (
        <DeliveryPartnerSignup setIsLoggedIn={setIsLoggedIn}/>
      )}
    </div>
  )
}

export default page
