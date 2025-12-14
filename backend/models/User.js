const mongoose = require('mongoose');

const userSchema=new mongoose.Schema(
    {
        fullname:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        role: {
            type: String,
            required: true,
            ref: 'Role'
        },
        password:{
            type: String,
            required: true
        },
        profilePhoto:{
            type: String,
        }
    },
    {timestamps: true}
);


module.exports=mongoose.Schema('User',userSchema);