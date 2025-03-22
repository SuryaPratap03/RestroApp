import mongoose from "mongoose"

const foodModal = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    img_path:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    resto_id:{
        type:mongoose.Schema.Types.ObjectId,
    }
},{timestamps:true})

export const foodSchema = mongoose.models.foods || mongoose.model("foods",foodModal)