const foodPartnerModel = require('../models/foodpartnermodel');
const foodModel = require('../models/fooditem-model');

async function getFoodPartnerById(req, res) {

    const foodpartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodpartnerId)
    const foodItemsByFoodPartner = await foodModel.find({ foodpartner: foodpartnerId })

    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not found" });
    }

    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }

    });
}

module.exports = {getFoodPartnerById};