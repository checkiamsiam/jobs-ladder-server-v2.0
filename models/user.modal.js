const mongoose = require("mongoose");
const validator = require("validator");
const beforeSaveUser = require("../middleware/beforeSaveUser");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must be require"],
      trim: true,
      minLength: [3, "it must be between 3 to 30 characters"],
      maxLength: [30, "it must be between 3 to 30 characters"],
    },

    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "provide a valid email"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "password must be 8 character"],
    },
    role: {
      type: String,
      trim: true,
      required: [true, "role required"],
      enum: {
        values: ["hr", "candidate", "admin"],
        message: "role can't be {VALUE} . must be hr/candidate/admin",
      },
    },
    jobPosts: [{
      type : mongoose.Schema.Types.ObjectId,
      ref: "Job"
    }],
    jobApplied: [{
      type : mongoose.Schema.Types.ObjectId,
      ref: "Job"
    }],
  },
  

  { timestamps: true }
);

userSchema.pre("save", beforeSaveUser);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
