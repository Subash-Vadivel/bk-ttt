const express=require('express');
const router=express.Router();
const Login =require('../Controller/Login')
router.route('/newUser').post(Login.newUser);
module.exports=router;