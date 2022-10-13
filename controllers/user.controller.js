const UserModel = require("../models/user.modal")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

module.exports.register = async (req , res , next)=> {
  try {
    const user = new UserModel(req.body)
    await user.save()
    const accessToken =  jwt.sign({id : user._id} , process.env.TOKEN_SECRET)
    res.json({success : true , message: "user register success", accessToken })
  } catch (error) {
    next(error)
  }
}
module.exports.login = async (req , res , next)=> {
  try {
    const {email , password} = req.body
    const user = await UserModel.findOne({email})
    if(!user){
      return res.status(500).json({success:false , message:"there is no user in this email"})
    }
    const passwordMatched = await bcrypt.compare(password , user.password)
    if(!passwordMatched){
      return res.status(500).json({success:false , message:"your entire email or password is invalid"})
    }
    const accessToken =  jwt.sign({id : user._id} , process.env.TOKEN_SECRET)
    res.json({success : true , message: "user login success", accessToken })
  } catch (error) {
    next(error)
  }
}
module.exports.getMe = async (req , res , next)=> {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if(!token){
      return res.status(401).json({success:false , message:"unauthorized access"})
    }
    const {id} = jwt.verify(token , process.env.TOKEN_SECRET)
    const user = await UserModel.findById(id).select("name email role")
    res.send(user)
  } catch (error) {
    next(error)
  }
}