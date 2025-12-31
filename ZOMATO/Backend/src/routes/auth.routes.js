const express=require('express');
const router=express.Router();
const {registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner}=require('../controllers/auth.controller');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.post('/registerfoodpartner',registerFoodPartner);
router.post('/loginfoodpartner',loginFoodPartner);
router.get('/logoutfoodpartner',logoutFoodPartner);

module.exports=router;