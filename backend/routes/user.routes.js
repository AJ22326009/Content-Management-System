const express=require('express');
const router=express.Router();
const {registerUser, getAllUsers, getUserById, deleteUser, updateUser}=require('../controllers/user.controller');

//user registration
router.post('/register',registerUser);

//get all users
router.get('/',getAllUsers);

//get user by id
router.get('/:id',getUserById);

//delete user
router.delete('/delete/:id',deleteUser);

//update user
router.put('/update/:id',updateUser);

module.exports=router;