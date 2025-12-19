const express=require('express');
const router=express.Router();
const {registerUser}=require('../controllers/user.controller');

//user registration
router.post('/register',registerUser);

module.exports=router;