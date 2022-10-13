const express = require('express');
const userController = require('../controllers/user.controller');
const userRoute = express.Router()

userRoute.post('/user/signup' , userController.register )
userRoute.post('/user/login', userController.login)
userRoute.get('/user/me' , userController.getMe)

module.exports = userRoute