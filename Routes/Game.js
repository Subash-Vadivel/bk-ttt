const express=require('express');
const router=express.Router();
const GameControl =require('../Controller/GameControl')
router.route('/lobby').post(GameControl.lobby);
router.route('/match').post(GameControl.matched);
router.route('/cancel').post(GameControl.cancel);
router.route('/update').post(GameControl.update);

router.route('/updateperiod').post(GameControl.updateperiod);


module.exports=router;