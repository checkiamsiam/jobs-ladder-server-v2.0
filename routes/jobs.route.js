const express = require('express');
const jobsController = require('../controllers/jobs.controller');
const authorization = require('../middleware/authorization');
const verifyUser = require('../middleware/verifyUser');
const jobsRoute = express.Router()

jobsRoute.get('/jobs', verifyUser, authorization('candidate'), jobsController.getAllJobs )
jobsRoute.post('/jobs', verifyUser, authorization('hr'), jobsController.createJob )
jobsRoute.get('/jobs/:id' ,verifyUser, authorization('candidate') , jobsController.getSpecificWithManager)
jobsRoute.patch('/jobs/:id' ,verifyUser, authorization('hr') , jobsController.updateJob)
jobsRoute.post('/jobs/:id/apply' ,verifyUser, authorization('candidate') , jobsController.applyJob)
jobsRoute.get('/manager/jobs', verifyUser, authorization('hr'), jobsController.findByPoster )
jobsRoute.get('/manager/jobs/:id' , verifyUser, authorization('hr') , jobsController.findSpecificJob)

module.exports = jobsRoute