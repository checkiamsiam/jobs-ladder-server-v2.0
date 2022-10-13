const express = require('express');
const jobsController = require('../controllers/jobs.controller');
const authorization = require('../middleware/authorization');
const verifyUser = require('../middleware/verifyUser');
const jobsRoute = express.Router()

jobsRoute.post('/jobs', verifyUser, authorization('hr'), jobsController.createJob )
// jobsRoute.get('/manager/jobs', jobsController.createJob )
// jobsRoute.get('/manager/jobs/:id' , userController.getMe)
// jobsRoute.patch('/jobs/:id ' , userController.getMe)

module.exports = jobsRoute