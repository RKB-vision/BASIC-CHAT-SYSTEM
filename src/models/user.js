require('dotenv').config();
const mongoose = require('mongoose');

const URL=process.env.URL

const UserSchema=new mongoose.Schema({
    name:{type:String,
        unique:true,
        required:true
    },
    email:{type:String,
        required:true,
        unique:true
    },
    password:{type:String,
        required:true,
    }
})

module.exports=mongoose.model("user",UserSchema)
    