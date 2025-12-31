const express = require('express');
const router = express.Router();
const authmiddleware= require('../middleware/authMiddleware');
const foodPartnerController = require('../controllers/food-partner.controller');


router.get('/:id', authmiddleware.foodpartnerauth, foodPartnerController.getFoodPartnerById);

module.exports = router;