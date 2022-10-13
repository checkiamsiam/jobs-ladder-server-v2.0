const express = require('express');
const userRoute = express.Router()

userRoute.post('/user/signup' )
userRoute.post('/user/login' )
userRoute.get('/user/me' )

module.exports = userRoute