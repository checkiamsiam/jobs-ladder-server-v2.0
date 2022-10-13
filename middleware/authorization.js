const authorization = (...roles) => {
  return (req , res , next ) => {
    if(req.user.role === 'admin'){
      next()
    }
    const access = roles.includes(req.user.role)
    if(!access){
      return res.status(401).json({success : false , message : "unauthorized access"})
    }
    next()
  }
}

module.exports = authorization;