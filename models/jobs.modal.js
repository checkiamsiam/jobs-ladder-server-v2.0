const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 6,
      maxLength: 100,
      trim: true,
      required: [true, "Must need a Job Title..!"],
    },
    description: {
      type: String,
      minLength: [50, "Job Description shouldn't be less then 50 character..!"],
      trim: true,
      required: [true, "Must need a Job Description..!"],
    },
    skills: [String],
    location: {
      type: String,
      trim: true,
      required: [true, "Job Location is required..!"],
    },
    type: {
      type: String,
      required: [true, "Job Type is required..!"],
      enum: [
        {
          values: ["Full-time", "Part-time", "Contract", "Internship", "Other"],
          message:
            "Job Type should be: Full-time/Part-time/Contract/Internship/Other",
        },
      ],
    },
    salary: {
      type: Number,
      min: 0,
      required: [true, "Salary is a required field..!"],
    },
    postedBy: {
      name: String,
      id: { type: ObjectId,  ref: "User" },
    },
    candidates: [
      {
        name: {
          type: String,
          required: [true, "Provide a candidate name..!"],
        },
        resume: String,
        id: { type: ObjectId, required: [true, "User Id is required"], ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;