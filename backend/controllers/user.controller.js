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

//delete user
const deleteUser=async(req,res)=>{
    const userId=req.params.id;

    const user=await User.findByIdAndDelete(userId);
    if(!user){
        return res.status(404).json({message:'user not found'});
    }
    res.status(200).json({message:'user deleted successfully'});
}

//get a user by id
const getUserById=async(req,res)=>{
    const userId=req.params.id;

    const user=await User.findById(userId).populate('role');
    if(!user){
        return res.status(404).json({message:'user not found'});
    }
    res.status(200).json({user});
}

//get all users
const getAllUsers=async(req,res)=>{
    const users=await User.find().populate('role');
    if(users.length===0){
        return res.status(404).json({message:'no users found'});
    }

    res.status(200).json({users});
}

//edit user
const updateUser=async(req,res)=>{
    const userId=req.params.id;
    const updatedData=req.body;

    updatedData.role=await Role.findOne({name:updatedData.role});
    if(!updatedData.role){
        return res.status(400).json({message:'role not found'});
    }

    if (updatedData.password && updatedData.password.trim() !== '') {
        updatedData.password = await bcrypt.hash(updatedData.password, 10);
    } else {
        delete updatedData.password; 
    }

    const user=await User.findByIdAndUpdate(userId,updatedData,{new:true});

    if(!user){
        return res.status(404).json({message:'user not found'});
    }
    res.status(200).json({message:'user updated successfully', user});
}

module.exports={registerUser, deleteUser, getUserById, getAllUsers, updateUser};