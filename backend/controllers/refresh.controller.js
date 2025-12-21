const User=require('../models/User');
const RefreshToken=require('../models/RefreshToken');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const refreshUser = async(req,res)=>{
    const {refreshToken}=req.body;

    if(!refreshToken){
        return res.status(400).json({message:'No refresh token provided'});
    }

    const storedToken=await RefreshToken.findOne({token:refreshToken});

    if(!storedToken){
        return res.status(401).json({message:'Invalid refresh token'});
    }

    try{
        const decoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
        const user=await User.findById(decoded.userId)
        .populate({
            path:'role',
            populate:{path:'permissions'}
        });

        const newAccessToken=jwt.sign(
            {
                userId: user._id,
                read: user.role.name,
                permissions: user.role.permissions.map(permission => permission.name)
            },
            process.env.JWT_SECRET,
            {expiresIn:'15m'}
        );

        res.status(200).json({accessToken:newAccessToken});

    }catch(err){
        res.status(403).json({message:'Expired refresh token'});
    }
}

module.exports={refreshUser};