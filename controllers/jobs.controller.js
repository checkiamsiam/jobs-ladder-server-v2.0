const Job = require("../models/jobs.modal")

module.exports.createJob = async (req , res , next) => {
  try {
    const job = new Job(req.body)
    job.postedBy = {
      name : req.user.name ,
      id : req.user.id
    }
    await job.save()
    res.json({success : true , message : "job posted successful"})

  } catch (error) {
    next(error)
  }
}