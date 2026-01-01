const userModel=require('../models/usermodel');
const foodPartnerModel=require('../models/foodpartnermodel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,      // REQUIRED on Render
      sameSite: "none",  // REQUIRED for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "User registered successfully",
      token
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,      // REQUIRED on Render
      sameSite: "none",  // REQUIRED for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};


const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,     // REQUIRED on Render
      sameSite: "none", // MUST match
    });

    return res.status(200).json({
      message: "User logged out successfully"
    });

  } catch (err) {
    console.error("LOGOUT ERROR:", err.message);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};




const registerFoodPartner = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      businessName,
      address
    } = req.body || {};

    if (!name || !email || !password || !businessName || !address) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingPartner = await foodPartnerModel.findOne({ email });
    if (existingPartner) {
      return res.status(409).json({
        message: "Food partner already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const partner = await foodPartnerModel.create({
      name,
      email,
      password: hashedPassword,
      businessName,
      address
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
      { id: partner._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,      // REQUIRED on Render
      sameSite: "none",  // REQUIRED for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "Food partner registered successfully",
      token,
      foodPartner: {
        id: partner._id,
        name: partner.name,
        email: partner.email
      }
    });

  } catch (err) {
    console.error("FOOD PARTNER REGISTER ERROR:", err.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};


const loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
      return res.status(404).json({
        message: "Food partner does not exist"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
      { id: foodPartner._id, role: "foodPartner" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,      // REQUIRED on Render
      sameSite: "none",  // REQUIRED for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Food partner logged in successfully",
      token,
      foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email
      }
    });

  } catch (err) {
    console.error("FOOD PARTNER LOGIN ERROR:", err.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};


const logoutFoodPartner = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,     // REQUIRED on Render
      sameSite: "none", // MUST match cookie options
    });

    return res.status(200).json({
      message: "Food partner logged out successfully"
    });

  } catch (err) {
    console.error("FOOD PARTNER LOGOUT ERROR:", err.message);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


module.exports={registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner};