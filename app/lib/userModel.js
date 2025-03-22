const { default: mongoose } = require("mongoose")

const userModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
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

const User = mongoose.models.users || mongoose.model("users",userModel)

export default User;