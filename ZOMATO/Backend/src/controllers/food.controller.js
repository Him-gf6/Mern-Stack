const foodmodel=require("../models/fooditem-model");
const usermodel=require("../models/usermodel");
const storageService=require("../../services/storage.service");
const { v4:uuid }=require("uuid");
const likemodel=require("../models/likesmodel");
const savemodel=require("../models/savemodel");

const createfooditem=async(req,res)=>{
    const fileUploadResult=await storageService.uploadFile(req.file.buffer, uuid());

    const fooditem=await foodmodel.create({
        name:req.body.name,
        video:fileUploadResult.url,
        description:req.body.description,
        foodpartner:req.foodpartner._id,
    });

    res.status(201).json({
        message:"Food Item created successfully",
        food:fooditem,
    });
}

const getfooditems=async(req,res)=>{
    const fooditem=await foodmodel.find();
    res.status(200).json({
        message:"Food Items fetched successfully",
        fooditems:fooditem,
    });
}

const likeFoodItem = async (req, res) => {
    const { foodId } = req.body;
    const user= req.user;

    const isAlreadyLiked=await likemodel.findOne({
        user:user._id,
        food:foodId
    });

    if(isAlreadyLiked){
        await likemodel.deleteOne({
            user:user._id,
            food:foodId
        });

        await foodmodel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        });

        res.status(200).json({
            message:"Food item unliked successfully"
        })
    }

    const like=await likemodel.create({
        user:user._id,
        food:foodId
    });

    await foodmodel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    });

    res.status(201).json({
        message:"Food item liked successfully",
        like,
    });
}

const saveFoodItem = async (req, res) => {
    try {
        const { foodId } = req.body;
        const user = req.user;

        if (!foodId) {
            return res.status(400).json({ message: 'foodId is required' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        // ensure food exists
        const foodExists = await foodmodel.findById(foodId);
        if (!foodExists) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        const isAlreadySaved = await savemodel.findOne({ user: user._id, food: foodId });

        if (isAlreadySaved) {
            await savemodel.deleteOne({ user: user._id, food: foodId });
            return res.status(200).json({ message: "Food item unsaved successfully" });
        }

        const save = await savemodel.create({ user: user._id, food: foodId });
        return res.status(201).json({ message: "Food item saved successfully", save });
    } catch (error) {
        console.error('saveFoodItem error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getSavedItemsForUser = async (req, res) => {
    try {
        const user = req.user;
        // find save documents for this user and populate the food item
        const saves = await savemodel.find({ user: user._id }).populate({ path: 'food', populate: { path: 'foodpartner' } });

        const foods = saves.map(s => s.food).filter(Boolean);

        return res.status(200).json({
            message: 'Saved items fetched',
            saved: foods,
        });
    } catch (error) {
        console.error('getSavedItemsForUser error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={createfooditem,getfooditems,likeFoodItem,saveFoodItem,getSavedItemsForUser};