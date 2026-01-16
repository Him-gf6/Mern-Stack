const userModel=require('../models/usermodel');
const foodPartnerModel=require('../models/foodpartnermodel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const registerUser=async (req,res)=>{
   const {name,email,password}=req.body;

   const existingUser=await userModel.findOne({email:email});
   if(existingUser){
       return res.status(400).json({message:"User already exists"});
   }

   const hashedPassword=await bcrypt.hash(password,10);

   const user=await userModel.create({
        name,
       email,
       password:hashedPassword
   })

   const token=jwt.sign({
      id:user._id
   },process.env.JWT_SECRET);
   res.cookie("token",token);

   res.status(201).json({
       message:"User registered successfully",
       token
   })
}

const loginUser=async(req,res)=>{
    const{email,password}=req.body;

    const user=await userModel.findOne({email:email});
    if(!user){
        return res.status(400).json({message:"User does not exist"});
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie("token",token);
    res.status(200).json({
        message:"User logged in successfully",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })
}

const logoutUser=async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message:"User logged out successfully"});
}



const registerFoodPartner=async (req,res)=>{
    const {name,email,password,businessName,address}=req.body;

    const existingPartner=await foodPartnerModel.findOne({email:email});
    if(existingPartner){
        return res.status(400).json({message:"Food partner already exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const partner=await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword,
        businessName,
        address
    })

    const token=jwt.sign({
        id:partner._id
    },process.env.JWT_SECRET);
    res.cookie("token",token);

    res.status(201).json({
        message:"Food partner registered successfully",
        token,
        foodPartner:{
            id:partner._id,
            name:partner.name,
            email:partner.email
        }
    })
}

const loginFoodPartner=async(req,res)=>{
    const{email,password}=req.body;

    const foodPartner=await foodPartnerModel.findOne({email:email});
    if(!foodPartner){
        return res.status(400).json({message:"Food partner does not exist"});
    }

    const isPasswordValid=await bcrypt.compare(password,foodPartner.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token=jwt.sign({
        id:foodPartner._id
    },process.env.JWT_SECRET);
    res.cookie("token",token);
    res.status(200).json({
        message:"Food partner logged in successfully",
        token,
        foodPartner:{
            id:foodPartner._id,
            name:foodPartner.name,
            email:foodPartner.email
        }
    })
}

const logoutFoodPartner=async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message:"Food partner logged out successfully"});
}

module.exports={registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner};