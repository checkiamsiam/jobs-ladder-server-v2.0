const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.modal");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "unauthorized access" });
    }
    const { id } =  jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await UserModel.findById(id).select("name email role");
    req.user = user;
    next();
  } catch (error) {
    next(new Error("forbidden access"));
  }
};

module.exports = verifyUser
