const express=require('express');
const router=express.Router();
const GameControl =require('../Controller/GameControl')
router.route('/lobby').post(GameControl.lobby);
module.exports=router;