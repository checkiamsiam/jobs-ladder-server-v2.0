const bcrypt = require("bcrypt");

async function beforeSaveUser(next) {
  const hash = await bcrypt.hash(this.password , 10);
  this.password = hash ;
  if(this.role !== "hr"){
    this.jobPosts = undefined
  }
  if(this.role !== "candidate"){
    this.jobApplied = undefined
  }
  next();
}

module.exports = beforeSaveUser;