const usermodel = require("../models/usermodel");
const foodpartnermodel = require("../models/foodpartnermodel");
const jwt = require("jsonwebtoken");


const foodpartnerauth = async (req, res, next) => {
  // support token from cookie, Authorization header (Bearer), or request body
  const headerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
  const token = req.cookies?.token || headerToken || req.body?.token;

  if (!token) {
    return res.status(401).json({ message: 'please login to access this resource' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodpartner = await foodpartnermodel.findById(decoded.id);
    req.foodpartner = foodpartner;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'invalid token' });
  }
};

const userauth = async (req, res, next) => {
  // support token from cookie, Authorization header (Bearer), or request body
  const headerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
  const token = req.cookies?.token || headerToken || req.body?.token;

  if (!token) {
    return res.status(401).json({ message: 'please login to access this resource' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usermodel.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'invalid token' });
  }
};

module.exports={foodpartnerauth,userauth};