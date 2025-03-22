"use client"
import React, { useState } from 'react'
import CustomerHeaders from '../_components/CustomerHeaders'
import UserSignup from '../_components/UserSignup'
import UserSignin from '../_components/UserSignin'

//For User Authentictaion - Login/Signup
const page = ({searchParams}) => {
    const [isSignup,setIsSignup] = useState(false);
    console.log('searchParamssearchParamssearchParamssearchParams',React.use(searchParams)?.order);
    const redirect = React.use(searchParams)?.order;
    return (
    <div>
      <CustomerHeaders/>
      
      {isSignup? <UserSignup setIsSignup={setIsSignup} redirect={redirect}/> : <UserSignin setIsSignup={setIsSignup} redirect={redirect}/>}
    </div>
  )
}

export default page
