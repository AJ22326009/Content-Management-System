const express=require('express');
const router=express.Router();
const authMiddleware =require('../middleware/auth');
const { loginUser }=require('../controllers/login.controller');
const { refreshUser }=require('../controllers/refresh.controller');
const { logoutUser }=require('../controllers/logout.controller');


router.post('/login', 
    loginUser);

router.post('/refresh',
    refreshUser);

router.post('/logout', 
    authMiddleware, 
    logoutUser);

module.exports=router;