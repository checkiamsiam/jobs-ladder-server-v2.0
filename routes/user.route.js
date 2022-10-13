const express = require('express');
const userController = require('../controllers/user.controller');
const verifyUser = require('../middleware/verifyUser');
const userRoute = express.Router()

userRoute.post('/user/signup' , userController.register )
userRoute.post('/user/login', userController.login)
userRoute.get('/user/me' , verifyUser , userController.getMe)

module.exports = userRoute