import { Restaurant } from "@/app/lib/restaurantModals";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    let queryParams = request.nextUrl.searchParams;
    console.log(queryParams.get('location'));
    let filter = {};
    mongoose.connect(process.env.MONGODB_URI);
    if(queryParams.get('location') && queryParams.get('restaurant')){
        let city =queryParams.get('location').charAt(0).toUpperCase()+queryParams.get('location').slice(1);
        let restaurantName = queryParams.get('restaurant').charAt(0).toUpperCase()+queryParams.get('restaurant').slice(1);
        filter = {city:{$regex:new RegExp(city,'i')},restaurantName:{$regex:new RegExp(restaurantName,'i')}}
    }else if(queryParams.get('location')){
        let city = queryParams.get('location').charAt(0).toUpperCase()+queryParams.get('location').slice(1);
        filter = {city:{$regex:new RegExp(city,'i')}}
    }else if(queryParams.get('restaurant')){
        let restaurantName = queryParams.get('restaurant').charAt(0).toUpperCase()+queryParams.get('restaurant').slice(1);
        filter = {restaurantName:{$regex:new RegExp(restaurantName,'i')}}
    }
    let result = await Restaurant.find(filter);
    return NextResponse.json({success:true,message:"Customer API is working",result})
}