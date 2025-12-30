const User=require('../models/User');
const RefreshToken=require('../models/RefreshToken');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const loginUser = async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email})
    .populate({
        path:'role',
        populate:{path:'permissions'}
    });

    if(!user){
        return  res.status(400).json({message:'invalid email'});
    };

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({message:'invalid password'});
    }

    const accessToken=jwt.sign(
        {
            fullname: user.fullname,
            userId: user._id,
            role: user.role.name,
            permissions: user.role.permissions.map(permission => permission.name),
            imageUrl: user.imageUrl
        },
        process.env.JWT_SECRET,
        {expiresIn:'15m'}
    );

    const refreshToken=jwt.sign(
        {userId:user._id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:'7d'}
    );

    await RefreshToken.create({
        user:user._id,
        token:refreshToken,
        expiresAt:new Date(Date.now()+7*24*60*60*1000)
    });
    res.status(200).json({accessToken, refreshToken});
}

module.exports={loginUser};