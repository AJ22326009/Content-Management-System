const express=require('express');
const router=express.Router();
const authMiddleware =require('../middleware/auth');
const { loginUser }=require('../controllers/login.controller');
const { refreshUser }=require('../controllers/refresh.controller');
const RefreshToken=require('../models/RefreshToken');

router.post('/login', 
    loginUser);

router.post('/refresh',
    refreshUser);

router.post('/logout', authMiddleware, async (req, res) => {
    const { refreshToken } = req.body;

    await RefreshToken.deleteOne({token: refreshToken});

    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports=router;