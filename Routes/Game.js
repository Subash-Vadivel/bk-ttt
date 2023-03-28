const express=require('express');
const router=express.Router();
const GameControl =require('../Controller/GameControl')
router.route('/lobby').post(GameControl.lobby);
router.route('/match').post(GameControl.matched);
router.route('/cancel').post(GameControl.cancel);


module.exports=router;