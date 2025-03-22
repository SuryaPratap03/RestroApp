import mongoose from "mongoose";

const deliveryPartnerModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,  
    },
    contactNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    city:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
},{timestamps:true})

const deliveryPartnersSchema = mongoose.models.deliverypartners || mongoose.model("deliverypartners",deliveryPartnerModel)

export default deliveryPartnersSchema;