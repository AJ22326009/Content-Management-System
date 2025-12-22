const User=require('../models/User');
const bcrypt=require('bcrypt');
const Role=require('../models/Role');

//user registration
const registerUser=async(req,res)=>{
    const {fullname,email,password,role,imageUrl}=req.body;

    const hashedPassword=await bcrypt.hash(password,10);

    const userRole=await Role.findOne({name:role});
    if(!userRole){
        return res.status(400).json({message:'role not found'});
    }

    const user=await User.create({
        fullname,
        email,
        password:hashedPassword,
        role: userRole,
        imageUrl
    })

    res.status(201).json({message:'user registered successfully', userId:user._id});
}

module.exports={registerUser};