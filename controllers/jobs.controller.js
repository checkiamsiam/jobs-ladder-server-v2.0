const Job = require("../models/jobs.modal");
const UserModel = require("../models/user.modal");
const mongoose = require("mongoose");
const {} = mongoose.Types;

module.exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
};
module.exports.createJob = async (req, res, next) => {
  try {
    const job = new Job(req.body);
    job.postedBy = {
      name: req.user.name,
      id: req.user.id,
    };
    const thatJob = await job.save();
    await UserModel.findByIdAndUpdate(req.user.id, { $push: { jobPosts: thatJob.id } });
    res.json({ success: true, message: "job posted successful" });
  } catch (error) {
    next(error);
  }
};
module.exports.findByPoster = async (req, res, next) => {
  try {
    const jobs = await Job.find({ "postedBy.id": req.user.id });
    res.send({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
};
module.exports.findSpecificJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate("candidates.id");
    if (!job.postedBy.id.equals(req.user.id)) {
      return res.status(403).json({ success: false, message: "unauthorized access" });
    }
    res.send({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};
module.exports.getSpecificWithManager = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy.id" , "-password");
    res.send({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};
module.exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job.postedBy.id.equals(req.user.id)) {
      return res.status(403).json({ success: false, message: "unauthorized access" });
    }
    await Job.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json({ success: true, message: "data updated" });
  } catch (error) {
    next(error);
  }
};
